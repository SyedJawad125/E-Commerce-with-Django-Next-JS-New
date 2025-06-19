// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicSalesProductsCom = () => {
//     const router = useRouter();
//     const [records, setRecords] = useState([]);
//     const [data, setData] = useState([]);
//     const [flag, setFlag] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [sliderHeight, setSliderHeight] = useState('100vh'); // Default to full viewport height
//     const productsRef = useRef(null);
//     const sliderRef = useRef(null);

//     useEffect(() => {
//         if (router.query && router.query.name) {
//             toast.success(router.query.name);
//             router.push('/products', undefined, { shallow: true });
//         } else if (flag) {
//             toast.success('Product deleted');
//             setFlag(false);
//         }

//         const receiveData = async () => {
//             try {
//                 // Fetch sales products
//                 const res = await AxiosInstance.get('/ecommerce/publicsalesproduct');
//                 if (res) {
//                     setRecords(res.data.data.data);
//                     setData(res.data);
//                 }

//                 // Fetch categories
//                 const categoriesRes = await AxiosInstance.get('/ecommerce/publiccategory');
//                 if (categoriesRes && categoriesRes.data) {
//                     setCategories(categoriesRes.data.data.data);
//                 }
//             } catch (error) {
//                 console.log('Error occurred', error);
//             }
//         };

//         receiveData();
//     }, [flag, router.query?.name]);

//     // Set fixed height for slider based on products container
//     useEffect(() => {
//         const updateSliderHeight = () => {
//             if (productsRef.current) {
//                 const productsHeight = productsRef.current.offsetHeight;
//                 setSliderHeight(`${productsHeight}px`);
//             }
//         };

//         updateSliderHeight();
//         window.addEventListener('resize', updateSliderHeight);

//         return () => {
//             window.removeEventListener('resize', updateSliderHeight);
//         };
//     }, [records]); // Update when records change or on resize

//     const handleProductClick = (ProductId) => {
//         router.push(`/salesproductdetailspage?ProductId=${ProductId}`);
//     };

//     const handleCategoryClick = (categoryId) => {
//         router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             {/* Left Side - Categories Slider */}
//             <div 
//                 ref={sliderRef}
//                 className="w-[10%] bg-gray-100 shadow-lg ml-4 relative overflow-hidden" 
//                 style={{ height: sliderHeight }}
//             >
//                 <div className="absolute top-0 left-0 right-0 animate-scrollUp">
//                     {/* Combined list for smooth scroll */}
//                     {[...categories, ...categories].map((category, index) => (
//                         <div
//                             key={`${category.id}-${index}`}
//                             onClick={() => handleCategoryClick(category.id)}
//                             className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
//                         >
//                             <img
//                                 src={`http://localhost:8000/${category.image}`}
//                                 alt={category.name}
//                                 className="w-full h-28 object-cover rounded"
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Top and bottom gradient masks */}
//                 <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-transparent z-10 pointer-events-none" />
//                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
//             </div>

//             {/* Right Side - Products */}
//             <div className="w-[85%] p-8" ref={productsRef}>
//                 {/* Header Section */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-serif text-gray-900 font-bold mb-16 mt-10 tracking-wider">EXCLUSIVE SALES</h2>
//                 </div>

//                 {/* Products Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                     {records.length > 0 ? (
//                         records.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg cursor-pointer"
//                                 onClick={() => handleProductClick(item.id)}
//                             >
//                                 {/* Discount Ribbon */}
//                                 {item.discount_percent > 0 && (
//                                     <div className="absolute top-4 right-0 bg-gradient-to-r from-amber-500 to-amber-800 text-white text-xs font-bold px-3 py-1 shadow-md z-10 transform rotate-12 origin-left">
//                                         {item.discount_percent}% OFF
//                                     </div>
//                                 )}
                                
