'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';

interface Review {
  id: number;
  name: string;
}
interface ProductTag {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  prod_has_category: string;
  tags: string;
  image?: string;
}

const UpdateProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewid');
  
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: '',
    product: '',
    // prodHasTag: ''


  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ProductRecords, setProductRecords] = useState<Review[]>([]);
//   const [tagRecords, setTagRecords] = useState<ProductTag[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch product data and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await AxiosInstance.get('/ecommerce/product');
        if (categoriesRes) {
          setProductRecords(categoriesRes.data.data.data);
        }
        
        // Fetch product data if productId exists
        if (reviewId) {
          const productRes = await AxiosInstance.get(`/ecommerce/review?id=${reviewId}`);
          const productData = productRes?.data?.data?.data[0];
          if (productData) {
            setFormData({
              name: productData.name,
              comment: productData.comment,
              rating: productData.rating,
              product: productData.product
            //   prodHasTag: productData.tags

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', reviewId as string);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.comment);
      formDataToSend.append('price', formData.rating);
      formDataToSend.append('product', formData.product);

    //   if (image) formDataToSend.append('image', image);

      const response = await AxiosInstance.patch('/ecommerce/review', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Edit Review</h2>
            <p className="mt-1 text-indigo-100">Update the details of your review</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
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

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.comment}
                  onChange={handleChange}
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm"></span>
                  </div>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="0"
                    step="0.01"
                    className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="0.00"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* Tag */}
              <div>
                <label htmlFor="prodHasTag" className="block text-sm font-medium text-gray-700 mb-1">
                  Product<span className="text-red-500">*</span>
                </label>
                <select
                  id="product"
                  name="product"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.product}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Product</option>
                  {ProductRecords?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => router.push('/products')}
                className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;