import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getUserData,
  GoogleAuth,
  login,
  logout,
} from "./../services/firebaseConfig.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import dummyPortfolioData from "../assets/portfolioData.js";
const Trynow = () => {
  const [userData, setUserData] = useState({
    email: "",
    displayName: "",
    password: "",
    uid: "",
    profileImage: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userDataP");
    const user = storedUserData ? JSON.parse(storedUserData) : null;

    if (user) {
      setUserData(user);
      setIsAuthenticated(true);
      setUserName(user.displayName || user.email);
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  }, [userName, isAuthenticated]);

  const db = getFirestore();

  const findUser = async (userRef) => {
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.data();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userData && userData.uid) {
        const userRef = doc(db, "Users", userData.uid);

        if (userRef) {
          const profileData = await findUser(userRef);
          if (!profileData) {
            const randomChars = Math.random().toString(36).substring(2, 5);
            const username = `${userData.displayName.replace(
              /\s/g,
              ""
            )}-${randomChars}`;
            const newUserData = {
              profileData: {
                name: userData.displayName,
                username: username,
                email: userData.email,
                profileLink: `http://localhost:3000/id/${username}`,
                editLimit: 2,
                visibility: true,
                portfolioImg: "",
                views: 0,
                likes: 0,
              },
            };
            // Create a new document with the user ID as the document ID
            let portfolioRef = doc(db, "User_portfolio_data", userData.uid);
            let done = await setDoc(userRef, newUserData);
            let done2 = await setDoc(portfolioRef, dummyPortfolioData);
            if (done) console.log("user created successfully");
            if (done2) console.log("portfolio  created successfully");
          }
        }
      }
    };

    fetchData();
  }, [userData, userName]);

  // -------------------  handlers--------------------------
  const handleChange = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      alert("Email and password are required!");
      return; // Add return statement to exit the function if validation fails
    }

    try {
      const status = await login(userData.email, userData.password);
      if (status) {
        alert("Login successful!");
        const user = getUserData();
        setIsAuthenticated(true);
        setUserName(user.displayName || user.email);
        setShowLogoutDropdown(false);

        // Store user data in local storage
        localStorage.setItem("userDataP", JSON.stringify(user));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleAuth();
      const user = getUserData();

      setIsAuthenticated(true);
      setUserData(user);
      setUserName(user.displayName || user.email);
      setShowLogoutDropdown(false);

      // Store user data in local storage
      localStorage.setItem("userDataP", JSON.stringify(user));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    // Perform logout actions here
    logout();
    // Clear user data from local storage
    localStorage.removeItem("userDataP");
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div
          className={`${
            showLogoutDropdown ? "relative flex flex-col justify-between" : ""
          }`}
        >
          <motion.div
            className={`bg-blue-700 px-4 hover:bg-primary cursor-pointer rounded-md py-1 sm:ml-0 ml-5 text-sm text-center items-center text-white `}
            onClick={() => {
              setShowLogoutDropdown(!showLogoutDropdown),
                setTimeout(() => {
                  setShowLogoutDropdown(false);
                }, 3000);
            }}
          >
            {userName.split(" ")[0]}
          </motion.div>
          {showLogoutDropdown && (
            <div
              className='p-1
            py-3 rounded-lg bg-yellow-200 text-lg fixed text-black z-50 '
            >
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          className='bg-blue-700 px-4 hover:bg-primary cursor-pointer rounded-md py-1 sm:ml-0 ml-5 text-sm text-center items-center text-white'
          whileInView={{
            backgroundColor: [
              "#121212",
              "rgba(131,58,180,1)",
              "rgba(253,29,29,1)",
              "rgba(252,176,69,1)",
              "rgba(131,58,180,1)",
              "#121212",
            ],
            transition: { duration: 1, repeat: Infinity },
          }}
          onClick={() => {
            googleLogin();
            setShowLogoutDropdown(false);
          }}
        >
          Try now!
        </motion.div>
      )}
    </div>
  );
};

export default Trynow;
