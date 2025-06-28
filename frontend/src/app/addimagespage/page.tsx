'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: number;
  name: string;
  category: string;
  description: string;
  bulletsdescription: string;
}

const AddImages = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagescategory, setImagesCategory] = useState('');
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
  const [description, setDescription] = useState('');
  const [bulletsdescription, setBulletsdescription] = useState('• ');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await AxiosInstance.get('/images/textbox_categories');
        if (res?.data?.data?.data) {
          setCategoryRecords(res.data.data.data);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error occurred while fetching categories:', error);
      }
    };
    fetchMenu();

    // Clean up the object URL when component unmounts
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) formData.append('image', image);
      formData.append('imagescategory', imagescategory);
      formData.append('description', description);
      formData.append('bulletsdescription', bulletsdescription);

      const response = await AxiosInstance.post('/images/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        router.push('/imagespage');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const handleBulletsInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value;
    if (e.key === 'Enter') {
      e.preventDefault();
      setBulletsdescription(value + '\n• ');
    } else {
      setBulletsdescription(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Add New Luxury Image</h2>
            <p className="mt-1 text-amber-100">Upload a new luxury image to your collection</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-300 mb-1">
                  Image Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Upload Image */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-amber-300 mb-1">
                  Image File <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                      <svg className="-ml-1 mr-2 h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Image
                    </span>
                    <input
                      type="file"
                      id="image"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                    />
                  </label>
                  {image && (
                    <span className="ml-4 text-sm text-amber-300">{image.name}</span>
                  )}
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-contain w-full h-full p-4"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="imagescategory" className="block text-sm font-medium text-amber-300 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="imagescategory"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  onChange={(e) => setImagesCategory(e.target.value)}
                  required
                >
                  <option value="" className="text-gray-400">Select Category</option>
                  {categoryRecords.length > 0 ? (
                    categoryRecords.map((item, index) => (
                      <React.Fragment key={item.id}>
                        {index > 0 && (
                          <option disabled className="text-gray-600">───────────────</option> 
                        )}
                        <option value={item.id} className="text-white">
                          {item.category}
                        </option>
                      </React.Fragment>
                    ))
                  ) : (
                    <option value="" className="text-gray-400">No categories available</option>
                  )}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-amber-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type description here"
                />
              </div>

              {/* Bullets Description */}
              <div>
                <label htmlFor="bulletsdescription" className="block text-sm font-medium text-amber-300 mb-1">
                  Bullet Points
                </label>
                <textarea
                  id="bulletsdescription"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={bulletsdescription}
                  onChange={(e) => setBulletsdescription(e.target.value)}
                  onKeyDown={handleBulletsInput}
                  placeholder="• Type your first bullet here, then press Enter for the next..."
                  rows={5}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={() => router.push('/imagespage')}
                className="px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Add Image
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddImages;