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


}

export { Db };