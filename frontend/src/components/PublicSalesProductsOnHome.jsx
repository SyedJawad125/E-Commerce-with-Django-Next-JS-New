// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicSalesProductsCom = () => {
//     const router = useRouter();
//     const [records, setRecords] = useState([]);
//     const [data, setData] = useState([]);
//     const [flag, setFlag] = useState(false);

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
//                 const res = await AxiosInstance.get('/ecommerce/publicsalesproduct');
//                 if (res) {
//                     setRecords(res.data.data.data);
//                     setData(res.data);
//                 }
//             } catch (error) {
//                 console.log('Error occurred', error);
//             }
//         };

//         receiveData();
//     }, [flag, router.query?.name]);

//     const handleProductClick = (ProductId) => {
//         router.push(`/salesproductdetailspage?ProductId=${ProductId}`);
//     };

//     return (
//         <div className="mx-8 bg-gray-50">
//         <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] mt-16">
//             {/* <h2 className="text-1xl mb-4">SALES</h2> */}
//             <h2 className="text-4xl font-serif text-gray-900 font-bold mb-4 tracking-wider text-center">Sales</h2>
//             <br />
//             <br />
//             {/* {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>} */}
//             <br/>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">


//                 {records.length > 0 ? (
//                     records.map((item) => (
//                         <div
//                             key={item.id}
//                             className="card-5 cursor-pointer relative" // Added relative here
//                             onClick={() => handleProductClick(item.id)}
//                         >
//                             {/* Discount Badge */}
//                             {item.discount_percent > 0 && (
//                                 <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
//                                     {item.discount_percent}% OFF
//                                 </div>
//                             )}
                            
//                             <div className="relative">
//                                 <img
//                                     src={`http://localhost:8000/${item.image}`}
//                                     className="card-image5 clickable-image w-full h-40 object-cover transform 
//                                     transition-transform duration-300 hover:scale-105 border border-black"
//                                     alt={item.name}
//                                 />
//                             </div>
                            
//                             <div className="card-body5 p-4">
//                                 <h5 className="card-title text-black text-sm font-medium -m-6 p-3">{item.name}</h5>
//                                 <p className="card-text text-black text-xs mt-1 -m-6 p-3">Des: {item.description}</p>
//                                 <div className="flex items-center text-black gap-2 -m-6 p-3">
//                                     <p className="card-text text-xs mt-1 font-semibold">Old Price: 
//                                         <span className="line-through ml-1">{item.original_price}</span>
//                                     </p>
//                                 </div>
//                                 <p className="card-text text-black text-xs mt-1 font-semibold -m-6 p-3">Price: 
//                                     <span className="text-red-600 ml-1">{item.final_price}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Loading....</p>
//                 )}
//             </div>
//             <ToastContainer />
//         </div>
//         </div>
//     );
// };

// export default PublicSalesProductsCom;





// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicSalesProductsCom = () => {
//     const router = useRouter();
//     const [records, setRecords] = useState([]);
//     const [data, setData] = useState([]);
//     const [flag, setFlag] = useState(false);
//     const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

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
//                 const res = await AxiosInstance.get('/ecommerce/publicsalesproduct');
//                 if (res) {
//                     // Process the products to include proper image URLs
//                     const processedProducts = res.data.data.data.map(product => ({
//                         ...product,
//                         mainImage: product.image_urls?.[0] 
//                             ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
//                             : '/default-product-image.jpg',
//                         remainingImages: product.image_urls?.slice(1).map(u => 
//                             `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
//                         ) || []
//                     }));
                    
//                     setRecords(processedProducts);
//                     setData(res.data);
//                 }
//             } catch (error) {
//                 console.log('Error occurred', error);
//             }
//         };

//         receiveData();
//     }, [flag, router.query?.name]);

//     const handleProductClick = (product) => {
//         const query = new URLSearchParams({
//             ProductId: product.id.toString(),
//             productData: JSON.stringify(product)
//         }).toString();

//         router.push(`/salesproductdetailspage?${query}`);
//     };

//     return (
//         <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-8 lg:px-20 mb-28">
//   <div className="max-w-screen-xl mx-auto">
//     <h2 className="text-5xl font-extrabold font-serif text-gray-900 tracking-wide text-center mb-12">
//       ✨ Sales Collection ✨
//     </h2>

//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//       {records.length > 0 ? (
//         records.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleProductClick(item)}
//             className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col relative"
//           >
//             {/* Discount Badge */}
//             {item.discount_percent > 0 && (
//               <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-20">
//                 {item.discount_percent}% OFF
//               </div>
//             )}

