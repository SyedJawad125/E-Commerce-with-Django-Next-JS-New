'use client';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '@/components/AxiosInstance';
import { useRouter } from 'next/navigation';

const PublicCategoryLeftSideSlider = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await AxiosInstance.get('/ecommerce/publicproduct');
        if (res?.data?.data?.data) {
          setProducts(res.data.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (ProductId) => {
    router.push(`/productdetailpage?ProductId=${ProductId}`);
  };

  const itemHeight = 112; // Height of each item
  const animationHeight = products.length * itemHeight;

  return (
    <div className="h-full bg-gray-900 p-5 shadow-lg">
      <div className="h-full overflow-hidden relative space-y-2">
        {/* First loop */}
        <div className="animate-scrollUp space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="bg-white shadow-md cursor-pointer p-2 hover:bg-gray-400 transition duration-300"
            >
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-full h-28 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="animate-scrollUp space-y-4 absolute top-full w-full">
          {products.map((product) => (
            <div
              key={`${product.id}-duplicate`}
              onClick={() => handleProductClick(product.id)}
              className="bg-white shadow-md cursor-pointer p-2 hover:bg-gray-100 transition duration-300"
            >
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-full h-28 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-${animationHeight}px);
          }
        }
        .animate-scrollUp {
          animation: scrollUp ${products.length * 4}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PublicCategoryLeftSideSlider;
