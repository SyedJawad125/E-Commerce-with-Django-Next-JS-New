// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import Image from 'next/image';

// interface Category {
//   id: number;
//   name: string;
// }
// interface ProductTag {
//   id: number;
//   name: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   prod_has_category: string;
//   tags: string;
//   image?: string;
// }

// const UpdateProduct = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('productid');
  
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     prodHasCategory: '',
//     prodHasTag: ''


//   });
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
//   const [tagRecords, setTagRecords] = useState<ProductTag[]>([]);

//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch product data and categories
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch categories
//         const categoriesRes = await AxiosInstance.get('/ecommerce/category');
//         if (categoriesRes) {
//           setCategoryRecords(categoriesRes.data.data.data);
//         }
//         const tagsRes = await AxiosInstance.get('/ecommerce/producttag');
//         if (tagsRes) {
//           setTagRecords(tagsRes.data.data.data);
//         }
//         // Fetch product data if productId exists
//         if (productId) {
//           const productRes = await AxiosInstance.get(`/ecommerce/product?id=${productId}`);
//           const productData = productRes?.data?.data?.data[0];
//           if (productData) {
//             setFormData({
//               name: productData.name,
//               description: productData.description,
//               price: productData.price,
//               prodHasCategory: productData.prod_has_category,
//               prodHasTag: productData.tags

//             });

