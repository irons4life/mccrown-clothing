import {initializeApp} from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
    import {
      getFirestore,
      doc,
      getDoc,
      setDoc
    } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvztMRB3hc6IJTgWXoJhierX3thjv0yk0",
    authDomain: "mccrown-clothing-db.firebaseapp.com",
    projectId: "mccrown-clothing-db",
    storageBucket: "mccrown-clothing-db.appspot.com",
    messagingSenderId: "742002173002",
    appId: "1:742002173002:web:1114b9a4dfedcbc5daf2b3"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth= getAuth();
  export const signInWithGooglePopup = () =>signInWithPopup(auth,provider)

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={
    displayName: 'Mike'
  }) => {

    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid )

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
      const { displayName, email}= userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
    } catch(err){
        console.log("Error creating user", err.message)
      }
    }
    return userDocRef;
  }


  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
  
  return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
  
  return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = () => signOut(auth);

  export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
  }