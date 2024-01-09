import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image"
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import {
  getUserData,
  GoogleAuth,
  login,
} from "../../services/firebaseConfig.js";

import  logo1 from "../../../public/images/profile/logo1.png";

export default function Login() {
  const [log, setLog] = useState();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const Submit = (e) => {
    e.preventDefault();

    if (!userData.email) {
      alert("Email is required !");
    }
    if (!userData.password) {
      alert("Password is required !");
    }

    const status = login(userData.email, userData.password);
    if (status) {
      alert("Login successful!");
      const dt = getUserData();
      console.log("Aouth usr : ", dt);
      router.push("/k");
    }
    const data = getUserData();
    setLog(data);

    console.log("loging usr : ", data);
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    console.log(" google Login...")
    try {
      await GoogleAuth();
      alert("Login successful with Google!");
      const user = getUserData();
      localStorage.setItem("userDataP", JSON.stringify(user));
      // Redirect to the home page or desired URL after successful login
      router.push("/k");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <Head>
    <title> Kways</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <link rel='icon' href='/favicon.ico' />
  </Head>
  <main    className=' min-h-[100vh] bg-[#151829] '
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #960443, #7c134d, #601d50, #44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829, #151829)",
          }}>
      <div className='flex flex-row w-full sm:p-0  p-20 text-black justify-center  align-middle'>
        <div className='inline-block w-full max-w-md md:p-6 md:my-8  text-left align-middle transition-all transform  shadow-sm rounded-2xl'>
          <div className=' flex flex-col w-full relative'>
          <div
              className='absolute z-[1] w-[60%] h-[60%]  rounded-full opacity-40 bottom-40'
              style={{
                background: "linear-gradient(90deg, #601d50 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
            <div className='  items-center  flex flex-col gap-3 mb-5   '>
            
              <div>
                <Image src={logo1} alt='nari logo' className='h-48 w-48 rounded-full ' />
              </div>
            </div>
            {/* <div className='mb-2  items-center  flex flex-col  '>
              <div>
                <img src={nariName} alt='nari logo' className='h-12' />
              </div>
            </div> */}

            <form className='flex flex-col gap-3'>
              <div className=' w-full flex flex-col gap-2'>
                
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={userData.email}
                  onChange={handleChange}
                  placeholder='email..'
                  className='w-full border border-bcc-500 px-3 py-2 rounded-xl focus:outline-none focus:border-zomato-500'
                />
              </div>
              <div className=' w-full flex flex-col gap-2'>
                <input
                  type='password'
                  id='password'
                  placeholder='password..'
                  value={userData.password}
                  onChange={handleChange}
                  name='password'
                  className='w-full border border-bcc-500 px-3 py-2 rounded-xl focus:outline-none focus:border-zomato-500'
                />
              </div>
              <div
                className='w-full  text-center bg-bcc-500 text-white border border-gray-500  hover:bg-bcc-700 py-2 rounded-xl'
              >
                Sign In
              </div>
              <button
                onClick={(e) => googleLogin(e)}
                className='py-2 justify-center   bg-bcc-500 text-white rounded-xl flex items-center gap-2 w-full border border-bcc-500  hover:bg-bcc-700'
              >
                <FcGoogle className='bg-transparent' />
                Login With Google
              </button>
              <p className='py-1 flex justify-center  items-center gap-2 w-full md:text-[0.6rem] text-xs text-pink-200'
        >please use Google auth email,password disabled for testing purposes</p>
            </form>
          </div>
        </div>
      </div>
      </main>
    </>
  );
}