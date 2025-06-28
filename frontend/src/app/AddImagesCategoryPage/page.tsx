'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

const AddCategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post('/images/categories', { 
        category 
      });
      if (response) {
        router.push('/ImagesCategoryPage');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Add New Category</h2>
            <p className="mt-1 text-amber-100">Create a new category</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Category Input */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-amber-300 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="category"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  maxLength={50}
                  placeholder="Enter category name"
                />
                <p className="mt-1 text-xs text-gray-400">Max 50 characters</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={() => router.push('/categories')}
                className="px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;