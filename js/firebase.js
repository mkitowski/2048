var config = {
    apiKey: "AIzaSyDYxBVHNFeaTZgR0o09BvoZkQ0Ugy9zuME",
    authDomain: "project-6559579986434785633.firebaseapp.com",
    databaseURL: "https://project-6559579986434785633.firebaseio.com",
    projectId: "project-6559579986434785633",
    storageBucket: "project-6559579986434785633.appspot.com",
    messagingSenderId: "804477883843"
};
firebase.initializeApp(config);

let db = firebase.firestore();
const docRef = db.doc("2048/database");

docRef.get().then((doc) =>{
  
   let users = doc.data().Users;
   for (let i in users) {
       console.log(users[i].Name);
   }
  
});



const signin = $('#sign-up');
const message = $('.message');
const close = $('#close');
let email, password;

close.on('click', () => message.removeClass('active'));

signin.click ( () => {
    message.addClass('active');
    let h2 = $('<h2>').text('Register');
    let login = $('<div>',{class: 'login'} );
    let label1 = $('<label>').text('Your email address');
    let input1 = $('<input>').attr('type','email').attr('placeholder','your@email.2048');
    let label2 = $('<label>').text('Your password');
    let input2 = $('<input>').attr('type', 'password').attr('placeholder', 'your new password');
    let label3 = $('<label>').text('Re-type your password');
    let input3 = $('<input>').attr('type', 'password').attr('placeholder', 'your new password again');
    let btn = $('<button>').text('Create account');
    console.log(login);
    login.append(label1).append(input1).append(label2).append(input2).append(label3).append(input3).append(btn);

    message.append(h2).append(login);
});
