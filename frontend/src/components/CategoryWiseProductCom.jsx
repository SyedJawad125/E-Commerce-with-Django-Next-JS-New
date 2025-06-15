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




// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";

// const CategoryWiseProductCom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [categoryName, setCategoryName] = useState('');
//   const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

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
//             // Process products to use first image from image_urls as main image
//             const processedProducts = res.data.data.data.map(product => ({
//               ...product,
//               mainImage: product.image_urls?.[0] 
//                 ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
//                 : '/default-product-image.jpg',
//               remainingImages: product.image_urls?.slice(1).map(u => 
//                 `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
//               ) || []
//             }));
//             setProducts(processedProducts);
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

//   const handleProductClick = (product) => {
//     const query = new URLSearchParams({
//       ProductId: product.id.toString(),
//       productData: JSON.stringify(product)
//     }).toString();
//     router.push(`/productdetailpage?${query}`);
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
//                 onClick={() => handleProductClick(product)}
//               >
//                 {/* Product Image */}
//                 <div className="relative overflow-hidden aspect-square">
//                   <img
//                     src={product.mainImage}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                     alt={product.name}
//                   />
//                   {product.remainingImages.length > 0 && (
//                     <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                       +{product.remainingImages.length}
//                     </div>
//                   )}
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
//                       {product.original_price > product.price && (
//                         <span className="ml-2 text-sm text-gray-400 line-through">Rs. {product.original_price}</span>
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
















// 'use client'
// import { useEffect, useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import Link from 'next/link'
// import AxiosInstance from '@/components/AxiosInstance'
// import { FiArrowLeft, FiHeart, FiShare2, FiFilter } from 'react-icons/fi'
// import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

// const CategoryWiseProductCom = () => {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [products, setProducts] = useState([])
//   const [category, setCategory] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [sortOption, setSortOption] = useState('featured')
//   const [priceRange, setPriceRange] = useState([0, 1000])
//   const [selectedColors, setSelectedColors] = useState([])
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
  
//   const categoryId = searchParams.get('categoryId')
//   const categoryName = searchParams.get('categoryName')

//   useEffect(() => {
//     if (categoryId) {
//       const fetchData = async () => {
//         try {
//           setIsLoading(true)
          
//           // Fetch category details
//           const categoryRes = await AxiosInstance.get(`/ecommerce/publiccategories/${categoryId}`)
//           setCategory(categoryRes.data.data)
          
//           // Fetch products
//           const productsRes = await AxiosInstance.get(`/ecommerce/publicproduct?category=${categoryId}`)
//           const processedProducts = productsRes.data.data.data.map(product => ({
//             ...product,
//             mainImage: product.image_urls?.[0] || '/default-product.jpg',
//             rating: Math.min(5, Math.max(0, product.rating || 0)) // Ensure rating is between 0-5
//           }))
//           setProducts(processedProducts)
          
//         } catch (error) {
//           console.error('Error fetching data:', error)
//         } finally {
//           setIsLoading(false)
//         }
//       }
      
//       fetchData()
//     }
//   }, [categoryId])

//   const handleSortChange = (e) => {
//     setSortOption(e.target.value)
//     // Implement sorting logic here
//     let sortedProducts = [...products]
//     switch(e.target.value) {
//       case 'price-low':
//         sortedProducts.sort((a, b) => a.price - b.price)
//         break
//       case 'price-high':
//         sortedProducts.sort((a, b) => b.price - a.price)
//         break
//       case 'rating':
//         sortedProducts.sort((a, b) => b.rating - a.rating)
//         break
//       case 'newest':
//         sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//         break
//       default:
//         // featured - default sorting
//         break
//     }
//     setProducts(sortedProducts)
//   }

//   const handleProductClick = (productId) => {
//     router.push(`/productdetailpage?ProductId=${productId}`)
//   }

//   const renderStars = (rating) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 >= 0.5
    
//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(<FaStar key={i} className="text-amber-500" />)
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(<FaStarHalfAlt key={i} className="text-amber-500" />)
//       } else {
//         stars.push(<FaRegStar key={i} className="text-amber-500" />)
//       }
//     }
    
//     return stars
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading luxury collection...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-amber-900 to-amber-700 py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <button
//             onClick={() => router.back()}
//             className="absolute left-4 top-4 flex items-center text-amber-100 hover:text-white transition-colors"
//           >
//             <FiArrowLeft className="mr-2" />
//             Back
//           </button>
          
//           <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
//             {categoryName || category?.name || 'Luxury Collection'}
//           </h1>
//           <p className="text-xl text-amber-100 max-w-3xl mx-auto">
//             {category?.description || 'Discover our exquisite selection of premium items'}
//           </p>
//         </div>
//       </div>

//       {/* Filter and Sort Bar */}
//       <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//               className="flex items-center text-gray-600 hover:text-amber-700"
//             >
//               <FiFilter className="mr-2" />
//               Filters
//             </button>
            
//             <span className="text-sm text-gray-500">
//               {products.length} {products.length === 1 ? 'item' : 'items'}
//             </span>
//           </div>
          
//           <div className="flex items-center">
//             <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
//             <select
//               id="sort"
//               value={sortOption}
//               onChange={handleSortChange}
//               className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
//             >
//               <option value="featured">Featured</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="rating">Customer Rating</option>
//               <option value="newest">Newest Arrivals</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Filter Panel (Mobile) */}
//       {isFilterOpen && (
//         <div className="bg-white p-4 border-b border-gray-200 md:hidden">
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
//               <div className="flex items-center justify-between space-x-4">
//                 <input
//                   type="range"
//                   min="0"
//                   max="1000"
//                   step="50"
//                   value={priceRange[1]}
//                   onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                   className="w-full"
//                 />
//                 <span className="text-sm text-gray-600">${priceRange[1]}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row">
//           {/* Sidebar Filters (Desktop) */}
//           <div className="hidden md:block w-64 pr-8">
//             <div className="space-y-6">
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
//                 <div className="space-y-2">
//                   <input
//                     type="range"
//                     min="0"
//                     max="1000"
//                     step="50"
//                     value={priceRange[1]}
//                     onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                     className="w-full"
//                   />
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>${priceRange[0]}</span>
//                     <span>${priceRange[1]}</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Add more filters as needed */}
//             </div>
//           </div>
          
//           {/* Product Grid */}
//           <div className="flex-1">
//             {products.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {products.map((product) => (
//                   <div 
//                     key={product.id}
//                     className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
//                   >
//                     {/* Product Image */}
//                     <div 
//                       className="aspect-square bg-gray-100 relative overflow-hidden cursor-pointer"
//                       onClick={() => handleProductClick(product.id)}
//                     >
//                       <img
//                         src={product.mainImage}
//                         alt={product.name}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       />
                      
//                       {/* Quick Actions */}
//                       <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
//                           <FiHeart className="text-gray-600" />
//                         </button>
//                         <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
//                           <FiShare2 className="text-gray-600" />
//                         </button>
//                       </div>
                      
//                       {/* Sale Badge */}
//                       {product.original_price > product.price && (
//                         <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
//                           SALE
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Product Info */}
//                     <div className="p-4">
//                       <h3 
//                         className="text-lg font-medium text-gray-900 mb-1 cursor-pointer hover:text-amber-700 transition-colors"
//                         onClick={() => handleProductClick(product.id)}
//                       >
//                         {product.name}
//                       </h3>
                      
//                       {/* Rating */}
//                       <div className="flex items-center mb-2">
//                         <div className="flex mr-2">
//                           {renderStars(product.rating)}
//                         </div>
//                         <span className="text-xs text-gray-500">({product.review_count || 0})</span>
//                       </div>
                      
//                       {/* Price */}
//                       <div className="flex items-center">
//                         <span className="text-lg font-medium text-amber-700">
//                           Rs. {product.price.toFixed(2)}
//                         </span>
//                         {product.original_price > product.price && (
//                           <span className="ml-2 text-sm text-gray-500 line-through">
//                             Rs. {product.original_price.toFixed(2)}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <h3 className="text-xl font-light text-gray-600 mb-2">No products found</h3>
//                 <p className="text-gray-500 mb-6">We couldn't find any products in this collection</p>
//                 <button
//                   onClick={() => router.push('/collections')}
//                   className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
//                 >
//                   Browse Collections
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CategoryWiseProductCom





'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AxiosInstance from '@/components/AxiosInstance'
import { FiArrowLeft, FiHeart, FiShare2, FiFilter } from 'react-icons/fi'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'

const CategoryWiseProductCom = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const categoryId = searchParams.get('categoryId')
  const categoryName = searchParams.get('categoryName')
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (!categoryId) {
      router.push('/publiccategories')
      return
    }

    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch category details if name isn't provided
        if (!categoryName) {
          try {
            const categoryRes = await AxiosInstance.get(`/ecommerce/publiccategories/${categoryId}`)
            setCategory(categoryRes.data.data)
          } catch (error) {
            console.error('Error fetching category:', error)
            setCategory({
              id: categoryId,
              name: 'Collection',
              description: 'Premium items collection'
            })
          }
        } else {
          setCategory({
            id: categoryId,
            name: decodeURIComponent(categoryName),
            description: 'Discover our exquisite selection'
          })
        }
        
        // Fetch products with proper error handling
        try {
          const productsRes = await AxiosInstance.get(`/ecommerce/publicproduct`, {
            params: { category: categoryId }
          })
          
          // Handle different response structures
          const productsData = productsRes.data.data?.data || productsRes.data.data || []
          
          const processedProducts = productsData.map(product => ({
            ...product,
            mainImage: product.image_urls?.[0] 
              ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
              : '/default-product.jpg',
            rating: Math.min(5, Math.max(0, product.rating || 0))
          }))
          
          setProducts(processedProducts)
        } catch (error) {
          console.error('Error fetching products:', error)
          setProducts([])
        }
        
      } catch (error) {
        console.error('Error in fetchData:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [categoryId, categoryName, router])

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortOption(value)
    
    let sortedProducts = [...products]
    switch(value) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        break
      default:
        // Default sorting (featured)
        break
    }
    setProducts(sortedProducts)
  }

  const handleProductClick = (product) => {
        const query = new URLSearchParams({
            ProductId: product.id.toString(),
            productData: JSON.stringify(product)
        }).toString();

        router.push(`/productdetailpage?${query}`);
    };

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-amber-500" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-500" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-500" />)
      }
    }
    
    return stars
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading luxury collection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r bg-gray-500 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <button
            onClick={() => router.back()}
            className="absolute left-4 top-4 flex items-center text-amber-100 hover:text-white transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          
          <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
            {category?.name || decodeURIComponent(categoryName) || 'Luxury Collection'}
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            {category?.description || 'Discover our exquisite selection of premium items'}
          </p>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center text-gray-600 hover:text-amber-700"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
            
            <span className="text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="border border-gray-300 text-black rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-60 pr-8 -ml-10">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id}
                    className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div 
                      className="aspect-square bg-gray-100 relative overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/default-product.jpg'
                        }}
                      />
                      
                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                          <FiHeart className="text-gray-600" />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                          <FiShare2 className="text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Sale Badge */}
                      {product.original_price > product.price && (
                        <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
                          SALE
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <h3 
                        className="text-lg font-medium text-gray-900 mb-1 cursor-pointer hover:text-amber-700 transition-colors"
                        onClick={() => handleProductClick(product)}
                      >
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      {product.rating > 0 && (
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-xs text-gray-500">({product.review_count || 0})</span>
                        </div>
                      )}
                      
                      {/* Price */}
                      <div className="flex items-center">
                        <span className="text-lg font-medium text-amber-700">
                          Rs. {product.price?.toFixed(2) || '0.00'}
                        </span>
                        {product.original_price > product.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            Rs. {product.original_price?.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-light text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any products in this collection</p>
                <button
                  onClick={() => router.push('/publiccategories')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Browse Collections
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryWiseProductCom