// 'use client'
// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const ProductsCom = () => {
//   const router = useRouter();
//   const { permissions = {
//     create_product: false,
//     read_product: false,
//     update_product: false,
//     delete_product: false
//   } } = useContext(AuthContext);
  
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     limit: 12,  // Set default to 12 items per page
//     offset: 0,
//     totalPages: 1,
//     count: 0,
//     next: false,
//     previous: false
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
//   const modalRef = useRef(null);

//   // Handle modal focus
//   useEffect(() => {
//     if (showDetailsModal && modalRef.current) {
//       modalRef.current.focus();
//     }
//   }, [showDetailsModal]);

//   // Fetch products with pagination
//   useEffect(() => {
//     const fetchProducts = async () => {
//       if (!permissions.read_product) {
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const { currentPage, limit, offset } = pagination;
//         const res = await AxiosInstance.get(
//           `/ecommerce/product?page=${currentPage}&limit=${limit}&offset=${offset}`
//         );
        
//         const responseData = res?.data?.data;
//         const dataArr = responseData?.data || [];
        
//         const processed = dataArr.map(product => ({
//           ...product,
//           mainImage: product.image_urls?.[0] 
//             ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
//             : '/default-product-image.jpg',
//           remainingImages: product.image_urls?.slice(1).map(u => 
//             `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
//           ) || []
//         }));
        
//         setRecords(processed);
//         setFilteredRecords(processed);
//         setPagination(prev => ({
//           ...prev,
//           count: responseData?.count || 0,
//           totalPages: responseData?.total_pages || 1,
//           next: responseData?.next || false,
//           previous: responseData?.previous || false
//         }));

//         if (selectedProduct) {
//           const updatedProduct = processed.find(p => p.id === selectedProduct.id);
//           if (updatedProduct) setSelectedProduct(updatedProduct);
//         }
//       } catch (e) {
//         console.error('Error fetching products:', e);
//         if (e.response?.status === 403) {
//           toast.error('You do not have permission to view products');
//         } else {
//           toast.error('Failed to load products', { theme: 'dark', autoClose: 2000 });
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [refreshKey, baseURL, pagination.currentPage, pagination.limit, pagination.offset, permissions.read_product]);


//   // Handle pagination change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination(prev => ({ ...prev, currentPage: newPage }));
//     }
//   };

//   // Handle limit change
//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value);
//     setPagination(prev => ({ 
//       ...prev, 
//       limit: newLimit,
//       currentPage: 1,
//       offset: 0
//     }));
//   };

//   // Handle offset change
//   const handleOffsetChange = (e) => {
//     const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
//     setPagination(prev => ({ 
//       ...prev, 
//       offset: newOffset,
//       currentPage: 1
//     }));
//   };

//   // Event listener for product updates
//   useEffect(() => {
//     const handleProductUpdate = () => setRefreshKey(k => k + 1);
//     window.addEventListener('productUpdated', handleProductUpdate);
//     return () => window.removeEventListener('productUpdated', handleProductUpdate);
//   }, []);

//   const openDetailsModal = (product) => {
//     setSelectedProduct(product);
//     setShowDetailsModal(true);
//   };

//   const closeDetailsModal = () => {
//     setShowDetailsModal(false);
//     setSelectedProduct(null);
//   };

//   const deleteRecord = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;
    
//     try {
//       await AxiosInstance.delete(`/ecommerce/product?id=${id}`);
//       setRefreshKey(k => k + 1); // Refresh the list
      
//       if (selectedProduct?.id === id) {
//         closeDetailsModal();
//       }
      
//       toast.success('Product removed successfully', { theme: 'dark', autoClose: 2000 });
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       toast.error('Error deleting product', { theme: 'dark', autoClose: 2000 });
//     }
//   };

//   const updateRecord = (id) => {
//     router.push(`/updateproductpage?productid=${id}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
    
//     const filtered = records.filter(r => 
//       r.id.toString() === value ||
//       r.name.toLowerCase().includes(value) ||
//       r.category_name?.toLowerCase().includes(value)
//     );
    
//     setFilteredRecords(filtered);
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
//       <ToastContainer position="top-right" autoClose={2000} />
      
