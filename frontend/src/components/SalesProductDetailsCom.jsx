// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useCart } from '@/components/CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Image from 'next/image';

// const SalesProductDetailsCom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [products, setProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const ProductId = searchParams.get('ProductId');

//     if (ProductId) {
//       const fetchProduct = async () => {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/publicsalesproduct?id=${ProductId}`);
//           if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
//             setProducts(res.data.data.data);
//           } else {
//             console.error('Unexpected API response structure:', res.data);
//           }
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProduct();
//     }
//   }, [searchParams]);

//   const handleBackButton = () => {
//     router.push('/publicsalesproductpage');
//   };

//   const handleAddToCart = () => {
//     if (products.length > 0) {
//       addToCart(products[0], quantity);
//       toast.success('Product added to cart!');
//       router.push('/addtocartpage');
//     } else {
//       console.error('No products to add to cart');
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const decreaseQuantity = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Helper function to clean image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     // Remove leading slash if present to avoid double slashes
//     const cleanedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
//     return `http://localhost:8000/${cleanedPath}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center mb-8">
//           <button
//             onClick={handleBackButton}
//             className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Sale
//           </button>
//       </div>
//       <div className="max-w-5xl mx-auto -mt-10">
        

//         {products.length ? (
//           <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Product Image */}
//               <div className="relative h-96 md:h-auto">
//                 {products[0].image ? (
//                   <img
//                     src={getImageUrl(products[0].image)}
//                     alt={products[0].name}
//                     className="object-cover w-full h-full"
//                   />
//                 ) : (
//                   <div className="bg-gray-200 w-full h-full flex items-center justify-center">
//                     <span>No image available</span>
//                   </div>
//                 )}
//                 {products[0].discount_percent > 0 && (
//                   <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md z-10">
//                     {products[0].discount_percent}% OFF
//                   </div>
//                 )}
//                 {products[0].discount_price && (
//                   <div className="absolute bottom-4 left-4 bg-red-600 bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm">
//                     Save {(products[0].price - products[0].discount_price).toFixed(2)}
//                   </div>
//                 )}
//               </div>

//               {/* Product Details */}
//               <div className="p-8 flex flex-col justify-center">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">{products[0].name}</h1>
                
//                 <div className="flex items-center mb-6">
//                   <div className="flex items-center">
//                     {[...Array(5)].map((_, i) => (
//                       <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                     <span className="text-gray-600 ml-2">(24 reviews)</span>
//                   </div>
//                 </div>

//                 <p className="text-gray-700 mb-6">{products[0].description}</p>

//                 <div className="mb-8">
//                   {/* <h3 className="text-sm font-medium text-gray-900">Pricing</h3> */}
//                   <div className="mt-2">
//                     {products[0].discount_percent > 0 ? (
//                       <>
//                         <p className="text-sm text-gray-600">
//                           <span className="font-semibold">Old Price:</span> 
//                           <span className="line-through ml-1">{products[0].original_price}</span>
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           <span className="font-semibold">Price:</span> 
//                           <span className="text-red-600 ml-1">{products[0].final_price}</span>
//                         </p>
//                       </>
//                     ) : (
//                       <p className="text-sm text-gray-600">
//                         <span className="font-semibold">Price:</span> {products[0].final_price}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mb-8">
//                   <h3 className="text-sm font-medium text-gray-900">Details</h3>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-600">High-quality materials</p>
//                     <p className="text-sm text-gray-600">Designed for comfort</p>
//                     <p className="text-sm text-gray-600">Premium craftsmanship</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center mb-8">
//                   <div className="flex items-center border border-gray-900 rounded-md">
//                     <button
//                       className="px-4 py-2 text-gray-900 hover:bg-gray-300"
//                       onClick={decreaseQuantity}
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-2 border-x text-gray-900 border-gray-900">{quantity}</span>
//                     <button
//                       className="px-4 py-2 text-gray-900 hover:bg-gray-300"
//                       onClick={increaseQuantity}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleAddToCart}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No product found</h3>
//             <p className="mt-1 text-gray-500">We couldn't find any products matching your criteria.</p>
//           </div>
//         )}
//       </div>
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SalesProductDetailsCom;





'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { useCart } from '@/components/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const SalesProductDetailsCom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [remainingImages, setRemainingImages] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const ProductId = searchParams.get('ProductId');

    if (ProductId) {
      const fetchProduct = async () => {
        try {
          const res = await AxiosInstance.get(`/ecommerce/publicsalesproduct?id=${ProductId}`);
          if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
            const productData = res.data.data.data[0];
            setProducts([productData]);
            
            // Process images
            if (productData.images && productData.images.length > 0) {
              const processedImages = productData.images.map(img => ({
                ...img,
                fullUrl: `${baseURL}${img.images.startsWith('/') ? '' : '/'}${img.images}`
              }));
              setMainImage(processedImages[0].fullUrl);
              setRemainingImages(processedImages.slice(1));
            } else if (productData.image) {
              // Fallback for single image field
              setMainImage(`${baseURL}${productData.image.startsWith('/') ? '' : '/'}${productData.image}`);
              setRemainingImages([]);
            }
          } else {
            console.error('Unexpected API response structure:', res.data);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [searchParams, baseURL]);

  const handleBackButton = () => {
    router.push('/publicsalesproductpage');
  };

  const handleAddToCart = () => {
    if (products.length > 0) {
      addToCart(products[0], quantity);
      toast.success('Product added to cart!');
      router.push('/addtocartpage');
    } else {
      console.error('No products to add to cart');
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const changeMainImage = (imageUrl) => {
    setMainImage(imageUrl);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBackButton}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Sale
          </button>
      </div>
      <div className="max-w-5xl mx-auto -mt-10">
        {products.length ? (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="p-6">
                <div className="relative h-96 w-full mb-6 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt={products[0].name}
                      className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-product-image.jpg';
                      }}
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                      <span>No image available</span>
                    </div>
                  )}
                  {products[0].discount_percent > 0 && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-md z-10">
                      {products[0].discount_percent}% OFF
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {(remainingImages.length > 0 || (products[0].image && !products[0].images)) && (
                  <div className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide">
                    {remainingImages.map((img, index) => (
                      <div
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                          mainImage === img.fullUrl 
                            ? 'border-blue-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => changeMainImage(img.fullUrl)}
                      >
                        <img
                          src={img.fullUrl}
                          alt={`Thumbnail ${index + 1}`}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-product-image.jpg';
                          }}
                        />
                      </div>
                    ))}
                    {/* Fallback for single image field */}
                    {!products[0].images && products[0].image && (
                      <div
                        className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                          mainImage === `${baseURL}${products[0].image.startsWith('/') ? '' : '/'}${products[0].image}`
                            ? 'border-blue-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => changeMainImage(`${baseURL}${products[0].image.startsWith('/') ? '' : '/'}${products[0].image}`)}
                      >
                        <img
                          src={`${baseURL}${products[0].image.startsWith('/') ? '' : '/'}${products[0].image}`}
                          alt="Product thumbnail"
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-product-image.jpg';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{products[0].name}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 ml-2">(24 reviews)</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{products[0].description}</p>

                <div className="mb-8">
                  {products[0].discount_percent > 0 ? (
                    <>
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-gray-900">
                          PKR {products[0].final_price}
                        </span>
                        <span className="ml-3 text-lg text-gray-500 line-through">
                          PKR {products[0].original_price}
                        </span>
                      </div>
                      <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                        SAVE {products[0].discount_percent}%
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      PKR {products[0].final_price}
                    </span>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Details</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Premium materials
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Handcrafted with care
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Free shipping on orders over PKR 5000
                    </li>
                  </ul>
                </div>

                <div className="flex items-center mb-8">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 text-gray-900">{quantity}</span>
                    <button
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-md transition-colors font-medium">
                    Buy Now
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Fast Delivery</h4>
                      <p className="text-sm text-gray-500">Express shipping available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description Section */}
            <div className="border-t border-gray-200 px-8 py-12">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button className="whitespace-nowrap py-4 px-1 border-b-2 border-blue-600 text-sm font-medium text-blue-600">
                    Description
                  </button>
                  <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Additional Information
                  </button>
                  <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                    Reviews (24)
                  </button>
                </nav>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Story</h3>
                <p className="text-gray-700 leading-relaxed">
                  {products[0].long_description || "This exquisite piece is crafted with the finest materials and attention to detail. Each item in our collection undergoes rigorous quality control to ensure perfection. Designed to last, this product embodies timeless elegance and superior craftsmanship."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No product found</h3>
            <p className="mt-1 text-gray-500">We couldn't find any products matching your criteria.</p>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SalesProductDetailsCom;