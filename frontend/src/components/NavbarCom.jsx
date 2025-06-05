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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);
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

  // Fetch new arrivals products for hover box
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch('/api/products/new-arrivals');
        const data = await response.json();
        setNewArrivalsProducts(data);
      } catch (error) {
        console.error('Error fetching new arrivals:', error);
      }
    };

    fetchNewArrivals();
  }, []);

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      // Format results to distinguish between products and categories
      const formattedResults = data.map(item => ({
        ...item,
        type: item.price !== undefined ? 'product' : 'category'
      }));
      
      setSearchResults(formattedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
  e.preventDefault();
  if (!searchQuery.trim()) return;

  setShowSearchResults(false);
  
  // Check if we have any category matches in results (not just exact matches)
  const categoryMatches = searchResults.filter(
    result => result.type === 'category' && 
    result.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If we have category matches, go to the first one
  if (categoryMatches.length > 0) {
    router.push(`/categorywiseproduct?categoryId=${categoryMatches[0].id}&categoryName=${encodeURIComponent(categoryMatches[0].name)}`);
  } else {
    // Otherwise go to regular product search
    router.push(`/publicproducts?search=${encodeURIComponent(searchQuery)}`);
  }
};

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '') {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timer = setTimeout(() => {
      fetchSearchResults(searchQuery);
      setShowSearchResults(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const logout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/');
  };

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
                <span className="font-bold">GOHAR'S SHOP</span>
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
                name: 'New IN', 
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
                  <HoverBox products={newArrivalsProducts} />
                )}
              </li>
            ))}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-7">
            <div className="relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search products or categories..."
                  className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-80 text-sm text-black"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-black text-white rounded-r-md hover:bg-gray-800 transition-colors"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-sm" />
                </button>
              </form>

              {/* Enhanced Search Results Dropdown */}
              {showSearchResults && searchQuery && (
                <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-3 text-center text-gray-500 text-sm">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {/* Categories Section */}
                      {searchResults.some(item => item.type === 'category') && (
                        <div className="border-b border-gray-100">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">CATEGORIES</div>
                          {searchResults.filter(item => item.type === 'category').map(category => (
                                <Link
                                  key={`cat-${category.id}`}
                                  href={`/categorywiseproduct?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`}
                                  className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSearchQuery('');
                                    setShowSearchResults(false);
                                    router.push(`/categorywiseproduct?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`);
                                  }}
                                >
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                <div className="text-xs text-gray-500">{category.productCount || 0} items</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Products Section */}
                      {searchResults.some(item => item.type === 'product') && (
                        <div>
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">PRODUCTS</div>
                          {searchResults.filter(item => item.type === 'product').map(product => (
                            <Link
                              key={`prod-${product.id}`}
                              href={`/productdetailpage?ProductId=${product.id}`}
                              className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                              <img 
                                src={`http://localhost:8000/${product.image}`} 
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded mr-3"
                                onError={(e) => {
                                  e.target.src = '/images/placeholder-product.jpg';
                                }}
                              />
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500">Rs. {product.price.toFixed(2)}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* View All Results */}
                      <div className="p-2 text-center border-t border-gray-100 bg-gray-50">
                        <Link 
                          href={`/publicproducts?search=${encodeURIComponent(searchQuery)}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View all results ({searchResults.length})
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 text-center text-gray-500 text-sm">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
            
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