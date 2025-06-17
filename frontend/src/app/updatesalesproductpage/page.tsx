'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';
import { toast } from 'react-toastify'; // Added toast for notifications
import 'react-toastify/dist/ReactToastify.css';

interface Category {
  id: number;
  name: string;
  // price: number; // This 'price' property seems irrelevant for a category interface
}

interface SalesProduct {
  id: number;
  name: string;
  description: string;
  original_price: string; // Changed from price to original_price to match formData
  discount_percent: string; // Changed from discount_price to discount_percent to match formData
  salesprod_has_category: number;
  image?: string;
}

const UpdateSalesProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('saleproductid');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    original_price: '',
    discount_percent: '',
    salesprod_has_category: '' // Keep as string for select value
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);

  // Fetch product data and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        // Fetch categories
        const categoriesRes = await AxiosInstance.get('/ecommerce/dropdownlistcategory');
        if (categoriesRes && categoriesRes.data?.data?.data) {
          setCategoryRecords(categoriesRes.data.data.data);
        } else {
          toast.error('Failed to load categories.', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }

        // Fetch product data if productId exists
        if (productId) {
          const productRes = await AxiosInstance.get(`/ecommerce/salesproduct?id=${productId}`);
          const productData = productRes?.data?.data?.data[0];
          if (productData) {
            setFormData({
              name: productData.name,
              description: productData.description,
              original_price: productData.original_price,
              discount_percent: productData.discount_percent,
              salesprod_has_category: String(productData.salesprod_has_category) // Convert to string for select
            });

            if (productData.image) {
              const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
              setImagePreview(`${baseUrl}${productData.image}`);
            }
          } else {
            toast.error('Sales Product not found', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            router.push('/salesproductpage');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load sales product data', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [productId, router]); // Added router to dependency array

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-indigo-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

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
      toast.warn("Please select a valid image file.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
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
      formDataToSend.append('original_price', formData.original_price);
      formDataToSend.append('discount_percent', formData.discount_percent);
      formDataToSend.append('salesprod_has_category', formData.salesprod_has_category); // This is already a string

      if (image) formDataToSend.append('image', image);

      const response = await AxiosInstance.patch('/ecommerce/salesproduct', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        toast.success('Sales product updated successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setTimeout(() => {
          router.push('/salesproductpage');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error:', error);
      let errorMessage = 'Failed to update sales product';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.data) {
        errorMessage = error.response.data.data;
      }
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
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
            <h2 className="text-2xl font-bold text-white">Edit Sales Product</h2>
            <p className="mt-1 text-indigo-100">Update the details of your sales product</p>
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
                <label htmlFor="original_price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span> {/* Added dollar sign */}
                  </div>
                  <input
                    type="number"
                    id="original_price"
                    name="original_price"
                    min="0"
                    step="0.01"
                    className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                  <input
                    type="number"
                    id="discount_percent"
                    name="discount_percent"
                    min="0"
                    step="0.01"
                    className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="0.00"
                    value={formData.discount_percent}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="md:col-span-2">
                <label htmlFor="salesprod_has_category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="salesprod_has_category"
                  name="salesprod_has_category" // Corrected name attribute
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.salesprod_has_category}
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

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="mt-2 flex items-center space-x-4">
                  {imagePreview && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                      <Image
                        src={imagePreview}
                        alt="Product Preview"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  <label htmlFor="image-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {imagePreview ? 'Change Image' : 'Upload Image'}
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/salesproductpage')}
                className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update Sales Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalesProduct;