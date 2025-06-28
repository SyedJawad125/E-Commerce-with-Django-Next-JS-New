// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';

// const Sidebar = () => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Function to determine if a link is active
//   const isActive = (pathname) => router.pathname === pathname;

//   useEffect(() => {
//     // Check authentication status only on the client side
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     router.push('/Login');
//   };

//   const handleChangepassword = () => {
//     router.push("/changepassword");
//   };

//   return (
//     <div className="flex">
//       <div className="w-55 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between fixed top-0 left-0">
//         <div>
//           <h2 className="text-2xl mb-6">Admin Panel</h2>
//           <nav>
//             <Link href="/admindashboard">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/admindashboard') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 Adminpage
//               </div>
//             </Link>
//             <Link href="/employeepage">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/employeepage') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 Employee Record
//               </div>
//             </Link>
//             <Link href="/products">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/products') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 AdminProducts
//               </div>
//             </Link>
//             <Link href="/categories">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/categories') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 AdminCategories
//               </div>
//             </Link>
//             <Link href="/clientselfpage">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/clientselfpage') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 Client Self Detail
//               </div>
//             </Link>
//             <Link href="/">
//               <div className={`block py-2.5 px-4 rounded ${isActive('/') ? 'bg-gray-700' : 'hover:text-red-500 px-3 py-2'}`}>
//                 Public Site
//               </div>
//             </Link>
//           </nav>
//         </div>
//         <div className="space-y-2"> {/* Added space-y-2 to control the gap between elements */}
//           {isAuthenticated ? (
//             <button onClick={logout} className="w-full py-2 px-4 bg-red-600 rounded hover:bg-red-500">
//               Logout
//             </button>
//           ) : (
//             <Link href="/Login">
//               <div className="block py-2 px-4 bg-green-600 rounded hover:bg-green-500 text-center cursor-pointer">
//                 Login
//               </div>
//             </Link>
//           )}
//           <div className="flex justify-end">
//             <button 
//               onClick={handleChangepassword} 
//               className="block py-2 px-4 bg-green-700 rounded hover:bg-green-500 text-center cursor-pointer">
//               Change Password
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';

// const Sidebar = () => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   const isActive = (pathname) => router.pathname === pathname;

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
//     setIsAuthenticated(!!token);
//     setUserRole(role);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setIsAuthenticated(false);
//     router.push('/Login');
//   };

//   const handleChangepassword = () => {
//     router.push("/changepassword");
//   };

//   return (
//     <div className="flex">
//       <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col justify-between fixed top-0 left-0 shadow-xl">
//         <div>
//           <div className="flex items-center mb-8">
//             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
//               Admin Panel
//             </h2>
//           </div>
          
//           <nav className="space-y-2">
//             {userRole !== '10' && (
//               <>
//                 <Link href="/admindashboard">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admindashboard') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                     </svg>
//                     Dashboard
//                   </div>
//                 </Link>
//                 <Link href="/employeepage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/employeepage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                     Employees
//                   </div>
//                 </Link>
//                 <Link href="/products">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     Products
//                   </div>
//                 </Link>
//                 <Link href="/salesproductpage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/salesproductpage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                     Sales
//                   </div>
//                 </Link>
//                 <Link href="/categories">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                     Categories
//                   </div>
//                 </Link>
//                 <Link href="/orderspage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                     Orders
//                   </div>
//                 </Link>
//                 <Link href="/Reviews">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/reviews') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                     Reviews
//                   </div>
//                 </Link>
//               </>
//             )}
//             <Link href="/clientselfpage">
//               <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/clientselfpage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 My Profile
//               </div>
//             </Link>
//             <Link href="/">
//               <div className={`flex items-center py-3 px-4 rounded-lg transition-all duration-150 ${isActive('/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//                 Public Site
//               </div>
//             </Link>
//           </nav>
//         </div>
        
//         <div className="space-y-3">
//           {isAuthenticated ? (
//             <button 
//               onClick={logout} 
//               className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 shadow-md transition-all"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Logout
//             </button>
//           ) : (
//             <Link href="/Login">
//               <div className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:from-green-500 hover:to-green-400 shadow-md transition-all">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                 </svg>
//                 Login
//               </div>
//             </Link>
//           )}
          
//           <button 
//             onClick={handleChangepassword} 
//             className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-md transition-all"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             Change Password
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





// components/AdminSideNavbarCom.tsx
// 'use client'
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';

// const AdminSideNavbarCom = () => {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [theme, setTheme] = useState('dark'); // 'light', 'dark', or 'bw'
  
//   const isActive = (pathname) => router.pathname === pathname;
  
//   const toggleTheme = () => {
//     setTheme(prevTheme => {
//       if (prevTheme === 'dark') return 'bw';
//       if (prevTheme === 'bw') return 'light';
//       return 'dark';
//     });
//   };

//   useEffect(() => {
//     // Apply theme class to body for global styling
//     document.body.className = theme;
//     // Save theme preference to localStorage
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   useEffect(() => {
//     // Initialize theme from localStorage
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme && ['light', 'dark', 'bw'].includes(savedTheme)) {
//       setTheme(savedTheme);
//     }
    
//     // Check authentication
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
//     setIsAuthenticated(!!token);
//     setUserRole(role);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setIsAuthenticated(false);
//     router.push('/Login');
//   };

//   const handleChangepassword = () => {
//     router.push("/changepassword");
//   };
  
//   return (
//     <div className={`flex ${theme === 'dark' ? 'dark' : ''} ${theme === 'bw' ? 'grayscale' : ''}`}>
//       <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col justify-between fixed top-0 left-0 shadow-xl">
//         <div>
//           <div className="flex items-center mb-8">
//             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
//               LUXE ADMIN
//             </h2>
//           </div>
          
//           <nav className="space-y-2">
//             <button
//               onClick={toggleTheme}
//               className="relative w-24 h-8 mb-6 flex items-center rounded-full p-1 bg-gray-300 dark:bg-gray-600 transition-colors duration-300"
//               aria-label="Toggle theme"
//             >
//               {/* Track background */}
//               <div className="absolute inset-0 rounded-full overflow-hidden">
//                 <div className={`w-full h-full transition-opacity duration-300 ${
//                   theme === 'dark' ? 'bg-gradient-to-r from-gray-600 to-gray-500 opacity-100' : 
//                   theme === 'bw' ? 'bg-gray-400 opacity-100' : 'opacity-0'
//                 }`}></div>
//               </div>
              
//               {/* Thumb that moves between positions */}
//               <div
//                 className={`relative z-10 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
//                   theme === 'dark' ? 'translate-x-0' : // Far left (dark)
//                   theme === 'bw' ? 'translate-x-9' :   // Center (bw)
//                   'translate-x-[4rem]'                // Far right (light)
//                 }`}
//               >
//                 {/* Icons - only one visible at a time */}
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 transition-opacity duration-200 ${
//                     theme === 'light' ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                   />
//                 </svg>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 transition-opacity duration-200 ${
//                     theme === 'bw' ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69l-1.414 1.414M17.686 17.69l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
//                   />
//                 </svg>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 transition-opacity duration-200 ${
//                     theme === 'dark' ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                   />
//                 </svg>
//               </div>
//             </button>
           
//             {userRole !== '10' && (
//               <>
//                 <Link href="/admindashboard">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/dashboard') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                     </svg>
//                     Dashboard
//                   </div>
//                 </Link>
//                 <Link href="/employeepage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/employees') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                     Employees
//                   </div>
//                 </Link>
//                 <Link href="/products">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     Products
//                   </div>
//                 </Link>
//                 <Link href="salesproductpage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/sales') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                     Sales
//                   </div>
//                 </Link>
//                 <Link href="/categories">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                     Categories
//                   </div>
//                 </Link>
//                 <Link href="/orderspage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/orders') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     Orders
//                   </div>
//                 </Link>
//                 <Link href="/Reviews">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/reviews') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                     Reviews
//                   </div>
//                 </Link>
//               </>
//             )}
//             <Link href="/clientselfpage">
//               <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/profile') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 My Profile
//               </div>
//             </Link>
//             <Link href="/">
//               <div className={`flex items-center py-3 px-4 rounded-lg transition-all duration-150 ${isActive('/') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//                 Public Site
//               </div>
//             </Link>
//           </nav>
//         </div>
        
//         <div className="space-y-3">
//           {/* Theme Toggle Button */}
//           {/* <button 
//             onClick={toggleTheme}
//             className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg hover:from-gray-500 hover:to-gray-400 shadow-md transition-all"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               {isDarkMode ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//               )}
//             </svg>
//             {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//           </button> */}

//           {isAuthenticated ? (
//             <button 
//               onClick={logout} 
//               className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 shadow-md transition-all"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Logout
//             </button>
//           ) : (
//             <Link href="/Login">
//               <div className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:from-green-500 hover:to-green-400 shadow-md transition-all">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                 </svg>
//                 Login
//               </div>
//             </Link>
//           )}
          
//           <button 
//             onClick={handleChangepassword} 
//             className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-md transition-all"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             Change Password
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSideNavbarCom;







// 'use client'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { useState, useEffect } from 'react'
// import { useSafeTheme } from '@/components/ThemeContext'

// const AdminSideNavbarCom = () => {
//   const router = useRouter()
//   const themeContext = useSafeTheme()
//   const theme = themeContext?.theme || 'dark' // Fallback to 'dark'
//   const toggleTheme = themeContext?.toggleTheme || (() => {})
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [userRole, setUserRole] = useState(null)

//   const isActive = (pathname) => router.pathname === pathname

//   // ... rest of your component


//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     const role = localStorage.getItem('role')
//     setIsAuthenticated(!!token)
//     setUserRole(role)
//   }, [])

//   const logout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('role')
//     setIsAuthenticated(false)
//     router.push('/Login')
//   }

//   const handleChangepassword = () => {
//     router.push("/changepassword")
//   }

//   return (
//     <div className="w-64 h-screen bg-base-200 text-base-content p-6 flex flex-col justify-between fixed top-0 left-0 shadow-xl">
//       <div>
//         {/* Logo and Title */}
//         <div className="flex items-center mb-8">
//           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3 text-primary-content">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold">
//             LUXE ADMIN
//           </h2>
//         </div>

//         {/* Theme Toggle Button */}
//         {/* <div className="mb-6 flex justify-center"> */}
//          <div className="mb-6">
//           <button
//             onClick={() => toggleTheme()}
//             className="relative w-24 h-8 flex items-center rounded-full p-1 bg-neutral/20 transition-colors duration-300"
//             aria-label="Toggle theme"
//           >
//             <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
//               <div className={`w-full h-full transition-opacity duration-300 ${
//                 theme === 'dark' ? 'bg-gradient-to-r from-neutral to-base-300 opacity-100' : 
//                 theme === 'bw' ? 'bg-neutral opacity-100' : 'opacity-0'
//               }`}></div>
//             </div>

//             <div className={`relative z-10 w-6 h-6 rounded-full bg-base-100 shadow-md transform transition-transform duration-300 ${
//               theme === 'dark' ? 'translate-x-0' : 
//               theme === 'bw' ? 'translate-x-9' : 
//               'translate-x-[4rem]'
//             }`}>
//               {/* Light icon */}
//               <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//               {/* BW icon */}
//               <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral ${theme === 'bw' ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69l-1.414 1.414M17.686 17.69l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z" />
//               </svg>
//               {/* Dark icon */}
//               <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
//               </svg>
//             </div>
//           </button>
//             {/* {userRole !== '10' && ( */}
//             <nav className="space-y-2">
//               <>
//                 <Link href="/admindashboard">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/dashboard') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                     </svg>
//                     Dashboard
//                   </div>
//                 </Link>
//                 <Link href="/employeepage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/employees') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                     Employees
//                   </div>
//                 </Link>
//                 <Link href="/products">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                     Products
//                   </div>
//                 </Link>
//                 <Link href="salesproductpage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/sales') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                     Sales
//                   </div>
//                 </Link>
//                 <Link href="/categories">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                     Categories
//                   </div>
//                 </Link>
//                 <Link href="/orderspage">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/orders') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                     Orders
//                   </div>
//                 </Link>
//                 <Link href="/Reviews">
//                   <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/reviews') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                     Reviews
//                   </div>
//                 </Link>
//               </>
//             {/* )} */}
//             <Link href="/clientselfpage">
//               <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admin/profile') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//                 My Profile
//               </div>
//             </Link>
//             <Link href="/">
//               <div className={`flex items-center py-3 px-4 rounded-lg transition-all duration-150 ${isActive('/') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                 </svg>
//                 Public Site
//               </div>
//             </Link>
//           </nav>
//         </div>
        
//         <div className="space-y-3">
//           {isAuthenticated ? (
//             <>
//               <button 
//                 onClick={logout} 
//                 className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 shadow-md transition-all"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 Logout
//               </button>
              
//               <button 
//                 onClick={handleChangepassword} 
//                 className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-md transition-all"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//                 Change Password
//               </button>
//             </>
//           ) : (
//             <Link href="/Login">
//               <div className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:from-green-500 hover:to-green-400 shadow-md transition-all">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                 </svg>
//                 Login
//               </div>
//             </Link>
//           )}
//         </div>
//       </div>
//     // </div>
//   );
// };

// export default AdminSideNavbarCom;






import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const isActive = (pathname) => router.pathname === pathname;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    router.push('/Login');
  };

  const handleChangepassword = () => {
    router.push("/changepassword");
  };

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex flex-col justify-between fixed top-0 left-0 shadow-xl">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Admin Panel
            </h2>
          </div>
          
          <nav className="space-y-2">
            {userRole !== '10' && (
              <>
                <Link href="/admindashboard">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/admindashboard') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </div>
                </Link>
                <Link href="/employeepage">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/employeepage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Employees
                  </div>
                </Link>
                <Link href="/products">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Products
                  </div>
                </Link>
                <Link href="/salesproductpage">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/salesproductpage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Sales
                  </div>
                </Link>
                <Link href="/categories">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Categories
                  </div>
                </Link>
                <Link href="/orderspage">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/categories') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Orders
                  </div>
                </Link>
                <Link href="/Reviews">
                  <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/reviews') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Reviews
                  </div>
                </Link>
              </>
            )}
            {/* <Link href="/clientselfpage">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/clientselfpage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </div>
            </Link> */}
            <Link href="/imagespage">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/imagespage') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Images
              </div>
            </Link>
            <Link href="/contact">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all ${isActive('/contact') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Contacts
              </div>
            </Link>
            <Link href="/">
              <div className={`flex items-center py-3 px-4 rounded-lg transition-all duration-150 ${isActive('/products') ? 'bg-indigo-700 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Public Site
              </div>
            </Link>
          </nav>
        </div>
        
        <div className="space-y-3">
          {isAuthenticated ? (
            <button 
              onClick={logout} 
              className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 shadow-md transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          ) : (
            <Link href="/Login">
              <div className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:from-green-500 hover:to-green-400 shadow-md transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </div>
            </Link>
          )}
          
          <button 
            onClick={handleChangepassword} 
            className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-500 hover:to-blue-400 shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
