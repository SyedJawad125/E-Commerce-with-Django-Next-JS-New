'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";

const PublicCategoriesOnHome = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
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
        const res = await AxiosInstance.get('/ecommerce/publiccategory');
        if (res) {
          setRecords(res.data.data.data);
          setData(res.data);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    receiveData();
  }, [flag, router.query?.name]);

  const handleCategoryClick = (categoryId) => {
    // Correctly pass categoryId in query parameters
    router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
  };

  return ( 
    <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-8 lg:px-20">
  <div className="max-w-screen-xl mx-auto">
    <h2 className="text-5xl font-extrabold font-serif text-gray-900 tracking-wide text-center mb-12">
      🧺 Browse Our Collections
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {records.length > 0 ? (
        records.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCategoryClick(item.id)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 relative"
          >
            {/* Category Image */}
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={`http://localhost:8000/${item.image}`}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Category Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>

              <button className="mt-2 w-full py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-300">
                View Products
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">Loading categories...</p>
      )}
    </div>
    <ToastContainer />
  </div>
</div>
  );
};

export default PublicCategoriesOnHome;

// Design
{/* <div className="mx-8 bg-gray-50">     
    <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] mt-16">        
        <h2 className="text-4xl font-serif text-gray-900 font-bold mb-4 tracking-wider text-center">Collections</h2>
      <br />
      <br />      
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
              </div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
      <ToastContainer />
    </div>
    </div> */}
