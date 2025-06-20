'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
// import CategoryVerticalSlider from './CategoryVerticalSlider';

const NewArrivalOnHome = () => {
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
                const res = await AxiosInstance.get('/ecommerce/publicproduct?tags=New In');
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
        router.push(`/productdetailpage?ProductId=${ProductId}`);
    };

    return (
    <div className="mx-8 bg-gray-50"> {/* Added left and right margins here */}

        <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] mt-16">
        {/* <h2 className="text-1xl mb-4">NEW ARRIVALS</h2> */}
        <h2 className="text-3xl font-serif text-gray-900 font-bold mb-4 text-center">New Arrivals</h2>
        <br />
        <br />
        {/* {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>} */}
        {/* {(data.data.count) ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>} */}
        <br/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
            {records.length > 0 ? (
                records.map((item) => (
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
                                {/* <p className="card-text text-xs mt-1 -m-6 p-3">Category: {item.category_name}</p> */}
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading....</p>
            )}
        </div>
        <ToastContainer />
        {/* <CategoryVerticalSlider /> */}
    </div>
    </div>

    );
};

export default NewArrivalOnHome;
