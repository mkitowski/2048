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