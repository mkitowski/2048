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

    connect (path) {
        const db = firebase.firestore();
        const docRef = db.doc(path);
        return docRef;
    }

    exist (name, path) {

        return this.connect(path).get()
            .then(querySnapshot => {
                console.log(querySnapshot.data().Users);
                let users = querySnapshot.data().Users;
                if (users.indexOf(name) > -1) {
                    userexists = true;
                    return userexists;

                } else {
                    console.log(users.indexOf(name));
                    return false;
                }
            })
            .catch(e => {
                console.log(e);
            })

    }
}

class SignIn {
    constructor(name, email, pass) {
        this.name = name,
        this.email = email,
        this.pass = pass
    }
    verifyName (el, databaseulr) {
        let message;
        let ready= true;
        // let db = firebase.firestore();
        // const docRef = db.doc("2048/database");

        // docRef.get().then((doc) =>{

        // let users = doc.data().Users;
        // for (let i in users) {
        //      console.log(users[i].Name);
        // }
        el.addEventListener('keyup',() =>{
            message = 'Checking...';
            setTimeout(() => {
                if (el.value.length < 5) {
                    message += 'You need at least '+(5 - el.value.length)+' signs';
                    ready =false;
                }
                if (database.exists(el.value, databaseurl).than( e => e)) {
                    message += 'User name already exist';
                    ready = false
                }
            }, 500);

        });
        return {
            mess: message,
            confirmed: ready
        }
    }
}




let sigin = new SignIn();
let databaseurl = '2048/database';
let database = new Db();


let a = database.exist('kytek', databaseurl);

a.then(e => console.log(e) );



//HTML elements
const signup = document.querySelector('.sign-up');

//events
signup.onclick = e => {
    console.log('klikles');
}



// let db = firebase.firestore();
// const docRef = db.doc("2048/database");

// docRef.get().then((doc) =>{

//    let users = doc.data().Users;
//    for (let i in users) {
//        console.log(users[i].Name);
//    }

// });

// class Users {
//     constructor(name, email) {
//         this.uname = name,
//         this.uemail = email
//     }
//     get changename() {
//         return this.named();
//     }
//     named(el) {
//         el.text(this.uname);
//         console.log(el);
//     }
// }



// const message = $('.message');
// const close = $('#close');
// let email, password;

// const closeWindow = () => {
//     close.on('click', () => { //ZAMKNIECIE OKNA
//         message.removeClass('active');
//         $('.login').remove();
//     });
// }

// const logged = () => {
//     let signup = $('.sign-up');
//     let signin = $('.sign-in');
//     signup.text('Sign-off').removeClass('sign-up').addClass('sign-off');
//     signin.removeClass('sign-in').addClass('profile');
// }

// const registration = () =>{

//     let signup = $('.sign-up');

//     signup.click ( () => { //OTWARCIE OKNA REJESTRACJI
//         message.addClass('active');
//         const h2 = $('<h2>').text('Register');
//         const login = $('<form>',{class: 'login'} );
//         const label = $('<label>').text('Username:');
//         const input = $('<input>', {class: 'name'}).attr('type','text').attr('placeholder','Your name');
//         const label1 = $('<label>', {class: 'l-email'}).text('Your email address:');
//         const input1 = $('<input>', {class: 'email'}).attr('type','email').attr('placeholder','your@email.2048');
//         const label2 = $('<label>', {class: 'l-pass'}).text('Your password:');
//         const input2 = $('<input>', {class: 'password1'}).attr('type', 'password').attr('placeholder', 'your new password');
//         const label3 = $('<label>').text('Re-type your password:');
//         const input3 = $('<input>', {class: 'password2'}).attr('type', 'password').attr('placeholder', 'your new password again');
//         const btn = $('<button>',{class: 'register'}).text('Create account');

//         login.append(h2)
//             .append(label).append(input)
//             .append(label1).append(input1)
//             .append(label2).append(input2)
//             .append(label3).append(input3)
//             .append(btn);
//         message.append(login);
//     }); //Registration window

//     message.on('click', '.register', e => { //PROCES REJESTRACJI
//         e.preventDefault();
//         const email = document.querySelector('.email').value;
//         const pass1 = $('.password1').val();
//         const pass2 = $('.password2').val();
//         const name = $(".name").val();
//         const label1 = $('.l-email');
//         const label2 = $('.l-pass');

