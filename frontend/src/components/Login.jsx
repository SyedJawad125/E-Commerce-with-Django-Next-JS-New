// import React, { useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { AuthContext } from "@/components/AuthContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Correct import for Google icon
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const router = useRouter();
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const payload = { email, password };
//       const response = await AxiosInstance.post('/user/login', payload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         const { token, permissions, role } = response.data.data;
//         login(token, permissions, role);
//         router.push("/admindashboard");
//       }
//     } catch (error) {
//       toast.error("Your email or password is incorrect", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       console.error('Login error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignup = () => {
//     router.push("/signup");
//   };

//   const handleForgetpassword = () => {
//     router.push("/forgetpassword");
//   };

//   const handleGooglelogin = () => {
//     router.push("/googlelogin");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
//       <ToastContainer />
//       <div className="w-full max-w-md">
//         <div className="bg-white shadow-xl rounded-xl overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
//             <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
//             <p className="text-blue-100 mt-2">Sign in to access your account</p>
//           </div>
          
//           {/* Form Section */}
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Email Address</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"
//                     className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
//                     required
//                   />
//                 </div>
//               </div>
              
//               {/* Password Field */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     <FontAwesomeIcon 
//                       icon={showPassword ? faEyeSlash : faEye} 
//                       className="h-5 w-5 text-gray-500 hover:text-gray-700" 
//                     />
//                   </button>
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={handleForgetpassword}
//                     className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//               </div>
              
//               {/* Login Button */}
//               <button 
//                 type="submit" 
//                 disabled={isLoading}
//                 className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-semibold ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition shadow-md`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : (
//                   'Login'
//                 )}
//               </button>
//             </form>
            
//             {/* Divider */}
//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Social Login */}
//             <div className="mt-6">
//               <button
//                 onClick={handleGooglelogin}
//                 className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
//               >
//                 <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 text-red-500 mr-2" />
//                 Sign in with Google
//               </button>
//             </div>
            
//             {/* Signup Link */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?{' '}
//                 <button
//                   onClick={handleSignup}
//                   className="font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';
import { AuthContext } from '@/components/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { email, password };
      const response = await AxiosInstance.post('/user/login', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        const { token, permissions, role } = response.data.data;
        login(token, permissions, role);
        router.push('/admindashboard');
      }
    } catch (error) {
      toast.error('Your email or password is incorrect', {
        position: 'top-center',
        autoClose: 3000,
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleForgetpassword = () => {
    router.push('/forgetpassword');
  };

  const handleGooglelogin = () => {
    router.push('/googlelogin');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-2">Sign in to access your account</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-black"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="h-5 w-5 text-gray-500 hover:text-gray-700"
                    />
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgetpassword}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-semibold ${
                  isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } transition shadow-md`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 relative flex justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <span className="relative z-10 bg-white px-2 text-gray-500 text-sm">Or continue with</span>
            </div>

            {/* Google Login */}
            <div className="mt-6">
              <button
                onClick={handleGooglelogin}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                <FontAwesomeIcon icon={faGoogle} className="h-5 w-5 text-red-500 mr-2" />
                Sign in with Google
              </button>
            </div>

            {/* Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <button
                  onClick={handleSignup}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



// import React, { useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { AuthContext } from "@/components/AuthContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const router = useRouter();
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { email, password };
//       const response = await AxiosInstance.post('/user/login', payload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         const { token, permissions, role } = response.data.data;
//         login(token, permissions, role); // Pass token, permissions, and role to the login function
//         router.push("/admindashboard");
//       }
//     } catch (error) {
//       toast.error("Your email or password is incorrect", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       console.error('Login error:', error);
//     }
//   };

//   const handleSignup = () => {
//     router.push("/signup");
//   };

//   const handleForgetpassword = () => {
//     router.push("/forgetpassword");
//   };

//   const handleGooglelogin = () => {
//     router.push("/googlelogin");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-700">
//       <ToastContainer />
//       <div className="w-full max-w-md">
//         <div className="bg-black shadow-md rounded-lg p-8 mt-5">
//           <h3 className="text-center text-2xl font-semibold">Login</h3>
//           <form onSubmit={handleSubmit}>
//             <label className="block text-sm font-medium text-gray-500 mb-2">User Email</label>
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter Email"
//               className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             />
//             <label className="block text-sm font-medium text-gray-500 mt-2 mb-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter Password"
//                 className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               />
//               <span
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-black" />
//               </span>
//             </div>
//             <button type="submit" className="w-full mt-5 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4">
//               Login
//             </button>
//           </form>
//           <div className="flex justify-end mt-4">
//             <button 
//               onClick={handleSignup} 
//               className="w-1/4 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
//               Signup
//             </button>
//           </div>
//           <div className="flex justify-end">
//             <button 
//               onClick={handleGooglelogin} 
//               className="block py-2 px-4 bg-green-700 rounded hover:bg-green-500 text-center cursor-pointer mt-2">
//               Google Login
//             </button>
//           </div>  
//           <div className="flex justify-end">
//             <button 
//               onClick={handleForgetpassword} 
//               className="block py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 text-center cursor-pointer mt-2">
//               Forget Password
//             </button>
//           </div> 
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;