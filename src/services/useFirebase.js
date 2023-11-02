

import { auth, db } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';

async function getCitiesData() {
  try {
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error getting cities data:", error);
  }
}

const addDataToFirebase = async (data) => {
  // Listen for authentication state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userUid = user.uid; // Unique user ID

      // Reference the Firestore document with the user's unique ID
      const userDocRef = doc(db, 'User_portfolio_data', userUid);

      try {
        // Set or update the Firestore document
        await setDoc(userDocRef, data);
        console.log('Data added/updated in Firestore');
      } catch (error) {
        console.error('Error adding/updating data: ', error);
      }
    } else {
      console.log('user not loging !')
    }
  });
};
export { addDataToFirebase };
