'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: number;
  name: string;
}

const AddSalesProduct = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    original_price: '',
    discount_percent: '',
    salesprodHasCategory: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AxiosInstance.get('/ecommerce/dropdownlistcategory');
        if (res) {
          setCategoryRecords(res.data.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('original_price', formData.original_price);
      formDataToSend.append('discount_percent', formData.discount_percent);
      formDataToSend.append('salesprod_has_category', formData.salesprodHasCategory);
      if (image) formDataToSend.append('image', image);

      const response = await AxiosInstance.post('/ecommerce/salesproduct', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response) {
        router.push('/salesproductpage');
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
            <h2 className="text-2xl font-bold text-white">Add New Sales Product</h2>
            <p className="mt-1 text-indigo-100">Fill in the details below to add a new product to your sales inventory</p>
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Original Price */}
              <div>
                <label htmlFor="original_price" className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="original_price"
                    name="original_price"
                    min="0"
                    step="0.01"
                    className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                    placeholder="0.00"
                    value={formData.original_price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Discount Percentage */}
              <div>
                <label htmlFor="discount_percent" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    type="number"
                    id="discount_percent"
                    name="discount_percent"
                    min="0"
                    max="100"
                    className="block w-full pl-3 pr-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                    placeholder="0"
                    value={formData.discount_percent}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label htmlFor="salesprodHasCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="salesprodHasCategory"
                  name="salesprodHasCategory"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                  value={formData.salesprodHasCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="" className="text-gray-500">Select a category</option>
                  {categoryRecords?.map((item) => (
                    <option value={item.id} key={item.id} className="text-gray-900">
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
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Image
                    </span>
                    <input
                      type="file"
                      id="image"
                      className="sr-only"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      accept="image/*"
                    />
                  </label>
                  {image && (
                    <span className="ml-4 text-sm text-gray-900">{image.name}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => router.push('/salesproductpage')}
                className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSalesProduct;