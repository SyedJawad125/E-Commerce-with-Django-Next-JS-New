// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from '@/components/AxiosInstance';

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

// const UpdateReview = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const reviewId = searchParams.get('reviewid');

//   const [formData, setFormData] = useState({
//     name: '',
//     comment: '',
//     rating: '',
//     productType: '', // 'product' or 'sales_product'
//     productId: '',
//     productName: '' // Added to store the product name for display
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   // Fetch review data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (reviewId) {
//           const res = await AxiosInstance.get(`/ecommerce/review?id=${reviewId}`);
//           const reviewData =
//             res?.data?.data?.data?.[0] ||
//             res?.data?.data?.[0] ||
//             res?.data?.[0] ||
//             res?.data;

//           if (reviewData) {
//             setFormData({
//               name: reviewData.name || '',
//               comment: reviewData.comment || '',
//               rating: reviewData.rating?.toString() || '',
//               productType: reviewData.product ? 'product' : 'sales_product',
//               productId: (reviewData.product?.id || reviewData.sales_product?.id || '').toString(),
//               productName: reviewData.product?.name || reviewData.sales_product?.name || ''
//             });
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchData();
//   }, [reviewId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('id', reviewId as string);
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('comment', formData.comment);
//       formDataToSend.append('rating', formData.rating);

//       const response = await AxiosInstance.patch('/ecommerce/review', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       if (response) {
//         router.push('/Reviews');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading review data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-indigo-600 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Edit Review</h2>
//             <p className="mt-1 text-indigo-100">Update the details of your review</p>
//           </div>

//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Name */}
//               <div className="md:col-span-2">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Product Type and Product Name Display (readonly) in one line */}
// <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
//   {/* Product Type */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       Product Type
//     </label>
//     <input
//       type="text"
//       className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
//       value={formData.productType === 'product' ? 'Regular Product' : 'Sales Product'}
//       readOnly
//     />
//   </div>

//   {/* Product Name */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       {formData.productType === 'product' ? 'Product' : 'Sales Product'}
//     </label>
//     <input
//       type="text"
//       className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
//       value={formData.productName}
//       readOnly
//     />
//     <p className="mt-1 text-sm text-gray-500">Product cannot be changed after review creation</p>
//   </div>
// </div>

//               {/* Rating */}
//               <div>
//                 <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
//                   Rating <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="number"
//                   id="rating"
//                   name="rating"
//                   min="1"
//                   max="5"
//                   step="1"
//                   className="block w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
//                   value={formData.rating}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Comment */}
//               <div className="md:col-span-2">
//                 <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                   Comment
//                 </label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   rows={3}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900"
//                   value={formData.comment}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push('/Reviews')}
//                 className="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 ${
//                   isLoading ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isLoading ? 'Updating...' : 'Update Review'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateReview;






'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';

interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
  product?: {
    id: number;
    name: string;
  };
  sales_product?: {
    id: number;
    name: string;
    discount_percent: number;
  };
}

const UpdateReview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewid');

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: 0,
    productType: '', // 'product' or 'sales_product'
    productName: '',
    discountPercent: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  // Fetch review data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!reviewId) {
          setError('No review ID provided');
          setIsFetching(false);
          return;
        }

        const res = await AxiosInstance.get(`/ecommerce/review?id=${reviewId}`);
        const reviewData = res?.data?.data?.data?.[0] || res?.data?.data?.[0] || res?.data?.[0] || res?.data;

        if (!reviewData) {
          setError('Review not found');
          setIsFetching(false);
          return;
        }

        const isSalesProduct = !!reviewData.sales_product;
        setFormData({
          name: reviewData.name || '',
          comment: reviewData.comment || '',
          rating: reviewData.rating || 0,
          productType: isSalesProduct ? 'sales_product' : 'product',
          productName: isSalesProduct 
            ? reviewData.sales_product?.name || '' 
            : reviewData.product?.name || '',
          discountPercent: isSalesProduct 
            ? reviewData.sales_product?.discount_percent || 0 
            : 0
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load review data');
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [reviewId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        id: reviewId,
        name: formData.name.trim(),
        comment: formData.comment.trim(),
        rating: formData.rating
      };

      const response = await AxiosInstance.patch('/ecommerce/review', payload);

      if (response) {
        router.push('/Reviews');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading review data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => router.push('/Reviews')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Reviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Edit Review</h2>
            <p className="mt-1 text-indigo-100">Update your product feedback</p>
          </div>

          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reviewer Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Product Info (readonly) */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Type
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 cursor-not-allowed"
                        value={formData.productType === 'product' ? 'Regular Product' : 'Discounted Product'}
                        readOnly
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">
                          {formData.productType === 'product' ? '🛒' : '💰'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData.productType === 'product' ? 'Product Name' : 'Sales Product Name'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 cursor-not-allowed"
                        value={formData.productName}
                        readOnly
                      />
                      {formData.discountPercent > 0 && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {formData.discountPercent}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">
                  Note: Product selection cannot be changed after review creation
                </p>
              </div>

              {/* Rating */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-3xl focus:outline-none ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      onClick={() => handleRatingChange(star)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div className="md:col-span-2">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Review Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={() => router.push('/Reviews')}
                className="px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;