import "./../scss/main.scss";

var config = {
    apiKey: "AIzaSyDYxBVHNFeaTZgR0o09BvoZkQ0Ugy9zuME",
    authDomain: "project-6559579986434785633.firebaseapp.com",
    databaseURL: "https://project-6559579986434785633.firebaseio.com",
    projectId: "project-6559579986434785633",
    storageBucket: "project-6559579986434785633.appspot.com",
    messagingSenderId: "804477883843"
};
firebase.initializeApp(config);

class Db {
    constructor(path) {
        this.path = path;
    }

    connect() {
        const db = firebase.firestore();
        const docRef = db.doc(this.path);
        return docRef;
    }

    existName(name) {
        let userexists;
        return this.connect(this.path).get()
            .then(querySnapshot => {
                let users = querySnapshot.data().Users;
                if (users.indexOf(name) > -1) {
                    userexists = true;
                    return userexists;
                } else {
                    return false;
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    addName(name) {
        this.connect(this.path).update({ Users: firebase.firestore.FieldValue.arrayUnion(name) })
    }

    addScore() { //     <---------- Add scores to database -----------
        this.connect(this.path).doc('Scores').add({
            name: userprofile.name,
            number: game.score.value
        }).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    }

    getInstructions() {
        return this.connect(this.path).get()
            .then(e => {
                let instruction = e.data().Instructions;
                // console.log(instruction.language);
                return instruction;
            })
    }

    getUpdats() {
        return this.connect(this.path).get()
            .then(e => {
                let updats = e.data().Updates;
                // console.log(updats);
                return updats;
            })
    }

    getScores() {
        return this.connect(this.path).get()
            .then(e => {
                let scrs = e.data().Scores;
                return scrs;
            })
    }


}


document.addEventListener("DOMContentLoaded", function () {


    let boxes = document.querySelector('.b1_1');
    let button = document.querySelector('#start');

    let bx = [['', '', ''], ['', '', ''], ['', '', '']];

    let time = 200;

    //Database and Users

    class Verify {
        constructor(el, messageEl) {
            this.element = el,
                this.messageEl = messageEl
            this.verified = false;
        }

        verifyName() {
            this.verified = false;
            this.element.addEventListener('keyup', () => {
                this.messageEl.innerHTML = '<i class="fas fa-spinner"></i>';
                let exists;
                database.existName(this.element.value).then(e => exists = e);
                setTimeout(() => {
                    if (this.element.value.length < 5) {
                        this.messageEl.innerText = `You need at least ${5 - this.element.value.length} signs`;
                        this.verified = false;

                    } else if (exists) {
                        console.log(exists);
                        this.messageEl.innerText = ' User name already exist';
                        this.verified = false;

                    } else {
                        this.verified = true;
                        this.messageEl.innerHTML = '<i class="fas fa-check"></i>';
                    }
                }, 1000);
            })
        }

        verifyEmail() {
            this.verified = false;
            this.element.addEventListener('keyup', () => {
                this.messageEl.innerHTML = '<i class="fas fa-spinner"></i>';
                let propsed;
                setTimeout(() => {
                    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                    if (!re.test(this.element.value)) {
                        this.messageEl.innerText = 'E-mail incorect';
                        this.verified = false;
                    } else {
                        this.verified = true;
                        this.messageEl.innerHTML = '<i class="fas fa-check"></i>';
                    }

                }, 500)

            })
        }

        verifyPassword() {
            this.verified = false;
            this.element.addEventListener('keyup', () => {

                let propsed;
                setTimeout(() => {
                    if (this.element.value.length < 6) {
                        this.messageEl.innerText = `Password nees at least ${6 - this.element.value.length} more signs`;
                        this.verified = false;
                    } else {
                        this.verified = true;
                        this.messageEl.innerHTML = '<i class="fas fa-check"></i>';
                    }
                }, 500)
            })
        }
    }

    class SignUp {
        constructor(name, email, pass) {
            this.name = name,
                this.email = email,
                this.pass = pass,
                this.correct = false
        }

        opendialog() {

            const dialogWindow = document.querySelector('.message');
            dialogWindow.classList.add('active');
            const form = document.createElement('form');
            const h2 = document.createElement('h2');
            h2.innerText = 'Sign Up';
            form.appendChild(h2);

            //USER NAME
            const label1 = createLabel('Your User Name:');
            form.appendChild(label1);

            const div1 = document.createElement('div');
            const input1 = createInput('text', 'User name', 'userName');
            div1.appendChild(input1);

            const span1 = createSpan('span1');
            div1.appendChild(span1);
            form.appendChild(div1);

            //EMAIL
            const label2 = createLabel('Your E-mail address:');
            form.appendChild(label2);

            const div2 = document.createElement('div');
            const input2 = createInput('email', 'your@eamil.2048', 'email');
            div2.appendChild(input2);

            const span2 = createSpan('span2');
            div2.appendChild(span2);
            form.appendChild(div2);

            //PASSWORD
            const label3 = createLabel('Your Password:');
            form.appendChild(label3);

            const div3 = document.createElement('div');
            const input3 = createInput('password', 'your secret password', 'password');
            div3.appendChild(input3);

            const span3 = createSpan('span3');
            div3.appendChild(span3);
            form.appendChild(div3);


            dialogWindow.appendChild(form);

        }

        addbutton() {
            const form = document.querySelector('form');
            const button = createButton('Register', 'register');
            form.appendChild(button);
        }

        submituser() {
            let user = null;
            this.name = document.querySelector('#userName').value;
            this.email = document.querySelector('#email').value;
            this.pass = document.querySelector('#password').value;
            firebase.auth().createUserWithEmailAndPassword(this.email, this.pass)
                .then(() => {
                    user = firebase.auth().currentUser;

                }).then(() => {
                user.updateProfile({
                    displayName: this.name
                });

            })
                .catch(error => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                });
        }

    }

    class User extends SignUp {

        opendialod() {
            const dialogWindow = document.querySelector('.message');
            dialogWindow.classList.add('active');
            const form = document.createElement('form');
            const h2 = document.createElement('h2');
            h2.innerText = 'Sign In';
            form.appendChild(h2);

            //EMAIL
            const label2 = createLabel('Your E-mail address:');
            form.appendChild(label2);

            const input2 = createInput('email', 'your@eamil.2048', 'email');
            form.appendChild(input2);


            //PASSWORD
            const label3 = createLabel('Your Password:');
            form.appendChild(label3);

            const input3 = createInput('password', 'your secret password', 'password');
            form.appendChild(input3);

            const button = createButton('Sign in', 'loggin');
            form.appendChild(button);

            dialogWindow.appendChild(form);
        }

        submit() {
            this.email = document.querySelector('#email').value;
            this.pass = document.querySelector('#password').value;
            firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    window.alert(errorCode + errorMessage);

                })
        }

        logged() {
            const su = document.querySelector('.sign-up');
            if (su != null) {
                const uname = document.querySelector('.User p');
                const si = document.querySelector('.sign-in');
                const i = document.querySelector('.fa-user-circle');
                i.classList.add('logged');
                su.classList.remove('sign-up');
                su.classList.add('settings');
                su.innerText = this.name;
                si.classList.remove('sign-in');
                si.classList.add('logout');
                si.innerText = 'log-out';
                uname.innerText = this.name;
            }

        }

        status(user) {
            this.name = user.displayName;
            this.email = user.email;
        }

        logout() {
            const lo = document.querySelector('.logout');
            const se = document.querySelector('.settings');
            const uname = document.querySelector('.User p');
            const i = document.querySelector('.fa-user-circle');

            firebase.auth().signOut().then(() => {
                window.alert('See you later!');
                setTimeout(() => {
                    lo.classList.remove('logout');
                    lo.classList.add('sign-in');
                    lo.innerText = 'Sign-in';
                    se.classList.remove('settings');
                    se.classList.add('sign-up');
                    se.innerText = 'Sign-up';
                    uname.innerText = 'User';
                    i.classList.remove('logged');

                }, 500);
            }, function (error) {
                window.alert('Coś poszło nie tak');
            });
        }

    }

    class CloseWindow {

        constructor(element, tr) {
            this.win = element,
                this.eks = tr
        }

        closeWindowEvent() {
            const form = document.querySelector('.message form');
            const div = document.querySelector('.message .instruction');
            const div1 = document.querySelector('.message .scores');

            this.eks.onclick = e => {
                this.win.classList.remove('active');

                if (form != null) {
                    this.win.removeChild(form);
                }

                if (div != null) {
                    this.win.removeChild(div);
                }
                if (div1 != null) {
                    this.win.removeChild(div1);
                }
            }
        }
        closeWindow() {
            const form = document.querySelector('.message form');
            const div = document.querySelector('.message .instruction');
            const div1 = document.querySelector('.message .scores');

            this.win.classList.remove('active');
            if (form != null) {
                this.win.removeChild(form);
            }
            if (div != null) {
                this.win.removeChild(div);
            }
            if (div1 != null) {
                this.win.removeChild(div1);
            }
        }
    }

    //Game
    class Tail {
        constructor(num, row, col) {

            this.number = num,
                this.row = row,
                this.col = col,
                this.div
        }

        create() {
            this.div = document.createElement('div');
            this.div.id = `r${this.row}-c${this.col}`
            this.div.classList.add(`t-${this.row}-${this.col}`);
            this.div.classList.add('tail');
            this.div.classList.add('num2');
            this.div.classList.add('new');
            this.div.innerText = this.number;
            boxes.appendChild(this.div);
        }

        relocate(nrow, ncol) {

            // this.div = document.querySelector(`#r${this.row}-c${this.col}`);
            // console.log(this.div);
            this.div.classList.remove(`t-${this.row}-${this.col}`);
            bx[nrow][ncol] = bx[this.row][this.col];
            bx[this.row][this.col] = '';
            this.row = nrow;
            this.col = ncol;
            this.div.classList.add(`t-${this.row}-${this.col}`);
            this.div.classList.remove(`joint`);
            this.div.classList.remove('new');
            this.div.id = `r${this.row}-c${this.col}`;
            return true;
        }

        join(nrow, ncol) {
            // console.log(this.row);
            // console.log(this.col);
            // this.div = document.querySelector(`#r${this.row}-c${this.col}`);
            // console.log(this.div);
            let el2 = document.querySelector(`#r${nrow}-c${ncol}`);
            this.div.classList.remove(`t-${this.row}-${this.col}`);

            bx[nrow][ncol] = bx[this.row][this.col];
            bx[this.row][this.col] = '';
            this.number *= 2;
            this.row = nrow;
            this.col = ncol;
            this.div.classList.add(`t-${this.row}-${this.col}`);
            this.div.classList.remove('joint');
            this.div.classList.remove('new');
            this.div.id = `r${this.row}-c${this.col}`;
            boxes.removeChild(el2);
            setTimeout(() => {
                this.div.classList.add('joint');
                this.div.classList.add(`num${this.number}`);
                this.div.classList.remove(`num${this.number/2}`);
                // this.div.innerText = bx[this.row][this.col].number;
                this.div.innerText = this.number;
                game.addscore(this.number);

            }, time);

            return true;
        }

    }


    class Game {
        constructor (base) {
            this.base = bx;
            this.score = document.querySelector('.score');
            this.end = true;
        }

        nextmove() {
            var higher = {};
            higher.number = 0;
            let next;
            this.end = true;
            for(let r=0; r < 2; r++){
                for(let c=0; c < 2; c++) {
                    if(this.base[r][c].number === this.base[r+1][c].number){
                        if(higher.number < this.base[r][c].number) {
                            higher = this.base[r][c];
                            next = this.base[r+1][c];
                            this.end = false;
                        }
                    }
                    if(this.base[r][c].number === this.base[r][c+1].number){
                        if(higher.number < this.base[r][c].number) {
                            higher = this.base[r][c];
                            next = this.base[r][c+1];
                            this.end = false;
                        }
                    }
                }
            }

            return {
                first: higher,
                second: next
            }
        }

        endgame(bs) {
            let newbase = [];
            this.base = bs;
            this.base.forEach(e => e.forEach( e => newbase.push(e)));
            if(newbase.indexOf('') === -1) {
                this.nextmove();
                if(this.end){
                    if (meswin.className === 'message active') {
                        closemessage.closeWindow();
                    }
                    meswin.classList.add('active');
                    const div = document.createElement('div');
                    div.classList.add('scores');
                    let h3 = document.createElement('h1');
                    h3.innerText = 'Game Over';
                    div.appendChild(h3);
                    meswin.appendChild(div);
                    closemessage.closeWindowEvent();

                    if (userprofile.name !== undefined) {
                        database.addScore();
                    }
                }
            }

        }

        addscore(num) {
            this.score.innerText = parseInt(this.score.innerText) + num;
        }

        resetscore() {
            this.score.innerHTML = 0;
        }

        displayscore() {
            if (meswin.className === 'message active') {
                closemessage.closeWindow();
            }
            meswin.classList.add('active');
            const div = document.createElement('div');
            div.classList.add('scores');
            let h3 = document.createElement('h3');
            h3.innerText = 'Scores';
            div.appendChild(h3);
            for (let i in scrs) {
                let h6 = document.createElement('div.scr');

                let div2 = document.createElement('div.name');
                div2.innerHTML = scrs[i].name;
                h6.appendChild(div2);
                let div3 = document.createElement('div.score');
                div3.innerHTML = scrs[i].number;
                h6.appendChild(div3);
                div.appendChild(h6);
            }

            meswin.appendChild(div);
            closemessage.closeWindowEvent();
        }


    }

    //definitions
    // let verified = false;
    let register = new SignUp();
    let userprofile = new User();
    let databaseurl = '2048/database';
    // let dataupdatesurl = '2018/database';
    let database = new Db(databaseurl);
    // let updats = new Db(dataupdatesurl);
    let btn;
    const meswin = document.querySelector('.message');
    const eks = document.querySelector('#close');
    const closemessage = new CloseWindow(meswin, eks);

    let inst;
    database.getInstructions().then(e => inst = e);
    let upd;
    database.getUpdats().then(e => upd = e);
    let scrs;
    database.getScores().then(e => scrs = e);

    let createLabel = (text) => {
        const result = document.createElement('label');
        result.innerText = text;
        result.classList.add('label');
        return result;
    }
    let createSpan = (clas) => {
        const result = document.createElement('span');
        result.classList.add(clas);
        return result;
    }

    let createInput = (type, placeholder, id) => {
        const result = document.createElement('input');
        result.setAttribute('type', type);
        result.setAttribute('placeholder', placeholder);
        result.setAttribute('id', id);
        return result;
    }

    let createButton = (text, clas) => {
        const result = document.createElement('button');
        result.classList.add(clas);
        result.innerText = text;
        return result;
    }

    let lout = () => {
        // debugger;
        const so = document.querySelector('.logout');
        userprofile.logout();
        so.removeEventListener('click', lout);
        signin.addEventListener('click', logprocces);
        signup.addEventListener('click', regProcces);
        if (btn != undefined) {
            closemessage.closeWindow();
        }

    }

    function convert(time){

        let unixtimestamp = time;
        let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let date = new Date(unixtimestamp*1000);
        let year = date.getFullYear();
        let month = months_arr[date.getMonth()];
        let day = date.getDate();
        let convdataTime = `${day}.${month}.${year}`;
        return convdataTime;
    }

//HTML elements
    const signup = document.querySelector('.sign-up');
    const signin = document.querySelector('.sign-in');
    const instruction = document.querySelector('#inst');
    const scorebtn = document.querySelector('#scores');

//events
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userprofile.status(user);
            userprofile.logged();
            signup.removeEventListener('click', regProcces);
            const so = document.querySelector('.logout');
            so.addEventListener('click', lout);
            btn = undefined;
        }
    });

//Rejestracja
    const regProcces = () => {

        if (meswin.className === 'message active') {
            closemessage.closeWindow();
        }
        register.opendialog();

        const input1 = document.querySelector('#userName');
        const input2 = document.querySelector('#email');
        const input3 = document.querySelector('#password');
        const span1 = document.querySelector('.span1');
        const span2 = document.querySelector('.span2');
        const span3 = document.querySelector('.span3');

        const name = new Verify(input1, span1);
        const mail = new Verify(input2, span2);
        const pass = new Verify(input3, span3);
        name.verifyName();
        mail.verifyEmail();
        pass.verifyPassword();
        register.addbutton();
        btn = document.querySelector('.register');
        btn.onclick = e => {
            e.preventDefault();
            if (name.verified && mail.verified && pass.verified) {
                signup.removeEventListener('click', regProcces);
                register.submituser();
                database.addName(register.name);
                userprofile.name = register.name;
                userprofile.mail = register.email;
                userprofile.logged();
                closemessage.closeWindow();
                const so = document.querySelector('.logout');
                so.addEventListener('click', lout);
            }
        }
        closemessage.closeWindowEvent();
    }

    signup.addEventListener('click', regProcces);

//Log-in
    const logprocces = () => {

        if (meswin.className === 'message active') {
            closemessage.closeWindow();
        }
        userprofile.opendialod();
        closemessage.closeWindowEvent();
        btn = document.querySelector('.loggin');
        btn.onclick = e => {
            signin.removeEventListener('click', logprocces);
            e.preventDefault();
            userprofile.submit();
            closemessage.closeWindow();
        }
        closemessage.closeWindowEvent();
    }

    signin.addEventListener('click', logprocces);

