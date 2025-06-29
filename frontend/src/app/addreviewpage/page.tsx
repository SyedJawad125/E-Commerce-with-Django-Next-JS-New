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
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

interface Product {
  id: number;
  name: string;
}

interface SalesProduct {
  id: number;
  name: string;
  discount_percent: number;
}

const AddReview = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
    product: '',
    sales_product: ''
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [productType, setProductType] = useState<'regular' | 'sales'>('regular');

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [regularRes, salesRes] = await Promise.all([
          AxiosInstance.get('/ecommerce/dropdownlistproduct'),
          AxiosInstance.get('/ecommerce/dropdownlistsalesproduct')
        ]);
        
        if (regularRes) setProducts(regularRes.data.data.data || []);
        if (salesRes) setSalesProducts(salesRes.data.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleProductTypeChange = (type: 'regular' | 'sales') => {
    setProductType(type);
    // Clear the other product type when switching
    setFormData(prev => ({
      ...prev,
      product: type === 'regular' ? prev.product : '',
      sales_product: type === 'sales' ? prev.sales_product : ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate at least one product is selected
    if (!formData.product && !formData.sales_product) {
      alert('Please select either a product or sales product');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        name: formData.name.trim(),
        comment: formData.comment.trim(),
        rating: parseInt(formData.rating as unknown as string),
        product: formData.product ? parseInt(formData.product) : null,
        sales_product: formData.sales_product ? parseInt(formData.sales_product) : null
      };

      const response = await AxiosInstance.post('/ecommerce/review', payload);
      
      if (response) {
        router.push('/Reviews');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Add New Review</h2>
            <p className="mt-1 text-indigo-100">Share your feedback about a product</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Product Type Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleProductTypeChange('regular')}
                    className={`px-4 py-2 rounded-lg border ${productType === 'regular' ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'border-gray-300 text-gray-700'}`}
                  >
                    Regular Product
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductTypeChange('sales')}
                    className={`px-4 py-2 rounded-lg border ${productType === 'sales' ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'border-gray-300 text-gray-700'}`}
                  >
                    Sales Product
                  </button>
                </div>
              </div>

              {/* Product Selection */}
              <div className="md:col-span-2">
                <label htmlFor={productType === 'regular' ? 'product' : 'sales_product'} className="block text-sm font-medium text-gray-700 mb-1">
                  {productType === 'regular' ? 'Product' : 'Sales Product'} <span className="text-red-500">*</span>
                </label>
                <select
                  id={productType === 'regular' ? 'product' : 'sales_product'}
                  name={productType === 'regular' ? 'product' : 'sales_product'}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={productType === 'regular' ? formData.product : formData.sales_product}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a {productType === 'regular' ? 'Product' : 'Sales Product'}</option>
                  {(productType === 'regular' ? products : salesProducts)?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                      {productType === 'sales' && ` (${(item as SalesProduct).discount_percent}% off)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-3xl focus:outline-none ${(hoverRating || formData.rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      onClick={() => handleRatingChange(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
                onClick={() => router.push('/reviews')}
                className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;



