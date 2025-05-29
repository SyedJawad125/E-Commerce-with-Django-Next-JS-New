// // 'use client'
// // import React, { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import AxiosInstance from "@/components/AxiosInstance";

// // const PublicProducts = () => {
// //     const router = useRouter();
// //     const [records, setRecords] = useState([]);
// //     const [data, setData] = useState([]);
// //     const [flag, setFlag] = useState(false);

// //     useEffect(() => {
// //         if (router.query && router.query.name) {
// //             toast.success(router.query.name);
// //             router.push('/products', undefined, { shallow: true });
// //         } else if (flag) {
// //             toast.success('Product deleted');
// //             setFlag(false);
// //         }

// //         const receiveData = async () => {
// //             try {
// //                 const res = await AxiosInstance.get('/ecommerce/publicproduct');
// //                 if (res) {
// //                     setRecords(res.data.data.data);
// //                     setData(res.data);
// //                 }
// //             } catch (error) {
// //                 console.log('Error occurred', error);
// //             }
// //         };

// //         receiveData();
// //     }, [flag, router.query?.name]);

// //     const handleProductClick = (ProductId) => {
// //         router.push(`/productdetailpage?ProductId=${ProductId}`);
// //     };

// //     return (
// //         <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] bg-gray-50">
// //             {/* <h2 className="text-2xl font-bold mb-4">SHOP</h2> */}
// //            <h2 className="text-4xl font-serif text-gray-900 font-bold -mb-10 mt-10 text-center tracking-wider">Products</h2>

// //             <br />
// //             <br />
// //             {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}
// //             <br/>
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
// //                 {records.length > 0 ? (
// //                     records.map((item) => (
// //                         <div
// //                             key={item.id}
// //                             className="card-5 cursor-pointer"
// //                             onClick={() => handleProductClick(item.id)}
// //                         >
// //                             <img
// //                                 src={`http://localhost:8000/${item.image}`}
// //                                 className="card-image5 clickable-image w-full h-40 object-cover transform 
// //                                 transition-transform duration-300 hover:scale-105 border border-black"
// //                                 alt={item.name}
// //                             />
// //                             <div className="card-body5 p-4">
// //                                 <h5 className="card-title text-black text-sm font-medium -m-6 p-3">{item.name}</h5>
// //                                 <p className="card-text text-black text-xs mt-1 -m-6 p-3">Des: {item.description}</p>
// //                                 <p className="card-text text-black text-xs mt-1 font-semibold -m-6 p-3">Price: {item.price}</p>
// //                                 {/* <p className="card-text text-xs mt-1 -m-6 p-3">Category: {item.category_name}</p> */}
// //                             </div>


// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>Loading....</p>
// //                 )}
// //             </div>
// //             <ToastContainer />
// //         </div>
// //     );
// // };

// // export default PublicProducts;




// 'use client'
// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicProducts = () => {
//     const router = useRouter();
//     const [records, setRecords] = useState([]);
//     const [data, setData] = useState([]);
//     const [flag, setFlag] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [sliderHeight, setSliderHeight] = useState('auto');
//     const productsRef = useRef(null);
//     const resizeObserverRef = useRef(null);

//     // Fetch products and categories
//     useEffect(() => {
//         if (router.query && router.query.name) {
//             toast.success(router.query.name);
//             router.push('/products', undefined, { shallow: true });
//         } else if (flag) {
//             toast.success('Product deleted');
//             setFlag(false);
//         }

//         const fetchData = async () => {
//             try {
//                 // Fetch products
//                 const productsRes = await AxiosInstance.get('/ecommerce/publicproduct');
//                 if (productsRes) {
//                     setRecords(productsRes.data.data.data);
//                     setData(productsRes.data);
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

//         fetchData();
//     }, [flag, router.query?.name]);

//     // Update slider height when records change or window resizes
//     useEffect(() => {
//         const updateSliderHeight = () => {
//             if (productsRef.current) {
//                 const productsHeight = productsRef.current.offsetHeight;
//                 setSliderHeight(`${productsHeight}px`);
//             }
//         };

//         // Initialize ResizeObserver to track content changes
//         if (!resizeObserverRef.current && productsRef.current) {
//             resizeObserverRef.current = new ResizeObserver(updateSliderHeight);
//             resizeObserverRef.current.observe(productsRef.current);
//         }

//         // Initial height calculation
//         updateSliderHeight();

//         // Cleanup
//         return () => {
//             if (resizeObserverRef.current) {
//                 resizeObserverRef.current.disconnect();
//             }
//         };
//     }, [records]);

//     const handleProductClick = (ProductId) => {
//         router.push(`/productdetailpage?ProductId=${ProductId}`);
//     };

//     const handleCategoryClick = (categoryId) => {
//         router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             {/* Left Side - Categories Slider */}
//             <div className="w-1/7 bg-gray-100 p-4 shadow-lg" style={{ height: sliderHeight }}>
//                 <div className="h-full overflow-hidden relative space-y-2">
//                     {/* <h3 className="text-lg font-semibold mb-4">Categories</h3> */}
//                     {/* First set of categories */}
//                     <div className="animate-scrollUp space-y-2">
//                         {categories.map((category) => (
//                             <div
//                                 key={category.id}
//                                 onClick={() => handleCategoryClick(category.id)}
//                                 className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
//                             >
//                                 <img
//                                     src={`http://localhost:8000/${category.image}`}
//                                     alt={category.name}
//                                     className="w-full h-28 object-cover"
//                                 />
//                                 {/* <p className="text-center mt-1">{category.name}</p> */}
//                             </div>
//                         ))}
//                     </div>

//                     {/* Second set of categories (for seamless looping) */}
//                     <div className="animate-scrollUp space-y-2 absolute top-full w-full">
//                         {categories.map((category) => (
//                             <div
//                                 key={`${category.id}-duplicate`}
//                                 onClick={() => handleCategoryClick(category.id)}
//                                 className="shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
//                             >
//                                 <img
//                                     src={`http://localhost:8000/${category.image}`}
//                                     alt={category.name}
//                                     className="w-full h-28 object-cover"
//                                 />
//                                 {/* <p className="text-center mt-1">{category.name}</p> */}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Right Side - Products */}
//             <div className="w-6/7 p-8" ref={productsRef}>
//                 <h2 className="text-4xl font-serif text-gray-900 font-bold -mb-10 mt-10 text-center tracking-wider">Products</h2>
                
//                 <br />
//                 <br />
//                 {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}
//                 <br/>
                
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
//                     {records.length > 0 ? (
//                         records.map((item) => (
//                             <div
//                                 key={item.id}
//                                 className="card-5 cursor-pointer"
//                                 onClick={() => handleProductClick(item.id)}
//                             >
//                                 <img
//                                     src={`http://localhost:8000/${item.image}`}
//                                     className="card-image5 clickable-image w-full h-40 object-cover transform 
//                                     transition-transform duration-300 hover:scale-105 border border-black"
//                                     alt={item.name}
//                                 />
//                                 <div className="card-body5 p-4">
//                                     <h5 className="card-title text-black text-sm font-medium -m-6 p-3">{item.name}</h5>
//                                     <p className="card-text text-black text-xs mt-1 -m-6 p-3">Des: {item.description}</p>
//                                     <p className="card-text text-black text-xs mt-1 font-semibold -m-6 p-3">Price: {item.price}</p>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>Loading....</p>
//                     )}
//                 </div>

//                 {/* Bottom padding */}
//                 <div className="h-8"></div>
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

// export default PublicProducts;



'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PublicProducts = () => {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sliderHeight, setSliderHeight] = useState('auto');
    const [searchQuery, setSearchQuery] = useState('');
    const productsRef = useRef(null);
    const resizeObserverRef = useRef(null);

    // Fetch products and categories
    useEffect(() => {
        if (router.query && router.query.name) {
            toast.success(router.query.name);
            router.push('/products', undefined, { shallow: true });
        } else if (flag) {
            toast.success('Product deleted');
            setFlag(false);
        }

        const fetchData = async () => {
            try {
                // Fetch products
                const productsRes = await AxiosInstance.get('/ecommerce/publicproduct');
                if (productsRes) {
                    setRecords(productsRes.data.data.data);
                    setFilteredRecords(productsRes.data.data.data);
                    setData(productsRes.data);
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

        fetchData();
    }, [flag, router.query?.name]);

    // Filter products based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredRecords(records);
        } else {
            const filtered = records.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredRecords(filtered);
        }
    }, [searchQuery, records]);

    // Update slider height when records change or window resizes
    useEffect(() => {
        const updateSliderHeight = () => {
            if (productsRef.current) {
                const productsHeight = productsRef.current.offsetHeight;
                setSliderHeight(`${productsHeight}px`);
            }
        };

        // Initialize ResizeObserver to track content changes
        if (!resizeObserverRef.current && productsRef.current) {
            resizeObserverRef.current = new ResizeObserver(updateSliderHeight);
            resizeObserverRef.current.observe(productsRef.current);
        }

        // Initial height calculation
        updateSliderHeight();

        // Cleanup
        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [filteredRecords]);

    const handleProductClick = (ProductId) => {
        router.push(`/productdetailpage?ProductId=${ProductId}`);
    };

    const handleCategoryClick = (categoryId) => {
        router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Side - Categories Slider */}
            <div className="w-1/7 bg-gray-100 p-4 shadow-lg" style={{ height: sliderHeight }}>
                <div className="h-full overflow-hidden relative space-y-2">
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

            {/* Right Side - Products */}
            <div className="w-6/7 p-8" ref={productsRef}>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-serif text-gray-900 font-bold tracking-wider">Products</h2>
                    
                    {/* Search Bar */}
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                
                <div className="mb-4">
                    {data && data.data ? (
                        <p>Total: {filteredRecords.length} of {data.data.count}</p>
                    ) : (
                        <p>Total: 0</p>
                    )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map((item) => (
                            <div
                                key={item.id}
                                className="card-5 cursor-pointer"
                                onClick={() => handleProductClick(item.id)}
                            >
                                <img
                                    src={`http://localhost:8000/${item.image}`}
                                    className="card-image5 clickable-image w-full h-40 object-cover transform 
                                    transition-transform duration-300 hover:scale-105 border border-black"
                                    alt={item.name}
                                />
                                <div className="card-body5 p-4">
                                    <h5 className="card-title text-black text-sm font-medium -m-6 p-3">{item.name}</h5>
                                    <p className="card-text text-black text-xs mt-1 -m-6 p-3">Des: {item.description}</p>
                                    <p className="card-text text-black text-xs mt-1 font-semibold -m-6 p-3">Price: {item.price}</p>
                                </div>
                            </div>
                        ))
                    ) : searchQuery ? (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-500">No products found matching your search.</p>
                        </div>
                    ) : (
                        <p>Loading....</p>
                    )}
                </div>

                {/* Bottom padding */}
                <div className="h-8"></div>
            </div>

            <ToastContainer />

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

export default PublicProducts;