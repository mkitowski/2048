var config = {
    apiKey: "AIzaSyDYxBVHNFeaTZgR0o09BvoZkQ0Ugy9zuME",
    authDomain: "project-6559579986434785633.firebaseapp.com",
    databaseURL: "https://project-6559579986434785633.firebaseio.com",
    projectId: "project-6559579986434785633",
    storageBucket: "project-6559579986434785633.appspot.com",
    messagingSenderId: "804477883843"
};
firebase.initializeApp(config);




//classes

class Db {
    constructor (path) {
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

    getInstructions() {
        return this.connect(this.path).get()
        .then( e => {
            let instruction = e.data().Instructions;
            // console.log(instruction.language);
            return instruction;
        })
    }


}

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
        this.eks.onclick = e => {
            this.win.classList.remove('active');

            if (form != null) {
                this.win.removeChild(form);
            }

            if (div != null) {
                this.win.removeChild(div);
            }
        }
    }
    closeWindow() {
        const form = document.querySelector('.message form');
        const div = document.querySelector('.message .instruction');
        this.win.classList.remove('active');
        if (form != null) {
            this.win.removeChild(form);
        }
        if (div != null) {
            this.win.removeChild(div);
        }
    }
}

//definitions
let verified = false;
let register = new SignUp();
let userprofile = new User();
let databaseurl = '2048/database';
let database = new Db(databaseurl);
let btn;
const meswin = document.querySelector('.message');
const eks = document.querySelector('#close');
const closemessage = new CloseWindow(meswin, eks);

let inst;

database.getInstructions().then(e => inst = e);


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



//HTML elements
const signup = document.querySelector('.sign-up');
const signin = document.querySelector('.sign-in');
const instruction = document.querySelector('#inst');

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
const regProcces = e => {

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

instruction.onclick = e => {
    if (meswin.className === 'message active') {
        closemessage.closeWindow();
    }
    meswin.classList.add('active');
    const div = document.createElement('div');
    div.classList.add('instruction');
    div.innerHTML = inst.EN;
    meswin.appendChild(div);
    closemessage.closeWindowEvent();
}