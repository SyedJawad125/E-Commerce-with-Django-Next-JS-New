'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HoverBox from '@/components/HoverBox';
import { useCart } from '@/components/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

const NavbarCom = () => {
  const pathname = usePathname();
  const [hovering, setHovering] = useState(false);
  const { cartItems } = useCart();

  const sampleProducts = [
    { id: 1, img1: 'images/7.jpg', name: 'Leather Bag' },
    { id: 2, img2: 'images/8.jpg', name: 'Pent Coat' },
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white w-full border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center px-6 py-1">
        {/* Logo */}
        <div className="text-black">
          <Link href="/">
            <span className="text-2xl font-light tracking-widest uppercase">
              <span className="font-bold">ÉLÉGANCE</span>
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <ul className="hidden md:flex space-x-8 items-center">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Sale', path: '/publicsalesproductpage' },
            { 
              name: 'New Arrivals', 
              path: '/newarrivalspage',
              className: "hover-group"
            },
            { name: 'Shop', path: '/publicproducts' },
            { name: 'Collections', path: '/publiccategories' },
            { name: 'Contact', path: '/contact' },
          ].map((item) => (
            <li
              key={item.path}
              className={`relative ${item.className || ''}`}
              onMouseEnter={() => item.name === 'New Arrivals' && setHovering(true)}
              onMouseLeave={() => item.name === 'New Arrivals' && setHovering(false)}
            >
              <Link href={item.path}>
                <div className={`
                  px-1 py-1 
                  text-sm 
                  font-medium 
                  tracking-wide
                  uppercase
                  transition-colors
                  duration-200
                  ${item.path !== '/' && pathname === item.path 
                    ? 'text-black border-b border-black' 
                    : 'text-gray-600 hover:text-black'}
                `}>
                  {item.name}
                </div>
              </Link>
              {item.name === 'New Arrivals' && hovering && (
                <HoverBox products={sampleProducts} />
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-black transition-colors">
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </button>
          
          <Link href="/addtocartpage" className="relative">
            <div className="text-gray-600 hover:text-black transition-colors">
              <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCom;;




// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import HoverBox from '@/components/HoverBox';
// import { useCart } from '@/components/CartContext';  // Import Cart Context
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// const NavbarCom = () => {
//   const pathname = usePathname();
//   const [hovering, setHovering] = useState(false);
//   const { cartItems } = useCart();  // Use Cart Context

//   const sampleProducts = [
//     { id: 1, img1: 'images/7.jpg', name: 'Leather Bag' },
//     { id: 2, img2: 'images/8.jpg', name: 'Pent Coat' },
//   ];

//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <nav className="bg-blue-700 w-full">
//       <div className="container mx-auto flex justify-between items-center p-0">
//         <div className="text-white text-2xl font-bold ml-10">
//           <Link href="/">ONLINE SHOP</Link>
//         </div>
//         <ul className="flex space-x-10 ml-auto mr-10">
//           {[
//             { name: 'Home', path: '/' },
//             { name: 'About', path: '/about' },
//             // { name: 'Services', path: '/services' },
//             { name: 'Sales', path: '/publicsalesproductpage' },
//             { name: 'New In', path: '/newarrivalspage' },
//             { name: 'Products', path: '/publicproducts' },
//             { name: 'Categories', path: '/publiccategories' },
//             { name: 'Contact', path: '/contact' },
//             // { name: 'Admin', path: '/admindashboard' },
//           ].map((item) => (
//             <li
//               key={item.path}
//               className={`relative mt-0.5 ${
//                 item.name === 'New In' ? 'hover-group' : ''
//               }`}
//               onMouseEnter={() => item.name === 'New In' && setHovering(true)}
//               onMouseLeave={() => item.name === 'New In' && setHovering(false)}
//             >
//               <Link href={item.path}>
//                 <div
//                   className={`${
//                     item.path !== '/' && pathname === item.path ? 'text-red-500' : 'text-white'
//                   } hover:text-black px-3 py-2 text-lg`}  // Increased text size
//                 >
//                   {item.name}
//                 </div>
//               </Link>
//               {item.name === 'New In' && hovering && (
//                 <HoverBox products={sampleProducts} />
//               )}
//             </li>
//           ))}
//           <li>
//             <Link href="/addtocartpage">
//               <div className="text-white hover:text-black px-3 py-2 relative mr-5 mt-1">
//                 <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />  {/* Increased icon size */}
//                 {cartItemCount > 0 && (
//                   <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-1 -right-2">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </div>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavbarCom;




// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// // import HoverBox from './HoverBox'; // Adjust the import path based on your project structure
// import HoverBox from '@/components/HoverBox';


// const NavbarCom = () => {
//   const pathname = usePathname(); // Hook to get the current path
//   const [hovering, setHovering] = useState(false);

//   const sampleProducts = [
//     { id: 1, img1: 'images/1.jpg', name: 'Leather Bag' },
//     { id: 2, img2: 'images/2.jpg', name: 'Pent Coat' },
//   ];

//   return (
//     <nav className="bg-blue-700 w-full">
//     <div className="container mx-auto flex justify-between items-center p-0">
//       <div className="text-white text-xl font-bold ml-10"> <Link href="/">ONLINE SHOP</Link></div>
//       <ul className="flex space-x-10 ml-auto mr-20">
//         {[
//           { name: 'Home', path: '/' },
//           { name: 'About', path: '/about' },
//           { name: 'Services', path: '/services' },
//           { name: 'New In', path: '/newarrivalspage' }, // "New In" moved here
//           { name: 'Products', path: '/publicproducts' },
//           { name: 'Categories', path: '/publiccategories' },
//           { name: 'Contact', path: '/contact' },
//           { name: 'Admin', path: '/admindashboard' },
//         ].map((item) => (
//           <li
//             key={item.path}
//             className={`relative mt-2 ${
//               item.name === 'New In' ? 'hover-group' : ''
//             }`}
//             onMouseEnter={() => item.name === 'New In' && setHovering(true)}
//             onMouseLeave={() => item.name === 'New In' && setHovering(false)}
//           >
//             <Link href={item.path}>
//               <div
//                 className={`${
//                   pathname === item.path ? 'text-red-500' : 'text-white'
//                 } hover:text-black px-3 py-2`}
//               >
//                 {item.name}
//               </div>
//             </Link>
//             {item.name === 'New In' && hovering && (
//               <HoverBox products={sampleProducts} />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   </nav>
  
//   );
// };




// 'use client'
// import React from 'react'
// import Link from 'next/link';
// import HoverBox from "@/components/HoverBox";


// const [hovering, setHovering] = useState(false);

// const NavbarCom = () => {

//   const sampleProducts = [
//     { id: 1, img1: '1.jpg', name: 'Leather Bag' },
//     { id: 2, img2: '2.jpg', name: 'Pent Coat' },
//   ];
  
//   return (
//     <>
//     <nav className="bg-blue-700 w-full">
//   <div className="container mx-auto flex justify-between items-center p-2">
//     <div className="text-white text-xl font-bold">
//       ONLINE SHOP
//     </div>
//     <ul className="flex space-x-10 ml-auto mr-20">
//       <li>
//         <Link href="/">
//           <div className="text-white hover:text-gray-300">Home</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/about">
//           <div className="text-white hover:text-gray-300">About</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/services">
//           <div className="text-white hover:text-gray-300">Services</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/publicproducts">
//           <div className="text-white hover:text-gray-300">Products</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/publiccategories">
//           <div className="text-white hover:text-gray-300">Categories</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/contact">
//           <div className="text-white hover:text-gray-300">Contact</div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/admindashboard">
//           <div className="text-white hover:text-gray-300">Admin</div>
//         </Link>
//       </li>
//     </ul>
//   </div>
// </nav>

//     </>
//   )
// }

// export default NavbarCom