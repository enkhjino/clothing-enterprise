import { initializeApp} from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBq4ajjf1VFDnnGHnAonAT2OEKFUVveXdo",
    authDomain: "clothing-enterprise-db.firebaseapp.com",
    projectId: "clothing-enterprise-db",
    storageBucket: "clothing-enterprise-db.appspot.com",
    messagingSenderId: "1017517888143",
    appId: "1:1017517888143:web:bc4c14897c5b47af46d6fa",
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    promp: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log("This is user doc ref", userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log("this is the userSnapshot", userSnapshot);
    console.log(userSnapshot.exists());

    //if it doesnt exist, create/set the document with the data from userAuth in my collection
    //if user exists, return

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
};