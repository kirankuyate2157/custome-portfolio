import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { getUserData, GoogleAuth, login, logout } from './../services/firebaseConfig.js';

const Trynow = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    uid: '',
    profileImage: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  useEffect(() => {
    // Check the user's authentication status when the component loads
    const checkAuthStatus = async () => {
      const user = getUserData();
      if (user) {
        // User is authenticated
        setIsAuthenticated(true);
        setUserName(user.displayName || user.email);
      }
    };

    checkAuthStatus();
  }, []);

  const handleChange = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!userData.email) {
      alert('Email is required!');
    }
    if (!userData.password) {
      alert('Password is required!');
    }

    try {
      const status = await login(userData.email, userData.password);
      if (status) {
        alert('Login successful!');
        const user = getUserData();
        setIsAuthenticated(true);
        setUserName(user.displayName || user.email);
        setShowLogoutDropdown(false);

        // Store user data in local storage
        localStorage.setItem('userDataP', JSON.stringify(user));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await GoogleAuth();
      alert('Login successful with Google!');
      const user = getUserData();
      setIsAuthenticated(true);
      setUserName(user.displayName || user.email);
      setShowLogoutDropdown(false);

      // Store user data in local storage
      localStorage.setItem('userDataP', JSON.stringify(user));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    // Perform logout actions here
    logout();
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className= {`${showLogoutDropdown?"relative flex flex-col justify-between":""}`}>
          <motion.div
            className={`bg-blue-700 px-4 hover:bg-primary cursor-pointer rounded-md py-1 sm:ml-0 ml-5 text-sm text-center items-center text-white `}
            onClick={()=>{  setShowLogoutDropdown(!showLogoutDropdown),
                setTimeout( ()=>{
                  setShowLogoutDropdown(false)
              },3000)}
            }
            >
            {userName.split(' ')[0]}
          </motion.div>
          {showLogoutDropdown && (
            <div className='p-1
            py-3 rounded-lg bg-yellow-200 text-lg fixed text-black z-50 '>
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