//         let acceptable = true;

//         if (email.indexOf('@')<0) {
//             acceptable = false;
//             label1.text('Podaj poprawny email');
//         }else {
//             label1.text('email ok');
//         }
//         if (email.indexOf('.')<0) {
//             acceptable = false;
//             label1.text('Podaj poprawny email');
//         } else {
//             label1.text('email ok');
//         }
//         if (pass1 !== pass2) {
//             acceptable = false;
//             label2.text('Hasła nie zgadzają się')
//         } else {
//             label2.text('hasło ok');
//         }
//         if (pass1.length < 5) {
//             acceptable = false;
//             label2.text('Hasło powinno mieć przynajmniej 6 znaków')
//         } else {
//             label2.text('hasło ok');
//         }

//         if (acceptable) {

//             let user = null;
//             firebase.auth().createUserWithEmailAndPassword(email, pass1)
//                 .then(() => {
//                     user = firebase.auth().currentUser;

//                 }).then(() => {
//                 user.updateProfile({
//                     displayName: name
//                 });
//                 logged();
//                 let newuser = new Users(name, email);
//                 newuser.changename($('.sign-in'));
//                 message.removeClass('active');
//                 $('.login').remove();
//             })
//                 .catch( error => {
//                     // Handle Errors here.
//                     var errorCode = error.code;
//                     var errorMessage = error.message;
//                     console.log(errorCode);
//                     console.log(errorMessage);
//                 });
//         }
//     }); //registration proccess
// }

// const log = () => {

//     let signin = $('.sign-in');
//     signin.click ( () => { //OTWARCIE OKNA LOGOWANIA
//         message.addClass('active');
//         const h2 = $('<h2>').text('Sign in');
//         const login = $('<form>',{class: 'login'} );
//         const input = $('<input>', {class: 'name'}).attr('type','text').attr('placeholder','Your name');
//         const label1 = $('<label>', {class: 'l-email'}).text('Your email address');
//         const input1 = $('<input>', {class: 'email'}).attr('type','email').attr('placeholder','your@email.2048');
//         const label2 = $('<label>', {class: 'l-pass'}).text('Your password');
//         const input2 = $('<input>', {class: 'password'}).attr('type', 'password').attr('placeholder', 'your new password');
//         const btn = $('<button>',{class: 'log-in'}).text('Sign-in');
//         console.log(login);
//         login.append(h2)
//             .append(label1).append(input1)
//             .append(label2).append(input2)
//             .append(btn);
//         message.append(login);
//     });

//     message.on('click', '.log-in', e => { //PROCES LOGOWANIA
//         e.preventDefault();
//         const email = document.querySelector('.email').value;
//         const pass = $('.password').val();

//         firebase.auth().signInWithEmailAndPassword(email, pass)
//             .catch(function(error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 window.alert(errorCode + errorMessage);

//             }).then(() => {
//             message.removeClass('active');
//             $('.login').remove();

//         });

//     });

// }

// const signOff = () => {
//     const navbar = $('.users');
//     navbar.on('click', '.sign-off', e => {
//         firebase.auth().signOut().then(() => {
//             window.alert('Do zobaczenia!');
//             const logout = $('.sign-off');
//             const prof = $('.profile');
//             setTimeout(() => {
//                 logout.text('Sign-up').addClass('sign-up').removeClass('sign-off');
//                 prof.text('Sign-in').addClass('sign-in').removeClass('profile');
//             }, 300);
//         }, function (error) {
//             window.alert('Coś poszło nie tak');
//         });
//     })

// }



// window.onload = ev => {
//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             // User is signed in.
//             var dispName = user.displayName;
//             var email = user.email;
//             var emailVerified = user.emailVerified;
//             let signup = $('.sign-up');
//             let signin = $('.sign-in');

//             signup.text('Sign-off').removeClass('sign-up').addClass('sign-off');
//             signin.text(dispName).removeClass('sign-in').addClass('profile');


//         } else {
//             // User is signed out.
//             // ...

//         }
//     });
// };

// registration();
// log();
// closeWindow();
// signOff();


