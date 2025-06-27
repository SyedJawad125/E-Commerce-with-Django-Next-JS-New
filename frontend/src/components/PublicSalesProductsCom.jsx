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

//    useEffect(() => {
//     const fetchSalesProducts = async () => {
//       try {
//         setIsLoading(true);
//         const { currentPage, limit, offset } = pagination;
//         const res = await AxiosInstance.get(
//           `/ecommerce/publicsalesproduct?page=${currentPage}&limit=${limit}&offset=${offset}`
//         );
        
//         const responseData = res?.data?.data;
//         const dataArr = responseData?.data || [];
        
//         // Process images similar to ProductsCom
//         const processed = dataArr.map(product => ({
//           ...product,
//           mainImage: product.image_urls?.[0] 
//             ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
//             : '/default-product-image.jpg',
//           remainingImages: product.image_urls?.slice(1).map(u => 
//             `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
//           ) || []
//         }));
        
//         setRecords(processed);
//         setFilteredRecords(processed);
//         setPagination(prev => ({
//           ...prev,
//           count: responseData?.count || 0,
//           totalPages: responseData?.total_pages || 1,
//           next: responseData?.next || false,
//           previous: responseData?.previous || false
//         }));
//       } catch (error) {
//         console.error('Error fetching sale products:', error);
//         toast.error('Failed to load sale products', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/category');
//         if (res?.data?.data) {
//           setCategories(res.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchSalesProducts();
//     fetchCategories();
//   }, [refreshKey, pagination.currentPage, pagination.limit, pagination.offset, baseURL]);
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






'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";

