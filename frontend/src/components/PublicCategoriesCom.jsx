// 'use client'
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const Publiccategory = () => {
//   const router = useRouter();

//   const [data, setData] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [flag, setFlag] = useState(false);

//   useEffect(() => {
//     if (router.query && router.query.name) {
//         toast.success(router.query.name);
//         router.push('/products', undefined, { shallow: true });
//     } else if (flag) {
//         toast.success('Product deleted');
//         setFlag(false);
//     }

//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/publiccategory');
//         if (res) {
//           setRecords(res.data.data.data);
//           setData(res.data);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, [flag, router.query?.name]);

//   const handleCategoryClick = (categoryId) => {
//     // Correctly pass categoryId in query parameters
//     router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
//   };

//   return ( 
//     <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] bg-gray-50">
//         {/* <h2 className="text-2xl font-bold mb-4">COLLECTIONS</h2> */}
//         <h2 className="text-4xl font-serif text-gray-900 font-bold -mb-10 mt-10 text-center tracking-wider">Collections</h2>

//       <br />
//       <br />
//       { data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}
//       <br/>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
//         {records.length > 0 ? (
//           records.map((item) => (
//             <div
//               key={item.id}
//               className="card-5 cursor-pointer"
//               onClick={() => handleCategoryClick(item.id)}
//             >
//               <img
//                 src={`http://localhost:8000/${item.image}`}
//                 className="card-image5 clickable-image w-full h-40 object-cover transform 
//                            transition-transform duration-300 hover:scale-105 border border-black"
//                 alt={item.name}
//               />
//               <div className="card-body5 p-4">
//                 <h5 className="card-title text-black text-sm font-medium -m-6 p-3">{item.name}</h5>
//                 <p className="card-text text-black text-xs mt-1 -m-6 p-3">Des: {item.description}</p>
                
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Loading....</p>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Publiccategory;



'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";

const PublicCategory = () => {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sliderHeight, setSliderHeight] = useState('auto');
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
                // Fetch categories (main content)
                const categoriesRes = await AxiosInstance.get('/ecommerce/publiccategory');
                if (categoriesRes) {
                    setRecords(categoriesRes.data.data.data);
                    setData(categoriesRes.data);
                }

                // Fetch products (for the slider)
                const productsRes = await AxiosInstance.get('/ecommerce/publicproduct');
                if (productsRes && productsRes.data) {
                    setCategories(productsRes.data.data.data);
                }
            } catch (error) {
                console.log('Error occurred', error);
            }
        };

        fetchData();
    }, [flag, router.query?.name]);

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
    }, [records]);

    const handleCategoryClick = (categoryId) => {
        router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
    };

    const handleProductClick = (ProductId) => {
        router.push(`/productdetailpage?ProductId=${ProductId}`);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Side - Products Slider (styled like first code) */}
            <div className="w-1/7 bg-gray-100 p-4 shadow-lg" style={{ height: sliderHeight }}>
                <div className="h-full overflow-hidden relative space-y-2">
                    {/* First set of products */}
                    <div className="animate-scrollUp space-y-2">
                        {categories.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleProductClick(product.id)}
                                className="card-5 cursor-pointer"
                            >
                                <img
                                    src={`http://localhost:8000/${product.image}`}
                                    className="card-image5 clickable-image w-full h-40 object-cover transform 
                                    transition-transform duration-300 hover:scale-105 border border-black"
                                    alt={product.name}
                                />
                                
                            </div>
                        ))}
                    </div>

                    {/* Second set of products (for seamless looping) */}
                    <div className="animate-scrollUp space-y-2 absolute top-full w-full">
                        {categories.map((product) => (
                            <div
                                key={`${product.id}-duplicate`}
                                onClick={() => handleProductClick(product.id)}
                                className="card-5 cursor-pointer"
                            >
                                <img
                                    src={`http://localhost:8000/${product.image}`}
                                    className="card-image5 clickable-image w-full h-40 object-cover transform 
                                    transition-transform duration-300 hover:scale-105 border border-black"
                                    alt={product.name}
                                />
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Categories */}
            <div className="w-6/7 p-8" ref={productsRef}>
                <h2 className="text-4xl font-serif text-gray-900 font-bold -mb-10 mt-10 text-center tracking-wider">Collections</h2>

                <br />
                <br />
                {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}
                <br/>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
                    {records.length > 0 ? (
                        records.map((item) => (
                            <div
                                key={item.id}
                                className="card-5 cursor-pointer"
                                onClick={() => handleCategoryClick(item.id)}
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

export default PublicCategory;