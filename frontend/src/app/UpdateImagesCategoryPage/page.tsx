// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";

// const AddCategory = () => {
//   const router = useRouter();
//   const [category, setCategory] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await AxiosInstance.post('/images/categories', { 
//         category 
//       });
//       if (response) {
//         router.push('/ImagesCategoryPage');
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto">
//         <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Add New Category</h2>
//             <p className="mt-1 text-amber-100">Create a new category</p>
//           </div>
          
//           {/* Form */}
//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="space-y-6">
//               {/* Category Input */}
//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-amber-300 mb-1">
//                   Category Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="category"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   required
//                   maxLength={50}
//                   placeholder="Enter category name"
//                 />
//                 <p className="mt-1 text-xs text-gray-400">Max 50 characters</p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4 space-x-4">
//               <button
//                 type="button"
//                 onClick={() => router.push('/categories')}
//                 className="px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
//               >
//                 Create Category
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;






'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: string;
  category: string;
  image?: string;
}

const UpdateCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    category: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch category data based on categoryId
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (categoryId) {
        try {
          const res = await AxiosInstance.get(`/images/textbox_categories?id=${categoryId}`);
          console.log("Full API Response:", res);
          
          const categoryData = res?.data?.data?.data?.[0] || 
                              res?.data?.data?.[0] || 
                              res?.data?.[0] || 
                              res?.data;
          
          if (categoryData) {
            setFormData({
              category: categoryData.category || categoryData.category || '',
            });
          }
        } catch (error) {
          console.error('Error fetching category data:', error);
        }
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', categoryId as string);
      formDataToSend.append('category', formData.category);
      
      
      const response = await AxiosInstance.patch('/images/categories', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response) {
        router.push('/ImagesCategoryPage');
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
            <h2 className="text-2xl font-bold text-white">Edit Images Category</h2>
            <p className="mt-1 text-indigo-100">Update the details of your Images Category</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Name */}
              <div className="md:col-span-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => router.push('/ImagesCategoryPage')}
                className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Updating...' : 'Update Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;