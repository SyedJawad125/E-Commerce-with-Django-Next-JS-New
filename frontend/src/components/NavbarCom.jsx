'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faSearch,
  faPhone,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/components/CartContext';
import HoverBox from '@/components/HoverBox';

const NavbarCom = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [hovering, setHovering] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { cartItems } = useCart();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const logout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/');
  };

  const sampleProducts = [
    { id: 1, img1: 'images/7.jpg', name: 'Leather Bag' },
    { id: 2, img2: 'images/8.jpg', name: 'Pent Coat' },
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
                disabled={isLoggingOut} 
                className={`relative flex items-center space-x-2 group ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                <FontAwesomeIcon icon={faSignOutAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                <span className="text-xs font-light tracking-wider">LOGOUT</span>
              </button>
            ) : (
              <Link href="/Login" className="relative group">
                <div className="flex items-center space-x-2">
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                  <FontAwesomeIcon icon={faSignInAlt} className="h-3 w-3 text-amber-400 group-hover:text-amber-300 transition duration-200" />
                  <span className="text-xs font-light tracking-wider">LOGIN</span>
                </div>
              </Link>
            )}
            
            <div className="h-4 w-px bg-gray-600"></div>
            
            <Link href="/signup" className="relative group">
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
          {/* Logo */}
          <div className="text-black">
            <Link href="/">
              <span className="text-xl font-light tracking-widest uppercase">
                <span className="font-bold">ÉLÉGANCE</span>
              </span>
            </Link>
          </div>

          {/* Main Navigation */}
          <ul className="hidden md:flex space-x-6 items-center">
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
                    text-xs 
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
          <div className="flex items-center space-x-5">
            <button className="text-gray-600 hover:text-black transition-colors">
              <FontAwesomeIcon icon={faSearch} className="text-md" />
            </button>
            
            <Link href="/addtocartpage" className="relative">
              <div className="text-gray-600 hover:text-black transition-colors">
                <FontAwesomeIcon icon={faShoppingCart} className="text-md" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden under fixed nav */}
      <div className="h-20"></div>
    </>
  );
};

export default NavbarCom;