// 'use client'
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";

// interface Product {
//   id: number;
//   name: string;
// }

// const AddReview = () => {
//   const router = useRouter();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     rating: 0,
//     comment: '',
//     product: ''
//   });
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hoverRating, setHoverRating] = useState(0);

//   React.useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/product');
//         if (res) {
//           setProducts(res.data.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
//     setIsLoading(true);
//     try {
//       const response = await AxiosInstance.post('/ecommerce/review', {
//         ...formData,
//         product: parseInt(formData.product),
//         rating: parseInt(formData.rating as unknown as string)
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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-indigo-600 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Add New Review</h2>
//             <p className="mt-1 text-indigo-100">Share your feedback about a review</p>
//           </div>
          
//           {/* Form */}
//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Reviewer Name */}
//               <div className="md:col-span-2">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Product Selection */}
//               <div className="md:col-span-2">
//                 <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
//                   Product <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   id="product"
//                   name="product"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.product}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a Product</option>
//                   {products?.map((item) => (
//                     <option value={item.id} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Rating */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Rating <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex items-center space-x-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       className={`text-3xl focus:outline-none ${(hoverRating || formData.rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
//                       onClick={() => handleRatingChange(star)}
//                       onMouseEnter={() => setHoverRating(star)}
//                       onMouseLeave={() => setHoverRating(0)}
//                     >
//                       ★
//                     </button>
//                   ))}
//                   <span className="ml-2 text-gray-600">
//                     {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
//                   </span>
//                 </div>
//               </div>

//               {/* Comment */}
//               <div className="md:col-span-2">
//                 <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                   Review Comment <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   rows={4}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
//                 onClick={() => router.push('/reviews')}
//                 className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
//               >
//                 {isLoading ? 'Submitting...' : 'Submit Review'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddReview;






'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { toast } from 'react-toastify';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
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

interface Product {
  id: number;
  name: string;
}

interface SalesProduct {
  id: number;
  name: string;
  discount_percent: number;
}

const UpdateReview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
    productType: '', // 'product' or 'sales_product'
    productId: ''
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        // Fetch both products and sales products in parallel
        const [productsRes, salesProductsRes, reviewRes] = await Promise.all([
          AxiosInstance.get('/ecommerce/dropdownlistproduct'),
          AxiosInstance.get('/ecommerce/dropdownlistsalesproduct'),
          reviewId ? AxiosInstance.get(`/ecommerce/review?id=${reviewId}`) : Promise.resolve(null)
        ]);

        if (productsRes.data?.data?.data) {
          setProducts(productsRes.data.data.data);
        }
        if (salesProductsRes.data?.data?.data) {
          setSalesProducts(salesProductsRes.data.data.data);
        }
        
        // Set form data if review exists
        if (reviewRes?.data?.data?.data?.[0]) {
          const reviewData = reviewRes.data.data.data[0];
          const productType = reviewData.product ? 'product' : 'sales_product';
          const productId = reviewData.product?.id || reviewData.sales_product?.id || '';
          
          setFormData({
            name: reviewData.name || '',
            rating: reviewData.rating || 0,
            comment: reviewData.comment || '',
            productType,
            productId: productId.toString()
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load review data');
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
    
    if (!reviewId) {
      toast.error('Review ID is missing');
      return;
    }
    
    setIsLoading(true);
    try {
      const payload = {
        id: reviewId,
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment
        // Note: We're not sending product/sales_product as per backend requirements
      };

      const response = await AxiosInstance.patch('/ecommerce/review', payload);
      
      if (response.data.status === 'SUCCESS') {
        toast.success('Review updated successfully');
        router.push('/Reviews');
      } else {
        toast.error(response.data.message || 'Failed to update review');
      }
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update review';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading review data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Update Review</h2>
            <p className="mt-1 text-blue-100">Edit your product feedback</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reviewer Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name <span className="text-blue-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Product Type Display (readonly) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Product Type
                </label>
                <div className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300">
                  {formData.productType === 'product' ? 'Regular Product' : 'Sales Product'}
                </div>
              </div>

              {/* Product Display (readonly) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {formData.productType === 'product' ? 'Product' : 'Sales Product'}
                </label>
                {formData.productType === 'product' ? (
                  <div className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300">
                    {products.find(p => p.id.toString() === formData.productId)?.name || 'Product not found'}
                  </div>
                ) : (
                  <div className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-300">
                    {salesProducts.find(p => p.id.toString() === formData.productId)?.name || 'Product not found'}
                  </div>
                )}
                <p className="mt-1 text-sm text-gray-500">Product cannot be changed after review creation</p>
              </div>

              {/* Rating */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Rating <span className="text-blue-500">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-3xl focus:outline-none ${(hoverRating || formData.rating) >= star ? 'text-blue-400' : 'text-gray-500'}`}
                      onClick={() => handleRatingChange(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-gray-400">
                    {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div className="md:col-span-2">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
                  Review Comment <span className="text-blue-500">*</span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => router.push('/Reviews')}
                className="mr-4 px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
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