//                                 {/* Image Container */}
//                                 <div className="relative overflow-hidden">
//                                     <div className="aspect-w-1 aspect-h-1">
//                                         <img
//                                             src={`http://localhost:8000/${item.image}`}
//                                             className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
//                                             alt={item.name}
//                                         />
//                                     </div>
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                                 </div>
                                
//                                 {/* Product Details */}
//                                 <div className="p-5">
//                                     <h5 className="text-lg font-serif font-medium text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{item.name}</h5>
//                                     <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2">{item.description}</p>
                                    
//                                     <div className="flex items-baseline justify-between">
//                                         <div>
//                                             {item.discount_percent > 0 && (
//                                                 <p className="text-ms text-gray-400 line-through">Rs. {item.original_price}</p>
//                                             )}
//                                             <p className="text-lg font-bold text-amber-800">
//                                                 Rs. {item.final_price}
//                                             </p>
//                                             {item.discount_percent > 0 && (
//                                                 <p className="text-xs text-green-600">You save Rs.{(item.original_price - item.final_price).toFixed(2)}</p>
//                                             )}
//                                         </div>
//                                         <button className="text-amber-800 hover:text-amber-900 transition-colors">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="col-span-full text-center py-16">
//                             <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4"></div>
//                             <p className="text-gray-600 font-light">LOADING EXCLUSIVE OFFERS...</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <ToastContainer 
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 toastClassName="bg-white text-gray-800 shadow-xl rounded-lg"
//                 progressClassName="bg-gradient-to-r from-amber-500 to-amber-800"
//             />

//             {/* Animation */}
//             <style jsx>{`
//                 @keyframes scrollUp {
//                     0% {
//                         transform: translateY(0);
//                     }
//                     100% {
//                         transform: translateY(-${categories.length * 120}px);
//                     }
//                 }
//                 .animate-scrollUp {
//                     animation: scrollUp ${categories.length * 5}s linear infinite;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default PublicSalesProductsCom;



// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicSalesProductsCom = () => {
//     const router = useRouter();
//     const [records, setRecords] = useState([]);
//     const [data, setData] = useState([]);
//     const [flag, setFlag] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [sliderHeight, setSliderHeight] = useState('100vh');
//     const productsRef = useRef(null);
//     const sliderRef = useRef(null);
    
//     // Pagination state
//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 10,
//         offset: 0,
//         totalPages: 1,
//         count: 0,
//         hasNext: false,
//         hasPrevious: false
//     });

//     useEffect(() => {
//         if (router.query && router.query.name) {
//             toast.success(router.query.name);
//             router.push('/products', undefined, { shallow: true });
//         } else if (flag) {
//             toast.success('Product deleted');
//             setFlag(false);
//         }

//         const receiveData = async () => {
//             try {
//                 // Fetch sales products with pagination parameters
//                 const res = await AxiosInstance.get('/ecommerce/publicsalesproduct', {
//                     params: {
//                         page: pagination.page,
//                         limit: pagination.limit,
//                         offset: pagination.offset
//                     }
//                 });
//                 if (res) {
//                     setRecords(res.data.data.data);
//                     setData(res.data);
                    
//                     // Update pagination state from response
//                     setPagination(prev => ({
//                         ...prev,
//                         totalPages: res.data.data.total_pages,
//                         count: res.data.data.count,
//                         hasNext: res.data.data.next,
//                         hasPrevious: res.data.data.previous
//                     }));
//                 }

//                 // Fetch categories
//                 const categoriesRes = await AxiosInstance.get('/ecommerce/publiccategory');
//                 if (categoriesRes && categoriesRes.data) {
//                     setCategories(categoriesRes.data.data.data);
//                 }
//             } catch (error) {
//                 console.log('Error occurred', error);
//             }
//         };

//         receiveData();
//     }, [flag, router.query?.name, pagination.page, pagination.limit, pagination.offset]);

//     // Set fixed height for slider based on products container
//     useEffect(() => {
//         const updateSliderHeight = () => {
//             if (productsRef.current) {
//                 const productsHeight = productsRef.current.offsetHeight;
//                 setSliderHeight(`${productsHeight}px`);
//             }
//         };

//         updateSliderHeight();
//         window.addEventListener('resize', updateSliderHeight);

//         return () => {
//             window.removeEventListener('resize', updateSliderHeight);
//         };
//     }, [records]);

//     const handleProductClick = (ProductId) => {
//         router.push(`/salesproductdetailspage?ProductId=${ProductId}`);
//     };

//     const handleCategoryClick = (categoryId) => {
//         router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
//     };

//     // Pagination handlers
//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= pagination.totalPages) {
//             setPagination(prev => ({ ...prev, page: newPage }));
//         }
//     };

//     const handleLimitChange = (e) => {
//         const newLimit = parseInt(e.target.value);
//         setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             {/* Left Side - Categories Slider */}
//             <div 
//                 ref={sliderRef}
//                 className="w-[10%] bg-gray-100 shadow-lg ml-4 relative overflow-hidden" 
//                 style={{ height: sliderHeight }}
//             >
//                 <div className="absolute top-0 left-0 right-0 animate-scrollUp">
//                     {/* Combined list for smooth scroll */}
//                     {[...categories, ...categories].map((category, index) => (
//                         <div
//                             key={`${category.id}-${index}`}
//                             onClick={() => handleCategoryClick(category.id)}
//                             className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
//                         >
//                             <img
//                                 src={`http://localhost:8000/${category.image}`}
//                                 alt={category.name}
//                                 className="w-full h-28 object-cover rounded"
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Top and bottom gradient masks */}
//                 <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-transparent z-10 pointer-events-none" />
//                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
//             </div>

//             {/* Right Side - Products */}
//             <div className="w-[85%] p-8" ref={productsRef}>
//                 {/* Header Section */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-4xl font-serif text-gray-900 font-bold mb-16 mt-10 tracking-wider">EXCLUSIVE SALES</h2>
//                 </div>

//                 {/* Products Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
//                     {records.length > 0 ? (
//                         records.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg cursor-pointer"
//                                 onClick={() => handleProductClick(item.id)}
//                             >
//                                 {/* Discount Ribbon */}
//                                 {item.discount_percent > 0 && (
//                                     <div className="absolute top-4 right-0 bg-gradient-to-r from-amber-500 to-amber-800 text-white text-xs font-bold px-3 py-1 shadow-md z-10 transform rotate-12 origin-left">
//                                         {item.discount_percent}% OFF
//                                     </div>
//                                 )}
                                
//                                 {/* Image Container */}
//                                 <div className="relative overflow-hidden">
//                                     <div className="aspect-w-1 aspect-h-1">
//                                         <img
//                                             src={`http://localhost:8000/${item.image}`}
//                                             className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
//                                             alt={item.name}
//                                         />
//                                     </div>
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                                 </div>
                                
//                                 {/* Product Details */}
//                                 <div className="p-5">
//                                     <h5 className="text-lg font-serif font-medium text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{item.name}</h5>
//                                     <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2">{item.description}</p>
                                    
//                                     <div className="flex items-baseline justify-between">
//                                         <div>
//                                             {item.discount_percent > 0 && (
//                                                 <p className="text-ms text-gray-400 line-through">Rs. {item.original_price}</p>
//                                             )}
//                                             <p className="text-lg font-bold text-amber-800">
//                                                 Rs. {item.final_price}
//                                             </p>
//                                             {item.discount_percent > 0 && (
//                                                 <p className="text-xs text-green-600">You save Rs.{(item.original_price - item.final_price).toFixed(2)}</p>
//                                             )}
//                                         </div>
//                                         <button className="text-amber-800 hover:text-amber-900 transition-colors">
//                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="col-span-full text-center py-16">
//                             <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4"></div>
//                             <p className="text-gray-600 font-light">LOADING EXCLUSIVE OFFERS...</p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Pagination Controls */}
//                 {records.length > 0 && (
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
//                         <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-600">Items per page:</span>
//                             <select 
//                                 value={pagination.limit}
//                                 onChange={handleLimitChange}
//                                 className="border rounded px-2 py-1 text-sm"
//                             >
//                                 <option value="10">10</option>
//                                 <option value="20">20</option>
//                                 <option value="50">50</option>
//                                 <option value="100">100</option>
//                             </select>
//                         </div>
                        
