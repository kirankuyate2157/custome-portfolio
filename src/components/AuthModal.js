import { Fragment, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuth, register } from "../services/firebaseConfig";

export default function AuthModal() {
  const [log, setLog] = useState();
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  // const navigate = useNavigate();

  const handleChange = (e) =>
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const googleLogin = async (e) => {
    e.preventDefault();
    try {
      await GoogleAuth();
      alert("Login successful with Google!");
      // Redirect to the home page or desired URL after successful login
      // navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password || !userData.userName) {
      alert("Please fill all the required fields.");
    } else if (userData.password.length < 8) {
      alert("Password must be at least 8 characters.");
    } else {
      try {
        await register(userData.email, userData.password, userData.userName);
        alert("Account created successfully!");
        // navigate("/signin");
      } catch (error) {
        alert(error.message);
      }
    }

    setUserData({
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {false && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white w-96 p-6 rounded-lg shadow-lg'>
            <div className='mb-4 text-center'>
              <h2 className='text-2xl font-semibold'>Sign In / Sign Up</h2>
            </div>
            <div className='flex flex-col gap-3'>
              <button
                onClick={googleLogin}
                className='flex items-center justify-center gap-2 py-2 rounded-lg bg-white border border-gray-400 hover:bg-gray-100'
              >
                Sign in with Google <FcGoogle />
              </button>
              <button
                onClick={googleLogin}
                className='flex items-center justify-center gap-2 py-2 rounded-lg bg-white border border-gray-400 hover:bg-gray-100'
              >
                Sign Up with Google <FcGoogle />
              </button>
              {/* Add your sign-up and sign-in forms here */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
