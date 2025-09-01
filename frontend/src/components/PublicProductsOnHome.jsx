// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicProductsOnHome = () => {
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
//                 const res = await AxiosInstance.get('/ecommerce/publicproduct');
//                 if (res) {
//                     // Process the products to include proper image URLs
//                     const processedProducts = res.data.data.data.map(product => ({
//                         ...product,
//                         mainImage: product.image_urls?.[0] 
//                             ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
//                             : '/default-product-image.jpg'
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

//         router.push(`/productdetailpage?${query}`);
//     };

//     return (
//         <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-8 lg:px-20 mb-28">
//   <div className="max-w-screen-xl mx-auto">
//     <h2 className="text-5xl font-extrabold font-serif text-gray-900 tracking-wide text-center mb-12">
//       🛍️ Shop Our Collection
//     </h2>

//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//       {records.length > 0 ? (
//         records.map((item) => (
//           <div
//             key={item.id}
//             onClick={() => handleProductClick(item)}
//             className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
//           >
//             {/* Image */}
//             <div className="relative w-full h-48 overflow-hidden">
//               <img
//                 src={item.mainImage}
//                 alt={item.name}
//                 className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
//               />
//             </div>

//             {/* Content */}
//             <div className="flex flex-col justify-between flex-grow p-4">
//               <div>
//                 <h3 className="text-base font-semibold text-gray-900 truncate">{item.name}</h3>
//                 <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
//                 <p className="text-red-600 font-bold text-sm mt-2">Rs {item.price}</p>
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

// export default PublicProductsOnHome;






// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicProductsOnHome = () => {
//     const router = useRouter();
//     const [records, setRecords] = useState([]);
//     const [paginationData, setPaginationData] = useState({
//         count: 0,
//         total_pages: 1,
//         current_page: 1,
//         limit: 24,
//         offset: 0,
//         next: false,
//         previous: false
//     });
//     const [loading, setLoading] = useState(false);
//     const [flag, setFlag] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [sliderHeight, setSliderHeight] = useState('auto');
//     const productsRef = useRef(null);
//     const resizeObserverRef = useRef(null);
//     const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

//     // Fetch products with pagination
//     const fetchProducts = async (page = 1, limit = 24, offset = 0) => {
//         setLoading(true);
//         try {
//             const params = new URLSearchParams({
//                 page: page.toString(),
//                 limit: limit.toString(),
//                 offset: offset.toString(),
//                 tags: 'Regular Products'
//             });

//             const productsRes = await AxiosInstance.get(`/ecommerce/publicproduct?${params}`);
//             if (productsRes && productsRes.data.data) {
//                 // Process the products to include proper image URLs
//                 const processedProducts = productsRes.data.data.data.map(product => ({
//                     ...product,
//                     mainImage: product.image_urls?.[0] 
//                         ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
//                         : '/default-product-image.jpg',
//                     remainingImages: product.image_urls?.slice(1).map(u => 
//                         `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
//                     ) || []
//                 }));
                
//                 setRecords(processedProducts);
//                 setPaginationData({
//                     count: productsRes.data.data.count,
//                     total_pages: productsRes.data.data.total_pages,
//                     current_page: productsRes.data.data.current_page,
//                     limit: productsRes.data.data.limit,
//                     offset: productsRes.data.data.offset,
//                     next: productsRes.data.data.next,
//                     previous: productsRes.data.data.previous,
//                 });
//             }
//         } catch (error) {
//             console.log('Error occurred', error);
//             toast.error('Failed to load products');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Initial data fetch
//     useEffect(() => {
//         if (router.query && router.query.name) {
//             toast.success(router.query.name);
//             router.push('/products', undefined, { shallow: true });
//         } else if (flag) {
//             toast.success('Product deleted');
//             setFlag(false);
//         }

//         const fetchInitialData = async () => {
//             await fetchProducts();
            
//             // Fetch categories
//             try {
//                 const categoriesRes = await AxiosInstance.get('/ecommerce/publiccategory');
//                 if (categoriesRes && categoriesRes.data) {
//                     setCategories(categoriesRes.data.data.data);
//                 }
//             } catch (error) {
//                 console.log('Error occurred', error);
//             }
//         };

//         fetchInitialData();
//     }, [flag, router.query?.name]);

//     // Handle page change
//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= paginationData.total_pages) {
//             fetchProducts(newPage, paginationData.limit, paginationData.offset);
//             // Scroll to top when page changes
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//         }
//     };

//     // Handle limit change
//     const handleLimitChange = (e) => {
//         const newLimit = parseInt(e.target.value);
//         fetchProducts(1, newLimit, 0); // Reset to page 1 when changing limit
//     };

