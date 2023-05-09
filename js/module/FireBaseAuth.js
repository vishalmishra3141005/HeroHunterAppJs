

  // Import the functions you need from the SDKs you need

import * as firebaseApp from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import * as firebaseDatabase from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

const firebaseConfig = {



};


  // Initialize Firebase

const app = firebaseApp.initializeApp(firebaseConfig);

const db = firebaseDatabase.getDatabase();

export function addCharacter(charId, characterData) {
    const charRef = firebaseDatabase.ref(db, `characters/${charId}`);
    firebaseDatabase.set(charRef, characterData);
}

export async function removeCharacter(charId) {
    const charRef = firebaseDatabase.ref(db, `characters/${charId}`);
    await firebaseDatabase.remove(charRef);
}

export async function getCharacter(charId) {
    const dbRef = firebaseDatabase.ref(db);
    try {
        let snapshot = await firebaseDatabase.get(firebaseDatabase.child(dbRef, `characters/${charId}`));
        return snapshot.val();
    } catch(err) {
        console.log(err);
        return null;
    }
}

export async function getAllData() {
  const dbRef = firebaseDatabase.ref(db);
  try {
    const snapshot = await firebaseDatabase.get(firebaseDatabase.child(dbRef, `characters/`));
    return snapshot.val();
  } catch(err) {
    throw new Error(err);
  }
}