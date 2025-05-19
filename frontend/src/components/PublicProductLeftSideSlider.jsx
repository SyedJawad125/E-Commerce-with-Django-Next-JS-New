'use client';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '@/components/AxiosInstance';
import { useRouter } from 'next/navigation';

// This left Side Slider in Public Product Page. Which goes to Categories.
const PublicProductLeftSideSlider = () => {
    const router = useRouter();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await AxiosInstance.get('/ecommerce/publiccategory');
                if (res && res.data) {
                    setCategories(res.data.data.data);
                }
            } catch (error) {
                console.log('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, []);

    // Calculate total height needed for seamless looping
    const itemHeight = 112; // Approximate height of each item (h-24 + padding)
    const totalHeight = categories.length * itemHeight;

    const handleCategoryClick = (categoryId) => {
    // Correctly pass categoryId in query parameters
    router.push(`/categorywiseproductpage?categoryId=${categoryId}`);

  };
    return (
        <div className="h-full bg-gray-900 p-5 shadow-lg">
      <div className="h-full overflow-hidden relative space-y-2">

        {/* First set of categories */}
        <div className="animate-scrollUp space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white shadow-md cursor-pointer p-2 hover:bg-gray-100 transition duration-300"
            >
              <img
                src={`http://localhost:8000/${category.image}`}
                alt={category.name}
                className="w-full h-28 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Second set of categories */}
        <div className="animate-scrollUp space-y-4 absolute top-full w-full">
          {categories.map((category) => (
            <div
              key={`${category.id}-duplicate`}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white shadow-md cursor-pointer p-2 hover:bg-gray-100 transition duration-300"
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

      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-${categories.length * 100}px); // Adjust to your card height
          }
        }
        .animate-scrollUp {
          animation: scrollUp ${categories.length * 4}s linear infinite;
        }
      `}</style>
    </div>

    );
};

export default PublicProductLeftSideSlider;