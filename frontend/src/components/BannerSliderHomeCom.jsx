// import React from 'react';
// import Image from 'next/image';
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import banner1 from '../../public/images/banner1.jpg';
// import banner2 from '../../public/images/banner2.jpg';
// import banner3 from '../../public/images/banner3.jpg';
// import banner4 from '../../public/images/banner4.jpg';
// import banner5 from '../../public/images/banner5.jpg';
// import ad1 from '../../public/images/banner1.jpg';
// import ad2 from '../../public/images/banner2.jpg';
// import ad3 from '../../public/images/banner3.jpg';
// import ad4 from '../../public/images/banner4.jpg';
// import ad5 from '../../public/images/banner5.jpg';

// const HomePage = () => {
//   const categories = [
//     "Mobile", "Cup", "Bicycle", "Laptop", "Glasses", "Makeup", "Suits",
//     "Mobile", "Cup", "Bicycle", "Laptop", "Glasses", "Makeup", "Suits",
//     "Mobile", "Cup", "Bicycle", "Laptop", "Glasses", "Makeup", "Suits",
//     "Laptop", "Glasses", "Makeup", "Suits", 
//   ];

//   // Split categories into 3 columns
//   const column1 = categories.slice(0, 8);
//   const column2 = categories.slice(8, 16);
//   const column3 = categories.slice(17);

//   return (
//     <div className="mx-10"> {/* Added left and right margins here */}
//       <div className="container mx-auto px-4 py-4">
//         {/* Main Content Section */}
//         <div className="flex flex-col md:flex-row gap-6 mb-0">
//           {/* Categories Section - Left Side */}
//           <div className="w-full md:w-1/4 bg-gray-200 p-6 shadow h-[50vh] overflow-y-auto"> {/* Added fixed height and scroll */}
//             <h2 className="text-xl font-bold mb-4 text-gray-900 sticky top-0 ">Categories</h2>
//             <div className="grid grid-cols-3 gap-4">
//               {/* Column 1 */}
//               <ul className="space-y-3">
//                 {column1.map((category, index) => (
//                   <li key={index} className="hover:text-blue-600 text-gray-900 cursor-pointer transition-colors">
//                     {category}
//                   </li>
//                 ))}
//               </ul>
              
//               {/* Column 2 */}
//               <ul className="space-y-3">
//                 {column2.map((category, index) => (
//                   <li key={index+3} className="hover:text-blue-600 text-gray-900 cursor-pointer transition-colors">
//                     {category}
//                   </li>
//                 ))}
//               </ul>
              
//               {/* Column 3 */}
//               <ul className="space-y-3">
//                 {column3.map((category, index) => (
//                   <li key={index+5} className="hover:text-blue-600 text-gray-900 cursor-pointer transition-colors">
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Image Slider - Right Side */}
//           <div className="w-full md:w-3/4 h-[50vh]"> {/* Added fixed height */}
//             <Carousel 
//               showThumbs={false} 
//               autoPlay 
//               infiniteLoop 
//               interval={3000}
//               showStatus={false}
//               className="overflow-hidden shadow h-full"
//             >
//               <div className="h-full">
//                 <Image
//                   src={banner1}
//                   alt="image1"
//                   className="w-full h-full object-cover"
//                   priority
//                 />
//               </div>
//               <div className="h-full">
//                 <Image
//                   src={banner2}
//                   alt="image2"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="h-full">
//                 <Image
//                   src={banner3}
//                   alt="image3"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="h-full">
//                 <Image
//                   src={banner4}
//                   alt="image4"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="h-full">
//                 <Image
//                   src={banner5}
//                   alt="image5"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </Carousel>
//           </div>
//         </div>

