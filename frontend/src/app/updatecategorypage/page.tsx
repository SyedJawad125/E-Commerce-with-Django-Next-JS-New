// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // for navigation
// import { useSearchParams } from 'next/navigation'; // for query parameters
// import AxiosInstance from "@/components/AxiosInstance";


// type CategoryData = {
//   id: string;
//   name: string;
//   description: string;
//   image?: File;
// };

// const UpdateCategory = () => {
//   const [data, setData] = useState<CategoryData | null>(null);
//   const [name, setName] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [image, setImage] = useState<File | null>(null);

//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // useEffect(() => {
//   //   const queryData = searchParams.get('data');

//   //   if (queryData) {
//   //     try {
//   //       const parsedData: CategoryData = JSON.parse(decodeURIComponent(queryData));
//   //       setData(parsedData);
//   //       setName(parsedData.name || '');
//   //       setDescription(parsedData.description || '');
//   //     } catch (error) {
//   //       console.error('Failed to parse query data:', error);
//   //     }
//   //   } else {
//   //     console.warn('No data found in query parameters');
//   //   }
//   // }, [searchParams]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!data) {
//       return; // Exit if data is null
//     }

//     try {
//       const formData = new FormData();
//       formData.append('id', data.id);
  
//       formData.append('name', name);
//       formData.append('description', description);
//       if (image) {
//         formData.append('image', image);
//       }

//       const response = await AxiosInstance.patch('/ecommerce/category', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response) {
//         console.log('Response:', response.data);
//         router.push('/category?message=Category Updated!');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImage(e.target.files[0]);
//     }
//   };

//   if (!data) {
//     return <div>Loading...</div>; // This will show if data is still null
//   }

//   return (
//     <div className="container mx-auto mt-8 px-4 md:px-8">
//       <h2 className="text-xl font-semibold mb-4">Update Category Here:</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <input
//             type="text"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
//           />
//         </div>
//         <div>
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             onChange={handleImageChange}
//             className="mt-1 block w-full text-md text-gray-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateCategory;




'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

type Category = {
  id: string;
  name: string;
  description: string;
  image?: File;
};

const UpdateCategory = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  
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
      if (image) formDataToSend.append('image', image);

      const response = await AxiosInstance.patch('/ecommerce/category', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response) {
        router.push('/categories');
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
            <h2 className="text-2xl font-bold text-white">Edit Category</h2>
            <p className="mt-1 text-indigo-100">Update the details of Category</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
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

              {/* Upload Image */}
              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Image
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Change Image
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
                    <span className="ml-4 text-sm text-gray-600">{image.name}</span>
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

export default UpdateCategory;