import { initializeApp} from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
}
    from 'firebase/auth'
    import {
      getFirestore,
      doc,
      getDoc,
      setDoc
    } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvztMRB3hc6IJTgWXoJhierX3thjv0yk0",
    authDomain: "mccrown-clothing-db.firebaseapp.com",
    projectId: "mccrown-clothing-db",
    storageBucket: "mccrown-clothing-db.appspot.com",
    messagingSenderId: "742002173002",
    appId: "1:742002173002:web:1114b9a4dfedcbc5daf2b3"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth= getAuth();
  export const signInWithGooglePopup = () =>signInWithPopup(auth,provider)

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid )

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
  }

  