const PublicSalesProductsCom = () => {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [sliderHeight, setSliderHeight] = useState('auto');
    const [refreshKey, setRefreshKey] = useState(0);
    const productsRef = useRef(null);
    const resizeObserverRef = useRef(null);
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    
    // Pagination state
    const [pagination, setPagination] = useState({
        currentPage: 1,
        limit: 10,
        offset: 0,
        totalPages: 1,
        count: 0,
        next: false,
        previous: false
    });

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
                
                // Process images
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
                const res = await AxiosInstance.get('/ecommerce/slidercategory');
                setCategories(Array.isArray(res?.data?.data?.data) ? res.data.data.data : []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        };

        fetchSalesProducts();
        fetchCategories();
    }, [refreshKey, pagination.currentPage, pagination.limit, pagination.offset, baseURL]);

    // Update slider height when records change or window resizes
    useEffect(() => {
        const updateSliderHeight = () => {
            if (productsRef.current) {
                const productsHeight = productsRef.current.offsetHeight;
                setSliderHeight(`${productsHeight}px`);
            }
        };

        if (!resizeObserverRef.current && productsRef.current) {
            resizeObserverRef.current = new ResizeObserver(updateSliderHeight);
            resizeObserverRef.current.observe(productsRef.current);
        }

        updateSliderHeight();

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [records]);

    // const handleProductClick = (ProductId) => {
    //     router.push(`/salesproductdetailspage?ProductId=${ProductId}`);
    // };

    const handleProductClick = (product) => {
    const query = new URLSearchParams({
        ProductId: product.id.toString(),
        productData: JSON.stringify(product)
    }).toString();

    router.push(`/salesproductdetailspage?${query}`);
};

    const handleCategoryClick = (categoryId) => {
        router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
    };

    // Pagination handlers
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, currentPage: newPage }));
        }
    };

    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        setPagination(prev => ({ ...prev, limit: newLimit, currentPage: 1 }));
    };

    const handleOffsetChange = (e) => {
        const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
        setPagination(prev => ({ 
            ...prev, 
            offset: newOffset,
            currentPage: 1
        }));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Side - Categories Slider */}
            <div className="w-[10%] bg-gray-100 shadow-lg ml-4 relative overflow-hidden" style={{ height: sliderHeight }}>
                <div className="absolute top-0 left-0 right-0 animate-scrollUp">
                    {categories.length > 0 && 
                        [...categories, ...categories].map((category, index) => (
                            <div
                                key={`${category.id}-${index}`}
                                onClick={() => handleCategoryClick(category.id)}
                                className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
                            >
                                <img
                                    src={`${baseURL}${category.image?.startsWith('/') ? '' : '/'}${category.image}`}
                                    alt={category.name}
                                    className="w-full h-28 object-cover rounded"
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
            </div>

            {/* Right Side - Products */}
            <div className="w-[85%] p-8" ref={productsRef}>
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-gray-900 font-bold mb-16 mt-10 tracking-wider">EXCLUSIVE SALES</h2>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                    {!isLoading && filteredRecords.length > 0 ? (
                        filteredRecords.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg cursor-pointer"
                                onClick={() => handleProductClick(item)}
                            >
                                {/* Discount Ribbon */}
                                {item.discount_percent > 0 && (
                                    <div className="absolute top-4 right-0 bg-gradient-to-r from-amber-500 to-amber-800 text-white text-xs font-bold px-3 py-1 shadow-md z-10 transform rotate-12 origin-left">
                                        {item.discount_percent}% OFF
                                    </div>
                                )}
                                
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <div className="aspect-w-1 aspect-h-1">
                                        <img
                                            src={item.mainImage}
                                            className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Additional images badge */}
                                    {/* {item.remainingImages.length > 0 && (
                                        <div className="absolute top-4 left-4 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            +{item.remainingImages.length}
                                        </div>
                                    )} */}
                                </div>
                                
                                {/* Product Details */}
                                <div className="p-5">
                                    <h5 className="text-lg font-serif font-medium text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{item.name}</h5>
                                    <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2">{item.description}</p>
                                    
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            {item.discount_percent > 0 && (
                                                <p className="text-ms text-gray-400 line-through">Rs. {item.original_price}</p>
                                            )}
                                            <p className="text-lg font-bold text-amber-800">
                                                Rs. {item.final_price}
                                            </p>
                                            {item.discount_percent > 0 && (
                                                <p className="text-xs text-green-600">You save Rs.{(item.original_price - item.final_price).toFixed(2)}</p>
                                            )}
                                        </div>
                                        <button className="text-amber-800 hover:text-amber-900 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : isLoading ? (
                        <div className="col-span-full text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4"></div>
                            <p className="text-gray-600 font-light">LOADING EXCLUSIVE OFFERS...</p>
                        </div>
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No sale products found</h3>
                            <p className="mt-1 text-gray-500">Try adjusting your search or check back later</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {!isLoading && filteredRecords.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Items per page:</span>
                            <select 
                                value={pagination.limit}
                                onChange={handleLimitChange}
                                className="border rounded px-2 py-1 text-sm"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            
                            <input
                                type="number"
                                value={pagination.offset}
                                onChange={handleOffsetChange}
                                min="0"
                                max={pagination.count}
                                placeholder="Offset"
                                className="border rounded px-2 py-1 text-sm w-20"
                            />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                                Showing {((pagination.currentPage - 1) * pagination.limit) + 1}-
                                {Math.min(pagination.currentPage * pagination.limit, pagination.count)} of {pagination.count}
                            </span>
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={pagination.currentPage === 1}
                                className={`px-3 py-1 rounded ${pagination.currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
                            >
                                First
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={!pagination.previous}
                                className={`px-3 py-1 rounded ${!pagination.previous ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
                            >
                                Previous
                            </button>
                            
                            {/* Page numbers - showing limited pages around current */}
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
                                        className={`px-3 py-1 rounded ${pagination.currentPage === pageNum ? 'bg-amber-500 text-white' : 'bg-amber-100 hover:bg-amber-200'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            
                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={!pagination.next}
                                className={`px-3 py-1 rounded ${!pagination.next ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
                            >
                                Next
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.totalPages)}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className={`px-3 py-1 rounded ${pagination.currentPage === pagination.totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
                            >
                                Last
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="bg-white text-gray-800 shadow-xl rounded-lg"
                progressClassName="bg-gradient-to-r from-amber-500 to-amber-800"
            />

            <style jsx>{`
                @keyframes scrollUp {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-${categories.length * 120}px);
                    }
                }
                .animate-scrollUp {
                    animation: scrollUp ${categories.length * 5}s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default PublicSalesProductsCom;