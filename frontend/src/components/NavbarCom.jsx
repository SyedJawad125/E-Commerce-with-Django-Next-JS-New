// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faShoppingCart, 
//   faSearch,
//   faPhone,
//   faSignInAlt,
//   faUserPlus,
//   faSignOutAlt
// } from '@fortawesome/free-solid-svg-icons';
// import { useCart } from '@/components/CartContext';
// import HoverBox from '@/components/HoverBox';

// const NavbarCom = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [hovering, setHovering] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);
//   const { cartItems } = useCart();

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token');
//       setIsAuthenticated(!!token);
//     }

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
      
//       if (currentScrollY <= 10) {
//         setIsVisible(true);
//         setLastScrollY(currentScrollY);
//         return;
//       }

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsVisible(false);
//       } else {
//         setIsVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   // Fetch new arrivals products for hover box
//   useEffect(() => {
//     const fetchNewArrivals = async () => {
//       try {
//         const response = await fetch('/api/products/new-arrivals');
//         const data = await response.json();
//         setNewArrivalsProducts(data);
//       } catch (error) {
//         console.error('Error fetching new arrivals:', error);
//       }
//     };

//     fetchNewArrivals();
//   }, []);

//   const fetchSearchResults = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
      
//       // Format results to distinguish between products and categories
//       const formattedResults = data.map(item => ({
//         ...item,
//         type: item.price !== undefined ? 'product' : 'category'
//       }));
      
//       setSearchResults(formattedResults);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//   e.preventDefault();
//   if (!searchQuery.trim()) return;

//   setShowSearchResults(false);
  
//   // Check if we have any category matches in results (not just exact matches)
//   const categoryMatches = searchResults.filter(
//     result => result.type === 'category' && 
//     result.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // If we have category matches, go to the first one
//   if (categoryMatches.length > 0) {
//     router.push(`/categorywiseproduct?categoryId=${categoryMatches[0].id}&categoryName=${encodeURIComponent(categoryMatches[0].name)}`);
//   } else {
//     // Otherwise go to regular product search
//     router.push(`/publicproducts?search=${encodeURIComponent(searchQuery)}`);
//   }
// };

//   const handleSearchFocus = () => {
//     if (searchQuery.trim() !== '') {
//       setShowSearchResults(true);
//     }
//   };

//   const handleSearchBlur = () => {
//     setTimeout(() => {
//       setShowSearchResults(false);
//     }, 200);
//   };

//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setSearchResults([]);
//       setShowSearchResults(false);
//       return;
//     }

//     const timer = setTimeout(() => {
//       fetchSearchResults(searchQuery);
//       setShowSearchResults(true);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const logout = () => {
//     setIsLoggingOut(true);
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     router.push('/');
//   };

//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <>
//       {/* Top Contact Bar */}
//       <div className={`fixed w-full z-40 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-gradient-to-r from-gray-900 to-black text-white`}>
//         <div className="container mx-auto px-6 flex justify-between items-center h-4">
//           <div className="flex items-center space-x-3">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
//               <div className="relative flex items-center space-x-2 px-4 py-1 rounded-full bg-gray-900 group-hover:bg-gray-800 transition duration-200">
//                 <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-amber-400" />
//                 <span className="text-xs font-light tracking-wider">(+92) 333 1906382</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-6">
//             {isAuthenticated ? (
//               <button 
//                 onClick={logout} 
//                 disabled={isLoggingOut} 
//                 className={`relative flex items-center space-x-2 group ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                 <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
//                 <span className="text-xs font-light tracking-wider">LOGOUT</span>
//               </button>
//             ) : (
//               <Link href="/Login" className="relative group">
//                 <div className="flex items-center space-x-2">
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                   <FontAwesomeIcon icon={faSignInAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
//                   <span className="text-xs font-light tracking-wider">LOGIN</span>
//                 </div>
//               </Link>
//             )}
            
//             <div className="h-4 w-px bg-gray-600"></div>
            
//             <Link href="/signup" className="relative group">
//               <div className="flex items-center space-x-2">
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                 <FontAwesomeIcon icon={faUserPlus} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
//                 <span className="text-xs font-light tracking-wider">SIGN UP</span>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation Bar */}
//       <div className={`fixed w-full z-40 mt-10 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white border-b border-gray-100`}>
//         <div className="container mx-auto flex justify-between items-center px-6 py-2 h-10">
//           {/* Logo */}
//           <div className="text-black">
//             <Link href="/">
//               <span className="text-xl font-light tracking-widest uppercase">
//                 <span className="font-bold">GOHAR'S SHOP</span>
//               </span>
//             </Link>
//           </div>

//           {/* Main Navigation */}
//           <ul className="hidden md:flex space-x-6 items-center">
//             {[
//               { name: 'Home', path: '/' },
//               { name: 'Kids', path: '/kidspage' },
//               { name: 'Sale', path: '/publicsalesproductpage' },
//               { 
//                 name: 'New IN', 
//                 path: '/newarrivalspage',
//                 className: "hover-group"
//               },
//               { name: 'Shop', path: '/publicproducts' },
//               { name: 'Collections', path: '/publiccategories' },
//               { name: 'Contact', path: '/contact' },
//             ].map((item) => (
//               <li
//                 key={item.path}
//                 className={`relative ${item.className || ''}`}
//                 onMouseEnter={() => item.name === 'New Arrivals' && setHovering(true)}
//                 onMouseLeave={() => item.name === 'New Arrivals' && setHovering(false)}
//               >
//                 <Link href={item.path}>
//                   <div className={`
//                     px-1 py-1 
//                     text-xs 
//                     font-medium 
//                     tracking-wide
//                     uppercase
//                     transition-colors
//                     duration-200
//                     ${item.path !== '/' && pathname === item.path 
//                       ? 'text-black border-b border-black' 
//                       : 'text-gray-600 hover:text-black'}
//                   `}>
//                     {item.name}
//                   </div>
//                 </Link>
//                 {item.name === 'New Arrivals' && hovering && (
//                   <HoverBox products={newArrivalsProducts} />
//                 )}
//               </li>
//             ))}
//           </ul>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-7">
//             <div className="relative">
//               <form onSubmit={handleSearch} className="flex items-center">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={handleSearchFocus}
//                   onBlur={handleSearchBlur}
//                   placeholder="Search products or categories..."
//                   className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-80 text-sm text-black"
//                 />
//                 <button
//                   type="submit"
//                   className="px-3 py-1 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors"
//                 >
//                   <FontAwesomeIcon icon={faSearch} className="text-sm" />
//                 </button>
//               </form>

//               {/* Enhanced Search Results Dropdown */}
//               {showSearchResults && searchQuery && (
//                 <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isLoading ? (
//                     <div className="p-3 text-center text-gray-500 text-sm">Searching...</div>
//                   ) : searchResults.length > 0 ? (
//                     <>
//                       {/* Categories Section */}
//                       {searchResults.some(item => item.type === 'category') && (
//                         <div className="border-b border-gray-100">
//                           <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">CATEGORIES</div>
//                           {searchResults.filter(item => item.type === 'category').map(category => (
//                                 <Link
//                                   key={`cat-${category.id}`}
//                                   href={`/categorywiseproduct?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`}
//                                   className="flex items-center p-3 hover:bg-gray-50 transition-colors"
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     setSearchQuery('');
//                                     setShowSearchResults(false);
//                                     router.push(`/categorywiseproduct?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`);
//                                   }}
//                                 >
//                               <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//                                 </svg>
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900">{category.name}</div>
//                                 <div className="text-xs text-gray-500">{category.productCount || 0} items</div>
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       )}

//                       {/* Products Section */}
//                       {searchResults.some(item => item.type === 'product') && (
//                         <div>
//                           <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">PRODUCTS</div>
//                           {searchResults.filter(item => item.type === 'product').map(product => (
//                             <Link
//                               key={`prod-${product.id}`}
//                               href={`/productdetailpage?ProductId=${product.id}`}
//                               className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                             >
//                               <img 
//                                 src={`http://localhost:8000/${product.image}`} 
//                                 alt={product.name}
//                                 className="w-10 h-10 object-cover rounded mr-3"
//                                 onError={(e) => {
//                                   e.target.src = '/images/placeholder-product.jpg';
//                                 }}
//                               />
//                               <div className="flex-1">
//                                 <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                                 <div className="text-xs text-gray-500">Rs. {product.price.toFixed(2)}</div>
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       )}

//                       {/* View All Results */}
//                       <div className="p-2 text-center border-t border-gray-100 bg-gray-50">
//                         <Link 
//                           href={`/publicproducts?search=${encodeURIComponent(searchQuery)}`}
//                           className="text-sm text-blue-600 hover:underline"
//                         >
//                           View all results ({searchResults.length})
//                         </Link>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="p-3 text-center text-gray-500 text-sm">
//                       No results found for "{searchQuery}"
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
            
//             <Link href="/addtocartpage" className="relative">
//               <div className="text-gray-600 hover:text-black transition-colors">
//                 <FontAwesomeIcon icon={faShoppingCart} className="text-md" />
//                 {cartItemCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Spacer to prevent content from being hidden under fixed nav */}
//       <div className="h-20"></div>
//     </>
//   );
// };

// export default NavbarCom;





// 'use client';
// import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faShoppingCart, 
//   faSearch,
//   faPhone,
//   faSignInAlt,
//   faUserPlus,
//   faSignOutAlt,
//   faClockRotateLeft,
//   faTimes,
//   faBars
// } from '@fortawesome/free-solid-svg-icons';
// import { useCart } from '@/components/CartContext';

// // Optimized components
// const NavItem = memo(({ item, pathname, setHovering, closeMobileMenu }) => (
//   <li
//     className={`relative ${item.className || ''}`}
//     onMouseEnter={() => item.name === 'New IN' && setHovering(true)}
//     onMouseLeave={() => item.name === 'New IN' && setHovering(false)}
//   >
//     <Link 
//       href={item.path}
//       prefetch
//       onClick={closeMobileMenu}
//       className={`
//         px-1 py-1 
//         text-xs 
//         font-medium 
//         tracking-wide
//         uppercase
//         transition-colors
//         duration-200
//         block
//         ${item.path !== '/' && pathname === item.path 
//           ? 'text-black border-b border-black' 
//           : 'text-gray-600 hover:text-black'}
//       `}
//     >
//       {item.name}
//     </Link>
//   </li>
// ));

// const SearchResultItem = memo(({ item, closeSearch }) => (
//   <Link
//     href={
//       item.type === 'category' 
//         ? `/categorywiseproduct?categoryId=${item.id}&categoryName=${encodeURIComponent(item.name)}`
//         : `/productdetailpage?ProductId=${item.id}`
//     }
//     onClick={closeSearch}
//     className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
//   >
//     {item.image_urls?.[0] ? (
//       <div className="w-10 h-10 rounded overflow-hidden mr-3">
//         <img 
//           src={item.image_urls[0]} 
//           alt={item.name}
//           className="w-full h-full object-cover"
//           loading="lazy"
//         />
//       </div>
//     ) : (
//       <div className="w-10 h-10 bg-gray-100 rounded mr-3 flex items-center justify-center">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//       </div>
//     )}
//     <div className="flex-1">
//       <div className="text-sm font-medium text-gray-900">{item.name}</div>
//       {item.price && (
//         <div className="text-xs text-gray-500">Rs. {item.price.toFixed(2)}</div>
//       )}
//       {item.product_count !== undefined && (
//         <div className="text-xs text-gray-500">{item.product_count} items</div>
//       )}
//     </div>
//   </Link>
// ));

// const NavbarCom = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { cartItems } = useCart();
  
//   // State
//   const [hovering, setHovering] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   // Refs
//   const searchRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   // Data
//   const navItems = React.useMemo(() => [
//     { name: 'Home', path: '/' },
//     { name: 'Kids', path: '/kidspage' },
//     { name: 'Sale', path: '/publicsalesproductpage' },
//     { name: 'New IN', path: '/newarrivalspage', className: "hover-group" },
//     { name: 'Shop', path: '/publicproducts' },
//     { name: 'Collections', path: '/publiccategories' },
//     { name: 'Contact', path: '/contact' }
//   ], []);

//   // Effects
//   useEffect(() => {
//     setIsAuthenticated(!!(typeof window !== 'undefined' && localStorage.getItem('token')));
//   }, []);

//   useEffect(() => {
//     let ticking = false;
    
//     const handleScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           const currentScrollY = window.scrollY;
//           setIsVisible(currentScrollY <= 10 || currentScrollY < lastScrollY);
//           setLastScrollY(currentScrollY);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   useEffect(() => {
//     const savedSearches = typeof window !== 'undefined' ? localStorage.getItem('recentSearches') : null;
//     if (savedSearches) {
//       setRecentSearches(JSON.parse(savedSearches));
//     }

