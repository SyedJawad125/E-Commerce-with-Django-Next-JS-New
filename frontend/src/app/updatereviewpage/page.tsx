'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';

interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
  product: {
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

const UpdateReview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewid');

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: '',
    productType: '', // 'product' or 'sales_product'
    productId: '',
    productName: '' // Added to store the product name for display
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch review data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (reviewId) {
          const res = await AxiosInstance.get(`/ecommerce/review?id=${reviewId}`);
          const reviewData =
            res?.data?.data?.data?.[0] ||
            res?.data?.data?.[0] ||
            res?.data?.[0] ||
            res?.data;

          if (reviewData) {
            setFormData({
              name: reviewData.name || '',
              comment: reviewData.comment || '',
              rating: reviewData.rating?.toString() || '',
              productType: reviewData.product ? 'product' : 'sales_product',
              productId: (reviewData.product?.id || reviewData.sales_product?.id || '').toString(),
              productName: reviewData.product?.name || reviewData.sales_product?.name || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', reviewId as string);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('comment', formData.comment);
      formDataToSend.append('rating', formData.rating);

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

              {/* Product Type and Product Name Display (readonly) in one line */}
<div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Product Type */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Product Type
    </label>
    <input
      type="text"
      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
      value={formData.productType === 'product' ? 'Regular Product' : 'Sales Product'}
      readOnly
    />
  </div>

  {/* Product Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {formData.productType === 'product' ? 'Product' : 'Sales Product'}
    </label>
    <input
      type="text"
      className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
      value={formData.productName}
      readOnly
    />
    <p className="mt-1 text-sm text-gray-500">Product cannot be changed after review creation</p>
  </div>
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






