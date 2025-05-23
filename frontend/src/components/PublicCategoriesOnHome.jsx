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
    <div className="mx-8"> {/* Added left and right margins here */}
    
    <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] mt-16">
        <h2 className="text-1xl mb-2">COLLECTIONS</h2>
      <br />
      <br />
      {/* { data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>} */}
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
                           transition-transform duration-300 hover:scale-105"
                alt={item.name}
              />
              <div className="card-body5 p-4">
                <h5 className="card-title text-sm font-medium -m-6 p-3">{item.name}</h5>
                <p className="card-text text-xs mt-1 -m-6 p-3">Des: {item.description}</p>
                
              </div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
      <ToastContainer />
    </div>
    </div>

  );
};

export default PublicCategoriesOnHome;