//             {/* Product Image */}
//             <div className="relative w-full h-48 overflow-hidden">
//               <img
//                 src={item.mainImage}
//                 alt={item.name}
//                 className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
//               />
//             </div>

//             {/* Product Details */}
//             <div className="flex flex-col justify-between flex-grow p-4">
//               <div>
//                 <h3 className="text-base font-semibold text-gray-900 truncate">{item.name}</h3>
//                 <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
//                 <div className="flex items-center gap-2 text-sm mt-2">
//                   <p className="text-gray-400 line-through">Rs {item.original_price}</p>
//                   <p className="text-red-600 font-bold">Rs {item.final_price}</p>
//                 </div>
//               </div>

//               <button className="mt-4 w-full py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-300">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-600 col-span-full">Loading products...</p>
//       )}
//     </div>

//     <ToastContainer />
//   </div>
// </div>

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
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [sliderHeight, setSliderHeight] = useState('auto');
    const productsRef = useRef(null);
    const resizeObserverRef = useRef(null);
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    
    // Simplified pagination state
    const [pagination, setPagination] = useState({
        currentPage: 1,
        limit: 12,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false
    });

    // Fetch sales products with pagination
    const fetchSalesProducts = async (page = 1, limit = 12) => {
        try {
            setIsLoading(true);
            
            // Make API call with page and limit only (remove offset for now)
            const res = await AxiosInstance.get(
                `/ecommerce/publicsalesproduct?page=${page}&limit=${limit}`
            );
            
            const responseData = res?.data?.data;
            const dataArr = responseData?.data || [];
            
            // Process images
            const processedProducts = dataArr.map(product => ({
                ...product,
                mainImage: product.image_urls?.[0] 
                    ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
                    : '/default-product-image.jpg',
                remainingImages: product.image_urls?.slice(1).map(u => 
                    `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
                ) || []
            }));
            
            setRecords(processedProducts);
            
            // Update pagination state
            setPagination({
                currentPage: page,
                limit: limit,
                totalPages: responseData?.total_pages || 1,
                totalCount: responseData?.count || 0,
                hasNext: responseData?.next || false,
                hasPrevious: responseData?.previous || false
            });
            
        } catch (error) {
            console.error('Error fetching sale products:', error);
            toast.error('Failed to load sale products', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await AxiosInstance.get('/ecommerce/slidercategory');
            setCategories(Array.isArray(res?.data?.data?.data) ? res.data.data.data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        }
    };

    // Initial load
    useEffect(() => {
        fetchSalesProducts();
        fetchCategories();
    }, []);

    // Handle toast messages from router
    useEffect(() => {
        if (router.query && router.query.name) {
            toast.success(router.query.name);
            router.push('/products', undefined, { shallow: true });
        }
    }, [router.query?.name]);

    // Update slider height when records change
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

    // Event handlers
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
        if (newPage >= 1 && newPage <= pagination.totalPages && newPage !== pagination.currentPage) {
            fetchSalesProducts(newPage, pagination.limit);
        }
    };

    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        fetchSalesProducts(1, newLimit); // Reset to page 1 when changing limit
    };

    const goToFirstPage = () => handlePageChange(1);
    const goToLastPage = () => handlePageChange(pagination.totalPages);
    const goToPreviousPage = () => handlePageChange(pagination.currentPage - 1);
    const goToNextPage = () => handlePageChange(pagination.currentPage + 1);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const { currentPage, totalPages } = pagination;
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        
        const pages = [];
        
        if (currentPage <= 3) {
            // Show first 5 pages
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
        } else if (currentPage >= totalPages - 2) {
            // Show last 5 pages
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show current page and 2 pages on each side
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pages.push(i);
            }
        }
        
        return pages;
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
                    <h2 className="text-4xl font-serif text-gray-900 font-bold mb-16 mt-10 tracking-wider">
                        EXCLUSIVE SALES
                    </h2>
                    
                    {/* Items per page selector */}
                    <div className="flex justify-end mb-6">
                        <div className="flex items-center gap-2">
                            <label htmlFor="limit-select" className="text-sm text-gray-600 font-medium">
                                Items per page:
                            </label>
                            <select 
                                id="limit-select"
                                value={pagination.limit}
                                onChange={handleLimitChange}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                disabled={isLoading}
                            >
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="36">36</option>
                                <option value="48">48</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
                    {!isLoading && records.length > 0 ? (
                        records.map((item) => (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg cursor-pointer transform hover:-translate-y-1"
                                onClick={() => handleProductClick(item)}
                            >
                                {/* Discount Ribbon */}
                                {item.discount_percent > 0 && (
                                    <div className="absolute top-2 right-0 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-2 py-1 shadow-md z-10 rounded-l-md">
                                        -{item.discount_percent}%
                                    </div>
                                )}
                                
                                {/* Image Container */}
                                <div className="relative overflow-hidden">
                                    <div className="aspect-square">
                                        <img
                                            src={item.mainImage}
                                            className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
                                            alt={item.name}
                                            onError={(e) => {
                                                e.target.src = '/default-product-image.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                
                                {/* Product Details */}
                                <div className="p-4">
                                    <h5 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors truncate">
                                        {item.name}
                                    </h5>
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-2 h-8">
                                        {item.description}
                                    </p>
                                    
                                    <div className="space-y-1">
                                        {item.discount_percent > 0 && (
                                            <p className="text-xs text-gray-400 line-through">
                                                Rs. {item.original_price}
                                            </p>
                                        )}
                                        <p className="text-base font-bold text-amber-800">
                                            Rs. {item.final_price}
                                        </p>
                                        {item.discount_percent > 0 && (
                                            <p className="text-xs text-green-600">
                                                Save Rs. {(item.original_price - item.final_price).toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <button className="mt-3 w-full py-2 bg-gray-900 text-white text-xs rounded-md hover:bg-amber-600 transition-all duration-300 transform group-hover:scale-105">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : isLoading ? (
                        <div className="col-span-full text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4" />
                            <p className="text-gray-600 font-light">LOADING EXCLUSIVE OFFERS...</p>
                        </div>
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No sale products found</h3>
                            <p className="mt-1 text-gray-500">Try checking back later for new deals</p>
                        </div>
                    )}
                </div>

                {/* Enhanced Pagination Controls */}
                {!isLoading && records.length > 0 && pagination.totalPages > 1 && (
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-12 p-6 bg-white rounded-lg shadow-sm border">
                        {/* Results Info */}
                        <div className="text-sm text-gray-600">
                            Showing{' '}
                            <span className="font-semibold text-gray-900">
                                {((pagination.currentPage - 1) * pagination.limit) + 1}
                            </span>
                            {' '}-{' '}
                            <span className="font-semibold text-gray-900">
                                {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)}
                            </span>
                            {' '}of{' '}
                            <span className="font-semibold text-gray-900">
                                {pagination.totalCount}
                            </span>
                            {' '}results
                        </div>
                        
                        {/* Pagination Buttons */}
                        <div className="flex items-center gap-1">
                            {/* First Page */}
                            <button
                                onClick={goToFirstPage}
                                disabled={!pagination.hasPrevious}
                                className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                                    !pagination.hasPrevious 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-300'
                                }`}
                            >
                                First
                            </button>
                            
                            {/* Previous Page */}
                            <button
                                onClick={goToPreviousPage}
                                disabled={!pagination.hasPrevious}
                                className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                                    !pagination.hasPrevious 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-300'
                                }`}
                            >
                                ← Previous
                            </button>
                            
                            {/* Page Numbers */}
                            {getPageNumbers().map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                                        pagination.currentPage === pageNum
                                            ? 'bg-amber-500 text-white shadow-md'
                                            : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-300'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                            
                            {/* Ellipsis for large page counts */}
                            {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                                <span className="px-2 py-2 text-sm text-gray-400">...</span>
                            )}
                            
                            {/* Next Page */}
                            <button
                                onClick={goToNextPage}
                                disabled={!pagination.hasNext}
                                className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                                    !pagination.hasNext 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-300'
                                }`}
                            >
                                Next →
                            </button>
                            
                            {/* Last Page */}
                            <button
                                onClick={goToLastPage}
                                disabled={!pagination.hasNext}
                                className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                                    !pagination.hasNext 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-300'
                                }`}
                            >
                                Last
                            </button>
                        </div>
                        
                        {/* Page Jump Input (Optional) */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Go to page:</span>
                            <input
                                type="number"
                                min="1"
                                max={pagination.totalPages}
                                placeholder={pagination.currentPage}
                                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        const page = parseInt(e.target.value);
                                        if (page >= 1 && page <= pagination.totalPages) {
                                            handlePageChange(page);
                                            e.target.value = '';
                                        }
                                    }
                                }}
                            />
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
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default PublicSalesProductsCom;