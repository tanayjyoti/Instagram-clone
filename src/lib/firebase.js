import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA5Z8RaCGnImCbN-i6r2cnDqC3_VfuqQx4",
  authDomain: "instagram-clone-firebase-daede.firebaseapp.com",
  projectId: "instagram-clone-firebase-daede",
  storageBucket: "instagram-clone-firebase-daede.appspot.com",
  messagingSenderId: "13285699396",
  appId: "1:13285699396:web:562ff589c34698acec3111",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here we will call the seed.js file but only once
//seedDatabase(firebase);

export { firebase, FieldValue };