//       {/* Product Details Modal */}
//       {showDetailsModal && selectedProduct && (
//         <div 
//           ref={modalRef}
//           tabIndex={-1}
//           aria-modal="true"
//           role="dialog"
//           className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto"
//           onClick={closeDetailsModal}
//         >
//           <div 
//             className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto p-6"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between">
//               <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
//               <button 
//                 onClick={closeDetailsModal} 
//                 className="text-gray-400 hover:text-white text-3xl"
//                 aria-label="Close modal"
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
//               <div>
//                 <img 
//                   src={selectedProduct.mainImage} 
//                   alt={selectedProduct.name}
//                   className="w-full h-80 object-contain bg-gray-700 rounded-lg" 
//                 />
//                 {selectedProduct.remainingImages.length > 0 && (
//                   <div className="grid grid-cols-4 gap-2 mt-4">
//                     {selectedProduct.remainingImages.map((img, i) => (
//                       <img 
//                         key={i} 
//                         src={img} 
//                         className="h-20 object-cover rounded" 
//                         alt={`Additional view ${i + 1}`} 
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               <div className="text-gray-300">
//                 <h3 className="text-lg font-semibold text-amber-400 mb-2">Description</h3>
//                 <p>{selectedProduct.description}</p>
                
//                 <div className="grid grid-cols-2 gap-4 mt-6">
//                   <div>
//                     <h3 className="font-semibold text-amber-400">Category</h3>
//                     <p>{selectedProduct.category_name || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-amber-400">Price</h3>
//                     <p>PKR {selectedProduct.price}</p>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-amber-400">Created At</h3>
//                     <p>{new Date(selectedProduct.created_at).toLocaleDateString()}</p>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-amber-400">Created By</h3>
//                     <p>{selectedProduct.created_by?.get_full_name || selectedProduct.created_by?.email}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex mt-6 space-x-4">
//                   {permissions.update_product && (
//                     <button 
//                       onClick={() => {
//                         updateRecord(selectedProduct.id);
//                         closeDetailsModal();
//                       }}
//                       className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
//                     >
//                       Edit
//                     </button>
//                   )}
                  
//                   {permissions.delete_product && (
//                     <button 
//                       onClick={() => deleteRecord(selectedProduct.id)}
//                       className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   )}
                  
//                   <button 
//                     onClick={closeDetailsModal}
//                     className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-12">
//           <div>
//             <h1 className="text-4xl font-light text-white">LUXURY COLLECTION</h1>
//             <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-1"></div>
//           </div>
          
//           {permissions.create_product && (
//             <button 
//               onClick={() => router.push('/addproductspage')}
//               className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transform hover:scale-105 transition-transform"
//             >
//               Add Product
//             </button>
//           )}
//         </div>

//         {/* Search and Stats Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-800/50 rounded-xl mb-8 gap-4">
//           <div className="text-amber-400">
//             Showing {filteredRecords.length} of {pagination.count} items
//             {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
//           </div>
          
//           <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
//             <div className="relative w-full">
//               <span className="absolute left-3 top-3 text-gray-400">
//                 🔍
//               </span>
//               <input 
//                 type="text" 
//                 value={searchTerm} 
//                 onChange={handleSearch}
//                 placeholder="Search by name, ID or category..."
//                 className="w-full pl-10 py-3 bg-gray-700 rounded-full text-white focus:ring-amber-500 focus:outline-none"
//               />
//             </div>
            
//             <div className="flex gap-2 items-center">
//               <select 
//                 value={pagination.limit}
//                 onChange={handleLimitChange}
//                 className="bg-gray-700 text-white rounded-full px-3 py-2 focus:outline-none focus:ring-amber-500"
//               >
//                 <option value="12">12 per page</option>
//                 <option value="24">24 per page</option>
//                 <option value="36">36 per page</option>
//                 <option value="48">48 per page</option>
//               </select>
              
//               <input
//                 type="number"
//                 value={pagination.offset}
//                 onChange={handleOffsetChange}
//                 min="0"
//                 max={pagination.count}
//                 placeholder="Offset"
//                 className="bg-gray-700 text-white rounded-full px-3 py-2 w-20 focus:outline-none focus:ring-amber-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Products Grid - Updated for 12 items */}
//         {isLoading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(12)].map((_, idx) => (
//               <div key={idx} className="animate-pulse">
//                 <div className="bg-gray-800 rounded-xl aspect-square"></div>
//                 <div className="mt-3 h-5 bg-gray-800 rounded w-3/4"></div>
//                 <div className="mt-2 h-4 bg-gray-800 rounded w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             {filteredRecords.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {filteredRecords.map(item => (
//                   <div
//                     key={item.id}
//                     className="group relative rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-400/20 transition-all"
//                   >
//                     <div className="aspect-square bg-gray-800">
//                       <img 
//                         src={item.mainImage} 
//                         alt={item.name}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
//                       />
//                     </div>
                    