//     // Update slider height when records change or window resizes
//     useEffect(() => {
//         const updateSliderHeight = () => {
//             if (productsRef.current) {
//                 const productsHeight = productsRef.current.offsetHeight;
//                 setSliderHeight(`${productsHeight}px`);
//             }
//         };

//         if (!resizeObserverRef.current && productsRef.current) {
//             resizeObserverRef.current = new ResizeObserver(updateSliderHeight);
//             resizeObserverRef.current.observe(productsRef.current);
//         }

//         updateSliderHeight();

//         return () => {
//             if (resizeObserverRef.current) {
//                 resizeObserverRef.current.disconnect();
//             }
//         };
//     }, [records]);

//     const handleProductClick = (product) => {
//         const query = new URLSearchParams({
//             ProductId: product.id.toString(),
//             productData: JSON.stringify(product)
//         }).toString();

//         router.push(`/productdetailpage?${query}`);
//     };

//     const handleCategoryClick = (categoryId) => {
//         router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
//     };

//     const renderPaginationButtons = () => {
//         const { current_page, total_pages } = paginationData;
//         const buttons = [];
//         const maxVisibleButtons = 5;

//         // Calculate start and end page numbers
//         let startPage = Math.max(1, current_page - Math.floor(maxVisibleButtons / 2));
//         let endPage = Math.min(total_pages, startPage + maxVisibleButtons - 1);

//         // Adjust start page if we're near the end
//         if (endPage - startPage + 1 < maxVisibleButtons) {
//             startPage = Math.max(1, endPage - maxVisibleButtons + 1);
//         }

//         // Page number buttons
//         for (let i = startPage; i <= endPage; i++) {
//             buttons.push(
//                 <button
//                     key={i}
//                     onClick={() => handlePageChange(i)}
//                     className={`px-3 py-1 mx-1 rounded transition-colors ${
//                         i === current_page
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-gray-200 hover:bg-gray-300 text-black'
//                     }`}
//                     disabled={loading}
//                 >
//                     {i}
//                 </button>
//             );
//         }

//         return buttons;
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             {/* Left Side - Categories Slider */}
//             <div className="w-[10%] bg-gray-100 shadow-lg ml-4 relative overflow-hidden" style={{ height: sliderHeight }}>
//                 <div className="absolute top-0 left-0 right-0 animate-scrollUp">
//                     {[...categories, ...categories].map((category, index) => (
//                         <div
//                             key={`${category.id}-${index}`}
//                             onClick={() => handleCategoryClick(category.id)}
//                             className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
//                         >
//                             <img
//                                 src={`${baseURL}${category.image.startsWith('/') ? '' : '/'}${category.image}`}
//                                 alt={category.name}
//                                 className="w-full h-28 object-cover rounded"
//                                 onError={(e) => {
//                                     e.target.src = '/default-category-image.jpg';
//                                 }}
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-transparent z-10 pointer-events-none" />
//                 <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
//             </div>

//             {/* Right Side - Products */}
//             <div className="w-[85%] p-8" ref={productsRef}>
//                 <h2 className="text-5xl font-extrabold font-serif text-gray-900 tracking-wide text-center mb-12">
//                     🛍️ Shop Our Collection
//                 </h2>

//                 {/* Products count and items per page selector */}
//                 <div className="flex justify-between items-center mb-6">
//                     <div className="text-gray-600">
//                         Showing {records.length > 0 ? ((paginationData.current_page - 1) * paginationData.limit + 1) : 0} - {Math.min(paginationData.current_page * paginationData.limit, paginationData.count)} of {paginationData.count} products
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <span className="text-gray-600">Items per page:</span>
//                         <select 
//                             value={paginationData.limit}
//                             onChange={handleLimitChange}
//                             className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
//                             disabled={loading}
//                         >
//                             <option value="12">12</option>
//                             <option value="24">24</option>
//                             <option value="36">36</option>
//                             <option value="48">48</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* Products Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[400px]">
//                     {loading ? (
//                         // Loading skeleton
//                         Array.from({ length: paginationData.limit }).map((_, index) => (
//                             <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
//                                 <div className="w-full h-48 bg-gray-200"></div>
//                                 <div className="p-4 space-y-2">
//                                     <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                                     <div className="h-3 bg-gray-200 rounded w-full"></div>
//                                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                                     <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : records.length > 0 ? (
//                         records.map((item) => (
//                             <div
//                                 key={item.id}
//                                 onClick={() => handleProductClick(item)}
//                                 className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
//                             >
//                                 {/* Image */}
//                                 <div className="relative w-full h-48 overflow-hidden">
//                                     <img
//                                         src={item.mainImage}
//                                         alt={item.name}
//                                         className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
//                                         onError={(e) => {
//                                             e.target.src = '/default-product-image.jpg';
//                                         }}
//                                     />
//                                 </div>

//                                 {/* Content */}
//                                 <div className="flex flex-col justify-between flex-grow p-4">
//                                     <div>
//                                         <h3 className="text-base font-semibold text-gray-900 truncate">{item.name}</h3>
//                                         <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
//                                         <p className="text-red-600 font-bold text-sm mt-2">Rs {item.price}</p>
//                                     </div>

//                                     <button className="mt-4 w-full py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-300">
//                                         View Details
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="col-span-full text-center py-12">
//                             <p className="text-gray-600 text-lg">No products available</p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Pagination Controls */}
//                 {paginationData.total_pages > 1 && (
//                     <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-4">
//                         <div className="flex items-center gap-2">
//                             <button
//                                 onClick={() => handlePageChange(paginationData.current_page - 1)}
//                                 disabled={!paginationData.previous || loading}
//                                 className={`px-4 py-2 rounded-lg transition-colors ${
//                                     !paginationData.previous || loading
//                                         ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
//                                         : 'bg-gray-900 hover:bg-gray-700 text-white'
//                                 }`}
//                             >
//                                 Previous
//                             </button>
                            
//                             <div className="flex items-center gap-1">
//                                 {Array.from({ length: Math.min(5, paginationData.total_pages) }, (_, i) => {
//                                     let pageNum;
//                                     if (paginationData.total_pages <= 5) {
//                                         pageNum = i + 1;
//                                     } else if (paginationData.current_page <= 3) {
//                                         pageNum = i + 1;
//                                     } else if (paginationData.current_page >= paginationData.total_pages - 2) {
//                                         pageNum = paginationData.total_pages - 4 + i;
//                                     } else {
//                                         pageNum = paginationData.current_page - 2 + i;
//                                     }
                                    
//                                     return (
//                                         <button
//                                             key={pageNum}
//                                             onClick={() => handlePageChange(pageNum)}
//                                             disabled={loading}
//                                             className={`px-3 py-2 rounded-lg transition-colors ${
//                                                 paginationData.current_page === pageNum 
//                                                     ? 'bg-gray-900 text-white' 
//                                                     : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
//                                             }`}
//                                         >
//                                             {pageNum}
//                                         </button>
//                                     );
//                                 })}
                                
//                                 {paginationData.total_pages > 5 && paginationData.current_page < paginationData.total_pages - 2 && (
//                                     <>
//                                         <span className="px-2 text-gray-500">...</span>
//                                         <button
//                                             onClick={() => handlePageChange(paginationData.total_pages)}
//                                             disabled={loading}
//                                             className={`px-3 py-2 rounded-lg transition-colors ${
//                                                 paginationData.current_page === paginationData.total_pages 
//                                                     ? 'bg-gray-900 text-white' 
//                                                     : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
//                                             }`}
//                                         >
//                                             {paginationData.total_pages}
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
                            
//                             <button
//                                 onClick={() => handlePageChange(paginationData.current_page + 1)}
//                                 disabled={!paginationData.next || loading}
//                                 className={`px-4 py-2 rounded-lg transition-colors ${
//                                     !paginationData.next || loading
//                                         ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
//                                         : 'bg-gray-900 hover:bg-gray-700 text-white'
//                                 }`}
//                             >
//                                 Next
//                             </button>
//                         </div>

//                         {/* Page info */}
//                         <div className="text-gray-600 text-sm">
//                             Page {paginationData.current_page} of {paginationData.total_pages}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <ToastContainer />

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

// export default PublicProductsOnHome;






'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";