//                         <div className="flex items-center gap-2">
//                             <span className="text-sm text-gray-600">
//                                 Showing {((pagination.page - 1) * pagination.limit) + 1}-
//                                 {Math.min(pagination.page * pagination.limit, pagination.count)} of {pagination.count}
//                             </span>
//                         </div>
                        
//                         <div className="flex gap-2">
//                             <button
//                                 onClick={() => handlePageChange(1)}
//                                 disabled={pagination.page === 1}
//                                 className={`px-3 py-1 rounded ${pagination.page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
//                             >
//                                 First
//                             </button>
//                             <button
//                                 onClick={() => handlePageChange(pagination.page - 1)}
//                                 disabled={!pagination.hasPrevious}
//                                 className={`px-3 py-1 rounded ${!pagination.hasPrevious ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
//                             >
//                                 Previous
//                             </button>
                            
//                             {/* Page numbers - showing limited pages around current */}
//                             {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                                 let pageNum;
//                                 if (pagination.totalPages <= 5) {
//                                     pageNum = i + 1;
//                                 } else if (pagination.page <= 3) {
//                                     pageNum = i + 1;
//                                 } else if (pagination.page >= pagination.totalPages - 2) {
//                                     pageNum = pagination.totalPages - 4 + i;
//                                 } else {
//                                     pageNum = pagination.page - 2 + i;
//                                 }
                                
//                                 return (
//                                     <button
//                                         key={pageNum}
//                                         onClick={() => handlePageChange(pageNum)}
//                                         className={`px-3 py-1 rounded ${pagination.page === pageNum ? 'bg-amber-500 text-white' : 'bg-amber-100 hover:bg-amber-200'}`}
//                                     >
//                                         {pageNum}
//                                     </button>
//                                 );
//                             })}
                            
//                             <button
//                                 onClick={() => handlePageChange(pagination.page + 1)}
//                                 disabled={!pagination.hasNext}
//                                 className={`px-3 py-1 rounded ${!pagination.hasNext ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
//                             >
//                                 Next
//                             </button>
//                             <button
//                                 onClick={() => handlePageChange(pagination.totalPages)}
//                                 disabled={pagination.page === pagination.totalPages}
//                                 className={`px-3 py-1 rounded ${pagination.page === pagination.totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
//                             >
//                                 Last
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <ToastContainer 
//                 position="bottom-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 toastClassName="bg-white text-gray-800 shadow-xl rounded-lg"
//                 progressClassName="bg-gradient-to-r from-amber-500 to-amber-800"
//             />

//             {/* Animation */}
//             <style jsx>{`
//                 @keyframes scrollUp {
//                     0% {
//                         transform: translateY(0);
//                     }
//                     100% {
//                         transform: translateY(-${categories.length * 120}px);
//                     }
//                 }
//                 .animate-scrollUp {
//                     animation: scrollUp ${categories.length * 5}s linear infinite;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default PublicSalesProductsCom;









'use client';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const SalesProductsCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 12,
    offset: 0,
    totalPages: 1,
    count: 0,
    next: false,
    previous: false
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const modalRef = useRef(null);
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Handle modal focus
  useEffect(() => {
    if (showDetailsModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showDetailsModal]);

  useEffect(() => {
    const fetchSalesProducts = async () => {
      try {
        setIsLoading(true);
        const { currentPage, limit, offset } = pagination;
        const res = await AxiosInstance.get(
          `/ecommerce/publicsalesproduct?page=${currentPage}&limit=${limit}&offset=${offset}`
        );
        
        const responseData = res?.data?.data;
        const dataArr = responseData?.data || [];
        
        // Process images similar to ProductsCom
        const processed = dataArr.map(product => ({
          ...product,
          mainImage: product.image_urls?.[0] 
            ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
            : '/default-product-image.jpg',
          remainingImages: product.image_urls?.slice(1).map(u => 
            `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
          ) || []
        }));
        
        setRecords(processed);
        setFilteredRecords(processed);
        setPagination(prev => ({
          ...prev,
          count: responseData?.count || 0,
          totalPages: responseData?.total_pages || 1,
          next: responseData?.next || false,
          previous: responseData?.previous || false
        }));
      } catch (error) {
        console.error('Error fetching sale products:', error);
        toast.error('Failed to load sale products', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await AxiosInstance.get('/ecommerce/category');
        if (res?.data?.data) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchSalesProducts();
    fetchCategories();
  }, [pagination.currentPage, pagination.limit, pagination.offset, baseURL]);

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = records.filter((record) => {
      const idMatch = record.id.toString() === value;
      const nameMatch = record.name.toLowerCase().includes(value);
      const categoryMatch = record.category_name?.toLowerCase().includes(value);
      return idMatch || nameMatch || categoryMatch;
    });

    setFilteredRecords(filtered);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const deleteRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await AxiosInstance.delete(`/ecommerce/salesproduct?id=${id}`);
      setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
      
      if (selectedProduct?.id === id) {
        closeDetailsModal();
      }
      
      toast.success('Product removed successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error('Error deleting product', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const updateRecord = async (saleproductid) => {
    router.push(`/updatesalesproductpage?saleproductid=${saleproductid}`);
  };

  const handleCategoryClick = (categoryId) => {
    const filtered = records.filter(record => record.category_id === categoryId);
    setFilteredRecords(filtered);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ 
      ...prev, 
      limit: newLimit,
      currentPage: 1,
      offset: 0
    }));
  };

  const handleOffsetChange = (e) => {
    const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
    setPagination(prev => ({ 
      ...prev, 
      offset: newOffset,
      currentPage: 1
    }));
  };


  if (!permissions.read_sales_product) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
            <p className="text-gray-300 mb-6">
              You don't have permission to view products. Please contact your administrator.
            </p>
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      );
    }
  
  return (
    <div className="flex min-h-screen bg-gray-50 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Right Side - Products */}
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer 
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        {/* Product Details Modal */}
        {showDetailsModal && selectedProduct && (
          <div 
            ref={modalRef}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeDetailsModal}
          >
            <div 
              className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                <button 
                  onClick={closeDetailsModal} 
                  className="text-gray-400 hover:text-white text-3xl"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                <div>
                  <img 
                    src={selectedProduct.mainImage} 
                    alt={selectedProduct.name}
                    className="w-full h-80 object-contain bg-gray-700 rounded-lg" 
                  />
                  {selectedProduct.remainingImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {selectedProduct.remainingImages.map((img, i) => (
                        <img 
                          key={i} 
                          src={img} 
                          className="h-20 object-cover rounded" 
                          alt={`Additional view ${i + 1}`} 
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="text-gray-300">
                  <h3 className="text-lg font-semibold text-amber-400 mb-2">Description</h3>
                  <p>{selectedProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <h3 className="font-semibold text-amber-400">Category</h3>
                      <p>{selectedProduct.category_name || selectedProduct.category?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-400">Original Price</h3>
                      <p>PKR {selectedProduct.original_price}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-400">Discount</h3>
                      <p>{selectedProduct.discount_percent}% OFF</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-400">Final Price</h3>
                      <p>PKR {selectedProduct.final_price}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-400">Created At</h3>
                      <p>{new Date(selectedProduct.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-400">Created By</h3>
                      <p>{selectedProduct.created_by?.get_full_name || selectedProduct.created_by?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex mt-6 space-x-4">
                    {permissions.update_sales_product && (
                      <button 
                        onClick={() => {
                          updateRecord(selectedProduct.id);
                          closeDetailsModal();
                        }}
                        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                      >
                        Edit
                      </button>
                    )}
                    
                    {permissions.delete_sales_product && (
                      <button 
                        onClick={() => deleteRecord(selectedProduct.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    )}
                    
                    <button 
                      onClick={closeDetailsModal}
                      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl font-light text-white mb-2">EXCLUSIVE OFFERS</h1>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            </div>
            
            {permissions.create_sales_product && (
              <button
                className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105"
                onClick={() => router.push('/addsalesproductpage')}
              >
                + Add Sale Product
              </button>
            )}
          </div>

          {/* Stats and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="text-amber-400 font-light">
              Showing {filteredRecords.length} of {pagination.count} products
              {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search sale products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
                />
                <svg
                  className="absolute left-3 top-3 h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              
              <div className="flex gap-2 items-center">
                <select 
                  value={pagination.limit}
                  onChange={handleLimitChange}
                  className="bg-gray-800 text-white rounded-full px-3 py-2 border border-gray-700 focus:outline-none focus:ring-amber-500"
                >
                  <option value="12">12 per page</option>
                  <option value="24">24 per page</option>
                  <option value="36">36 per page</option>
                  <option value="48">48 per page</option>
                </select>
                
                <input
                  type="number"
                  value={pagination.offset}
                  onChange={handleOffsetChange}
                  min="0"
                  max={pagination.count}
                  placeholder="Offset"
                  className="bg-gray-800 text-white rounded-full px-3 py-2 w-20 border border-gray-700 focus:outline-none focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(pagination.limit)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-800 rounded-lg h-80"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && (
            <>
              {filteredRecords.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredRecords.map((item) => (
                    <div 
                      key={item.id} 
                      className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
                    >
                      {/* Sale Badge */}
                      <div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {item.discount_percent}% OFF
                      </div>
                      
                      {/* Image with Text Overlay */}
                      <div className="relative h-80 w-full">
                        <img
                          src={item.mainImage}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt={item.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                        
                        {/* Additional images badge */}
                        {item.remainingImages.length > 0 && (
                          <div className="absolute top-4 left-4 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            +{item.remainingImages.length}
                          </div>
                        )}
                        
                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                          <h3 className="text-xl font-light text-white mb-1">{item.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-amber-400 font-medium">PKR {item.final_price}</span>
                            <span className="text-gray-400 line-through text-sm">PKR {item.original_price}</span>
                          </div>
                          <p className="text-gray-300 text-xs font-light mt-1 line-clamp-2">{item.description}</p>
                          <span className="text-xs text-gray-400 uppercase block mt-1">{item.category_name}</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <div className="flex space-x-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetailsModal(item);
                            }}
                            className="px-4 py-2 bg-white/10 text-white text-xs font-medium uppercase rounded-full hover:bg-white/20 transition-colors duration-300"
                          >
                            Details
                          </button>
                          
                          {permissions.update_sales_product && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRecord(item.id);
                              }}
                              className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase rounded-full hover:bg-amber-700 transition-colors duration-300"
                            >
                              Edit
                            </button>
                          )}
                          
                          {permissions.delete_sales_product && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteRecord(item.id);
                              }}
                              className="px-4 py-2 bg-transparent border border-red-500 text-red-500 text-xs font-medium uppercase rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-white">No sale products found</h3>
                  <p className="mt-1 text-gray-400">Try adjusting your search or add new sale products</p>
                </div>
              )}
            </>
          )}

          {/* Enhanced Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-4">
              <div className="text-gray-400 text-sm">
                Page {pagination.currentPage} of {pagination.totalPages} • Total {pagination.count} products
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  aria-label="First page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.previous}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  aria-label="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-full text-sm transition-colors ${
                          pagination.currentPage === pageNum
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}
                        aria-label={`Page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.next}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                  aria-label="Last page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesProductsCom;