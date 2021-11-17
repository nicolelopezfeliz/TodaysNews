import {FirebaseApp, initializeApp} from 'firebase/app';
import {getDatabase, set, ref, onValue, DataSnapshot, Unsubscribe as UnsubscribeRTD, update} from 'firebase/database'
import { setDoc, doc, getFirestore, Unsubscribe as UnsubscribeFS, onSnapshot} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateCurrentUser, User, signInWithEmailAndPassword, UserCredential} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCWdhOPuy9cMSAQHmakV69xCjY-95kIyxk",
    authDomain: "todaysnews-24efa.firebaseapp.com",
    databaseURL: "https://todaysnews-24efa-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todaysnews-24efa",
    storageBucket: "todaysnews-24efa.appspot.com",
    messagingSenderId: "290182260059",
    appId: "1:290182260059:web:426c9a47d744de88a4e67e",
    measurementId: "G-KSXB786C73"
  };

  //initializes app with firebase
  let app: FirebaseApp;
  export const fbInit = () => {
    app = initializeApp(firebaseConfig);
    console.log(app)
  }

  export const setAmountOfClicks = (userId: string, amountOfClicks: number) => {
    const db = getDatabase();
    const referance = ref(db, "user/" + userId);
    set(referance, {
      userId: userId,
      amountOfClicks: amountOfClicks
    });
  }

  export const getData = (
    userId: string, 
    callback: (amountOfClicks: number) => void
    ): UnsubscribeRTD => {
    const db = getDatabase();
    const referance = ref(db, "user/" + userId);
    return onValue(referance, (snapshot) => {
      try {
        callback(snapshot.val().amountOfClicks)
        //console.log(snapshot.val().amountOfClicks)
      } catch (error) {
        setAmountOfClicks(userId, 0)
      }
    })
  }

  export const setAmountOfClicksFireStore = (userId: string, amountOfClicks: number) => {
    const db = getFirestore();
    setDoc(doc(db, "users", userId), {amountOfClicks: amountOfClicks});
  }

  export const subscribeUserFS = (
    userId: string, 
    callback: (amountOfClicks: number) => void
    ): UnsubscribeFS => {
    const db = getFirestore();
    return onSnapshot(doc(db, "users", userId), (snapshot) => {
      const data = snapshot.data() as {amountOfClicks: number}
      callback(data.amountOfClicks)
    });
  }

  export const registerUserFirebase = async (firstName: string, lastname: string, email: string, password: string): Promise<UserCredential> => {
    const auth = getAuth();
    const createUserResponse = await createUserWithEmailAndPassword(auth, email, password);
    const newUser: User = {
      ...createUserResponse.user, 
      displayName: firstName + ' ' + lastname
    };

    newUser.email;

    await updateCurrentUser(auth, newUser);
    return createUserResponse;
  };

  export const logInToFirebase = async (email: string, password: string): Promise<UserCredential | undefined> => {
    const auth = getAuth();

    try {

      const credentialUser = await signInWithEmailAndPassword(auth, email, password);
      return credentialUser;

    } catch (error) {
      
      return undefined;

    }
  };