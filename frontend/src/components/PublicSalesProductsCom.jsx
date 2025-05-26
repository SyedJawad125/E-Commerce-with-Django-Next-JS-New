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
                    setRecords(res.data.data.data);
                    setData(res.data);
                }
            } catch (error) {
                console.log('Error occurred', error);
            }
        };

        receiveData();
    }, [flag, router.query?.name]);

    const handleProductClick = (ProductId) => {
        router.push(`/salesproductdetailspage?ProductId=${ProductId}`);
    };

    return (
        <div className="container mx-auto my-8 px-4 w-[calc(100%-6rem)]">
    {/* Header Section */}
    <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-gray-900 font-bold mb-16 mt-10 tracking-wider">EXCLUSIVE SALES</h2>
        {/* <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-800 mx-auto mb-6"></div>
        {data && data.data ? (
            <p className="text-sm text-gray-600 font-light">CURATED SELECTION: {data.data.count} LUXURY ITEMS</p>
        ) : (
            <p className="text-sm text-gray-600 font-light">CURATED SELECTION: 0 ITEMS</p>
        )} */}
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
</div>
    );
};

export default PublicSalesProductsCom;