//Instrukcja

    instruction.onclick = () => {
        if (meswin.className === 'message active') {
            closemessage.closeWindow();
        }
        meswin.classList.add('active');
        const div = document.createElement('div');
        div.classList.add('instruction');
        div.innerHTML = inst.EN;
        const div2 = document.createElement('div');
        div2.classList.add('updates');
        let h3 = document.createElement('h3');
        h3.innerText = 'Updates';
        div2.appendChild(h3);
        for (let i in upd) {
            let h4 = document.createElement('h4');
            h4.innerText = convert(upd[i].Date.seconds);
            div2.appendChild(h4);
            let div3 = document.createElement('div.upd');
            div3.innerHTML = upd[i].Update;
            div2.appendChild(div3);
        }
        div.appendChild(div2);

        meswin.appendChild(div);
        closemessage.closeWindowEvent();
    }

// Wyniki

    scorebtn.onclick = () => {
        game.displayscore();
    }

// <--Gra-->

    let game = new Game(bx);

    const start = () => {
        let col, row;
        boxes.innerHTML = '';
        bx = [['', '', ''], ['', '', ''], ['', '', '']];
        col = Math.floor(Math.random() * 3);
        row = Math.floor(Math.random() * 3);
        game.resetscore();
        bx[row][col] = new Tail(2, row, col);
        bx[row][col].create();
        window.addEventListener('keydown',keypress);

    }

    button.onclick = start;

    const newtail = () => {

        let col, row;
        col = Math.floor(Math.random() * 3);
        row = Math.floor(Math.random() * 3);
        if (bx[row][col] === '') {
            bx[row][col] = new Tail(2, row, col);
            bx[row][col].create();
            window.addEventListener('keydown',keypress);
            game.endgame(bx);
        } else {
            newtail();
        }
    }


    const down = () => {
        let moved = false;
        for (let i = 0; i<3;i++ ){
            let el1 = bx[1][i];
            let el2 = bx[2][i];
            let el0 = bx[0][i];

            if(el1 && el1.number===el2.number){
                moved = el1.join(2,i);
                if(el1.number === el0.number){
                    el0.relocate(1,i);
                }
            }
            else if(el1 && el2===''){
                moved = el1.relocate(2,i);

            }
        }
        for (let i=0; i<3; i++){
            let el0 = bx[0][i];
            let el1 = bx[1][i];
            let el2 = bx[2][i];

            if(el0 && el1==='' && el2===''){
                moved = el0.relocate(2,i)
            }
            else if(el0 && el0.number === el2.number && el1===''){


                moved = el0.join(2,i);}
            else if(el0 && el0.number === el1.number) {
                moved = el0.join(1,i)}
            else if(el0 && el1==='') {
                moved = el0.relocate(1,i)}
        }

        if (moved) {
            window.removeEventListener('keydown',keypress);

            setTimeout(newtail, time);
        }
    }

    const up = () => {
        let moved = false;

        for (let i = 0; i < 3; i++) {
            let el1 = bx[1][i];
            let el0 = bx[0][i];
            let el2 = bx[2][i];
            if (el1 && el1.number === el0.number) {

                moved = el1.join(0, i);
                if(el1.number === el0.number){
                    el2.relocate(1,i)}
            }
            else if (el1 && el0 === '') {
                moved = el1.relocate(0, i) }
        }
        for (let i = 0; i < 3; i++) {
            let el0 = bx[0][i];
            let el1 = bx[1][i];
            let el2 = bx[2][i];
            if (el2 && el1 === '' && el0 === '') {
                moved = el2.relocate(0, i) }
            else if (el2 && el2.number === el0.number && el1 === '') {
                moved = el2.join(0, i) }
            else if (el2 && el2.number === el1.number) {
                moved = el2.join(1, i) }
            else if (el2 && el1 === '') {
                moved = el2.relocate(1, i) }
        }



        if (moved) {
            window.removeEventListener('keydown',keypress);

            setTimeout(newtail, time);
        }
    }

    const right = () => {
        let moved = false;
        for (let i = 0; i<3;i++ ){
            let el0 = bx[i][0];
            let el1 = bx[i][1];
            let el2 = bx[i][2];

            if(el1 && el1.number===el2.number){

                moved = el1.join(i,2);
                if(el1.number === el0.number){
                    el0.relocate(i,1)}

            }
            else if(el1 && el2===''){
                moved = el1.relocate(i,2)}
        }
        for (let i=0; i<3; i++){
            let el0 = bx[i][0];
            let el1 = bx[i][1];
            let el2 = bx[i][2];
            if(el0 && el1==='' && el2===''){
                moved = el0.relocate(i,2)}
            else if(el0 && el0.number === el2.number && el1===''){
                moved = el0.join(i,2)}
            else if(el0 && el0.number === el1.number) {
                moved = el0.join(i,1)}
            else if(el0 && el1==='') {
                moved = el0.relocate(i,1)}
        }

        if (moved) {
            window.removeEventListener('keydown',keypress);

            setTimeout(newtail, time);
        }
    }

    const left = () => {
        let moved = false;

        for (let i = 0; i < 3; i++) {
            let el1 = bx[i][1];
            let el0 = bx[i][0];
            let el2 = bx[i][2];
            if (el1 && el1.number === el0.number) {

                moved = el1.join(i, 0);
                if(el1.number === el0.number){
                    el2.relocate(i,1)}
            }
            else if (el1 && el0 === '') {
                moved = el1.relocate(i, 0) }
        }
        for (let i = 0; i < 3; i++) {
            let el0 = bx[i][0];
            let el1 = bx[i][1];
            let el2 = bx[i][2];

            if (el2 && el1 === '' && el0 === '') {
                moved = el2.relocate(i, 0) }
            else if (el2 && el2.number === el0.number && el1 === '') {
                moved = el2.join(i, 0) }
            else if (el2 && el2.number === el1.number) {
                moved = el2.join(i, 1) }
            else if (el2 && el1 === '') {
                moved = el2.relocate(i, 1) }
        }



        if (moved) {
            window.removeEventListener('keydown',keypress);
            setTimeout(newtail, time);
        }
    }

    const moveit = key => {
        if (key === 83 || key === 40) {  //down
            down();

        } else if (key === 87 || key === 38) { //up
            up();

        } else if (key === 68 || key === 39) { //right
            right();

        } else if (key === 65 || key === 37) { //left
            left();

        }
    }

    let keypress = e => {

        moveit(e.keyCode);

    }



    // var pointx, pointy, pointsx, pointsy;

    // window.addEventListener('touchstart', e => {

    //     var touchobj = e.changedTouches[0];

    //     pointx = touchobj.pageX;
    //     pointy = touchobj.pageY;


    // }, false);

    window.addEventListener('touchmove', ev => {
        if (window) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
        }

    }, { passive: false });


    // window.addEventListener('touchend', e => {
    //     var touchobj = e.changedTouches[0];

    //     pointsx = touchobj.pageX;
    //     pointsy = touchobj.pageY;
    //     var axlex = pointsx - pointx;
    //     var axley = pointsy - pointy;

    //     if (Math.abs(axlex) + Math.abs(axley) > 50) {

    //         if (((axlex >= 0) && (axley > 0) && (axley > axlex)) || ((axlex <= 0) && (axley > 0) && (axley > -axlex))) {
    //             movedown();
    //         } else if (((axlex >= 0) && (axley < 0) && (-axley > axlex)) || ((axlex <= 0) && (axley < 0) && (axley < axlex))) {
    //             moveup();
    //         } else if (((axlex > 0) && (axley >= 0) && (axlex > axley)) || ((axlex > 0) && (axley <= 0) && (-axley < axlex))) {
    //             moveright();
    //         } else { moveleft(); }
    //     }

    // }, false)

});