const PublicProductsOnHome = () => {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [paginationData, setPaginationData] = useState({
        count: 0,
        total_pages: 1,
        current_page: 1,
        limit: 24,
        offset: 0,
        next: false,
        previous: false
    });
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [categories, setCategories] = useState([]);
    const productsRef = useRef(null);
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

    // Fetch products with pagination
    const fetchProducts = async (page = 1, limit = 24, offset = 0) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                offset: offset.toString(),
                tags: 'Regular Products'
            });

            const productsRes = await AxiosInstance.get(`/ecommerce/publicproduct?${params}`);
            if (productsRes && productsRes.data.data) {
                // Process the products to include proper image URLs
                const processedProducts = productsRes.data.data.data.map(product => ({
                    ...product,
                    mainImage: product.image_urls?.[0] 
                        ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
                        : '/default-product-image.jpg',
                    remainingImages: product.image_urls?.slice(1).map(u => 
                        `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
                    ) || []
                }));
                
                setRecords(processedProducts);
                setPaginationData({
                    count: productsRes.data.data.count,
                    total_pages: productsRes.data.data.total_pages,
                    current_page: productsRes.data.data.current_page,
                    limit: productsRes.data.data.limit,
                    offset: productsRes.data.data.offset,
                    next: productsRes.data.data.next,
                    previous: productsRes.data.data.previous,
                });
            }
        } catch (error) {
            console.log('Error occurred', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        if (router.query && router.query.name) {
            toast.success(router.query.name);
            router.push('/products', undefined, { shallow: true });
        } else if (flag) {
            toast.success('Product deleted');
            setFlag(false);
        }

        const fetchInitialData = async () => {
            await fetchProducts();
            
            // Fetch categories
            try {
                const categoriesRes = await AxiosInstance.get('/ecommerce/publiccategory');
                if (categoriesRes && categoriesRes.data) {
                    setCategories(categoriesRes.data.data.data);
                }
            } catch (error) {
                console.log('Error occurred', error);
            }
        };

        fetchInitialData();
    }, [flag, router.query?.name]);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= paginationData.total_pages) {
            fetchProducts(newPage, paginationData.limit, paginationData.offset);
            // Scroll to top when page changes
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handle limit change
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        fetchProducts(1, newLimit, 0); // Reset to page 1 when changing limit
    };

    const handleProductClick = (product) => {
        const query = new URLSearchParams({
            ProductId: product.id.toString(),
            productData: JSON.stringify(product)
        }).toString();

        router.push(`/productdetailpage?${query}`);
    };

    const handleCategoryClick = (categoryId) => {
        router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-8 lg:px-20 mb-28">
            <div className="max-w-screen-xl mx-auto">
                <h2 className="text-5xl font-extrabold font-serif text-gray-900 tracking-wide text-center mb-12">
                    🛍️ Shop Our Collection
                </h2>

                {/* Products count and items per page selector */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-gray-600">
                        Showing {records.length > 0 ? ((paginationData.current_page - 1) * paginationData.limit + 1) : 0} - {Math.min(paginationData.current_page * paginationData.limit, paginationData.count)} of {paginationData.count} products
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Items per page:</span>
                        <select 
                            value={paginationData.limit}
                            onChange={handleLimitChange}
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                            disabled={loading}
                        >
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="36">36</option>
                            <option value="48">48</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[400px]" ref={productsRef}>
                    {loading ? (
                        // Loading skeleton
                        Array.from({ length: paginationData.limit }).map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                                <div className="w-full h-48 bg-gray-200"></div>
                                <div className="p-4 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                                </div>
                            </div>
                        ))
                    ) : records.length > 0 ? (
                        records.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleProductClick(item)}
                                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative w-full h-48 overflow-hidden">
                                    <img
                                        src={item.mainImage}
                                        alt={item.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                        onError={(e) => {
                                            e.target.src = '/default-product-image.jpg';
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-between flex-grow p-4">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 truncate">{item.name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                                        <p className="text-red-600 font-bold text-sm mt-2">Rs {item.price}</p>
                                    </div>

                                    <button className="mt-4 w-full py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-300">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-600 text-lg">No products available</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {paginationData.total_pages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(paginationData.current_page - 1)}
                                disabled={!paginationData.previous || loading}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    !paginationData.previous || loading
                                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                                        : 'bg-gray-900 hover:bg-gray-700 text-white'
                                }`}
                            >
                                Previous
                            </button>
                            
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, paginationData.total_pages) }, (_, i) => {
                                    let pageNum;
                                    if (paginationData.total_pages <= 5) {
                                        pageNum = i + 1;
                                    } else if (paginationData.current_page <= 3) {
                                        pageNum = i + 1;
                                    } else if (paginationData.current_page >= paginationData.total_pages - 2) {
                                        pageNum = paginationData.total_pages - 4 + i;
                                    } else {
                                        pageNum = paginationData.current_page - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            disabled={loading}
                                            className={`px-3 py-2 rounded-lg transition-colors ${
                                                paginationData.current_page === pageNum 
                                                    ? 'bg-gray-900 text-white' 
                                                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                {paginationData.total_pages > 5 && paginationData.current_page < paginationData.total_pages - 2 && (
                                    <>
                                        <span className="px-2 text-gray-500">...</span>
                                        <button
                                            onClick={() => handlePageChange(paginationData.total_pages)}
                                            disabled={loading}
                                            className={`px-3 py-2 rounded-lg transition-colors ${
                                                paginationData.current_page === paginationData.total_pages 
                                                    ? 'bg-gray-900 text-white' 
                                                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            {paginationData.total_pages}
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            <button
                                onClick={() => handlePageChange(paginationData.current_page + 1)}
                                disabled={!paginationData.next || loading}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    !paginationData.next || loading
                                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                                        : 'bg-gray-900 hover:bg-gray-700 text-white'
                                }`}
                            >
                                Next
                            </button>
                        </div>

                        {/* Page info */}
                        <div className="text-gray-600 text-sm">
                            Page {paginationData.current_page} of {paginationData.total_pages}
                        </div>
                    </div>
                )}
            </div>

            <ToastContainer />

            <style jsx>{`
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

export default PublicProductsOnHome;