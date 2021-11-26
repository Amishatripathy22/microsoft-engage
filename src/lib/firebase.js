//Initialize firebase configurations for login/signup authentication and storage facilities

import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyCZs3-oZ4oQR4VQSwu7QYZ874MvgPVnH7s",
  authDomain: "engage-a221a.firebaseapp.com",
  projectId: "engage-a221a",
  storageBucket: "engage-a221a.appspot.com",
  messagingSenderId: "1074864973643",
  appId: "1:1074864973643:web:690ca2aa265f25227caace"
};



  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const database = firebase.database();
  const provider = new firebase.auth.GoogleAuthProvider();
  const providerGit = new firebase.auth.GithubAuthProvider();
  //const providerEmail = new firebase.auth.createUserWithEmailAndPassword();
  const providerMicrosoft = new firebase.auth.OAuthProvider('microsoft.com');
  const storage = firebase.storage();
  
  export { auth, database, provider, providerGit, providerMicrosoft, storage };
  export default db;