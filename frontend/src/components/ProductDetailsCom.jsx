// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useCart } from '@/components/CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Image from 'next/image';

// const ProductDetailsCom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sliderRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const [products, setProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [reviews, setReviews] = useState([]);
//   const [reviewLoading, setReviewLoading] = useState(true);
//   const [newReview, setNewReview] = useState({
//     rating: 5,
//     comment: '',
//     name: '',
//     email: ''
//   });

//   const [featuredProducts, setFeaturedProducts] = useState([]);

//   const ProductId = searchParams.get('ProductId');

//   useEffect(() => {
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
      
//       const fetchFeaturedProducts = async () => {
//         try {
//           const res = await AxiosInstance.get('/ecommerce/publiccategory');
//           if (res?.data?.data?.data) {
//             setFeaturedProducts(res.data.data.data);
//           }
//         } catch (error) {
//           console.error('Error fetching featured products:', error);
//         }
//       };
      
//       fetchFeaturedProducts();
    
//       const fetchReviews = async () => {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/publicreview?product_id=${ProductId}`);
//           if (res?.data?.data) {
//             setReviews(res.data.data.data || []);
//           }
//         } catch (error) {
//           console.error('Error fetching reviews:', error);
//         } finally {
//           setReviewLoading(false);
//         }
//       };
      
//       fetchProduct();
//       fetchReviews();
//     }
//   }, [ProductId]);

//   // Auto-scrolling slider effect
//   useEffect(() => {
//     if (featuredProducts.length <= 1 || isHovered) return;

//     const slider = sliderRef.current;
//     if (!slider) return;

//     const interval = setInterval(() => {
//       setCurrentIndex(prev => {
//         const nextIndex = (prev + 1) % featuredProducts.length;
//         const itemWidth = slider.firstChild?.offsetWidth || 300;
//         slider.scrollTo({
//           left: nextIndex * itemWidth,
//           behavior: 'smooth'
//         });
//         return nextIndex;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [featuredProducts.length, isHovered]);

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

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target;
//     setNewReview(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleRatingChange = (rating) => {
//     setNewReview(prev => ({
//       ...prev,
//       rating
//     }));
//   };

//   const submitReview = async () => {
//     if (!newReview.name.trim()) {
//       toast.error('Please enter your name');
//       return;
//     }
    
//     if (!newReview.comment.trim()) {
//       toast.error('Please enter a review comment');
//       return;
//     }

//     try {
//       const reviewData = {
//         ...newReview,
//         product: ProductId,
//         rating: parseInt(newReview.rating),
//         email: newReview.email.trim() || null
//       };

//       const res = await AxiosInstance.post('/ecommerce/publicreview', reviewData);
//       if (res.data) {
//         toast.success('Review submitted successfully!');
//         setReviews(prev => [res.data.data, ...prev]);
//         setNewReview({
//           rating: 5,
//           comment: '',
//           name: '',
//           email: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       toast.error('Failed to submit review');
//     }
//   };

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null;
//     const cleanedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
//     return `http://localhost:8000/${cleanedPath}`;
//   };

//   const renderStars = (rating, interactive = false) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, i) => (
//           <svg
//             key={i}
//             className={`w-6 h-6 ${i < rating ? 'text-amber-400' : 'text-gray-400'} ${
//               interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''
//             }`}
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             onClick={() => interactive && handleRatingChange(i + 1)}
//           >
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//         ))}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const scrollToItem = (direction) => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const itemWidth = slider.firstChild?.offsetWidth || 300;
//     const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
    
//     slider.scrollBy({
//       left: scrollAmount,
//       behavior: 'smooth'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center mb-8">
//         <button
//           onClick={handleBackButton}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back to Products
//         </button>
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
//               </div>

//               {/* Product Details */}
//               <div className="p-8 flex flex-col justify-center">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">{products[0].name}</h1>
                
//                 <div className="flex items-center mb-6">
//                   <div className="flex items-center">
//                     {renderStars(Math.round(products[0].averageRating || 0))}
//                     <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
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