//     const fetchNewArrivals = async () => {
//       try {
//         const response = await fetch('/api/products/new-arrivals');
//         const data = await response.json();
//         setNewArrivalsProducts(data.data || []);
//       } catch (error) {
//         console.error('Error fetching new arrivals:', error);
//       }
//     };

//     fetchNewArrivals();
//   }, []);

//   // Handlers
//   const fetchSearchResults = useCallback(async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
      
//       if (data.data?.length > 0) {
//         const newRecent = [
//           query,
//           ...recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())
//         ].slice(0, 5);
//         setRecentSearches(newRecent);
//         localStorage.setItem('recentSearches', JSON.stringify(newRecent));
//       }

//       setSearchResults(data.data || []);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [recentSearches]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery.trim()) {
//         fetchSearchResults(searchQuery);
//       } else {
//         setSearchResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery, fetchSearchResults]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return;

//     setShowSearchResults(false);
//     navigateToSearchResults();
//   };

//   const navigateToSearchResults = useCallback(() => {
//     const exactCategoryMatch = searchResults.find(
//       result => result.type === 'category' && 
//       result.name.toLowerCase() === searchQuery.toLowerCase()
//     );

//     if (exactCategoryMatch) {
//       router.push(`/categorywiseproduct?categoryId=${exactCategoryMatch.id}&categoryName=${encodeURIComponent(exactCategoryMatch.name)}`);
//     } else {
//       router.push(`/publicproducts?search=${encodeURIComponent(searchQuery)}`);
//     }
//   }, [searchQuery, searchResults, router]);

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && searchQuery) {
//       handleSearch(e);
//     }
//     if (e.key === 'Escape') {
//       setShowSearchResults(false);
//     }
//   };

//   const handleSearchFocus = () => {
//     if (searchQuery.trim() !== '' || recentSearches.length > 0) {
//       setShowSearchResults(true);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     setShowSearchResults(false);
//   };

//   const closeMobileMenu = useCallback(() => {
//     setIsMobileMenuOpen(false);
//   }, []);

//   const toggleMobileMenu = useCallback(() => {
//     setIsMobileMenuOpen(prev => !prev);
//   }, []);

//   const logout = useCallback(() => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     router.push('/');
//   }, [router]);

//   const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <>
//       {/* Top Contact Bar */}
//       <div className={`fixed w-full z-40 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-gradient-to-r from-gray-900 to-black text-white`}>
//         <div className="container mx-auto px-6 flex justify-between items-center h-4">
//           <div className="flex items-center space-x-3">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
//               <div className="relative flex items-center space-x-2 px-4 py-1 rounded-full bg-gray-900 group-hover:bg-gray-800 transition duration-200">
//                 <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-amber-400" />
//                 <span className="text-xs font-light tracking-wider">(+92) 333 1906382</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-6">
//             {isAuthenticated ? (
//               <button 
//                 onClick={logout}
//                 className="relative flex items-center space-x-2 group"
//               >
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                 <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
//                 <span className="text-xs font-light tracking-wider">LOGOUT</span>
//               </button>
//             ) : (
//               <Link 
//                 href="/Login" 
//                 prefetch
//                 className="relative group"
//               >
//                 <div className="flex items-center space-x-2">
//                   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                   <FontAwesomeIcon icon={faSignInAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
//                   <span className="text-xs font-light tracking-wider">LOGIN</span>
//                 </div>
//               </Link>
//             )}
            
//             <div className="h-4 w-px bg-gray-600"></div>
            
//             <Link 
//               href="/signup" 
//               prefetch
//               className="relative group"
//             >
//               <div className="flex items-center space-x-2">
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
//                 <FontAwesomeIcon icon={faUserPlus} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
//                 <span className="text-xs font-light tracking-wider">SIGN UP</span>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation Bar */}
//       <div className={`fixed w-full z-40 mt-10 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white border-b border-gray-100`}>
//         <div className="container mx-auto flex justify-between items-center px-6 py-2 h-10">
//           {/* Logo and Mobile Menu Button */}
//           <div className="flex items-center">
//             <button 
//               className="md:hidden mr-4 text-gray-600"
//               onClick={toggleMobileMenu}
//               aria-label="Toggle menu"
//             >
//               <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
//             </button>
            
//             <Link 
//               href="/" 
//               prefetch
//               className="text-black"
//             >
//               <span className="text-xl font-light tracking-widest uppercase">
//                 <span className="font-bold">GOHAR'S SHOP</span>
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:block">
//             <ul className="flex space-x-6 items-center">
//               {navItems.map((item) => (
//                 <NavItem 
//                   key={item.path} 
//                   item={item} 
//                   pathname={pathname}
//                   setHovering={setHovering}
//                   closeMobileMenu={closeMobileMenu}
//                 />
//               ))}
//             </ul>
//           </nav>

//           {/* Search and Cart */}
//           <div className="flex items-center space-x-4">
//             <div className="relative" ref={searchRef}>
//               <form onSubmit={handleSearch} className="flex items-center">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={handleSearchFocus}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Search..."
//                     className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 sm:w-60 text-sm text-black"
//                   />
//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={clearSearch}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <FontAwesomeIcon icon={faTimes} className="text-sm" />
//                     </button>
//                   )}
//                 </div>
//                 <button
//                   type="submit"
//                   className="px-3 py-1 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors"
//                 >
//                   <FontAwesomeIcon icon={faSearch} className="text-sm" />
//                 </button>
//               </form>

//               {/* Search Results Dropdown */}
//               {showSearchResults && (
//                 <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//                   {isLoading ? (
//                     <div className="p-3 space-y-2">
//                       {[...Array(3)].map((_, i) => (
//                         <div key={i} className="flex items-center space-x-3 p-2">
//                           <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
//                           <div className="flex-1 space-y-1">
//                             <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
//                             <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : searchQuery ? (
//                     searchResults.length > 0 ? (
//                       <>
//                         {searchResults.some(item => item.type === 'category') && (
//                           <div className="border-b border-gray-100">
//                             <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">CATEGORIES</div>
//                             {searchResults
//                               .filter(item => item.type === 'category')
//                               .map(item => (
//                                 <SearchResultItem 
//                                   key={`cat-${item.id}`} 
//                                   item={item} 
//                                   closeSearch={() => {
//                                     setSearchQuery('');
//                                     setShowSearchResults(false);
//                                   }}
//                                 />
//                               ))
//                             }
//                           </div>
//                         )}

//                         {searchResults.some(item => item.type === 'product') && (
//                           <div>
//                             <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">PRODUCTS</div>
//                             {searchResults
//                               .filter(item => item.type === 'product')
//                               .map(item => (
//                                 <SearchResultItem 
//                                   key={`prod-${item.id}`} 
//                                   item={item} 
//                                   closeSearch={() => {
//                                     setSearchQuery('');
//                                     setShowSearchResults(false);
//                                   }}
//                                 />
//                               ))
//                             }
//                           </div>
//                         )}

//                         <div className="p-2 text-center border-t border-gray-100 bg-gray-50">
//                           <Link 
//                             href={`/publicproducts?search=${encodeURIComponent(searchQuery)}`}
//                             className="text-sm text-blue-600 hover:underline"
//                             onClick={() => {
//                               setSearchQuery('');
//                               setShowSearchResults(false);
//                             }}
//                           >
//                             View all results ({searchResults.length})
//                           </Link>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="p-3 text-center text-gray-500 text-sm">
//                         No results found for "{searchQuery}"
//                       </div>
//                     )
//                   ) : recentSearches.length > 0 && (
//                     <div>
//                       <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">RECENT SEARCHES</div>
//                       {recentSearches.map((search, index) => (
//                         <button
//                           key={index}
//                           className="flex items-center w-full p-3 hover:bg-gray-50 transition-colors text-left"
//                           onClick={() => {
//                             setSearchQuery(search);
//                             setShowSearchResults(true);
//                           }}
//                         >
//                           <FontAwesomeIcon icon={faClockRotateLeft} className="text-gray-400 mr-3" />
//                           <span className="text-sm text-gray-700">{search}</span>
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <Link 
//               href="/addtocartpage" 
//               prefetch
//               className="relative text-gray-600 hover:text-black transition-colors"
//             >
//               <FontAwesomeIcon icon={faShoppingCart} className="text-md" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div 
//             ref={mobileMenuRef}
//             className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50"
//           >
//             <ul className="py-2">
//               {navItems.map((item) => (
//                 <li key={item.path} className="border-b border-gray-100 last:border-b-0">
//                   <NavItem 
//                     item={item} 
//                     pathname={pathname}
//                     setHovering={setHovering}
//                     closeMobileMenu={closeMobileMenu}
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Spacer */}
//       <div className="h-20"></div>
//     </>
//   );
// };

// export default NavbarCom;






'use client'
import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faShoppingCart, 
  faSearch,
  faPhone,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faClockRotateLeft,
  faTimes,
  faBars
} from '@fortawesome/free-solid-svg-icons'
import { useCart } from '@/components/CartContext'

// Optimized components
const NavItem = memo(({ item, pathname, closeMobileMenu }) => (
  <li className={`relative ${item.className || ''}`}>
    <Link
      href={item.path}
      prefetch
      onClick={closeMobileMenu}
      className={`
        px-1 py-1 
        text-xs 
        font-medium 
        tracking-wide
        uppercase
        transition-colors
        duration-200
        block
        ${pathname === item.path ? 'text-black border-b border-black' : 'text-gray-600 hover:text-black'}
      `}
    >
      {item.name}
    </Link>
  </li>
))

const SearchResultItem = memo(({ item, closeSearch }) => {
  const router = useRouter()
  
  const handleClick = (e) => {
    e.preventDefault()
    closeSearch()
    router.push(
      item.type === 'category'
        ? `/categorywiseproduct?categoryId=${item.id}&categoryName=${encodeURIComponent(item.name)}`
        : `/productdetailpage?ProductId=${item.id}`
    )
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      {item.image_urls?.[0] ? (
        <div className="w-10 h-10 rounded overflow-hidden mr-3">
          <img 
            src={item.image_urls[0]} 
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-10 h-10 bg-gray-100 rounded mr-3 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{item.name}</div>
        {item.price && (
          <div className="text-xs text-gray-500">Rs. {item.price.toFixed(2)}</div>
        )}
        {item.product_count !== undefined && (
          <div className="text-xs text-gray-500">{item.product_count} items</div>
        )}
      </div>
    </a>
  )
})

const NavbarCom = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { cartItems } = useCart()
  
  // State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Refs
  const searchRef = useRef(null)
  const mobileMenuRef = useRef(null)

  // Data
  const navItems = React.useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'Kids', path: '/kidspage' },
    { name: 'Sale', path: '/publicsalesproductpage' },
    { name: 'New IN', path: '/newarrivalspage', className: "hover-group" },
    { name: 'Shop', path: '/publicproducts' },
    { name: 'Collections', path: '/publiccategories' },
    { name: 'Contact', path: '/contact' }
  ], [])

  // Effects
  useEffect(() => {
    setIsAuthenticated(!!(typeof window !== 'undefined' && localStorage.getItem('token')))
  }, [])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setIsVisible(currentScrollY <= 10 || currentScrollY < lastScrollY)
          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    const savedSearches = typeof window !== 'undefined' ? localStorage.getItem('recentSearches') : null
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  // Handlers
  const fetchSearchResults = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/ecommerce/categorysearch?q=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      
      if (data.data?.length > 0) {
        const newRecent = [
          query,
          ...recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())
        ].slice(0, 5)
        setRecentSearches(newRecent)
        localStorage.setItem('recentSearches', JSON.stringify(newRecent))
      }

      setSearchResults(data.data || [])
    } catch (error) {
      console.error('Error fetching search results:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [recentSearches])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults(searchQuery)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, fetchSearchResults])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setShowSearchResults(false)
    navigateToSearchResults()
  }

  const navigateToSearchResults = useCallback(() => {
    const exactCategoryMatch = searchResults.find(
      result => result.type === 'category' && 
      result.name.toLowerCase() === searchQuery.toLowerCase()
    )

    if (exactCategoryMatch) {
      router.push(`/categorywiseproduct?categoryId=${exactCategoryMatch.id}&categoryName=${encodeURIComponent(exactCategoryMatch.name)}`)
    } else {
      router.push(`/publicproducts?search=${encodeURIComponent(searchQuery)}`)
    }
  }, [searchQuery, searchResults, router])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      handleSearch(e)
    }
    if (e.key === 'Escape') {
      setShowSearchResults(false)
    }
  }

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '' || recentSearches.length > 0) {
      setShowSearchResults(true)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowSearchResults(false)
  }

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    router.push('/')
  }, [router])

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      {/* Top Contact Bar */}
      <div className={`fixed w-full z-40 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-gradient-to-r from-gray-900 to-black text-white`}>
        <div className="container mx-auto px-6 flex justify-between items-center h-4">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative flex items-center space-x-2 px-4 py-1 rounded-full bg-gray-900 group-hover:bg-gray-800 transition duration-200">
                <FontAwesomeIcon icon={faPhone} className="h-3 w-3 text-amber-400" />
                <span className="text-xs font-light tracking-wider">(+92) 333 1906382</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="relative flex items-center space-x-2 group"
              >
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                <span className="text-xs font-light tracking-wider">LOGOUT</span>
              </button>
            ) : (
              <Link 
                href="/Login" 
                prefetch
                className="relative group"
              >
                <div className="flex items-center space-x-2">
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  <FontAwesomeIcon icon={faSignInAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                  <span className="text-xs font-light tracking-wider">LOGIN</span>
                </div>
              </Link>
            )}
            
            <div className="h-4 w-px bg-gray-600"></div>
            
            <Link 
              href="/signup" 
              prefetch
              className="relative group"
            >
              <div className="flex items-center space-x-2">
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                <FontAwesomeIcon icon={faUserPlus} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                <span className="text-xs font-light tracking-wider">SIGN UP</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`fixed w-full z-40 mt-10 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white border-b border-gray-100`}>
        <div className="container mx-auto flex justify-between items-center px-6 py-2 h-10">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-600"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
            </button>
            
            <Link 
              href="/" 
              prefetch
              className="text-black"
            >
              <span className="text-xl font-light tracking-widest uppercase">
                <span className="font-bold">GOHAR'S SHOP</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <NavItem 
                  key={item.path} 
                  item={item} 
                  pathname={pathname}
                  closeMobileMenu={closeMobileMenu}
                />
              ))}
            </ul>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchFocus}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 sm:w-60 text-sm text-black"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-sm" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-3 py-1 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-sm" />
                </button>
              </form>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-3 space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3 p-2">
                          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    searchResults.length > 0 ? (
                      <>
                        {searchResults.some(item => item.type === 'category') && (
                          <div className="border-b border-gray-100">
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">CATEGORIES</div>
                            {searchResults
                              .filter(item => item.type === 'category')
                              .map(item => (
                                <SearchResultItem 
                                  key={`cat-${item.id}`} 
                                  item={item} 
                                  closeSearch={() => {
                                    setSearchQuery('')
                                    setShowSearchResults(false)
                                  }}
                                />
                              ))
                            }
                          </div>
                        )}

                        {searchResults.some(item => item.type === 'product') && (
                          <div>
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">PRODUCTS</div>
                            {searchResults
                              .filter(item => item.type === 'product')
                              .map(item => (
                                <SearchResultItem 
                                  key={`prod-${item.id}`} 
                                  item={item} 
                                  closeSearch={() => {
                                    setSearchQuery('')
                                    setShowSearchResults(false)
                                  }}
                                />
                              ))
                            }
                          </div>
                        )}

                        <div className="p-2 text-center border-t border-gray-100 bg-gray-50">
                          <Link 
                            href={`/publicproducts?search=${encodeURIComponent(searchQuery)}`}
                            className="text-sm text-blue-600 hover:underline"
                            onClick={() => {
                              setSearchQuery('')
                              setShowSearchResults(false)
                            }}
                          >
                            View all results ({searchResults.length})
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-3 text-center text-gray-500 text-sm">
                        No results found for "{searchQuery}"
                      </div>
                    )
                  ) : recentSearches.length > 0 && (
                    <div>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">RECENT SEARCHES</div>
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          className="flex items-center w-full p-3 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => {
                            setSearchQuery(search)
                            setShowSearchResults(true)
                          }}
                        >
                          <FontAwesomeIcon icon={faClockRotateLeft} className="text-gray-400 mr-3" />
                          <span className="text-sm text-gray-700">{search}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link 
              href="/addtocartpage" 
              prefetch
              className="relative text-gray-600 hover:text-black transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-md" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50"
          >
            <ul className="py-2">
              {navItems.map((item) => (
                <li key={item.path} className="border-b border-gray-100 last:border-b-0">
                  <NavItem 
                    item={item} 
                    pathname={pathname}
                    closeMobileMenu={closeMobileMenu}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  )
}

export default NavbarCom