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





'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";

const PublicSalesProductsCom = () => {
    const router = useRouter();
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

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
                const res = await AxiosInstance.get('/ecommerce/publicsalesproduct');
                if (res) {
                    // Process the products to include proper image URLs
                    const processedProducts = res.data.data.data.map(product => ({
                        ...product,
                        mainImage: product.image_urls?.[0] 
                            ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
                            : '/default-product-image.jpg',
                        remainingImages: product.image_urls?.slice(1).map(u => 
                            `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
                        ) || []
                    }));
                    
                    setRecords(processedProducts);
                    setData(res.data);
                }
            } catch (error) {
                console.log('Error occurred', error);
            }
        };

        receiveData();
    }, [flag, router.query?.name]);

    const handleProductClick = (product) => {
        const query = new URLSearchParams({
            ProductId: product.id.toString(),
            productData: JSON.stringify(product)
        }).toString();

        router.push(`/salesproductdetailspage?${query}`);
    };

    return (
        <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-8 lg:px-20">
  <div className="max-w-screen-xl mx-auto">
    <h2 className="text-5xl font-extrabold font-serif text-gray-900 tracking-wide text-center mb-12">
      ✨ Sales Collection ✨
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {records.length > 0 ? (
        records.map((item) => (
          <div
            key={item.id}
            onClick={() => handleProductClick(item)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 relative"
          >
            {/* Discount Badge */}
            {item.discount_percent > 0 && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-20">
                {item.discount_percent}% OFF
              </div>
            )}

            {/* Product Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={item.mainImage}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center gap-2 text-sm">
                <p className="text-gray-400 line-through">Rs {item.original_price}</p>
                <p className="text-red-600 font-bold">Rs {item.final_price}</p>
              </div>

              <button className="mt-2 w-full py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">Loading products...</p>
      )}
    </div>
    <ToastContainer />
  </div>
</div>
    );
};

export default PublicSalesProductsCom;