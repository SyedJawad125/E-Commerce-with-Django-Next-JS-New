// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useCart } from '@/components/CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ProductDetailsCom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [products, setProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1); // State for product quantity
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const ProductId = searchParams.get('ProductId');

//     if (ProductId) {
//       const fetchProduct = async () => {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/publicproduct?id=${ProductId}`);
//           if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
//             setProducts(res.data.data.data);
//           } else {
//             console.error('Unexpected API response structure:', res.data);
//           }
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       };
//       fetchProduct();
//     }
//   }, [searchParams]);

//   const handleBackButton = () => {
//     router.push('/publicproducts');
//   };

//   const handleAddToCart = () => {
//     if (products.length > 0) {
//       addToCart(products[0], quantity); // Add product with selected quantity
//       toast.success('Product added to cart!');
//       router.push('/addtocartpage');
//     } else {
//       console.error('No products to add to cart');
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1); // Increment the quantity
//   };

//   const decreaseQuantity = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Decrement the quantity, but not below 1
//   };

//   return (
//     <div className="container mx-auto mt-6 mb-24 px-4 sm:px-6 lg:px-8 w-11/12 lg:w-3/4">
//       <div className="flex justify-between items-center mb-8">
//         <button
//           type="button"
//           className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-500 transition duration-300"
//           onClick={handleBackButton}
//         >
//           Go Back
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-3/4">
//         {products.length ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="md:col-start-2 md:col-span-2 bg-gray-900 shadow-2xl rounded-lg overflow-hidden transform transition duration-500 ease-in-out"
//             >
//               <img
//                 src={`http://localhost:8000/${product.image}`}
//                 className="w-full h-72 object-cover"
//                 alt={product.name}
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-semibold text-white mb-3">{product.name}</h3>
//                 <p className="text-gray-300 mb-4">{product.description}</p>
//                 <div className="text-gray-400 text-sm">
//                   <p>Price: {product.price}</p>
//                 </div>
//                 <div className="flex items-center mt-4">
//                   <button
//                     className="bg-gray-700 text-white px-2 py-1 rounded-l"
//                     onClick={decreaseQuantity}
//                   >
//                     -
//                   </button>
//                   <span className="bg-gray-800 text-white px-4 py-1">{quantity}</span>
//                   <button
//                     className="bg-gray-700 text-white px-2 py-1 rounded-r"
//                     onClick={increaseQuantity}
//                   >
//                     +
//                   </button>
//                   <button
//                   type="button"
//                   className="bg-green-500 text-white py-2 px-4 rounded mt-0 ml-10"
//                   onClick={handleAddToCart}
//                 >
//                   Add to Cart
//                 </button>
//                 </div>
               
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No products found for this category.</p>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProductDetailsCom;



// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useCart } from '@/components/CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Image from 'next/image';

// const ProductDetailsCom = () => {
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
//           const res = await AxiosInstance.get(`/ecommerce/publicproduct?id=${ProductId}`);
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
//     router.push('/publicproducts');
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
//             Back to Products
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
//                 {/* <div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
//                   ${products[0].price}
//                 </div> */}
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
//                   <h3 className="text-sm font-medium text-gray-900">Pricing</h3>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-600">
//                       <span className="font-semibold">Price:</span> ${products[0].price}
//                     </p>
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
//       {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
//     </div>
//   );
// };

// export default ProductDetailsCom;




'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { useCart } from '@/components/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const ProductDetailsCom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: '',
    email: ''
  });

  const [featuredProducts, setFeaturedProducts] = useState([]);

  const ProductId = searchParams.get('ProductId');

  useEffect(() => {
    if (ProductId) {
      const fetchProduct = async () => {
        try {
          const res = await AxiosInstance.get(`/ecommerce/publicproduct?id=${ProductId}`);
          if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
            setProducts(res.data.data.data);
          } else {
            console.error('Unexpected API response structure:', res.data);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
      
      const fetchFeaturedProducts = async () => {
        try {
          const res = await AxiosInstance.get('/ecommerce/publiccategory');
          if (res?.data?.data?.data) {
            setFeaturedProducts(res.data.data.data);
          }
        } catch (error) {
          console.error('Error fetching featured products:', error);
        }
      };
      
      fetchFeaturedProducts();
    
      const fetchReviews = async () => {
        try {
          const res = await AxiosInstance.get(`/ecommerce/publicreview?product_id=${ProductId}`);
          if (res?.data?.data) {
            setReviews(res.data.data.data || []);
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        } finally {
          setReviewLoading(false);
        }
      };
      
      fetchProduct();
      fetchReviews();
    }
  }, [ProductId]);

  // Auto-scrolling slider effect
  useEffect(() => {
    if (featuredProducts.length <= 1 || isHovered) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % featuredProducts.length;
        const itemWidth = slider.firstChild?.offsetWidth || 300;
        slider.scrollTo({
          left: nextIndex * itemWidth,
          behavior: 'smooth'
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [featuredProducts.length, isHovered]);

  const handleBackButton = () => {
    router.push('/publicproducts');
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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const submitReview = async () => {
    if (!newReview.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!newReview.comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    try {
      const reviewData = {
        ...newReview,
        product: ProductId,
        rating: parseInt(newReview.rating),
        email: newReview.email.trim() || null
      };

      const res = await AxiosInstance.post('/ecommerce/publicreview', reviewData);
      if (res.data) {
        toast.success('Review submitted successfully!');
        setReviews(prev => [res.data.data, ...prev]);
        setNewReview({
          rating: 5,
          comment: '',
          name: '',
          email: ''
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const cleanedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `http://localhost:8000/${cleanedPath}`;
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-6 h-6 ${i < rating ? 'text-amber-400' : 'text-gray-400'} ${
              interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={() => interactive && handleRatingChange(i + 1)}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const scrollToItem = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const itemWidth = slider.firstChild?.offsetWidth || 300;
    const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
    
    slider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
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
          Back to Products
        </button>
      </div>
      <div className="max-w-5xl mx-auto -mt-10">
        
        {products.length ? (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative h-96 md:h-auto">
                {products[0].image ? (
                  <img
                    src={getImageUrl(products[0].image)}
                    alt={products[0].name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span>No image available</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{products[0].name}</h1>
                
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {renderStars(Math.round(products[0].averageRating || 0))}
                    <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{products[0].description}</p>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-900">Pricing</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Price:</span> ${products[0].price}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-900">Details</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">High-quality materials</p>
                    <p className="text-sm text-gray-600">Designed for comfort</p>
                    <p className="text-sm text-gray-600">Premium craftsmanship</p>
                  </div>
                </div>

                <div className="flex items-center mb-8">
                  <div className="flex items-center border border-gray-900 rounded-md">
                    <button
                      className="px-4 py-2 text-gray-900 hover:bg-gray-300"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x text-gray-900 border-gray-900">{quantity}</span>
                    <button
                      className="px-4 py-2 text-gray-900 hover:bg-gray-300"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Luxury Horizontal Slider */}
            {featuredProducts.length > 0 && (
              <div className="px-8 py-12 border-t border-gray-200 mt-20">
                {/* <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-8 text-center">
                  Luxury Selection
                </h2> */}
                
                <div 
                  className="relative overflow-hidden group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <button 
                    onClick={() => scrollToItem('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Scroll left"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div 
                    ref={sliderRef}
                    className="flex space-x-6 overflow-x-auto py-4 px-2 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {featuredProducts.map((product) => (
                      <div 
                        key={product.id}
                        onClick={() => router.push(`/productdetailpage?ProductId=${product.id}`)}
                        className="flex-shrink-0 w-40 h-48 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border border-gray-200"
                      >
                        <div className="relative h-48 w-full">
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-product.png';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          {/* <div className="absolute bottom-0 left-0 p-4">
                            <h4 className="text-white font-medium">{product.name}</h4>
                            <p className="text-amber-400 font-bold">${product.price}</p>
                          </div> */}
                        </div>
                        {/* <div className="p-4">
                          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                        </div> */}
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => scrollToItem('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Scroll right"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="border-t border-gray-200 px-8 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
              
              {/* Review Form */}
              <div className="bg-gray-50 p-6 rounded-lg mb-12">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                  {renderStars(newReview.rating, true)}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newReview.comment}
                    onChange={handleReviewChange}
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newReview.name}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newReview.email}
                      onChange={handleReviewChange}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                
                <button
                  onClick={submitReview}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Review
                </button>
              </div>
              
              {/* Reviews List */}
              {reviewLoading ? (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-opacity-80 border-gold-500"></div>
  </div>
) : reviews.length > 0 ? (
  <div className="space-y-8">
    {reviews.map((review) => (
      <div 
        key={review.id} 
        className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-gold-100 to-transparent transform rotate-45"></div>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-400 from-gold-500 to-gold-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-medium text-xl shadow-sm">
              {review.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-lg">{review.name}</h4>
              <p className="text-sm text-gray-500 font-light">{formatDate(review.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm font-medium text-gray-700">{review.rating}.0</span>
          </div>
        </div>
        
        <div className="mt-4 pl-16">
          <p className="text-gray-700 leading-relaxed font-light">{review.comment}</p>
        </div>
        
        {/* Decorative divider */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"></div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-br from-gold-50 to-gold-100 rounded-full mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="mt-2 text-xl font-medium text-gray-900">No reviews yet</h3>
    <p className="mt-2 text-gray-500 max-w-md mx-auto">Be the first to share your thoughts about this exquisite product.</p>

                </div>
              )}
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

export default ProductDetailsCom;