//             {/* Luxury Horizontal Slider */}
//             {featuredProducts.length > 0 && (
//               <div className="px-8 py-12 border-t border-gray-200 mt-20">
//                 {/* <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-8 text-center">
//                   Luxury Selection
//                 </h2> */}
                
//                 <div 
//                   className="relative overflow-hidden group"
//                   onMouseEnter={() => setIsHovered(true)}
//                   onMouseLeave={() => setIsHovered(false)}
//                 >
//                   <button 
//                     onClick={() => scrollToItem('left')}
//                     className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                     aria-label="Scroll left"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                   </button>
                  
//                   <div 
//                     ref={sliderRef}
//                     className="flex space-x-6 overflow-x-auto py-4 px-2 scrollbar-hide scroll-smooth"
//                     style={{ scrollbarWidth: 'none' }}
//                   >
//                     {featuredProducts.map((product) => (
//                       <div 
//                         key={product.id}
//                         onClick={() => router.push(`/productdetailpage?ProductId=${product.id}`)}
//                         className="flex-shrink-0 w-40 h-48 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border border-gray-200"
//                       >
//                         <div className="relative h-48 w-full">
//                           <img
//                             src={getImageUrl(product.image)}
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = '/placeholder-product.png';
//                             }}
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                           {/* <div className="absolute bottom-0 left-0 p-4">
//                             <h4 className="text-white font-medium">{product.name}</h4>
//                             <p className="text-amber-400 font-bold">${product.price}</p>
//                           </div> */}
//                         </div>
//                         {/* <div className="p-4">
//                           <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
//                         </div> */}
//                       </div>
//                     ))}
//                   </div>
                  
//                   <button 
//                     onClick={() => scrollToItem('right')}
//                     className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                     aria-label="Scroll right"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Reviews Section */}
//             <div className="border-t border-gray-200 px-8 py-12">
//               <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
              
//               {/* Review Form */}
//               <div className="bg-gray-50 p-6 rounded-lg mb-12">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
//                   {renderStars(newReview.rating, true)}
//                 </div>
                
//                 <div className="mb-4">
//                   <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Review
//                   </label>
//                   <textarea
//                     id="comment"
//                     name="comment"
//                     rows="4"
//                     className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     value={newReview.comment}
//                     onChange={handleReviewChange}
//                     required
//                   ></textarea>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                       Name *
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       value={newReview.name}
//                       onChange={handleReviewChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email (optional)
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       value={newReview.email}
//                       onChange={handleReviewChange}
//                       placeholder="Optional"
//                     />
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={submitReview}
//                   className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Submit Review
//                 </button>
//               </div>
              
//               {/* Reviews List */}
//               {reviewLoading ? (
//   <div className="flex justify-center items-center h-32">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-opacity-80 border-gold-500"></div>
//   </div>
// ) : reviews.length > 0 ? (
//   <div className="space-y-8">
//     {reviews.map((review) => (
//       <div 
//         key={review.id} 
//         className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
//       >
//         {/* Decorative corner accent */}
//         <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
//           <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-gold-100 to-transparent transform rotate-45"></div>
//         </div>
        
//         <div className="flex items-start justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="bg-blue-400 from-gold-500 to-gold-700 text-white rounded-full w-12 h-12 flex items-center justify-center font-medium text-xl shadow-sm">
//               {review.name.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-900 text-lg">{review.name}</h4>
//               <p className="text-sm text-gray-500 font-light">{formatDate(review.created_at)}</p>
//             </div>
//           </div>
//           <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
//             {renderStars(review.rating)}
//             <span className="ml-2 text-sm font-medium text-gray-700">{review.rating}.0</span>
//           </div>
//         </div>
        
//         <div className="mt-4 pl-16">
//           <p className="text-gray-700 leading-relaxed font-light">{review.comment}</p>
//         </div>
        
//         {/* Decorative divider */}
//         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"></div>
//       </div>
//     ))}
//   </div>
// ) : (
//   <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
//     <div className="w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-br from-gold-50 to-gold-100 rounded-full mb-6">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     </div>
//     <h3 className="mt-2 text-xl font-medium text-gray-900">No reviews yet</h3>
//     <p className="mt-2 text-gray-500 max-w-md mx-auto">Be the first to share your thoughts about this exquisite product.</p>

//                 </div>
//               )}
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

// export default ProductDetailsCom;





// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useCart } from '@/components/CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Image from 'next/image';

// const ProductDetailsCom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const sliderRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const [product, setProduct] = useState(null); // Changed from 'products' to 'product' for a single product
//   const [mainImage, setMainImage] = useState(''); // State for the main displayed image
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();
//   const [loading, setLoading] = useState(true);
//   const [reviews, setReviews] = useState([]);
//   const [reviewLoading, setReviewLoading] = useState(true);
//   const [newReview, setNewReview] = useState({
//     rating: 5,
//     comment: '',
//     name: '',
//     email: ''
//   });

//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

//   const ProductId = searchParams.get('ProductId');
//   const productDataString = searchParams.get('productData');

//   useEffect(() => {
//     if (ProductId) {
//       const fetchProductAndReviews = async () => {
//         setLoading(true);
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/publicproduct?id=${ProductId}`);
//           if (res?.data?.data?.data && res.data.data.data.length > 0) {
//             const fetchedProduct = res.data.data.data[0];
//             const processedProduct = {
//               ...fetchedProduct,
//               mainImage: fetchedProduct.image_urls?.[0]
//                 ? `${baseURL}${fetchedProduct.image_urls[0].startsWith('/') ? '' : '/'}${fetchedProduct.image_urls[0]}`
//                 : '/default-product-image.jpg',
//               remainingImages: fetchedProduct.image_urls?.slice(1).map(u =>
//                 `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
//               ) || []
//             };
//             setProduct(processedProduct);
//             setMainImage(processedProduct.mainImage);
//           } else if (productDataString) {
//             // Fallback to productData from query param if direct fetch fails or returns empty
//             const parsedProduct = JSON.parse(productDataString);
//             const processedProduct = {
//               ...parsedProduct,
//               mainImage: parsedProduct.image_urls?.[0]
//                 ? `${baseURL}${parsedProduct.image_urls[0].startsWith('/') ? '' : '/'}${parsedProduct.image_urls[0]}`
//                 : '/default-product-image.jpg',
//               remainingImages: parsedProduct.image_urls?.slice(1).map(u =>
//                 `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
//               ) || []
//             };
//             setProduct(processedProduct);
//             setMainImage(processedProduct.mainImage);
//           } else {
//             console.error('No product data found for ProductId:', ProductId);
//             toast.error('Product not found.');
//             router.push('/publicproducts'); // Redirect if product not found
//           }
//         } catch (error) {
//           console.error('Error fetching product:', error);
//           toast.error('Failed to load product details.');
//           router.push('/publicproducts'); // Redirect on error
//         } finally {
//           setLoading(false);
//         }

//         setReviewLoading(true);
//         try {
//           const reviewsRes = await AxiosInstance.get(`/ecommerce/publicreview?product_id=${ProductId}`);
//           if (reviewsRes?.data?.data) {
//             setReviews(reviewsRes.data.data.data || []);
//           }
//         } catch (error) {
//           console.error('Error fetching reviews:', error);
//         } finally {
//           setReviewLoading(false);
//         }
//       };

//       const fetchFeaturedProducts = async () => {
//         try {
//           const res = await AxiosInstance.get('/ecommerce/publiccategory'); // Assuming categories are "featured" or related products
//           if (res?.data?.data?.data) {
//             setFeaturedProducts(res.data.data.data.map(cat => ({
//               ...cat,
//               image: `${baseURL}${cat.image.startsWith('/') ? '' : '/'}${cat.image}`
//             })));
//           }
//         } catch (error) {
//           console.error('Error fetching featured products:', error);
//         }
//       };

//       fetchProductAndReviews();
//       fetchFeaturedProducts();
//     }
//   }, [ProductId, productDataString, router, baseURL]);

//   // Auto-scrolling slider effect for featured products
//   useEffect(() => {
//     if (featuredProducts.length <= 1 || isHovered) return;

//     const slider = sliderRef.current;
//     if (!slider) return;

//     const interval = setInterval(() => {
//       setCurrentIndex(prev => {
//         const itemWidth = slider.firstChild?.offsetWidth || 300;
//         const newScrollPos = (prev + 1) * itemWidth;
//         const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

//         if (newScrollPos >= maxScrollLeft && featuredProducts.length > 0) {
//           // Reset to start to create continuous loop
//           slider.scrollTo({ left: 0, behavior: 'instant' });
//           return 0;
//         } else {
//           slider.scrollTo({ left: newScrollPos, behavior: 'smooth' });
//           return (prev + 1) % featuredProducts.length;
//         }
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [featuredProducts.length, isHovered]);

//   const handleBackButton = () => {
//     router.push('/publicproducts');
//   };

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart(product, quantity);
//       toast.success('Product added to cart!');
//       router.push('/addtocartpage');
//     } else {
//       console.error('No product to add to cart');
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//   };

//   const decreaseQuantity = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
//   };

//   const handleReviewChange = (e) => {
//     const { name, value } = e.target;
//     setNewReview(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleRatingChange = (rating) => {
//     setNewReview(prev => ({
//       ...prev,
//       rating
//     }));
//   };

//   const submitReview = async () => {
//     if (!newReview.name.trim()) {
//       toast.error('Please enter your name');
//       return;
//     }

//     if (!newReview.comment.trim()) {
//       toast.error('Please enter a review comment');
//       return;
//     }

//     try {
//       const reviewData = {
//         ...newReview,
//         product: ProductId,
//         rating: parseInt(newReview.rating),
//         email: newReview.email.trim() || null
//       };

//       const res = await AxiosInstance.post('/ecommerce/publicreview', reviewData);
//       if (res.data) {
//         toast.success('Review submitted successfully!');
//         setReviews(prev => [res.data.data, ...prev]);
//         setNewReview({
//           rating: 5,
//           comment: '',
//           name: '',
//           email: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       toast.error('Failed to submit review');
//     }
//   };

//   const renderStars = (rating, interactive = false) => {
//     return (
//       <div className="flex">
//         {[...Array(5)].map((_, i) => (
//           <svg
//             key={i}
//             className={`w-6 h-6 ${i < rating ? 'text-amber-400' : 'text-gray-400'} ${
//               interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''
//             }`}
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             onClick={() => interactive && handleRatingChange(i + 1)}
//           >
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//         ))}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const scrollToItem = (direction) => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const itemWidth = slider.firstChild?.offsetWidth || 300;
//     const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;

//     slider.scrollBy({
//       left: scrollAmount,
//       behavior: 'smooth'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-700">
//         Product not found.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="flex justify-between items-center mb-8">
//         <button
//           onClick={handleBackButton}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
          
//         </button>
//       </div>
//       <div className="max-w-5xl mx-auto -mt-10">

//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Product Image and small image carousel */}
//             <div className="relative p-4">
//               <div className="h-96 w-full mb-4 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
//                 {mainImage ? (
//                   <img
//                     src={mainImage}
//                     alt={product.name}
//                     className="object-contain w-full h-full"
//                   />
//                 ) : (
//                   <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
//                     <span>No main image available</span>
//                   </div>
//                 )}
//               </div>
//               {product.image_urls && product.image_urls.length > 1 && (
//                 <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
//                   {product.image_urls.map((imgUrl, index) => (
//                     <div
//                       key={index}
//                       className={`flex-shrink-0 w-24 h-24 border-2 ${mainImage === `${baseURL}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}` ? 'border-blue-500' : 'border-gray-300'} rounded-md cursor-pointer overflow-hidden`}
//                       onClick={() => setMainImage(`${baseURL}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`)}
//                     >
//                       <img
//                         src={`${baseURL}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="object-cover w-full h-full"
//                         onError={(e) => { e.target.onerror = null; e.target.src = '/default-product-image.jpg'; }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Product Details */}
//             <div className="p-8 flex flex-col justify-center">
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

//               <div className="flex items-center mb-6">
//                 <div className="flex items-center">
//                   {renderStars(Math.round(product.averageRating || 0))}
//                   <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-6">{product.description}</p>

//               <div className="mb-8">
//                 <h3 className="text-sm font-medium text-gray-900">Pricing</h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-600">
//                     <span className="font-semibold">Price:</span> ${product.price}
//                   </p>
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h3 className="text-sm font-medium text-gray-900">Details</h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-600">High-quality materials</p>
//                   <p className="text-sm text-gray-600">Designed for comfort</p>
//                   <p className="text-sm text-gray-600">Premium craftsmanship</p>
//                 </div>
//               </div>

//               <div className="flex items-center mb-8">
//                 <div className="flex items-center border border-gray-900 rounded-md">
//                   <button
//                     className="px-4 py-2 text-gray-900 hover:bg-gray-300"
//                     onClick={decreaseQuantity}
//                   >
//                     -
//                   </button>
//                   <span className="px-4 py-2 border-x text-gray-900 border-gray-900">{quantity}</span>
//                   <button
//                     className="px-4 py-2 text-gray-900 hover:bg-gray-300"
//                     onClick={increaseQuantity}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <button
//                 onClick={handleAddToCart}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Add to Cart
//               </button>
//             </div>
//           </div>

//           {/* Luxury Horizontal Slider (Featured Categories in this context) */}
//           {featuredProducts.length > 0 && (
//             <div className="px-8 py-12 border-t border-gray-200 mt-20">
//               <h2 className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-8 text-center">
//                 Explore More Categories
//               </h2>

//               <div
//                 className="relative overflow-hidden group"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <button
//                   onClick={() => scrollToItem('left')}
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                   aria-label="Scroll left"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>

//                 <div
//                   ref={sliderRef}
//                   className="flex space-x-6 overflow-x-auto py-4 px-2 scrollbar-hide scroll-smooth"
//                   style={{ scrollbarWidth: 'none' }}
//                 >
//                   {featuredProducts.map((cat) => (
//                     <div
//                       key={cat.id}
//                       onClick={() => router.push(`/categorywiseproductpage?categoryId=${cat.id}`)}
//                       className="flex-shrink-0 w-40 h-48 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border border-gray-200"
//                     >
//                       <div className="relative h-full w-full">
//                         <img
//                           src={cat.image}
//                           alt={cat.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = '/placeholder-category.png'; // Fallback for category image
//                           }}
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
//                           <h4 className="text-white font-medium text-lg">{cat.name}</h4>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => scrollToItem('right')}
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                   aria-label="Scroll right"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Reviews Section */}
//           <div className="border-t border-gray-200 px-8 py-12">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

//             {/* Review Form */}
//             <div className="bg-gray-50 p-6 rounded-lg mb-12">
//               <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
//                 {renderStars(newReview.rating, true)}
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
//                   Your Review
//                 </label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   rows="4"
//                   className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   value={newReview.comment}
//                   onChange={handleReviewChange}
//                   required
//                 ></textarea>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     value={newReview.name}
//                     onChange={handleReviewChange}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email (optional)
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     value={newReview.email}
//                     onChange={handleReviewChange}
//                   />
//                 </div>
//               </div>

//               <button
//                 onClick={submitReview}
//                 className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md transition-colors"
//               >
//                 Submit Review
//               </button>
//             </div>

//             {/* Existing Reviews List */}
//             {reviewLoading ? (
//               <p>Loading reviews...</p>
//             ) : reviews.length > 0 ? (
//               <div className="space-y-8">
//                 {reviews.map((review) => (
//                   <div key={review.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
//                     <div className="flex items-center mb-2">
//                       {renderStars(review.rating)}
//                       <span className="ml-4 text-gray-900 font-semibold">{review.name}</span>
//                       <span className="ml-auto text-gray-500 text-sm">{formatDate(review.created_at)}</span>
//                     </div>
//                     <p className="text-gray-700">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
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
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const ProductId = searchParams.get('ProductId');
  const productDataString = searchParams.get('productData');

  useEffect(() => {
    if (ProductId) {
      const fetchProductAndReviews = async () => {
        setLoading(true);
        try {
          const res = await AxiosInstance.get(`/ecommerce/publicproduct?id=${ProductId}`);
          if (res?.data?.data?.data && res.data.data.data.length > 0) {
            const fetchedProduct = res.data.data.data[0];
            const processedProduct = {
              ...fetchedProduct,
              mainImage: fetchedProduct.image_urls?.[0]
                ? `${baseURL}${fetchedProduct.image_urls[0].startsWith('/') ? '' : '/'}${fetchedProduct.image_urls[0]}`
                : '/default-product-image.jpg',
              remainingImages: fetchedProduct.image_urls?.slice(1).map(u =>
                `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
              ) || []
            };
            setProduct(processedProduct);
            setMainImage(processedProduct.mainImage);
          } else if (productDataString) {
            const parsedProduct = JSON.parse(productDataString);
            const processedProduct = {
              ...parsedProduct,
              mainImage: parsedProduct.image_urls?.[0]
                ? `${baseURL}${parsedProduct.image_urls[0].startsWith('/') ? '' : '/'}${parsedProduct.image_urls[0]}`
                : '/default-product-image.jpg',
              remainingImages: parsedProduct.image_urls?.slice(1).map(u =>
                `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
              ) || []
            };
            setProduct(processedProduct);
            setMainImage(processedProduct.mainImage);
          } else {
            console.error('No product data found for ProductId:', ProductId);
            toast.error('Product not found.');
            router.push('/publicproducts');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
          toast.error('Failed to load product details.');
          router.push('/publicproducts');
        } finally {
          setLoading(false);
        }

        setReviewLoading(true);
        try {
          const reviewsRes = await AxiosInstance.get(`/ecommerce/publicreview?product_id=${ProductId}`);
          if (reviewsRes?.data?.data) {
            setReviews(reviewsRes.data.data.data || []);
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        } finally {
          setReviewLoading(false);
        }
      };

      const fetchFeaturedProducts = async () => {
        try {
          const res = await AxiosInstance.get('/ecommerce/publiccategory');
          if (res?.data?.data?.data) {
            setFeaturedProducts(res.data.data.data.map(cat => ({
              ...cat,
              image: `${baseURL}${cat.image.startsWith('/') ? '' : '/'}${cat.image}`
            })));
          }
        } catch (error) {
          console.error('Error fetching featured products:', error);
        }
      };

      fetchProductAndReviews();
      fetchFeaturedProducts();
    }
  }, [ProductId, productDataString, router, baseURL]);

  useEffect(() => {
    if (featuredProducts.length <= 1 || isHovered) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const itemWidth = slider.firstChild?.offsetWidth || 300;
        const newScrollPos = (prev + 1) * itemWidth;
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

        if (newScrollPos >= maxScrollLeft && featuredProducts.length > 0) {
          slider.scrollTo({ left: 0, behavior: 'instant' });
          return 0;
        } else {
          slider.scrollTo({ left: newScrollPos, behavior: 'smooth' });
          return (prev + 1) % featuredProducts.length;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [featuredProducts.length, isHovered]);

  const handleBackButton = () => {
    router.push('/publicproducts');
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success('Product added to cart!');
      router.push('/addtocartpage');
    } else {
      console.error('No product to add to cart');
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
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 bg-gray-50">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Luxury Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        <button
          onClick={handleBackButton}
          className="flex items-center text-gray-700 hover:text-gold-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 hover:text-gold-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="text-gray-700 hover:text-gold-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 -mt-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="p-8">
              <div className="relative h-96 w-full mb-6 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    <span>No image available</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.image_urls && product.image_urls.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto py-2 scrollbar-hide">
                  {product.image_urls.map((imgUrl, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        mainImage === `${baseURL}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}` 
                          ? 'border-gold-500 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setMainImage(`${baseURL}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`)}
                    >
                      <img
                        src={`${baseURL}${imgUrl.startsWith('/') ? '' : '/'}${imgUrl}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/default-product-image.jpg'; }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col justify-center -mt-8">
              <div className="mb-6">
                <span className="text-sm font-medium text-gold-600 uppercase tracking-wider">Luxury Collection</span>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mt-2">{product.name}</h1>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {renderStars(Math.round(product.averageRating || 0))}
                  <span className="text-gray-600 ml-2">({reviews.length} reviews)</span>
                </div>
                <span className="ml-4 text-sm text-gray-500">|</span>
                <span className="ml-4 text-sm text-gray-500">SKU: {product.id}</span>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-center">
                  <span className="text-3xl font-serif font-bold text-gray-900">PKR {product.price}</span>
                  {product.originalPrice && (
                    <span className="ml-3 text-lg text-gray-500 line-through">PKR{product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                    SAVE PKR{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 uppercase mb-3">Details</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Premium materials
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Handcrafted with care
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Free worldwide shipping
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
                <span className="ml-4 text-sm text-gray-500">{product.stock} items available</span>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center font-medium uppercase tracking-wide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                <button className="w-full border border-black text-black hover:bg-gray-100 py-3 px-6 rounded-md transition-colors font-medium uppercase tracking-wide">
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

          {/* Luxury Product Tabs */}
          <div className="border-t border-gray-200 px-8 py-12">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="whitespace-nowrap py-4 px-1 border-b-2 border-black text-sm font-medium text-black">
                  Description
                </button>
                <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Additional Information
                </button>
                <button className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Reviews ({reviews.length})
                </button>
              </nav>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Story</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.longDescription || "This exquisite piece is crafted with the finest materials and attention to detail. Each item in our luxury collection undergoes rigorous quality control to ensure perfection. Designed to last a lifetime, this product embodies timeless elegance and superior craftsmanship."}
              </p>
            </div>
          </div>

          {/* Luxury Featured Products */}
          {featuredProducts.length > 0 && (
            <div className="px-8 py-12 bg-gray-50">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">You May Also Like</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Discover more from our luxury collection</p>
              </div>

              <div
                className="relative overflow-hidden group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button
                  onClick={() => scrollToItem('left')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div
                  ref={sliderRef}
                  className="flex space-x-8 overflow-x-auto py-4 px-2 scrollbar-hide scroll-smooth"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {featuredProducts.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => router.push(`/categorywiseproductpage?categoryId=${cat.id}`)}
                      className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transform transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="relative h-64 w-full">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-category.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-4">
                          <div>
                            <h4 className="text-white font-medium text-lg">{cat.name}</h4>
                            <button className="mt-2 text-sm text-white hover:text-gold-300 transition-colors">
                              Shop Now →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollToItem('right')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Luxury Reviews Section */}
          <div className="px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Customer Reviews</h2>
                <div className="flex items-center justify-center">
                  {renderStars(Math.round(product.averageRating || 0))}
                  <span className="ml-2 text-gray-600">Based on {reviews.length} reviews</span>
                </div>
              </div>

              {/* Review Form */}
              <div className="bg-gray-50 p-8 rounded-xl mb-12">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Write a Review</h3>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Your Rating</label>
                  {renderStars(newReview.rating, true)}
                </div>

                <div className="mb-6">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-3">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                    value={newReview.comment}
                    onChange={handleReviewChange}
                    placeholder="Share your thoughts about this product..."
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      value={newReview.name}
                      onChange={handleReviewChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                      value={newReview.email}
                      onChange={handleReviewChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <button
                  onClick={submitReview}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-colors font-medium"
                >
                  Submit Review
                </button>
              </div>

              {/* Existing Reviews List */}
              {reviewLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500"></div>
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {review.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{review.name}</h4>
                            <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
                          </div>
                          <div className="mt-1">
                            {renderStars(review.rating)}
                          </div>
                          <p className="mt-2 text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Footer */}
      <footer className="bg-black text-white py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-medium mb-4">Luxury Store</h3>
            <p className="text-gray-400 text-sm">Curated selection of the finest products for the discerning customer.</p>
          </div>
          <div>
            <h3 className="text-lg font-serif font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-medium mb-4">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-black rounded-l focus:outline-none"
              />
              <button className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-r transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Luxury Store. All rights reserved.</p>
        </div>
      </footer>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="bg-white text-gray-800 shadow-lg rounded-lg"
        progressClassName="bg-gold-500"
      />
    </div>
  );
};

export default ProductDetailsCom;