import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANyeEhKnXwF8rKvlgb3wpaYUGNZY7ap3I",
  authDomain: "nari-376818.firebaseapp.com",
  projectId: "nari-376818",
  storageBucket: "nari-376818.appspot.com",
  messagingSenderId: "679667160213",
  appId: "1:679667160213:web:ba914ebd496391097df79c",
  measurementId: "G-S0RDGLYE5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
const register = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    );
    // You can save additional user data (e.g., name) to Firestore or Realtime Database here
    // ...
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserData = () => {
  const user = auth.currentUser;
  if (user) {
    const { uid, displayName, email, photoURL } = user;
    // uid: The unique user ID
    // displayName: The display name of the user (if set)
    // email: The email address of the user (if available)
    // photoURL: The URL of the user's profile photo (if available)
    return { uid, displayName, email, photoURL };
  } else {
    // User not logged in
    if (typeof window !== 'undefined' && window.localStorage) {
    const storedUserData = localStorage.getItem("userDataP");
    const user2 = storedUserData ? JSON.parse(storedUserData) : null;
    return user2;}
    else{
      return null;
    }
  }
};
const usr = getUserData();

const getCurrentUserId = () => {
  const usr = getUserData();

  if (usr && usr.uid) {
    return usr.uid;
  } else {
    return null; // or throw an error, depending on your application logic
  }
};
//uplode files
const uploadFile = async (file, path, imageName) => {
  const storageRef = ref(storage, `${path}/${imageName}`);
  await uploadBytes(storageRef, file);
  console.log(`Upload ...$`);
  const url = await getDownloadURL(storageRef);
  return url;
};

// console.log("user data : ", usr);
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    // throw new Error(error.message);
    console.log("logout error : ", error.message);
  }
};
const GoogleAuth = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export {
  auth,
  db,
  storage,
  uploadFile,
  getUserData,
  getCurrentUserId,
  register,
  login,
  logout,
  GoogleAuth,
};
