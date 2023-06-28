

  // Import the functions you need from the SDKs you need

import * as firebaseApp from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import * as firebaseDatabase from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

//   const firebaseConfig = {

//     apiKey: "AIzaSyC-UxCx4bRKK3MXRlBXgmGzz5H6kxybs9E",

//     authDomain: "herohunter-27d7b.firebaseapp.com",

//     databaseURL: "https://herohunter-27d7b-default-rtdb.firebaseio.com",

//     projectId: "herohunter-27d7b",

//     storageBucket: "herohunter-27d7b.appspot.com",

//     messagingSenderId: "644428061813",

//     appId: "1:644428061813:web:a2032fd0cf4584df73ec3c"

// };

const firebaseConfig = {

  apiKey: "AIzaSyAPBxGG8LF9f3i6v2vpNOZreCPeq_iHtf8",

  authDomain: "fir-projects-91967.firebaseapp.com",

  databaseURL: "https://fir-projects-91967-default-rtdb.firebaseio.com",

  projectId: "fir-projects-91967",

  storageBucket: "fir-projects-91967.appspot.com",

  messagingSenderId: "731921586791",

  appId: "1:731921586791:web:a01513d5685a89aa6252c2"

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