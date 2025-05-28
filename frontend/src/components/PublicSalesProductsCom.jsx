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
//         <div className="container mx-auto my-8 px-4 w-[calc(100%-6rem)]">
//     {/* Header Section */}
//     <div className="text-center mb-12">
//         <h2 className="text-4xl font-serif text-gray-900 font-bold mb-16 mt-10 tracking-wider">EXCLUSIVE SALES</h2>
//         {/* <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-800 mx-auto mb-6"></div>
//         {data && data.data ? (
//             <p className="text-sm text-gray-600 font-light">CURATED SELECTION: {data.data.count} LUXURY ITEMS</p>
//         ) : (
//             <p className="text-sm text-gray-600 font-light">CURATED SELECTION: 0 ITEMS</p>
//         )} */}
//     </div>

//     {/* Products Grid */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//         {records.length > 0 ? (
//             records.map((item) => (
//                 <div
//                     key={item.id}
//                     className="group relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg cursor-pointer"
//                     onClick={() => handleProductClick(item.id)}
//                 >
//                     {/* Discount Ribbon */}
//                     {item.discount_percent > 0 && (
//                         <div className="absolute top-4 right-0 bg-gradient-to-r from-amber-500 to-amber-800 text-white text-xs font-bold px-3 py-1 shadow-md z-10 transform rotate-12 origin-left">
//                             {item.discount_percent}% OFF
//                         </div>
//                     )}
                    
//                     {/* Image Container */}
//                     <div className="relative overflow-hidden">
//                         <div className="aspect-w-1 aspect-h-1">
//                             <img
//                                 src={`http://localhost:8000/${item.image}`}
//                                 className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
//                                 alt={item.name}
//                             />
//                         </div>
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     </div>
                    
//                     {/* Product Details */}
//                     <div className="p-5">
//                         <h5 className="text-lg font-serif font-medium text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{item.name}</h5>
//                         <p className="text-xs text-gray-500 font-light mb-4 line-clamp-2">{item.description}</p>
                        
//                         <div className="flex items-baseline justify-between">
//                             <div>
//                                 {item.discount_percent > 0 && (
//                                     <p className="text-ms text-gray-400 line-through">Rs. {item.original_price}</p>
//                                 )}
//                                 <p className="text-lg font-bold text-amber-800">
//                                     Rs. {item.final_price}
//                                     </p>
//                                     <p>
//                                     {item.discount_percent > 0 && (
//                                         <span className="text-xs text-green-600 ml-2">You save Rs.{(item.original_price - item.final_price).toFixed(2)}</span>
//                                     )}
//                                 </p>
//                             </div>
//                             <button className="text-amber-800 hover:text-amber-900 transition-colors">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ))
//         ) : (
//             <div className="col-span-full text-center py-16">
//                 <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4"></div>
//                 <p className="text-gray-600 font-light">LOADING EXCLUSIVE OFFERS...</p>
//             </div>
//         )}
//     </div>

//     <ToastContainer 
//         position="bottom-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         toastClassName="bg-white text-gray-800 shadow-xl rounded-lg"
//         progressClassName="bg-gradient-to-r from-amber-500 to-amber-800"
//     />
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
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [categories, setCategories] = useState([]);
    const productsRef = useRef(null);
    const sliderRef = useRef(null);

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
                // Fetch sales products
                const res = await AxiosInstance.get('/ecommerce/publicsalesproduct');
                if (res) {
                    setRecords(res.data.data.data);
                    setData(res.data);
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
    }, [flag, router.query?.name]);

    // Set fixed height for slider based on products container
    useEffect(() => {
        if (productsRef.current && sliderRef.current) {
            const productsHeight = productsRef.current.offsetHeight;
            sliderRef.current.style.height = `${productsHeight}px`;
        }
    }, [records]);

    const handleProductClick = (ProductId) => {
        router.push(`/salesproductdetailspage?ProductId=${ProductId}`);
    };

    const handleCategoryClick = (categoryId) => {
        router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Side - Categories Slider */}
            <div className="w-1/7 bg-gray-100 p-4 shadow-lg" ref={sliderRef}>
                <div className="h-full overflow-hidden relative">
                    {/* <h3 className="text-lg font-semibold mb-4">Categories</h3> */}
                    {/* Categories container with fixed height */}
                    <div className="h-[calc(100%-3rem)] overflow-hidden relative">
                        {/* First set of categories */}
                        <div className="animate-scrollUp space-y-2">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
                                >
                                    <img
                                        src={`http://localhost:8000/${category.image}`}
                                        alt={category.name}
                                        className="w-full h-28 object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Second set of categories (for seamless looping) */}
                        <div className="animate-scrollUp space-y-2 absolute top-full w-full">
                            {categories.map((category) => (
                                <div
                                    key={`${category.id}-duplicate`}
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
                                >
                                    <img
                                        src={`http://localhost:8000/${category.image}`}
                                        alt={category.name}
                                        className="w-full h-28 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Products */}
            <div className="w-6/7 p-8" ref={productsRef}>
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-gray-900 font-bold mb-16 mt-10 tracking-wider">EXCLUSIVE SALES</h2>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                                                <p>
                                                {item.discount_percent > 0 && (
                                                    <span className="text-xs text-green-600 ml-2">You save Rs.{(item.original_price - item.final_price).toFixed(2)}</span>
                                                )}
                                            </p>
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