// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";

// const CategoryWiseProductCom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [categoryName, setCategoryName] = useState('');

//   useEffect(() => {
//     const categoryId = searchParams.get('categoryId');
//     const catName = searchParams.get('categoryName');

//     if (catName) {
//       setCategoryName(decodeURIComponent(catName));
//     }

//     if (categoryId) {
//       const fetchProduct = async () => {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/publicproduct?category=${categoryId}`);
//           if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
//             setProducts(res.data.data.data);
//           }
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       };
//       fetchProduct();
//     }
//   }, [searchParams]);

//   const handleBackButton = () => {
//     router.push('/publiccategories');
//   };

//   const handleProductClick = (ProductId) => {
//     router.push(`/productdetailpage?ProductId=${ProductId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8 -mt-16">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with Back Button */}
//         <div className="flex justify-between items-center mb-16">
//           <button
//             onClick={handleBackButton}
//             className="flex items-center text-gray-600 hover:text-amber-700 transition-colors duration-300 mt-10"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Collections
//           </button>
//         </div>

//         {/* Category Title */}
//         <div className="text-center mb-16 mt-2">
//           <h1 className="text-2xl md:text-3xl font-serif font-light text-gray-900 mb-4 tracking-wide">
//             {categoryName || 'Our Collections'}
//           </h1>
//           <div className="w-24 h-0.5 bg-amber-600 mx-auto"></div>
//         </div>

//         {/* Products Grid */}
//         {products.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 -mt-4">
//             {products.map((product) => (
//               <div 
//                 key={product.id} 
//                 className="group relative bg-white shadow-md hover:shadow-xl transition-all duration-500 rounded-lg overflow-hidden cursor-pointer"
//                 onClick={() => handleProductClick(product.id)}
//               >
//                 {/* Product Image */}
//                 <div className="relative overflow-hidden aspect-square">
//                   <img
//                     src={`http://localhost:8000/${product.image}`}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                     alt={product.name}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-serif font-medium text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
//                     {product.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {product.description}
//                   </p>
                  
//                   {/* Price and Action */}
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-medium text-amber-800">
//                       Rs. {product.price}
//                       {product.price > product.price && (
//                         <span className="ml-2 text-sm text-gray-400 line-through">{product.price}</span>
//                       )}
//                     </span>
//                     <button className="text-gray-400 hover:text-amber-700 transition-colors">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="text-xl font-light text-gray-600 mb-2">No products found</h3>
//             <p className="text-gray-500">We couldn't find any products in this collection</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryWiseProductCom;




'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

const CategoryWiseProductCom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    const catName = searchParams.get('categoryName');

    if (catName) {
      setCategoryName(decodeURIComponent(catName));
    }

    if (categoryId) {
      const fetchProduct = async () => {
        try {
          const res = await AxiosInstance.get(`/ecommerce/publicproduct?category=${categoryId}`);
          if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
            // Process products to use first image from image_urls as main image
            const processedProducts = res.data.data.data.map(product => ({
              ...product,
              mainImage: product.image_urls?.[0] 
                ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
                : '/default-product-image.jpg',
              remainingImages: product.image_urls?.slice(1).map(u => 
                `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
              ) || []
            }));
            setProducts(processedProducts);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProduct();
    }
  }, [searchParams]);

  const handleBackButton = () => {
    router.push('/publiccategories');
  };

  const handleProductClick = (product) => {
    const query = new URLSearchParams({
      ProductId: product.id.toString(),
      productData: JSON.stringify(product)
    }).toString();
    router.push(`/productdetailpage?${query}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8 -mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-16">
          <button
            onClick={handleBackButton}
            className="flex items-center text-gray-600 hover:text-amber-700 transition-colors duration-300 mt-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Collections
          </button>
        </div>

        {/* Category Title */}
        <div className="text-center mb-16 mt-2">
          <h1 className="text-2xl md:text-3xl font-serif font-light text-gray-900 mb-4 tracking-wide">
            {categoryName || 'Our Collections'}
          </h1>
          <div className="w-24 h-0.5 bg-amber-600 mx-auto"></div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 -mt-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white shadow-md hover:shadow-xl transition-all duration-500 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.mainImage}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={product.name}
                  />
                  {product.remainingImages.length > 0 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      +{product.remainingImages.length}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Price and Action */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-amber-800">
                      Rs. {product.price}
                      {product.original_price > product.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">Rs. {product.original_price}</span>
                      )}
                    </span>
                    <button className="text-gray-400 hover:text-amber-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-light text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">We couldn't find any products in this collection</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryWiseProductCom;