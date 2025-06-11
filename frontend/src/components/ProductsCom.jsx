// 'use client';
// import React, { useEffect, useState, useContext} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';


// const ProductsCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/product');
//         if (res && res.data && res.data.data && res.data.data.data) {
//           setRecords(res.data.data.data);
//           setFilteredRecords(res.data.data.data); // Initialize filteredRecords with all records
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, []);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/product?id=${id}`);
//       if (res) {
//         setFilteredRecords(filteredRecords.filter(record => record.id !== id));
//         toast.success('Product deleted successfully!');
//       }
//     } catch (error) {
//       toast.error('Error deleting product!');
//     }
//   };

//   const updateRecord = async (item) => {
//     router.push(`/updateproductpage?id=${item.id}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = records.filter((record) =>{
//       const idMatch = record.id.toString() === value;
//       const nameMatch = record.name.toLowerCase().includes(value);
      
//       return idMatch || nameMatch;
//     });

//     setFilteredRecords(filtered);
//     setCurrentPage(1); // Reset to the first page
//   };

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Log permissions to debug
//   console.log('User permissions:', permissions);

//   return (
//     <div className="container mx-auto my-4 w-full bg-black ml-5">
//       <h2 className="text-2xl font-bold mb-4">PRODUCTS</h2>

//        {/* Conditionally render the Add Employee button based on user permissions */}
//        {permissions.create_product && (
//       <button
//         className='btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded'
//         onClick={() => router.push('/addproductspage')}
//       >
//         Add Product
//       </button>
//       )}

//       <br />
//       <br />

//       <p>Total: {filteredRecords.length}</p>

//       {/* Search Bar */}
//       <div className="flex justify-center mb-5">
//         <input
//           type="text"
//           placeholder="Search by ID or Name"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="container mt-5 mr-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {currentRecords.length > 0 ? (
//             currentRecords.map((item) => (
//               <div key={item.id} className="col mb-4">
//                 <div className="card">
//                   <img
//                     src={`http://localhost:8000/${item.image}`}
//                     className="card-image w-full h-48 object-cover"
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title text-lg font-bold">Name: {item.name}</h5>
//                     <p className="card-text">Description: {item.description}</p>
//                     <p className="card-text">Price: {item.price}</p>
//                     <p className="card-text">Category: {item.category_name}</p>
//                     <div className="flex">
//                     {permissions.delete_product && (
//                       <button
//                         className="btn btn-danger bg-red-500 text-white py-2 px-4 rounded mr-2"
//                         onClick={() => deleteRecord(item.id)}
//                       >
//                         Delete
//                       </button>
//                     )}

//                       {/* Conditionally render the Update and Delete buttons based on user permissions */}
//                     {permissions.update_product && (
//                       <button
//                         className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded"
//                         onClick={() => updateRecord(item)}
//                       >
//                         Update
//                       </button>
//                     )}

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products found</p>
//           )}
//         </div>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-6">
//         <nav>
//           <ul className="pagination flex">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
//                 <button
//                   onClick={() => paginate(i + 1)}
//                   className="page-link bg-gray-800 text-white py-2 px-3 rounded mx-1"
//                 >
//                   {i + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default ProductsCom;



// 'use client'
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';


// const ProductsCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const recordsPerPage = 8;

//   const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         setIsLoading(true);
//         const res = await AxiosInstance.get('/ecommerce/product');
//         if (res?.data?.data?.data) {
//           const processedProducts = res.data.data.data.map(product => ({
//             ...product,
//             mainImage: product.image_urls?.[0] ? `${baseURL}${product.image_urls[0]}` : '/default-product-image.jpg',
//             remainingImages: product.image_urls?.slice(1).map(url => `${baseURL}${url}`) || []
//           }));
//           setRecords(processedProducts);
//           setFilteredRecords(processedProducts);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//         toast.error('Failed to load products', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           theme: "dark",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     receiveData();
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
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/product?id=${id}`);
//       if (res) {
//         setFilteredRecords(prev => prev.filter(record => record.id !== id));
//         toast.success('Product removed successfully', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       toast.error('Error deleting product', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };

//   const updateRecord = async (productid) => {
//     router.push(`/updateproductpage?productid=${productid}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = records.filter((record) => {
//       const idMatch = record.id.toString() === value;
//       const nameMatch = record.name.toLowerCase().includes(value);
//       const categoryMatch = record.category_name?.toLowerCase().includes(value);
//       return idMatch || nameMatch || categoryMatch;
//     });

//     setFilteredRecords(filtered);
//     setCurrentPage(1);
//   };

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer 
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
      
//       {/* Product Details Modal */}
//       {showDetailsModal && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
//           <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
//                 <button 
//                   onClick={closeDetailsModal}
//                   className="text-gray-400 hover:text-white text-3xl"
//                 >
//                   &times;
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Product Images */}
//                 <div>
//                   <div className="mb-4 h-80 bg-gray-700 rounded-lg overflow-hidden">
//                     <img 
//                       src={selectedProduct.mainImage} 
//                       className="w-full h-full object-contain"
//                       alt={selectedProduct.name}
//                     />
//                   </div>
                  
//                   {selectedProduct.remainingImages.length > 0 && (
//                     <div className="grid grid-cols-4 gap-2">
//                       <div className="relative h-20 bg-gray-700 rounded overflow-hidden border-2 border-amber-500">
//                         <img 
//                           src={selectedProduct.mainImage} 
//                           className="w-full h-full object-cover"
//                           alt="Main"
//                         />
//                       </div>
//                       {selectedProduct.remainingImages.map((img, index) => (
//                         <div key={index} className="h-20 bg-gray-700 rounded overflow-hidden">
//                           <img 
//                             src={img} 
//                             className="w-full h-full object-cover"
//                             alt={`Product ${index + 2}`}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Product Details */}
//                 <div>
//                   <div className="mb-6">
//                     <h3 className="text-lg font-semibold text-amber-400 mb-2">Description</h3>
//                     <p className="text-gray-300">{selectedProduct.description}</p>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-4 mb-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-amber-400 mb-2">Category</h3>
//                       <p className="text-gray-300">{selectedProduct.category_name || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-amber-400 mb-2">Price</h3>
//                       <p className="text-gray-300">${selectedProduct.price}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-amber-400 mb-2">Created At</h3>
//                       <p className="text-gray-300">{new Date(selectedProduct.created_at).toLocaleDateString()}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-amber-400 mb-2">Created By</h3>
//                       <p className="text-gray-300">
//                         {selectedProduct.created_by?.get_full_name || selectedProduct.created_by?.email || 'N/A'}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex space-x-4">
//                     {permissions.update_product && (
//                       <button
//                         onClick={() => {
//                           updateRecord(selectedProduct.id);
//                           closeDetailsModal();
//                         }}
//                         className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
//                       >
//                         Edit Product
//                       </button>
//                     )}
//                     <button
//                       onClick={closeDetailsModal}
//                       className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//           <div>
//             <h1 className="text-4xl font-light text-white mb-2">LUXURY COLLECTION</h1>
//             <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-1"></div>
//             <p className="text-gray-400 text-sm">Curated selection of premium products</p>
//           </div>
          
//           {permissions.create_product && (
//             <button
//               className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
//               onClick={() => router.push('/addproductspage')}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//               </svg>
//               Add Product
//             </button>
//           )}
//         </div>

//         {/* Stats and Search */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-800/50 p-4 rounded-xl">
//           <div className="text-amber-400 font-light mb-4 md:mb-0">
//             <span className="text-white">Displaying <span className="text-amber-400 font-medium">{filteredRecords.length}</span> of <span className="text-amber-400 font-medium">{records.length}</span> luxury items</span>
//           </div>
          
//           <div className="relative w-full md:w-1/3">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search by name, ID or category..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
//             />
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[...Array(4)].map((_, index) => (
//               <div key={index} className="animate-pulse">
//                 <div className="bg-gray-800 rounded-lg h-80"></div>
//                 <div className="mt-4 space-y-3">
//                   <div className="h-5 bg-gray-800 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-800 rounded w-full"></div>
//                   <div className="flex justify-between mt-2">
//                     <div className="h-4 bg-gray-800 rounded w-1/4"></div>
//                     <div className="h-4 bg-gray-800 rounded w-1/3"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Products Grid */}
//         {!isLoading && (
//           <>
//             {currentRecords.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {currentRecords.map((item) => (
//                   <div 
//                     key={item.id} 
//                     className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-1"
//                   >
//                     {/* Product Image */}
//                     <div className="relative h-80 w-full">
//                       <img
//                         src={item.mainImage}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                         alt={item.name}
//                       />
//                       {/* Gallery indicator badge */}
//                       {item.remainingImages.length > 0 && (
//                         <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20">
//                           +{item.remainingImages.length} more
//                         </div>
//                       )}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
//                     </div>
                    
//                     {/* Product Info */}
//                     <div className="absolute inset-0 flex flex-col justify-end z-20 p-6">
//                       <div className="mb-2">
//                         <span className="text-xs uppercase text-amber-400 tracking-wider">{item.category_name}</span>
//                       </div>
//                       <h3 className="text-xl font-medium text-white mb-2">{item.name}</h3>
//                       <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
//                       <div className="flex items-center justify-between">
//                         <span className="text-amber-400 font-bold text-lg">${item.price}</span>
                        
//                         <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               openDetailsModal(item);
//                             }}
//                             className="p-2 bg-gray-700/90 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
//                             title="View Details"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                             </svg>
//                           </button>
//                           {permissions.update_product && (
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 updateRecord(item.id);
//                               }}
//                               className="p-2 bg-amber-600/90 text-white rounded-full hover:bg-amber-700 transition-colors duration-300"
//                               title="Edit"
//                             >
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                               </svg>
//                             </button>
//                           )}
//                           {permissions.delete_product && (
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 deleteRecord(item.id);
//                               }}
//                               className="p-2 bg-red-600/90 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
//                               title="Delete"
//                             >
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                               </svg>
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20">
//                 <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
//                   <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-light text-white mb-2">No products available</h3>
//                 <p className="text-gray-400 max-w-md mx-auto">We couldn't find any products matching your search. Try different keywords or add new products.</p>
//                 {permissions.create_product && (
//                   <button
//                     className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-300"
//                     onClick={() => router.push('/addproductspage')}
//                   >
//                     Add Your First Product
//                   </button>
//                 )}
//               </div>
//             )}
//           </>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-16">
//             <nav className="flex items-center space-x-1">
//               <button
//                 onClick={() => paginate(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
              
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => paginate(index + 1)}
//                   className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                     index + 1 === currentPage 
//                       ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' 
//                       : 'text-gray-300 hover:bg-gray-800'
//                   } transition-all duration-300`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
              
//               <button
//                 onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//                 className="p-2 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </nav>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsCom;




'use client'
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const ProductsCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key state
  const recordsPerPage = 8;

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Add event listener for product updates
  useEffect(() => {
    const handleProductUpdated = () => {
      setRefreshKey(prev => prev + 1); // Trigger refresh when product is updated
    };

    window.addEventListener('productUpdated', handleProductUpdated);
    
    return () => {
      window.removeEventListener('productUpdated', handleProductUpdated);
    };
  }, []);

  // Fetch products data
  useEffect(() => {
    const receiveData = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get('/ecommerce/product');
        if (res?.data?.data?.data) {
          const processedProducts = res.data.data.data.map(product => ({
            ...product,
            mainImage: product.image_urls?.[0] ? `${baseURL}${product.image_urls[0]}` : '/default-product-image.jpg',
            remainingImages: product.image_urls?.slice(1).map(url => `${baseURL}${url}`) || []
          }));
          setRecords(processedProducts);
          setFilteredRecords(processedProducts);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        toast.error('Failed to load products', {
          position: "top-center",
          autoClose: 2000,
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

    receiveData();
  }, [refreshKey]); // Add refreshKey as dependency

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/ecommerce/product?id=${id}`);
      if (res) {
        setFilteredRecords(prev => prev.filter(record => record.id !== id));
        toast.success('Product removed successfully', {
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
    } catch (error) {
      toast.error('Error deleting product', {
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

  const updateRecord = async (productid) => {
    router.push(`/updateproductpage?productid=${productid}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = records.filter((record) => {
      const idMatch = record.id.toString() === value;
      const nameMatch = record.name.toLowerCase().includes(value);
      const categoryMatch = record.category_name?.toLowerCase().includes(value);
      return idMatch || nameMatch || categoryMatch;
    });

    setFilteredRecords(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                <button 
                  onClick={closeDetailsModal}
                  className="text-gray-400 hover:text-white text-3xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                  <div className="mb-4 h-80 bg-gray-700 rounded-lg overflow-hidden">
                    <img 
                      src={selectedProduct.mainImage} 
                      className="w-full h-full object-contain"
                      alt={selectedProduct.name}
                    />
                  </div>
                  
                  {selectedProduct.remainingImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      <div className="relative h-20 bg-gray-700 rounded overflow-hidden border-2 border-amber-500">
                        <img 
                          src={selectedProduct.mainImage} 
                          className="w-full h-full object-cover"
                          alt="Main"
                        />
                      </div>
                      {selectedProduct.remainingImages.map((img, index) => (
                        <div key={index} className="h-20 bg-gray-700 rounded overflow-hidden">
                          <img 
                            src={img} 
                            className="w-full h-full object-cover"
                            alt={`Product ${index + 2}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Description</h3>
                    <p className="text-gray-300">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-2">Category</h3>
                      <p className="text-gray-300">{selectedProduct.category_name || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-2">Price</h3>
                      <p className="text-gray-300">${selectedProduct.price}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-2">Created At</h3>
                      <p className="text-gray-300">{new Date(selectedProduct.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-400 mb-2">Created By</h3>
                      <p className="text-gray-300">
                        {selectedProduct.created_by?.get_full_name || selectedProduct.created_by?.email || 'N/A'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    {permissions.update_product && (
                      <button
                        onClick={() => {
                          updateRecord(selectedProduct.id);
                          closeDetailsModal();
                        }}
                        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                      >
                        Edit Product
                      </button>
                    )}
                    <button
                      onClick={closeDetailsModal}
                      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white mb-2">LUXURY COLLECTION</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-1"></div>
            <p className="text-gray-400 text-sm">Curated selection of premium products</p>
          </div>
          
          {permissions.create_product && (
            <button
              className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
              onClick={() => router.push('/addproductspage')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Product
            </button>
          )}
        </div>

        {/* Stats and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-800/50 p-4 rounded-xl">
          <div className="text-amber-400 font-light mb-4 md:mb-0">
            <span className="text-white">Displaying <span className="text-amber-400 font-medium">{filteredRecords.length}</span> of <span className="text-amber-400 font-medium">{records.length}</span> luxury items</span>
          </div>
          
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, ID or category..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800 rounded-lg h-80"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-5 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="flex justify-between mt-2">
                    <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <>
            {currentRecords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentRecords.map((item) => (
                  <div 
                    key={item.id} 
                    className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-amber-500/20 hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="relative h-80 w-full">
                      <img
                        src={item.mainImage}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={item.name}
                      />
                      {/* Gallery indicator badge */}
                      {item.remainingImages.length > 0 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-20">
                          +{item.remainingImages.length} more
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="absolute inset-0 flex flex-col justify-end z-20 p-6">
                      <div className="mb-2">
                        <span className="text-xs uppercase text-amber-400 tracking-wider">{item.category_name}</span>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">{item.name}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-amber-400 font-bold text-lg">${item.price}</span>
                        
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetailsModal(item);
                            }}
                            className="p-2 bg-gray-700/90 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                            title="View Details"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {permissions.update_product && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateRecord(item.id);
                              }}
                              className="p-2 bg-amber-600/90 text-white rounded-full hover:bg-amber-700 transition-colors duration-300"
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {permissions.delete_product && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteRecord(item.id);
                              }}
                              className="p-2 bg-red-600/90 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-12 w-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2">No products available</h3>
                <p className="text-gray-400 max-w-md mx-auto">We couldn't find any products matching your search. Try different keywords or add new products.</p>
                {permissions.create_product && (
                  <button
                    className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-300"
                    onClick={() => router.push('/addproductspage')}
                  >
                    Add Your First Product
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index + 1 === currentPage 
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' 
                      : 'text-gray-300 hover:bg-gray-800'
                  } transition-all duration-300`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCom;