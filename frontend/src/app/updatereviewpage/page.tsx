'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';

interface Review {
  id: number;
  name: string;
}

const UpdateReview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewid');

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: '',
    product: ''
  });

  const [ProductRecords, setProductRecords] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch review + product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get dropdown products (can be adjusted as needed)
        const productsRes = await AxiosInstance.get('/ecommerce/product');
        if (productsRes?.data?.data?.data) {
          setProductRecords(productsRes.data.data.data);
        }

        if (reviewId) {
          const res = await AxiosInstance.get(`/ecommerce/review?id=${reviewId}`);
          const productData =
            res?.data?.data?.data?.[0] ||
            res?.data?.data?.[0] ||
            res?.data?.[0] ||
            res?.data;

          if (productData) {
            setFormData({
              name: productData.name || '',
              comment: productData.comment || '',
              rating: productData.rating?.toString() || '',
              product: productData.product?.id?.toString() || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reviewId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', reviewId as string);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('comment', formData.comment);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('product', formData.product);

      const response = await AxiosInstance.patch('/ecommerce/review', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response) {
        router.push('/Reviews');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Edit Review</h2>
            <p className="mt-1 text-indigo-100">Update the details of your review</p>
          </div>

          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Comment */}
              <div className="md:col-span-2">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
                  value={formData.comment}
                  onChange={handleChange}
                />
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  step="1"
                  className="block w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Product Dropdown */}
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  id="product"
                  name="product"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
                  value={formData.product}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Product</option>
                  {ProductRecords.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => router.push('/Reviews')}
                className="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Updating...' : 'Update Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;






// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface Review {
//   id: number;
//   name: string;
//   comment: string;
//   rating: number;
//   product: {
//     id: number;
//     name: string;
//   };
//   sales_product?: {
//     id: number;
//     name: string;
//     discount_percent: number;
//   };
// }

// interface Product {
//   id: number;
//   name: string;
// }

// interface SalesProduct {
//   id: number;
//   name: string;
//   discount_percent: number;
// }

// const UpdateReview = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const reviewId = searchParams.get('id');
//   // const [formData, setFormData] = useState({
//   //     name: '',
//   //     comment: '',
//   //     rating: '',


//   //   });
//   const [formData, setFormData] = useState({
//     name: '',
//     comment: '',
//     rating: 0,
//     productType: '', // 'product' or 'sales_product'
//     productId: '',
//     productName: '' // Added to store the product name for display
//   });
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [hoverRating, setHoverRating] = useState(0);

  
//   // Fetch category data based on categoryId
//   useEffect(() => {
//   const fetchData = async () => {
//     if (reviewId) {
//       try {
//         const res = await AxiosInstance.get(`/ecommerce/review?id=${reviewId}`);
//         console.log("Full API Response:", res);
        
//         // More defensive approach to accessing nested data
//         const reviewData = res?.data?.data?.data?.[0] || 
//                           res?.data?.data?.[0] || 
//                           res?.data?.[0] || 
//                           res?.data;
        
//         if (reviewData) {
//           setFormData({
//             name: reviewData.name || '',
//             comment: reviewData.comment || '',
//             rating: reviewData.rating || 0, // Changed from '' to 0 to match number type
//             productType: reviewData.product ? 'product' : 'sales_product',
//             productId: (reviewData.product?.id || reviewData.sales_product?.id || '').toString(),
//             productName: reviewData.product?.name || reviewData.sales_product?.name || ''
//           });
//         } else {
//           console.error('No review data found in response');
//         }
//       } catch (error) {
//         console.error('Error fetching review data:', error);
//         toast.error('Failed to load review data', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       }
//     }
//   };

//   fetchData();
// }, [reviewId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleRatingChange = (rating: number) => {
//     setFormData(prev => ({
//       ...prev,
//       rating
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!reviewId) {
//       toast.error('Review ID is missing', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       const payload = {
//         id: reviewId,
//         name: formData.name,
//         comment: formData.comment,
//         rating: formData.rating
//       };

//       const response = await AxiosInstance.patch('/ecommerce/review', payload);
      
//       if (response.data.status === 'SUCCESS') {
//         toast.success('Review updated successfully!', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//         setTimeout(() => {
//           router.push('/Reviews');
//         }, 2000);
//       } else {
//         toast.error(response.data.message || 'Failed to update review', {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       }
//     } catch (error: any) {
//       console.error('Error:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to update review';
//       toast.error(errorMessage, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-400">Loading review data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Update Review</h2>
//             <p className="mt-1 text-blue-100">Edit your product feedback</p>
//           </div>
          
//           {/* Form */}
//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Reviewer Name */}
//               <div className="md:col-span-2">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
//                   Your Name <span className="text-blue-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Product Type Display (readonly) */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Product Type
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 cursor-not-allowed"
//                   value={formData.productType === 'product' ? 'Regular Product' : 'Sales Product'}
//                   readOnly
//                 />
//               </div>

//               {/* Product Display (readonly) */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   {formData.productType === 'product' ? 'Product' : 'Sales Product'}
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 cursor-not-allowed"
//                   value={formData.productName}
//                   readOnly
//                 />
//                 <p className="mt-1 text-sm text-gray-500">Product cannot be changed after review creation</p>
//               </div>

//               {/* Rating */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Rating <span className="text-blue-500">*</span>
//                 </label>
//                 <div className="flex items-center space-x-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       className={`text-3xl focus:outline-none ${(hoverRating || formData.rating) >= star ? 'text-blue-400' : 'text-gray-500'}`}
//                       onClick={() => handleRatingChange(star)}
//                       onMouseEnter={() => setHoverRating(star)}
//                       onMouseLeave={() => setHoverRating(0)}
//                     >
//                       ★
//                     </button>
//                   ))}
//                   <span className="ml-2 text-gray-400">
//                     {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
//                   </span>
//                 </div>
//               </div>

//               {/* Comment */}
//               <div className="md:col-span-2">
//                 <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
//                   Review Comment <span className="text-blue-500">*</span>
//                 </label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   rows={4}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                   value={formData.comment}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push('/Reviews')}
//                 className="mr-4 px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
//                   isLoading ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Updating...
//                   </>
//                 ) : 'Update Review'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateReview;






// 'use client';

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import AxiosInstance from "@/components/AxiosInstance";


// interface Product {
//   id: number;
//   name: string;
// }

// interface SalesProduct {
//   id: number;
//   name: string;
//   discount_percent: number;
// }

// interface ReviewFormData {
//   name: string;
//   comment: string;
//   rating: number;
//   productType: string; // 'product' or 'sales_product'
//   productId: string;
//   productName: string;
// }

// const UpdateReview = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const reviewId = searchParams.get('id');

//   const [formData, setFormData] = useState<ReviewFormData>({
//     name: '',
//     comment: '',
//     rating: 0,
//     productType: '',
//     productId: '',
//     productName: ''
//   });

//   const [products, setProducts] = useState<Product[]>([]);
//   const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [hoverRating, setHoverRating] = useState(0);

  

//  useEffect(() => {
//   const fetchReviewData = async () => {
//     setIsFetching(true); // Always set fetching true first

//     if (!reviewId) {
//       toast.error('Missing review ID in URL', {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "dark",
//       });
//       setIsFetching(false); // Reset loading state if early exit
//       return;
//     }

//     try {
//       const res = await AxiosInstance.get(`/ecommerce/review?id=${reviewId}`);
//       const reviewData =
//       res?.data?.data?.data?.[0] ||
//       res?.data?.data?.[0] ||
//       res?.data?.[0] ||
//       res?.data;


//       if (!reviewData) {
//         throw new Error('Invalid review response');
//       }

//       const productType = reviewData.product ? 'product' : 'sales_product';
//       const productId = reviewData.product?.id || reviewData.sales_product?.id || '';
//       const productName = reviewData.product?.name || reviewData.sales_product?.name || '';

//      setFormData({
//         name: reviewData.name || '',
//         comment: reviewData.comment || '',
//         rating: reviewData.rating || 0,
//         productType,
//         productId: productId.toString(),
//         productName,
//       });

//     } catch (error) {
//       console.error('Error fetching review data:', error);
//       toast.error('Failed to load review data', {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "dark",
//       });
//     } finally {
//       setIsFetching(false); // Always reset spinner
//     }
//   };

//   fetchReviewData();
// }, [reviewId]);


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRatingChange = (rating: number) => {
//     setFormData(prev => ({ ...prev, rating }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!reviewId) {
//       toast.error('Review ID is missing', { position: "top-center", autoClose: 2000, theme: "dark" });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const payload = {
//         id: reviewId,
//         name: formData.name,
//         comment: formData.comment,
//         rating: formData.rating
//       };

//       const response = await AxiosInstance.patch('/ecommerce/review', payload);

//       if (response.data.status === 'SUCCESS') {
//         toast.success('Review updated successfully!', { position: "top-center", autoClose: 2000, theme: "dark" });
//         setTimeout(() => router.push('/Reviews'), 2000);
//       } else {
//         toast.error(response.data.message || 'Failed to update review', { position: "top-center", autoClose: 3000, theme: "dark" });
//       }
//     } catch (error: unknown) {
//       const err = error as { response?: { data?: { message?: string } } };
//       const errorMessage = err.response?.data?.message || 'Failed to update review';
//       toast.error(errorMessage, { position: "top-center", autoClose: 3000, theme: "dark" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-gray-400">Loading review data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Update Review</h2>
//             <p className="mt-1 text-blue-100">Edit your product feedback</p>
//           </div>

//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <fieldset disabled={isLoading}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="md:col-span-2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
//                     Your Name <span className="text-blue-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Product Type</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 cursor-not-allowed"
//                     value={formData.productType === 'product' ? 'Regular Product' : 'Sales Product'}
//                     readOnly
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     {formData.productType === 'product' ? 'Product' : 'Sales Product'}
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 cursor-not-allowed"
//                     value={formData.productName}
//                     readOnly
//                   />
//                   <p className="mt-1 text-sm text-gray-500">Product cannot be changed after review creation</p>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-300 mb-1">
//                     Rating <span className="text-blue-500">*</span>
//                   </label>
//                   <div className="flex items-center space-x-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         type="button"
//                         className={`text-3xl ${(hoverRating || formData.rating) >= star ? 'text-blue-400' : 'text-gray-500'}`}
//                         onClick={() => handleRatingChange(star)}
//                         onMouseEnter={() => setHoverRating(star)}
//                         onMouseLeave={() => setHoverRating(0)}
//                       >
//                         ★
//                       </button>
//                     ))}
//                     <span className="ml-2 text-gray-400">
//                       {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
//                     Review Comment <span className="text-blue-500">*</span>
//                   </label>
//                   <textarea
//                     id="comment"
//                     name="comment"
//                     rows={4}
//                     className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white"
//                     value={formData.comment}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             </fieldset>

//             <div className="flex justify-end pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push('/Reviews')}
//                 className="mr-4 px-6 py-2 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors ${
//                   isLoading ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>
//                     Updating...
//                   </>
//                 ) : 'Update Review'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateReview;
