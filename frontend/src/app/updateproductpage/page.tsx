'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  prod_has_category: string;
  image?: string;
}

const UpdateProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productid');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    prodHasCategory: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch product data and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await AxiosInstance.get('/ecommerce/category');
        if (categoriesRes) {
          setCategoryRecords(categoriesRes.data.data.data);
        }

        // Fetch product data if productId exists
        if (productId) {
          const productRes = await AxiosInstance.get(`/ecommerce/product?id=${productId}`);
          const productData = productRes?.data?.data?.data[0];
          if (productData) {
            setFormData({
              name: productData.name,
              description: productData.description,
              price: productData.price,
              prodHasCategory: productData.prod_has_category
            });

            if (productData.image) {
              const baseUrl = 'http://127.0.0.1:8000/';
              setImagePreview(`${baseUrl}${productData.image}`);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]);

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
      formDataToSend.append('id', productId as string);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('prod_has_category', formData.prodHasCategory);

      if (image) formDataToSend.append('image', image);

      const response = await AxiosInstance.patch('/ecommerce/product', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response) {
        router.push('/products');
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
            <h2 className="text-2xl font-bold text-white">Edit Product</h2>
            <p className="mt-1 text-indigo-100">Update the details of your product</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
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
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="prodHasCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="prodHasCategory"
                  name="prodHasCategory"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.prodHasCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categoryRecords?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Image */}
              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {image ? 'Change Image' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      id="image"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  {image && (
                    <span className="text-sm text-gray-600">{image.name}</span>
                  )}
                  {imagePreview && (
                    <div className="w-24 h-24 relative">
                      <Image 
                        src={imagePreview}
                        alt="Product Preview"
                        fill
                        className="object-cover rounded-lg"
                        unoptimized={true}
                      />
                    </div>
                  )}
                </div>
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