//         {/* Ads Slider Section */}
//         <div className="mb-8 mt-6"> {/* Added margin-top */}
//           <Carousel 
//             showThumbs={false} 
//             autoPlay 
//             infiniteLoop 
//             interval={2500}
//             showStatus={false}
//             className="overflow-hidden shadow"
//           >
//             <div>
//               <Image
//                 src={ad1}
//                 alt="ad1"
//                 className="w-full h-[24vh] object-cover"
//               />
//             </div>
//             <div>
//               <Image
//                 src={ad2}
//                 alt="ad2"
//                 className="w-full h-[24vh] object-cover"
//               />
//             </div>
//             <div>
//               <Image
//                 src={ad3}
//                 alt="ad3"
//                 className="w-full h-[24vh] object-cover"
//               />
//             </div>
//             <div>
//               <Image
//                 src={ad4}
//                 alt="ad3"
//                 className="w-full h-[24vh] object-cover"
//               />
//             </div>
//             <div>
//               <Image
//                 src={ad5}
//                 alt="ad3"
//                 className="w-full h-[24vh] object-cover"
//               />
//             </div>
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;




// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiChevronRight } from 'react-icons/fi';
// import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
// import Link from 'next/link';

// // Replace these with your actual luxury product images
// import banner1 from '../../public/images/banner1.jpg';
// import banner2 from '../../public/images/banner2.jpg';
// import banner3 from '../../public/images/banner3.jpg';
// import banner4 from '../../public/images/banner4.jpg';
// import banner5 from '../../public/images/banner5.jpg';

// const HomePage = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
   


//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await AxiosInstance.get('/images/publicimages?imagescategory=Bannerslider');
//         if (res && res.data && res.data.data) {
//           setBanners(res.data.data.data); // Assuming 'data' contains the image data
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const luxuryCategories = [
//     { name: "Haute Couture", subcategories: ["Evening Gowns", "Bridal", "Custom Tailoring"] },
//     { name: "Fine Jewelry", subcategories: ["Diamond", "Platinum", "Limited Editions"] },
//     { name: "Luxury Watches", subcategories: ["Swiss", "Automatic", "Limited Edition"] },
//     { name: "Designer Handbags", subcategories: ["Limited Edition", "Exotic Leathers", "Iconic Styles"] },
//     { name: "High-End Tech", subcategories: ["Luxury Phones", "Executive Gadgets", "Custom Finishes"] },
//     { name: "Premium Fragrances", subcategories: ["Niche Perfumes", "Private Blends", "Limited Editions"] },
//     { name: "Luxury Home", subcategories: ["Designer Furniture", "Art Pieces", "Premium Linens"] },
//     { name: "Exclusive Experiences", subcategories: ["VIP Travel", "Private Events", "Personal Shopping"] }
//   ];

//   const featuredProducts = [
//     { id: 1, name: "Diamond Eternity Band", price: "$12,500", image: banner1 },
//     { id: 2, name: "Limited Edition Chronograph", price: "$28,900", image: banner2 },
//     { id: 3, name: "Designer Leather Tote", price: "$5,200", image: banner3 },
//     { id: 4, name: "Custom Tailored Suit", price: "$8,750", image: banner4 },
//     { id: 5, name: "Rare Perfume Collection", price: "$3,400", image: banner5 }
//   ];

//   const renderArrowPrev = (clickHandler, hasPrev, label) => (
//     <button 
//       onClick={clickHandler}
//       className="absolute left-0 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-r-lg"
//       style={{ top: '50%', transform: 'translateY(-50%)' }}
//     >
//       <IoIosArrowBack size={24} />
//     </button>
//   );

//   const renderArrowNext = (clickHandler, hasNext, label) => (
//     <button 
//       onClick={clickHandler}
//       className="absolute right-0 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-l-lg"
//       style={{ top: '50%', transform: 'translateY(-50%)' }}
//     >
//       <IoIosArrowForward size={24} />
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Luxury Header */}
//       {/* <header className="bg-black text-white py-4 px-6 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-8">
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="flex items-center space-x-2 hover:text-gray-300 transition"
//             >
//               <FiMenu size={20} />
//               <span className="hidden md:inline">Menu</span>
//             </button>
//             <h1 className="text-2xl font-serif font-bold tracking-wider">LUXE</h1>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8">
//             <nav className="flex space-x-6">
//               <a href="/" className="hover:text-gray-300 transition">Home</a>
//               <a href="publicsalesproductpage" className="hover:text-gray-300 transition">Sale</a>
//               <a href="newarrivalspage" className="hover:text-gray-300 transition">New Arrivals</a>
//               <a href="publiccategories" className="hover:text-gray-300 transition">Collections</a>
//               <a href="publicproducts" className="hover:text-gray-300 transition">Shop</a>
//               <a href="contact" className="hover:text-gray-300 transition">Contact</a>
//             </nav>
//           </div>
          
//           <div className="flex items-center space-x-6">
//             <div className="relative hidden md:block">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search for luxury..."
//                 className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500 w-64"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <button className="hover:text-gray-300 transition">
//               <FiHeart size={20} />
//             </button>
//             <button className="hover:text-gray-300 transition">
//               <FiShoppingBag size={20} />
//             </button>
//             <button className="hover:text-gray-300 transition">
//               <FiUser size={20} />
//             </button>
//           </div>
//         </div>
//       </header> */}

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="bg-black text-white p-6 md:hidden">
//           <div className="space-y-4">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none w-full"
//               />
//             </div>
//             <nav className="flex flex-col space-y-3">
//               <a href="#" className="hover:text-gray-300 transition">New Arrivals</a>
//               <a href="#" className="hover:text-gray-300 transition">Collections</a>
//               <a href="#" className="hover:text-gray-300 transition">Shop</a>
//               <a href="#" className="hover:text-gray-300 transition">Contact</a>
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Hero Carousel */}
//         <div className="mb-12 relative">
//           <Carousel
//             showThumbs={false}
//             autoPlay
//             infiniteLoop
//             interval={5000}
//             showStatus={false}
//             renderArrowPrev={renderArrowPrev}
//             renderArrowNext={renderArrowNext}
//             className="overflow-hidden rounded-lg shadow-xl"
//           >
//             {banners.map((banner, index) => (
//           <div key={index}>
//             <Image
//               src={`http://localhost:8000${banner.image}`} // Adjust according to your API structure
//               alt={`Banner ${index + 1}`}
//               className="w-full h-[87vh] object-cover"
//               width={1920}
//               height={1080} // Adjust dimensions as needed
//             />
          

//                 <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                   <div className="text-center text-white px-8 max-w-2xl">
//                     <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Exclusive Collection {index + 1}</h2>
//                     <p className="text-xl mb-6">Discover unparalleled craftsmanship and timeless elegance</p>
//                     <Link href="/publicproducts">
//                       <button className="bg-white text-black px-8 py-3 font-medium hover:bg-opacity-90 transition">
//                         SHOP NOW
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Carousel>
//         </div>

//         {/* Luxury Categories */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-serif text-gray-900 font-bold mb-8 text-center">Our Luxury Categories</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {luxuryCategories.map((category, index) => (
//               <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg h-64">
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10"></div>
//                 <div className="absolute inset-0 flex items-end p-6 z-20">
//                   <div>
//                     <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {category.subcategories.map((sub, i) => (
//                         <span key={i} className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
//                           {sub}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500">
//                   {/* Placeholder for category image */}
//                   <div className="w-full h-full bg-gray-300"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Featured Products */}
//         <section className="mb-16">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-serif font-bold">Curated Selections</h2>
//             <button className="flex items-center text-sm font-medium hover:underline">
//               View All <FiChevronRight className="ml-1" />
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="group relative">
//                 <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:opacity-90 transition"
//                   />
//                 </div>
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
//                   <p className="mt-1 text-lg font-semibold text-gray-900">{product.price}</p>
//                 </div>
//                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
//                   <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
//                     <FiHeart size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Luxury Experience Section */}
        

//         {/* Newsletter */}
//         {/* <section className="bg-gray-100 rounded-lg p-8 md:p-12 text-center">
//           <h2 className="text-2xl font-serif font-bold mb-2">Join Our Exclusive List</h2>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//             Receive early access to new collections, private sales, and luxury insights.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Your email address"
//               className="flex-grow px-4 py-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
//             />
//             <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
//               SUBSCRIBE
//             </button>
//           </div>
//         </section> */}
//       </main>

//       {/* Luxury Footer
//       <footer className="bg-black text-white py-12 px-6">
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-serif font-bold mb-4">LUXE</h3>
//               <p className="text-gray-400">
//                 Curating the finest luxury goods for discerning clients worldwide.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-medium mb-4">Shop</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
//                 <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
//                 <li><a href="#" className="hover:text-white transition">Limited Editions</a></li>
//                 <li><a href="#" className="hover:text-white transition">Gift Cards</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-medium mb-4">Services</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition">Personal Shopping</a></li>
//                 <li><a href="#" className="hover:text-white transition">VIP Services</a></li>
//                 <li><a href="#" className="hover:text-white transition">International Shipping</a></li>
//                 <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-medium mb-4">Contact</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>+1 (888) 555-LUXE</li>
//                 <li>client.services@luxe.com</li>
//                 <li>Mon-Fri: 9AM-9PM EST</li>
//                 <li>Sat-Sun: 10AM-6PM EST</li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//             <p>© {new Date().getFullYear()} LUXE. All rights reserved.</p>
//           </div>
//         </div>
//       </footer> */}
//     </div>
//   );
// };

// export default HomePage;



'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiChevronRight } from 'react-icons/fi';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import AxiosInstance from "@/components/AxiosInstance";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await AxiosInstance.get('/images/publicimages?imagescategory=Bannerslider');
        if (res && res.data && res.data.data) {
          setBanners(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const luxuryCategories = [
    { name: "Haute Couture", subcategories: ["Evening Gowns", "Bridal", "Custom Tailoring"] },
    { name: "Fine Jewelry", subcategories: ["Diamond", "Platinum", "Limited Editions"] },
    { name: "Luxury Watches", subcategories: ["Swiss", "Automatic", "Limited Edition"] },
    { name: "Designer Handbags", subcategories: ["Limited Edition", "Exotic Leathers", "Iconic Styles"] },
    { name: "High-End Tech", subcategories: ["Luxury Phones", "Executive Gadgets", "Custom Finishes"] },
    { name: "Premium Fragrances", subcategories: ["Niche Perfumes", "Private Blends", "Limited Editions"] },
    { name: "Luxury Home", subcategories: ["Designer Furniture", "Art Pieces", "Premium Linens"] },
    { name: "Exclusive Experiences", subcategories: ["VIP Travel", "Private Events", "Personal Shopping"] }
  ];

  const featuredProducts = [
    { id: 1, name: "Diamond Eternity Band", price: "$12,500" },
    { id: 2, name: "Limited Edition Chronograph", price: "$28,900" },
    { id: 3, name: "Designer Leather Tote", price: "$5,200" },
    { id: 4, name: "Custom Tailored Suit", price: "$8,750" },
    { id: 5, name: "Rare Perfume Collection", price: "$3,400" }
  ];

  const renderArrowPrev = (clickHandler, hasPrev, label) => (
    <button 
      onClick={clickHandler}
      className="absolute left-0 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-r-lg"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <IoIosArrowBack size={24} />
    </button>
  );

  const renderArrowNext = (clickHandler, hasNext, label) => (
    <button 
      onClick={clickHandler}
      className="absolute right-0 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-l-lg"
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    >
      <IoIosArrowForward size={24} />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-black text-white p-6 md:hidden">
          <div className="space-y-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none w-full"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="hover:text-gray-300 transition">New Arrivals</a>
              <a href="#" className="hover:text-gray-300 transition">Collections</a>
              <a href="#" className="hover:text-gray-300 transition">Shop</a>
              <a href="#" className="hover:text-gray-300 transition">Contact</a>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Carousel */}
        <div className="mb-12 relative">
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            showStatus={false}
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
            className="overflow-hidden rounded-lg shadow-xl"
          >
            {banners.map((banner, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8000${banner.image}`}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-[70vh] object-cover mb-12"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white px-8 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Exclusive Collection {index + 1}</h2>
                    <p className="text-xl mb-6">Discover unparalleled craftsmanship and timeless elegance</p>
                    <Link href="/publicproducts">
                      <button className="bg-white text-black px-8 py-3 font-medium hover:bg-opacity-90 transition">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Luxury Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-gray-900 font-bold mb-8 text-center">Our Luxury Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryCategories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg h-64">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10"></div>
                <div className="absolute inset-0 flex items-end p-6 z-20">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub, i) => (
                        <span key={i} className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500">
                  {/* Placeholder for category image */}
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold">Curated Selections</h2>
            <button className="flex items-center text-sm font-medium hover:underline">
              View All <FiChevronRight className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {/* Placeholder for product image */}
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{product.price}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                    <FiHeart size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;