//             if (productData.image) {
//               const baseUrl = 'http://127.0.0.1:8000/';
//               setImagePreview(`${baseUrl}${productData.image}`);
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [productId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;

//     if (file && !file.type.startsWith("image/")) {
//       alert("Please select a valid image file.");
//       return;
//     }

//     setImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('id', productId as string);
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('prod_has_category', formData.prodHasCategory);

//       if (image) formDataToSend.append('image', image);

//       const response = await AxiosInstance.patch('/ecommerce/product', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       if (response) {
//         router.push('/products');
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
//             <h2 className="text-2xl font-bold text-white">Edit Product</h2>
//             <p className="mt-1 text-indigo-100">Update the details of your product</p>
//           </div>
          
//           {/* Form */}
//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Product Name */}
//               <div className="md:col-span-2">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Name <span className="text-red-500">*</span>
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

//               {/* Description */}
//               <div className="md:col-span-2">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   rows={3}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
//                   Price <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative rounded-lg shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <span className="text-gray-500 sm:text-sm">$</span>
//                   </div>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     min="0"
//                     step="0.01"
//                     className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                     placeholder="0.00"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               {/* Tag */}
//               <div>
//                 <label htmlFor="prodHasTag" className="block text-sm font-medium text-gray-700 mb-1">
//                   Tag <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   id="prodHasTag"
//                   name="prodHasTag"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.prodHasTag}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a Tag</option>
//                   {tagRecords?.map((item) => (
//                     <option value={item.id} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {/* Category */}
//               <div>
//                 <label htmlFor="prodHasCategory" className="block text-sm font-medium text-gray-700 mb-1">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   id="prodHasCategory"
//                   name="prodHasCategory"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                   value={formData.prodHasCategory}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a category</option>
//                   {categoryRecords?.map((item) => (
//                     <option value={item.id} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Upload Image */}
//               <div className="md:col-span-2">
//                 <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Image
//                 </label>
//                 <div className="mt-1 flex items-center gap-4">
//                   <label className="cursor-pointer">
//                     <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                       <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       {image ? 'Change Image' : 'Upload Image'}
//                     </span>
//                     <input
//                       type="file"
//                       id="image"
//                       className="sr-only"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                     />
//                   </label>
//                   {image && (
//                     <span className="text-sm text-gray-600">{image.name}</span>
//                   )}
//                   {imagePreview && (
//                     <div className="w-24 h-24 relative">
//                       <Image 
//                         src={imagePreview}
//                         alt="Product Preview"
//                         fill
//                         className="object-cover rounded-lg"
//                         unoptimized={true}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="button"
//                 onClick={() => router.push('/products')}
//                 className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
//               >
//                 {isLoading ? 'Updating...' : 'Update Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;






// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface Category {
//   id: number;
//   name: string;
// }

// interface ProductTag {
//   id: number;
//   name: string;
// }

// interface ProductImage {
//   id: number;
//   image_url: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   prod_has_category: string;
//   category_name?: string;
//   tags: string;
//   tag_names?: string[];
//   image_urls: string[];
//   created_at: string;
//   created_by: {
//     email: string;
//     get_full_name?: string;
//   };
// }

// const UpdateProduct = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('productid');
  
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     prodHasCategory: '',
//     prodHasTag: ''
//   });

//   const [images, setImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
//   const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
//   const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
//   const [tagRecords, setTagRecords] = useState<ProductTag[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

//   // Fetch product data and categories
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsFetching(true);
//         // Fetch categories and tags in parallel
//         const [categoriesRes, tagsRes] = await Promise.all([
//           AxiosInstance.get('/ecommerce/category'),
//           AxiosInstance.get('/ecommerce/producttag')
//         ]);

//         if (categoriesRes) {
//           setCategoryRecords(categoriesRes.data.data.data);
//         }
//         if (tagsRes) {
//           setTagRecords(tagsRes.data.data.data);
//         }

//         // Fetch product data if productId exists
//         if (productId) {
//           const productRes = await AxiosInstance.get(`/ecommerce/product?id=${productId}`);
//           const productData = productRes?.data?.data?.data[0];
          
//           if (productData) {
//             setFormData({
//               name: productData.name,
//               description: productData.description,
//               price: productData.price,
//               prodHasCategory: productData.prod_has_category,
//               prodHasTag: productData.tags
//             });

//             // Handle existing images
//             if (productData.image_urls && productData.image_urls.length > 0) {
//               const existingImagesData = productData.image_urls.map((url, index) => ({
//                 id: index, // Note: In a real app, you'd want actual image IDs from the backend
//                 image_url: url
//               }));
//               setExistingImages(existingImagesData);
//               setImagePreviews(existingImagesData.map(img => `${baseURL}${img.image_url}`));
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to load product data', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchData();
//   }, [productId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const newImages: File[] = [];
//     const newPreviews: string[] = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
      
//       if (!file.type.startsWith("image/")) {
//         toast.warn('Please select valid image files only', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//         continue;
//       }

//       newImages.push(file);
      
//       const reader = new FileReader();
//       reader.onload = () => {
//         newPreviews.push(reader.result as string);
//         if (newPreviews.length === newImages.length) {
//           setImagePreviews(prev => [...prev, ...newPreviews]);
//         }
//       };
//       reader.readAsDataURL(file);
//     }

//     setImages(prev => [...prev, ...newImages]);
//   };

//   const removeImage = (index: number, isExisting: boolean) => {
//     if (isExisting) {
//       // For existing images, mark them for deletion
//       setImagesToDelete(prev => [...prev, existingImages[index].id]);
//       setExistingImages(prev => prev.filter((_, i) => i !== index));
//     } else {
//       // For new images, just remove from the arrays
//       setImages(prev => prev.filter((_, i) => i !== index));
//       setImagePreviews(prev => prev.filter((_, i) => i !== index + existingImages.length));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('id', productId as string);
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('prod_has_category', formData.prodHasCategory);
//       formDataToSend.append('tags', formData.prodHasTag);

//       // Add images to delete
//       imagesToDelete.forEach(id => {
//         formDataToSend.append('images_to_delete', id.toString());
//       });

//       // Add new images
//       images.forEach(image => {
//         formDataToSend.append('images', image);
//       });

//       const response = await AxiosInstance.patch('/ecommerce/product', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       if (response) {
//         toast.success('Product updated successfully!', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//         setTimeout(() => {
//           router.push('/products');
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('Failed to update product', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-amber-500" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-4 text-gray-300">Loading product data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Update Product</h2>
//             <p className="mt-1 text-amber-100">Edit your luxury product details</p>
//           </div>
          
//           {/* Form */}
//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Product Name */}
//               <div className="md:col-span-2">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
//                   Product Name <span className="text-amber-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div className="md:col-span-2">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   rows={4}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
//                   Price <span className="text-amber-500">*</span>
//                 </label>
//                 <div className="relative rounded-lg shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <span className="text-gray-400">$</span>
//                   </div>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     min="0"
//                     step="0.01"
//                     className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                     placeholder="0.00"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Tag */}
//               <div>
//                 <label htmlFor="prodHasTag" className="block text-sm font-medium text-gray-300 mb-1">
//                   Tag <span className="text-amber-500">*</span>
//                 </label>
//                 <select
//                   id="prodHasTag"
//                   name="prodHasTag"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.prodHasTag}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a Tag</option>
//                   {tagRecords?.map((item) => (
//                     <option value={item.id} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Category */}
//               <div>
//                 <label htmlFor="prodHasCategory" className="block text-sm font-medium text-gray-300 mb-1">
//                   Category <span className="text-amber-500">*</span>
//                 </label>
//                 <select
//                   id="prodHasCategory"
//                   name="prodHasCategory"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.prodHasCategory}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a category</option>
//                   {categoryRecords?.map((item) => (
//                     <option value={item.id} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Image Gallery */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-3">
//                   Product Images
//                 </label>
                
//                 {/* Existing Images */}
//                 <div className="mb-6">
//                   <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Current Images</h4>
//                   {existingImages.length > 0 ? (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//                       {existingImages.map((img, index) => (
//                         <div key={`existing-${index}`} className="relative group">
//                           <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
//                             <img
//                               src={`${baseURL}${img.image_url}`}
//                               alt={`Product ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, true)}
//                             className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             title="Remove image"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 italic">No existing images</p>
//                   )}
//                 </div>

//                 {/* New Images */}
//                 <div className="mb-4">
//                   <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">New Images</h4>
//                   {imagePreviews.length > existingImages.length ? (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                       {imagePreviews.slice(existingImages.length).map((preview, index) => (
//                         <div key={`new-${index}`} className="relative group">
//                           <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
//                             <img
//                               src={preview}
//                               alt={`New image ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, false)}
//                             className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//                             title="Remove image"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 italic">No new images added</p>
//                   )}
//                 </div>

//                 {/* Upload Button */}
//                 <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors">
//                   <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   Add More Images
//                   <input
//                     type="file"
//                     className="sr-only"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     multiple
//                   />
//                 </label>
//                 <p className="mt-1 text-xs text-gray-400">Upload one or multiple images (JPEG, PNG)</p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-6 border-t border-gray-700">
//               <button
//                 type="button"
//                 onClick={() => router.push('/products')}
//                 className="mr-4 px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Updating...
//                   </>
//                 ) : 'Update Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;






// 'use client'
// import React, { useState, useEffect, useCallback } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface Category {
//   id: number;
//   name: string;
// }

// interface ProductTag {
//   id: number;
//   name: string;
// }

// interface ProductImage {
//   id: number;
//   image_url: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   prod_has_category: number; // Changed to number to match backend ID
//   category_name?: string;
//   tags: number; // Changed to number to match backend ID
//   tag_names?: string[];
//   image_urls: ProductImage[]; // Changed to array of ProductImage objects
//   created_at: string;
//   created_by: {
//     email: string;
//     get_full_name?: string;
//   };
// }

// const UpdateProduct = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get('productid');

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     prod_has_category: '',
//     tags: ''
//   });

//   const [newImages, setNewImages] = useState<File[]>([]); // Renamed for clarity
//   const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]); // Renamed for clarity
//   const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
//   const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
//   const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
//   const [tagRecords, setTagRecords] = useState<ProductTag[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);

//   const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

//   // Calculate total remaining images here, so it's accessible in JSX
//   const totalRemainingImages = (existingImages.length - imagesToDelete.length) + newImages.length;


//   // Fetch product data and categories
//   const fetchData = useCallback(async () => {
//     try {
//       setIsFetching(true);
//       // Fetch categories and tags in parallel
//       const [categoriesRes, tagsRes] = await Promise.all([
//         AxiosInstance.get('/ecommerce/category'),
//         AxiosInstance.get('/ecommerce/producttag')
//       ]);

//       if (categoriesRes) {
//         setCategoryRecords(categoriesRes.data.data.data);
//       }
//       if (tagsRes) {
//         setTagRecords(tagsRes.data.data.data);
//       }

//       // Fetch product data if productId exists
//       if (productId) {
//         const productRes = await AxiosInstance.get(`/ecommerce/product?id=${productId}`);
//         const productData = productRes?.data?.data?.data[0];

//         if (productData) {
//           setFormData({
//             name: productData.name,
//             description: productData.description,
//             price: productData.price,
//             prod_has_category: productData.prod_has_category,
//             tags: productData.tags
//           });

//           // Handle existing images
//           if (productData.images && productData.images.length > 0) {
//             setExistingImages(productData.images);
//             // Generate previews for existing images
//             const previews = productData.images.map((img: ProductImage) => `${baseURL}${img.images}`);
//             setNewImagePreviews(previews); // Initialize newImagePreviews with existing images
//           }
//         } else {
//           toast.error('Product not found', {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "dark",
//           });
//           router.push('/products'); // Redirect if product not found
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error('Failed to load product data', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     } finally {
//       setIsFetching(false);
//     }
//   }, [productId, router, baseURL]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const newFilesArray = Array.from(files);

//     // Calculate total images if new images are added
//     const currentTotalImages = existingImages.length + newImages.length - imagesToDelete.length;
//     if (currentTotalImages + newFilesArray.length > 5) {
//       toast.error(`You can upload a maximum of 5 images. You currently have ${currentTotalImages} image(s).`, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//       return;
//     }

//     const validNewImages: File[] = [];
//     const validNewPreviews: string[] = [];

//     newFilesArray.forEach(file => {
//       if (!file.type.startsWith("image/")) {
//         toast.warn(`File ${file.name} is not a valid image and was skipped.`, {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//         return;
//       }
//       validNewImages.push(file);
//       validNewPreviews.push(URL.createObjectURL(file));
//     });

//     setNewImages(prev => [...prev, ...validNewImages]);
//     setNewImagePreviews(prev => [...prev, ...validNewPreviews]);
//   };

//   const removeImage = (index: number, isExisting: boolean) => {
//     if (isExisting) {
//       // For existing images, mark them for deletion
//       const imageToRemove = existingImages[index];
//       if (imageToRemove && imageToRemove.id) { // Ensure imageToRemove and its id exist
//         setImagesToDelete(prev => [...prev, imageToRemove.id]);
//       }
//       setExistingImages(prev => prev.filter((_, i) => i !== index));
//     } else {
//       // For newly added images, remove from newImages and newImagePreviews
//       const actualIndex = index - existingImages.length; // Adjust index for new images
//       const imageUrlToRemove = newImagePreviews[index]; // Get the URL to revoke
//       URL.revokeObjectURL(imageUrlToRemove); // Clean up the URL object

//       setNewImages(prev => prev.filter((_, i) => i !== actualIndex));
//       setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // The totalRemainingImages is now defined globally, so this check works correctly
//     if (totalRemainingImages === 0) {
//       toast.error('Product must have at least one image', {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('id', productId as string);
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('prod_has_category', formData.prod_has_category);
//       formDataToSend.append('tags', formData.tags);

//       // Add deleted images as comma-separated string
//       if (imagesToDelete.length > 0) {
//         formDataToSend.append('deleted_images', imagesToDelete.join(','));
//       }

//       // Add new images
//       newImages.forEach(image => {
//         formDataToSend.append('images', image);
//       });

//       const response = await AxiosInstance.patch('/ecommerce/product', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response) {
//         toast.success('Product updated successfully!', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//         setTimeout(() => {
//           router.push('/products');
//         }, 2000);
//       }
//     } catch (error: any) {
//       console.error('Error:', error);
//       let errorMessage = 'Failed to update product';
//       if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       } else if (error.response?.data?.data) { // Backend error message format
//         errorMessage = error.response.data.data;
//       }
//       toast.error(errorMessage, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-amber-500" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-4 text-gray-300">Loading product data...</p>
//         </div>
//       </div>
//     );
//   }

//   const totalCurrentImages = existingImages.length + newImages.length;
//   const remainingUploadSlots = 5 - totalCurrentImages;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
//             <h2 className="text-2xl font-bold text-white">Update Product</h2>
//             <p className="mt-1 text-amber-100">Edit your luxury product details</p>
//           </div>

//           {/* Form */}
//           <form className="p-6 space-y-6" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Product Name */}
//               <div className="md:col-span-2">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
//                   Product Name <span className="text-amber-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div className="md:col-span-2">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   rows={4}
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Price */}
//               <div>
//                 <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
//                   Price <span className="text-amber-500">*</span>
//                 </label>
//                 <div className="relative rounded-lg shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <span className="text-gray-400">$</span>
//                   </div>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     min="0"
//                     step="0.01"
//                     className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                     placeholder="0.00"
//                     value={formData.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Tag */}
//               <div>
//                 <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
//                   Tag <span className="text-amber-500">*</span>
//                 </label>
//                 <select
//                   id="tags"
//                   name="tags"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.tags}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a Tag</option>
//                   {tagRecords?.map((item) => (
//                     <option value={item.id} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Category */}
//               <div>
//                 <label htmlFor="prod_has_category" className="block text-sm font-medium text-gray-300 mb-1">
//                   Category <span className="text-amber-500">*</span>
//                 </label>
//                 <select
//                   id="prod_has_category"
//                   name="prod_has_category"
//                   className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
//                   value={formData.prod_has_category}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select a category</option>
//                   {categoryRecords?.map((item) => (
//                     <option value={item.id} key={item.id}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Image Gallery */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-300 mb-3">
//                   Product Images (Max 5) <span className="text-amber-500">*</span>
//                 </label>

//                 {/* Combined Images Display */}
//                 <div className="mb-6">
//                   {newImagePreviews.length > 0 ? (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//                       {newImagePreviews.map((preview, index) => (
//                         <div key={`image-${index}`} className="relative group">
//                           <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
//                             <img
//                               src={preview}
//                               alt={`Product image ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index, index < existingImages.length)}
//                             className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//                             title="Remove image"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-gray-500 italic">No images currently uploaded. Please add at least one.</p>
//                   )}
//                 </div>

//                 {/* Upload Button */}
//                 <label className={`cursor-pointer inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
//                     remainingUploadSlots <= 0 ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}>
//                   <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   Add More Images
//                   <input
//                     type="file"
//                     className="sr-only"
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     multiple
//                     disabled={remainingUploadSlots <= 0} // Disable if max images reached
//                   />
//                 </label>
//                 <p className="mt-1 text-xs text-gray-400">
//                   {totalCurrentImages > 0
//                     ? `${totalCurrentImages} image(s) uploaded. You can add ${remainingUploadSlots} more.`
//                     : 'Select one or more images (up to 5)'}
//                 </p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-6 border-t border-gray-700">
//               <button
//                 type="button"
//                 onClick={() => router.push('/products')}
//                 className="mr-4 px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading || totalRemainingImages === 0} // Use the globally defined variable
//                 className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
//                   isLoading || totalRemainingImages === 0
//                     ? 'opacity-75 cursor-not-allowed'
//                     : ''
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Updating...
//                   </>
//                 ) : 'Update Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProduct;







'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
  id: number;
  name: string;
}

interface ProductTag {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  prod_has_category: number;
  category_name?: string;
  tags: number[];
  tag_names?: string[];
  image_urls: ProductImage[];
  created_at: string;
  created_by: {
    email: string;
    get_full_name?: string;
  };
}

const UpdateProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productid');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    prod_has_category: '',
    tags: [] as number[]
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);
  const [tagRecords, setTagRecords] = useState<ProductTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  const totalRemainingImages = (existingImages.length - imagesToDelete.length) + newImages.length;

  const fetchData = useCallback(async () => {
  try {
    setIsFetching(true);
    const [categoriesRes, tagsRes] = await Promise.all([
      AxiosInstance.get('/ecommerce/dropdownlistcategory'),
      AxiosInstance.get('/ecommerce/producttag')
    ]);

    if (categoriesRes) {
      setCategoryRecords(categoriesRes.data.data.data);
    }
    if (tagsRes) {
      setTagRecords(tagsRes.data.data.data);
    }

    if (productId) {
      const productRes = await AxiosInstance.get(`/ecommerce/product?id=${productId}`);
      const productData = productRes?.data?.data?.data[0];

      if (productData) {
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          prod_has_category: productData.prod_has_category,
          tags: productData.tags || []
        });

        // Corrected this part to match your interface
        if (productData.images && productData.images.length > 0) {
          setExistingImages(productData.images);
          const previews = productData.images.map((img: ProductImage) => 
            img.images.startsWith('http') ? img.images : `${baseURL}${img.images}`
          );
          setNewImagePreviews(previews);
        }
      } else {
        toast.error('Product not found', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        router.push('/products');
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Failed to load product data', {
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
}, [productId, router, baseURL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedTags: number[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(Number(options[i].value));
      }
    }
    setFormData(prev => ({
      ...prev,
      tags: selectedTags
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFilesArray = Array.from(files);
    const currentTotalImages = existingImages.length + newImages.length - imagesToDelete.length;
    
    if (currentTotalImages + newFilesArray.length > 5) {
      toast.error(`You can upload a maximum of 5 images. You currently have ${currentTotalImages} image(s).`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    const validNewImages: File[] = [];
    const validNewPreviews: string[] = [];

    newFilesArray.forEach(file => {
      if (!file.type.startsWith("image/")) {
        toast.warn(`File ${file.name} is not a valid image and was skipped.`, {
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
      validNewImages.push(file);
      validNewPreviews.push(URL.createObjectURL(file));
    });

    setNewImages(prev => [...prev, ...validNewImages]);
    setNewImagePreviews(prev => [...prev, ...validNewPreviews]);
  };

  const removeImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      const imageToRemove = existingImages[index];
      if (imageToRemove && imageToRemove.id) {
        setImagesToDelete(prev => [...prev, imageToRemove.id]);
      }
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      const actualIndex = index - existingImages.length;
      const imageUrlToRemove = newImagePreviews[index];
      URL.revokeObjectURL(imageUrlToRemove);

      setNewImages(prev => prev.filter((_, i) => i !== actualIndex));
      setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (totalRemainingImages === 0) {
      toast.error('Product must have at least one image', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', productId as string);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('prod_has_category', formData.prod_has_category);
      formDataToSend.append('tags', formData.tags.join(','));

      if (imagesToDelete.length > 0) {
        formDataToSend.append('deleted_images', imagesToDelete.join(','));
      }

      newImages.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await AxiosInstance.patch('/ecommerce/product', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        toast.success('Product updated successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setTimeout(() => {
          router.push('/products');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error:', error);
      let errorMessage = 'Failed to update product';
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

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-amber-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 text-gray-300">Loading product data...</p>
        </div>
      </div>
    );
  }

  const totalCurrentImages = existingImages.length + newImages.length;
  const remainingUploadSlots = 5 - totalCurrentImages;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Update Product</h2>
            <p className="mt-1 text-amber-100">Edit your luxury product details</p>
          </div>

          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Product Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
                  Price <span className="text-amber-500">*</span>
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">$</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    className="block w-full pl-7 pr-12 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                  Tags <span className="text-amber-500">*</span>
                </label>
                <select
                  id="tags"
                  name="tags"
                  multiple
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={formData.tags.map(String)}
                  onChange={handleTagChange}
                  required
                >
                  {tagRecords?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-400">
                  Hold Ctrl/Cmd to select multiple tags
                </p>
              </div>

              <div>
                <label htmlFor="prod_has_category" className="block text-sm font-medium text-gray-300 mb-1">
                  Category <span className="text-amber-500">*</span>
                </label>
                <select
                  id="prod_has_category"
                  name="prod_has_category"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                  value={formData.prod_has_category}
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Product Images (Max 5) <span className="text-amber-500">*</span>
                </label>

                <div className="mb-6">
                  {newImagePreviews.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {newImagePreviews.map((preview, index) => (
                        <div key={`image-${index}`} className="relative group">
                          <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                            <img
                              src={preview}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index, index < existingImages.length)}
                            className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            title="Remove image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No images currently uploaded. Please add at least one.</p>
                  )}
                </div>

                <label className={`cursor-pointer inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
                    remainingUploadSlots <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add More Images
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    disabled={remainingUploadSlots <= 0}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-400">
                  {totalCurrentImages > 0
                    ? `${totalCurrentImages} image(s) uploaded. You can add ${remainingUploadSlots} more.`
                    : 'Select one or more images (up to 5)'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={() => router.push('/products')}
                className="mr-4 px-6 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || totalRemainingImages === 0}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
                  isLoading || totalRemainingImages === 0
                    ? 'opacity-75 cursor-not-allowed'
                    : ''
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
                ) : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;