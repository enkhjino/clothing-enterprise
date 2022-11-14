import { initializeApp} from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QuerySnapshot  } from 'firebase/firestore'

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
const googleProvider = new GoogleAuthProvider();


googleProvider.setCustomParameters({
    promp: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()]=items;
    return acc;
  }, {})
  return categoryMap;
}
export const createUserDocumentFromAuth = async (userAuth, additionalInformation= {}) => {
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
            createdAt,
            ...additionalInformation

        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);