//                     {item.remainingImages.length > 0 && (
//                       <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
//                         +{item.remainingImages.length}
//                       </div>
//                     )}
                    
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
//                     <div className="p-4 absolute bottom-0 left-0 right-0">
//                       <span className="text-xs text-amber-400 uppercase">{item.category_name}</span>
//                       <h3 className="text-lg font-medium text-white line-clamp-1">{item.name}</h3>
//                       <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                      
//                       <div className="flex justify-between items-center mt-3">
//                         <span className="text-amber-400 font-bold">PKR {item.price}</span>
                        
//                         <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <button
//                             onClick={(e) => { 
//                               e.stopPropagation(); 
//                               openDetailsModal(item); 
//                             }}
//                             className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
//                             aria-label="View details"
//                           >
//                             👁️
//                           </button>

//                           {permissions.update_product && (
//                             <button
//                               onClick={(e) => { 
//                                 e.stopPropagation(); 
//                                 updateRecord(item.id); 
//                               }}
//                               className="p-2 bg-amber-600/90 rounded-lg hover:bg-amber-600 transition-colors"
//                               aria-label="Edit product"
//                             >
//                               ✏️
//                             </button>
//                           )}

//                           {permissions.delete_product && (
//                             <button
//                               onClick={(e) => { 
//                                 e.stopPropagation(); 
//                                 deleteRecord(item.id); 
//                               }}
//                               className="p-2 bg-red-600/90 rounded-lg hover:bg-red-600 transition-colors"
//                               aria-label="Delete product"
//                             >
//                               🗑️
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 text-gray-300">
//                 <p>No products match your search.</p>
//                 {permissions.create_product && (
//                   <button 
//                     onClick={() => router.push('/addproductspage')}
//                     className="mt-6 px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
//                   >
//                     Add Product
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Enhanced Pagination */}
//             {pagination.totalPages > 1 && (
//               <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-4">
//                 <div className="text-gray-400 text-sm">
//                   Page {pagination.currentPage} of {pagination.totalPages} • {pagination.count} total items
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   <button 
//                     onClick={() => handlePageChange(1)}
//                     disabled={pagination.currentPage === 1}
//                     className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
//                     aria-label="First page"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
                  
//                   <button 
//                     onClick={() => handlePageChange(pagination.currentPage - 1)}
//                     disabled={!pagination.previous}
//                     className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
//                     aria-label="Previous page"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
                  
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (pagination.totalPages <= 5) {
//                         pageNum = i + 1;
//                       } else if (pagination.currentPage <= 3) {
//                         pageNum = i + 1;
//                       } else if (pagination.currentPage >= pagination.totalPages - 2) {
//                         pageNum = pagination.totalPages - 4 + i;
//                       } else {
//                         pageNum = pagination.currentPage - 2 + i;
//                       }
                      
//                       return (
//                         <button 
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`w-8 h-8 rounded-full text-sm transition-colors ${
//                             pagination.currentPage === pageNum
//                               ? 'bg-amber-600 text-white'
//                               : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
//                           }`}
//                           aria-label={`Page ${pageNum}`}
//                         >
//                           {pageNum}
//                         </button>
//                       );
//                     })}
//                   </div>
                  
//                   <button 
//                     onClick={() => handlePageChange(pagination.currentPage + 1)}
//                     disabled={!pagination.next}
//                     className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
//                     aria-label="Next page"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
                  
//                   <button 
//                     onClick={() => handlePageChange(pagination.totalPages)}
//                     disabled={pagination.currentPage === pagination.totalPages}
//                     className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
//                     aria-label="Last page"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                       <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsCom;






'use client'
import React, { useEffect, useState, useContext, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const ProductsCom = () => {
  const router = useRouter();
  const { permissions = {
    create_product: false,
    read_product: false,
    update_product: false,
    delete_product: false
  } } = useContext(AuthContext);
  
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 12,
    offset: 0,
    totalPages: 1,
    count: 0,
    next: false,
    previous: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  const modalRef = useRef(null);

  // Handle modal focus
  useEffect(() => {
    if (showDetailsModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showDetailsModal]);

  // Fetch products with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      if (!permissions.read_product) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { currentPage, limit, offset } = pagination;
        const res = await AxiosInstance.get(
          `/ecommerce/product?page=${currentPage}&limit=${limit}&offset=${offset}`
        );
        
        const responseData = res?.data?.data;
        const dataArr = responseData?.data || [];
        
        const processed = dataArr.map(product => ({
          ...product,
          mainImage: product.image_urls?.[0] 
            ? `${baseURL}${product.image_urls[0].startsWith('/') ? '' : '/'}${product.image_urls[0]}`
            : '/default-product-image.jpg',
          remainingImages: product.image_urls?.slice(1).map(u => 
            `${baseURL}${u.startsWith('/') ? '' : '/'}${u}`
          ) || []
        }));
        
        setRecords(processed);
        setFilteredRecords(processed);
        setPagination(prev => ({
          ...prev,
          count: responseData?.count || 0,
          totalPages: responseData?.total_pages || 1,
          next: responseData?.next || false,
          previous: responseData?.previous || false
        }));

        if (selectedProduct) {
          const updatedProduct = processed.find(p => p.id === selectedProduct.id);
          if (updatedProduct) setSelectedProduct(updatedProduct);
        }
      } catch (e) {
        console.error('Error fetching products:', e);
        if (e.response?.status === 403) {
          toast.error('You do not have permission to view products');
        } else {
          toast.error('Failed to load products', { theme: 'dark', autoClose: 2000 });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [refreshKey, baseURL, pagination.currentPage, pagination.limit, pagination.offset, permissions.read_product]);

  // Handle pagination change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ 
      ...prev, 
      limit: newLimit,
      currentPage: 1,
      offset: 0
    }));
  };

  // Handle offset change
  const handleOffsetChange = (e) => {
    const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
    setPagination(prev => ({ 
      ...prev, 
      offset: newOffset,
      currentPage: 1
    }));
  };

  // Event listener for product updates
  useEffect(() => {
    const handleProductUpdate = () => setRefreshKey(k => k + 1);
    window.addEventListener('productUpdated', handleProductUpdate);
    return () => window.removeEventListener('productUpdated', handleProductUpdate);
  }, []);

  const openDetailsModal = (product) => {
    if (!permissions.read_product) {
      toast.error('You do not have permission to view product details');
      return;
    }
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  // const deleteRecord = async (id) => {
  //   if (!permissions.delete_product) {
  //     toast.error('You do not have permission to delete products');
  //     return;
  //   }
    
  //   if (!window.confirm('Are you sure you want to delete this product?')) return;
    
  //   try {
  //     await AxiosInstance.delete(`/ecommerce/product?id=${id}`);
  //     setRefreshKey(k => k + 1);
      
  //     if (selectedProduct?.id === id) {
  //       closeDetailsModal();
  //     }
      
  //     toast.success('Product removed successfully', { theme: 'dark', autoClose: 2000 });
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //     toast.error('Error deleting product', { theme: 'dark', autoClose: 2000 });
  //   }
  // };


  const deleteRecord = async (id) => {
    try {
      await AxiosInstance.delete(`/ecommerce/product?id=${id}`);
      setRefreshKey(prev => !prev); // This will trigger a refresh
      toast.success('Order deleted successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error('Error deleting order', { // Changed from 'review' to 'order'
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const updateRecord = (id) => {
    if (!permissions.update_product) {
      toast.error('You do not have permission to update products');
      return;
    }
    router.push(`/updateproductpage?productid=${id}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = records.filter(r => 
      r.id.toString() === value ||
      r.name.toLowerCase().includes(value) ||
      r.category_name?.toLowerCase().includes(value)
    );
    
    setFilteredRecords(filtered);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // Return early if no read permission
  if (!permissions.read_product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to view products. Please contact your administrator.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <ToastContainer position="top-right" autoClose={2000} />
      
      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div 
          ref={modalRef}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeDetailsModal}
        >
          <div 
            className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
              <button 
                onClick={closeDetailsModal} 
                className="text-gray-400 hover:text-white text-3xl"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
              <div>
                <img 
                  src={selectedProduct.mainImage} 
                  alt={selectedProduct.name}
                  className="w-full h-80 object-contain bg-gray-700 rounded-lg" 
                />
                {selectedProduct.remainingImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {selectedProduct.remainingImages.map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        className="h-20 object-cover rounded" 
                        alt={`Additional view ${i + 1}`} 
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-gray-300">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">Description</h3>
                <p>{selectedProduct.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="font-semibold text-amber-400">Category</h3>
                    <p>{selectedProduct.category_name || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-400">Price</h3>
                    <p>PKR {selectedProduct.price}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-400">Created At</h3>
                    <p>{new Date(selectedProduct.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-400">Created By</h3>
                    <p>{selectedProduct.created_by?.get_full_name || selectedProduct.created_by?.email}</p>
                  </div>
                </div>
                
                <div className="flex mt-6 space-x-4">
                  {permissions.update_product && (
                    <button 
                      onClick={() => {
                        updateRecord(selectedProduct.id);
                        closeDetailsModal();
                      }}
                      className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                    >
                      Edit
                    </button>
                  )}
                  
                  {permissions.delete_product && (
                    <button 
                      onClick={() => deleteRecord(selectedProduct.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                  
                  <button 
                    onClick={closeDetailsModal}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white">LUXURY PRODUCTS</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-1"></div>
          </div>
          
          {permissions.create_product && (
            <button 
              onClick={() => router.push('/addproductspage')}
              className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transform hover:scale-105 transition-transform"
            >
              Add Product
            </button>
          )}
        </div>

        {/* Search and Stats Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-800/50 rounded-xl mb-8 gap-4">
          <div className="text-amber-400">
            Showing {filteredRecords.length} of {pagination.count} items
            {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <div className="relative w-full">
              <span className="absolute left-3 top-3 text-gray-400">
                🔍
              </span>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearch}
                placeholder="Search by name, ID or category..."
                className="w-full pl-10 py-3 bg-gray-700 rounded-full text-white focus:ring-amber-500 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <select 
                value={pagination.limit}
                onChange={handleLimitChange}
                className="bg-gray-700 text-white rounded-full px-3 py-2 focus:outline-none focus:ring-amber-500"
              >
                <option value="12">12 per page</option>
                <option value="24">24 per page</option>
                <option value="36">36 per page</option>
                <option value="48">48 per page</option>
              </select>
              
              <input
                type="number"
                value={pagination.offset}
                onChange={handleOffsetChange}
                min="0"
                max={pagination.count}
                placeholder="Offset"
                className="bg-gray-700 text-white rounded-full px-3 py-2 w-20 focus:outline-none focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, idx) => (
              <div key={idx} className="animate-pulse">
                <div className="bg-gray-800 rounded-xl aspect-square"></div>
                <div className="mt-3 h-5 bg-gray-800 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredRecords.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRecords.map(item => (
                  <div
                    key={item.id}
                    className="group relative rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-400/20 transition-all"
                  >
                    <div className="aspect-square bg-gray-800">
                      <img 
                        src={item.mainImage} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    
                    {item.remainingImages.length > 0 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        +{item.remainingImages.length}
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    <div className="p-4 absolute bottom-0 left-0 right-0">
                      <span className="text-xs text-amber-400 uppercase">{item.category_name}</span>
                      <h3 className="text-lg font-medium text-white line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-amber-400 font-bold">PKR {item.price}</span>
                        
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              openDetailsModal(item); 
                            }}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            aria-label="View details"
                          >
                            👁️
                          </button>

                          {permissions.update_product && (
                            <button
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                updateRecord(item.id); 
                              }}
                              className="p-2 bg-amber-600/90 rounded-lg hover:bg-amber-600 transition-colors"
                              aria-label="Edit product"
                            >
                              ✏️
                            </button>
                          )}

                          {permissions.delete_product && (
                            <button
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                deleteRecord(item.id); 
                              }}
                              className="p-2 bg-red-600/90 rounded-lg hover:bg-red-600 transition-colors"
                              aria-label="Delete product"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-300">
                <p>No products match your search.</p>
                {permissions.create_product && (
                  <button 
                    onClick={() => router.push('/addproductspage')}
                    className="mt-6 px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
                  >
                    Add Product
                  </button>
                )}
              </div>
            )}

            {/* Enhanced Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-4">
                <div className="text-gray-400 text-sm">
                  Page {pagination.currentPage} of {pagination.totalPages} • {pagination.count} total items
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.currentPage === 1}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    aria-label="First page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.previous}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    aria-label="Previous page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }
                      
                      return (
                        <button 
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-full text-sm transition-colors ${
                            pagination.currentPage === pageNum
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          }`}
                          aria-label={`Page ${pageNum}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.next}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    aria-label="Next page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    aria-label="Last page"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsCom;