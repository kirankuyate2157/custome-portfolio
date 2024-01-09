import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, onSnapshot, query, where, doc, getDoc, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
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

// -------------------- updation of data ------------------------------------


// Function to listen for real-time updates of user portfolio data
const listenToUserPortfolioData = (userId, onDataReceived) => {
  const userPortfolioRef = collection(db, "User_portfolio_data");
  const query = userPortfolioRef.where("userId", "==", userId);

  const unsubscribe = onSnapshot(query, (querySnapshot) => {
      const portfolioData = [];
      querySnapshot.forEach((doc) => {
          portfolioData.push({ id: doc.id, ...doc.data() });
      });

      onDataReceived(portfolioData);
  });

  return unsubscribe;
};

// Function to get user portfolio data
const getUserPortfolioData = async (userId) => {
  try {
      const querySnapshot = await getDocs(collection(db, 'User_portfolio_data'));
      let userData = null;

      querySnapshot.forEach((doc) => {
          if (doc.id === userId) {
              userData = doc.data();
          }
      });

      return userData;
  } catch (error) {
      console.error("Error getting user portfolio data:", error);
      return null;
  }
};

// Function to update user portfolio data
const updatePortfolioData = async (userId, updatedData) => {
  const userPortfolioRef = collection(db, 'User_portfolio_data');
  const query = userPortfolioRef.where('userId', '==', userId);

  try {
      const querySnapshot = await getDocs(query);
      if (!querySnapshot.empty) {
          // Assuming there's only one matching document per user
          const docSnapshot = querySnapshot.docs[0];
          const docRef = doc(userPortfolioRef, docSnapshot.id);
          await updateDoc(docRef, updatedData);
          console.log('User portfolio data updated successfully');
          return true;
      }
      return false; // No matching user found
  } catch (error) {
      console.error('Error updating user portfolio data:', error);
      return false;
  }
};

// Function to add a new user portfolio data
const addNewPortfolioData = async (userId, newUserData) => {
  const userPortfolioRef = collection(db, 'User_portfolio_data');
  try {
      const docRef = await addDoc(userPortfolioRef, {
          userId,
          ...newUserData,
      });
      console.log('User portfolio data added successfully with ID: ', docRef.id);
      return docRef.id;
  } catch (error) {
      console.error('Error adding user portfolio data:', error);
      return null;
  }
};

// Function to delete user portfolio data
const deletePortfolioData = async (userId) => {
  const userPortfolioRef = collection(db, 'User_portfolio_data');
  const query = userPortfolioRef.where('userId', '==', userId);

  try {
      const querySnapshot = await getDocs(query);
      if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const docRef = doc(userPortfolioRef, docSnapshot.id);
          await deleteDoc(docRef);
          console.log('User portfolio data deleted successfully');
          return true;
      }
      return false; // No matching user found
  } catch (error) {
      console.error('Error deleting user portfolio data:', error);
      return false;
  }
};
/* ----------------------------------------------------------------------*/
// Update socialLinks data in Firebase Firestore
const updateSocialLinks = async (userId, updatedSocialLinks) => {
  const socialLinksRef = doc(db, 'User_portfolio_data', userId); // Replace "users" with your Firestore collection name
  try {
      await updateDoc(socialLinksRef, { socialLinks: updatedSocialLinks });
      console.log("Social links updated successfully");
  } catch (error) {
      console.error("Error updating social links:", error);
      throw new Error("Failed to update social links");
  }
};
// ------------------ ok -------------------------

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
  listenToUserPortfolioData,
  getUserPortfolioData,
  updatePortfolioData,
  addNewPortfolioData,
  deletePortfolioData,
  updateSocialLinks
};
