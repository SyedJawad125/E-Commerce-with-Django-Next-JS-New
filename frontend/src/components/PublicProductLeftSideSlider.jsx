'use client';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '@/components/AxiosInstance';

const PublicProductLeftSideSlider = () => {
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

    return (
        <div className="h-full bg-gray-800 p-2 shadow-md">
            <div className="h-full overflow-hidden relative">
                {/* First set of categories (visible initially) */}
                <div className="animate-scrollUp space-y-2 ml-2 mr-2">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded shadow cursor-pointer p-1 hover:bg-gray-200 transition"
                        >
                            <img
                                src={`http://localhost:8000/${category.image}`}
                                alt={category.name}
                                className="w-full h-24 object-cover rounded"
                            />
                            <p className="text-center text-sm mt-2 font-medium">{category.name}</p>
                        </div>
                    ))}
                </div>
                
                {/* Second set of categories (duplicate for seamless looping) */}
                <div className="animate-scrollUp space-y-2 ml-4 absolute top-full">
                    {categories.map((category) => (
                        <div
                            key={`${category.id}-duplicate`}
                            className="bg-white rounded shadow cursor-pointer p-1 hover:bg-gray-800 transition"
                        >
                            <img
                                src={`http://localhost:8000/${category.image}`}
                                alt={category.name}
                                className="w-full h-28 object-cover rounded"
                            />
                            <p className="text-center text-sm mt-2 font-medium">{category.name}</p>
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
                        transform: translateY(-${totalHeight}px);
                    }
                }
                .animate-scrollUp {
                    animation: scrollUp ${categories.length * 3}s linear infinite;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default PublicProductLeftSideSlider;