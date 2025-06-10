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



'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";

const PublicSalesProductsCom = () => {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sliderHeight, setSliderHeight] = useState('100vh');
    const productsRef = useRef(null);
    const sliderRef = useRef(null);
    
    // Pagination state
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        totalPages: 1,
        count: 0,
        hasNext: false,
        hasPrevious: false
    });

    useEffect(() => {
        if (router.query && router.query.name) {
            toast.success(router.query.name);
            router.push('/products', undefined, { shallow: true });
        } else if (flag) {
            toast.success('Product deleted');
            setFlag(false);
        }

        const receiveData = async () => {
            try {
                // Fetch sales products with pagination parameters
                const res = await AxiosInstance.get('/ecommerce/publicsalesproduct', {
                    params: {
                        page: pagination.page,
                        limit: pagination.limit,
                        offset: pagination.offset
                    }
                });
                if (res) {
                    setRecords(res.data.data.data);
                    setData(res.data);
                    
                    // Update pagination state from response
                    setPagination(prev => ({
                        ...prev,
                        totalPages: res.data.data.total_pages,
                        count: res.data.data.count,
                        hasNext: res.data.data.next,
                        hasPrevious: res.data.data.previous
                    }));
                }

                // Fetch categories
                const categoriesRes = await AxiosInstance.get('/ecommerce/publiccategory');
                if (categoriesRes && categoriesRes.data) {
                    setCategories(categoriesRes.data.data.data);
                }
            } catch (error) {
                console.log('Error occurred', error);
            }
        };

        receiveData();
    }, [flag, router.query?.name, pagination.page, pagination.limit, pagination.offset]);

    // Set fixed height for slider based on products container
    useEffect(() => {
        const updateSliderHeight = () => {
            if (productsRef.current) {
                const productsHeight = productsRef.current.offsetHeight;
                setSliderHeight(`${productsHeight}px`);
            }
        };

        updateSliderHeight();
        window.addEventListener('resize', updateSliderHeight);

        return () => {
            window.removeEventListener('resize', updateSliderHeight);
        };
    }, [records]);

    const handleProductClick = (ProductId) => {
        router.push(`/salesproductdetailspage?ProductId=${ProductId}`);
    };

    const handleCategoryClick = (categoryId) => {
        router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
    };

    // Pagination handlers
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Side - Categories Slider */}
            <div 
                ref={sliderRef}
                className="w-[10%] bg-gray-100 shadow-lg ml-4 relative overflow-hidden" 
                style={{ height: sliderHeight }}
            >
                <div className="absolute top-0 left-0 right-0 animate-scrollUp">
                    {/* Combined list for smooth scroll */}
                    {[...categories, ...categories].map((category, index) => (
                        <div
                            key={`${category.id}-${index}`}
                            onClick={() => handleCategoryClick(category.id)}
                            className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
                        >
                            <img
                                src={`http://localhost:8000/${category.image}`}
                                alt={category.name}
                                className="w-full h-28 object-cover rounded"
                            />
                        </div>
                    ))}
                </div>

                {/* Top and bottom gradient masks */}
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
                    {records.length > 0 ? (
                        records.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg cursor-pointer"
                                onClick={() => handleProductClick(item.id)}
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
                                            src={`http://localhost:8000/${item.image}`}
                                            className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4"></div>
                            <p className="text-gray-600 font-light">LOADING EXCLUSIVE OFFERS...</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {records.length > 0 && (
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
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                                Showing {((pagination.page - 1) * pagination.limit) + 1}-
                                {Math.min(pagination.page * pagination.limit, pagination.count)} of {pagination.count}
                            </span>
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={pagination.page === 1}
                                className={`px-3 py-1 rounded ${pagination.page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
                            >
                                First
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={!pagination.hasPrevious}
                                className={`px-3 py-1 rounded ${!pagination.hasPrevious ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
                            >
                                Previous
                            </button>
                            
                            {/* Page numbers - showing limited pages around current */}
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                let pageNum;
                                if (pagination.totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (pagination.page <= 3) {
                                    pageNum = i + 1;
                                } else if (pagination.page >= pagination.totalPages - 2) {
                                    pageNum = pagination.totalPages - 4 + i;
                                } else {
                                    pageNum = pagination.page - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-3 py-1 rounded ${pagination.page === pageNum ? 'bg-amber-500 text-white' : 'bg-amber-100 hover:bg-amber-200'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            
                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={!pagination.hasNext}
                                className={`px-3 py-1 rounded ${!pagination.hasNext ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
                            >
                                Next
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.totalPages)}
                                disabled={pagination.page === pagination.totalPages}
                                className={`px-3 py-1 rounded ${pagination.page === pagination.totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-amber-100 hover:bg-amber-200'}`}
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

            {/* Animation */}
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