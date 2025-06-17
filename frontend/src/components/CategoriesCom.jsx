// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const CategoryCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [records, setRecords] = useState([]);
//   const [data, setData] = useState([]);
//   const [flag, setFlag] = useState(false);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const recordsPerPage = 8;

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         setIsLoading(true);
//         const res = await AxiosInstance.get('/ecommerce/category');
//         if (res?.data?.data?.data) {
//           setRecords(res.data.data.data);
//           setData(res.data);
//           setFilteredRecords(res.data.data.data);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     receiveData();
//   }, [flag]);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/category?id=${id}`);
//       if (res) {
//         setFlag(prev => !prev);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   const updateRecord = async (categoryid) => {
//     router.push(`/updatecategorypage?categoryid=${categoryid}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = records.filter((record) => {
//       const idMatch = record.id.toString() === value;
//       const nameMatch = record.name.toLowerCase().includes(value);
//       return idMatch || nameMatch;
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
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//           <div>
//             <h1 className="text-4xl font-light text-white mb-2">OUR COLLECTIONS</h1>
//             <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
//           </div>
          
//           {permissions.create_category && (
//             <button
//               className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105"
//               onClick={() => router.push('/addcategorypage')}
//             >
//               + Add New Collection
//             </button>
//           )}
//         </div>

//         {/* Stats and Search */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div className="text-amber-400 font-light mb-4 md:mb-0">
//             {data?.data ? (
//               <span className="text-white">Total: <span className="text-amber-400">{data.data.count}</span> Collections</span>
//             ) : (
//               <span>Loading...</span>
//             )}
//           </div>
          
//           <div className="relative w-full md:w-1/3">
//             <input
//               type="text"
//               placeholder="Search collections..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
//             />
//             <svg
//               className="absolute right-3 top-3 h-6 w-6 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               ></path>
//             </svg>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[...Array(4)].map((_, index) => (
//               <div key={index} className="animate-pulse">
//                 <div className="bg-gray-800 rounded-lg h-64"></div>
//                 <div className="mt-4 space-y-2">
//                   <div className="h-4 bg-gray-800 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-800 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Category Grid */}
//         {!isLoading && (
//           <>
//             {currentRecords.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {currentRecords.map((item) => (
//                   <div 
//                     key={item.id} 
//                     className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
//                     <img
//                       src={`http://localhost:8000/${item.image}`}
//                       className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
//                       alt={item.name}
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
//                       <h3 className="text-xl font-light text-white mb-1">{item.name}</h3>
//                       <p className="text-gray-300 text-sm font-light mb-4 line-clamp-2">{item.description}</p>
                      
//                       <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         {permissions.update_category && (
//                           <button
//                             onClick={() => updateRecord(item.id)}
//                             className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase rounded-full hover:bg-amber-700 transition-colors duration-300"
//                           >
//                             Edit
//                           </button>
//                         )}
//                         {permissions.delete_category && (
//                           <button
//                             onClick={() => deleteRecord(item.id)}
//                             className="px-4 py-2 bg-transparent border border-red-500 text-red-500 text-xs font-medium uppercase rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20">
//                 <svg
//                   className="mx-auto h-16 w-16 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1"
//                     d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 <h3 className="mt-4 text-lg font-medium text-white">No collections found</h3>
//                 <p className="mt-1 text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
//               </div>
//             )}
//           </>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-16">
//             <nav className="flex items-center space-x-2">
//               <button
//                 onClick={() => paginate(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
//               >
//                 &lt;
//               </button>
              
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => paginate(index + 1)}
//                   className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                     index + 1 === currentPage 
//                       ? 'bg-amber-600 text-white' 
//                       : 'text-gray-300 hover:bg-gray-800'
//                   } transition-colors`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
              
//               <button
//                 onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
//               >
//                 &gt;
//               </button>
//             </nav>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryCom;




// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const CategoryCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshKey, setRefreshKey] = useState(false);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     limit: 12,
//     offset: 0,
//     totalPages: 1,
//     count: 0,
//     next: false,
//     previous: false
//   });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setIsLoading(true);
//         const { currentPage, limit, offset } = pagination;
//         const res = await AxiosInstance.get(
//           `/ecommerce/category?page=${currentPage}&limit=${limit}&offset=${offset}`
//         );
        
//         const responseData = res?.data?.data;
//         const dataArr = responseData?.data || [];
        
//         setRecords(dataArr);
//         setFilteredRecords(dataArr);
//         setPagination(prev => ({
//           ...prev,
//           count: responseData?.count || 0,
//           totalPages: responseData?.total_pages || 1,
//           next: responseData?.next || false,
//           previous: responseData?.previous || false
//         }));
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCategories();
//   }, [refreshKey, pagination.currentPage, pagination.limit, pagination.offset]);

//   const deleteRecord = async (id) => {
//     try {
//       await AxiosInstance.delete(`/ecommerce/category?id=${id}`);
//       setRefreshKey(prev => !prev); // Refresh the list
//     } catch (error) {
//       console.error('Error deleting category:', error);
//     }
//   };
  
//   const updateRecord = (categoryid) => {
//     router.push(`/updatecategorypage?categoryid=${categoryid}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = records.filter((record) => {
//       const idMatch = record.id.toString() === value;
//       const nameMatch = record.name.toLowerCase().includes(value);
//       return idMatch || nameMatch;
//     });

//     setFilteredRecords(filtered);
//     setPagination(prev => ({ ...prev, currentPage: 1 }));
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination(prev => ({ ...prev, currentPage: newPage }));
//     }
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value);
//     setPagination(prev => ({ 
//       ...prev, 
//       limit: newLimit,
//       currentPage: 1,
//       offset: 0
//     }));
//   };

//   const handleOffsetChange = (e) => {
//     const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
//     setPagination(prev => ({ 
//       ...prev, 
//       offset: newOffset,
//       currentPage: 1
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//           <div>
//             <h1 className="text-4xl font-light text-white mb-2">OUR COLLECTIONS</h1>
//             <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
//           </div>
          
//           {permissions.create_category && (
//             <button
//               className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105"
//               onClick={() => router.push('/addcategorypage')}
//             >
//               + Add New Collection
//             </button>
//           )}
//         </div>

//         {/* Stats and Search */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div className="text-amber-400 font-light">
//             Showing {filteredRecords.length} of {pagination.count} collections
//             {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
//           </div>
          
//           <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search collections..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
//               />
//               <svg
//                 className="absolute left-3 top-3 h-6 w-6 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 ></path>
//               </svg>
//             </div>
            
//             <div className="flex gap-2 items-center">
//               <select 
//                 value={pagination.limit}
//                 onChange={handleLimitChange}
//                 className="bg-gray-800 text-white rounded-full px-3 py-2 border border-gray-700 focus:outline-none focus:ring-amber-500"
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
//                 className="bg-gray-800 text-white rounded-full px-3 py-2 w-20 border border-gray-700 focus:outline-none focus:ring-amber-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[...Array(pagination.limit)].map((_, index) => (
//               <div key={index} className="animate-pulse">
//                 <div className="bg-gray-800 rounded-lg aspect-square"></div>
//                 <div className="mt-4 space-y-2">
//                   <div className="h-4 bg-gray-800 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-800 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Category Grid */}
//         {!isLoading && (
//           <>
//             {filteredRecords.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {filteredRecords.map((item) => (
//                   <div 
//                     key={item.id} 
//                     className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
//                     <img
//                       src={`http://localhost:8000/${item.image}`}
//                       className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
//                       alt={item.name}
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
//                       <h3 className="text-xl font-light text-white mb-1">{item.name}</h3>
//                       <p className="text-gray-300 text-sm font-light mb-4 line-clamp-2">{item.description}</p>
                      
//                       <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         {permissions.update_category && (
//                           <button
//                             onClick={() => updateRecord(item.id)}
//                             className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase rounded-full hover:bg-amber-700 transition-colors duration-300"
//                           >
//                             Edit
//                           </button>
//                         )}
//                         {permissions.delete_category && (
//                           <button
//                             onClick={() => deleteRecord(item.id)}
//                             className="px-4 py-2 bg-transparent border border-red-500 text-red-500 text-xs font-medium uppercase rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20">
//                 <svg
//                   className="mx-auto h-16 w-16 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1"
//                     d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   ></path>
//                 </svg>
//                 <h3 className="mt-4 text-lg font-medium text-white">No collections found</h3>
//                 <p className="mt-1 text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
//               </div>
//             )}
//           </>
//         )}

//         {/* Enhanced Pagination */}
//         {pagination.totalPages > 1 && (
//           <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-4">
//             <div className="text-gray-400 text-sm">
//               Page {pagination.currentPage} of {pagination.totalPages} • Total {pagination.count} collections
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handlePageChange(1)}
//                 disabled={pagination.currentPage === 1}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="First page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={() => handlePageChange(pagination.currentPage - 1)}
//                 disabled={!pagination.previous}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="Previous page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.currentPage >= pagination.totalPages - 2) {
//                     pageNum = pagination.totalPages - 4 + i;
//                   } else {
//                     pageNum = pagination.currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => handlePageChange(pageNum)}
//                       className={`w-8 h-8 rounded-full text-sm transition-colors ${
//                         pagination.currentPage === pageNum
//                           ? 'bg-amber-600 text-white'
//                           : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
//                       }`}
//                       aria-label={`Page ${pageNum}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={() => handlePageChange(pagination.currentPage + 1)}
//                 disabled={!pagination.next}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="Next page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={() => handlePageChange(pagination.totalPages)}
//                 disabled={pagination.currentPage === pagination.totalPages}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="Last page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryCom;





// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const CategoryCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [refreshKey, setRefreshKey] = useState(false);
//   const [pagination, setPagination] = useState({
//     count: 0,
//     total_pages: 1,
//     current_page: 1,
//     limit: 12,
//     next: false,
//     previous: false
//   });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setIsLoading(true);
//         const { current_page, limit } = pagination;
        
//         const res = await AxiosInstance.get('/ecommerce/category', {
//           params: {
//             page: current_page,
//             limit: limit,
//             search: searchTerm
//           }
//         });

//         if (res?.data?.data) {
//           setCategories(res.data.data.categories || []);
//           setPagination({
//             count: res.data.data.count,
//             total_pages: res.data.data.total_pages,
//             current_page: res.data.data.current_page,
//             limit: res.data.data.limit,
//             next: res.data.data.next,
//             previous: res.data.data.previous
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//         toast.error('Failed to load categories', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCategories();
//   }, [pagination.current_page, pagination.limit, searchTerm, refreshKey]);

//   const deleteCategory = async (id) => {
//     try {
//       await AxiosInstance.delete(`/ecommerce/category?id=${id}`);
//       setRefreshKey(prev => !prev);
//       toast.success('Category deleted successfully', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } catch (error) {
//       toast.error('Error deleting category', {
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

//   const updateCategory = (categoryId) => {
//     router.push(`/updatecategorypage?categoryid=${categoryId}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setPagination(prev => ({ ...prev, current_page: 1 }));
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.total_pages) {
//       setPagination(prev => ({ ...prev, current_page: newPage }));
//     }
//   };

//   const handleLimitChange = (e) => {
//     const newLimit = parseInt(e.target.value);
//     setPagination(prev => ({ 
//       ...prev, 
//       limit: newLimit,
//       current_page: 1
//     }));
//   };

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
      
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
//           <div>
//             <h1 className="text-4xl font-light text-white mb-2">OUR COLLECTIONS</h1>
//             <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-1"></div>
//             <p className="text-gray-400 text-sm">Manage product categories</p>
//           </div>
//         </div>
        
//         {/* Stats and Search */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-800/50 p-4 rounded-xl gap-4">
//           {permissions.create_category && (
//             <button
//               className="px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
//               onClick={() => router.push('/addcategorypage')}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//               </svg>
//               Add Category
//             </button>
//           )}

//           <div className="text-amber-400 font-light">
//             Showing {categories.length} of {pagination.count} categories
//           </div>
          
//           <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
//             <div className="relative w-full">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search categories..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
//               />
//             </div>
            
//             <div className="flex gap-2 items-center">
//               <select 
//                 value={pagination.limit}
//                 onChange={handleLimitChange}
//                 className="bg-gray-700 text-white rounded-full px-3 py-2 border border-gray-600 focus:outline-none focus:ring-amber-500"
//               >
//                 <option value="12">12 per page</option>
//                 <option value="24">24 per page</option>
//                 <option value="36">36 per page</option>
//                 <option value="48">48 per page</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[...Array(pagination.limit)].map((_, index) => (
//               <div key={index} className="animate-pulse">
//                 <div className="bg-gray-800 rounded-lg aspect-square"></div>
//                 <div className="mt-4 space-y-2">
//                   <div className="h-4 bg-gray-800 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-800 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Categories List */}
//         {!isLoading && (
//           <>
//             {categories.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {categories.map((category) => (
//                   <div 
//                     key={category.id} 
//                     className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
//                     <img
//                       src={`http://localhost:8000/${category.image}`}
//                       className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
//                       alt={category.name}
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
//                       <h3 className="text-xl font-light text-white mb-1">{category.name}</h3>
//                       <p className="text-gray-300 text-sm font-light mb-4 line-clamp-2">{category.description}</p>
                      
//                       <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         {permissions.update_category && (
//                           <button
//                             onClick={() => updateCategory(category.id)}
//                             className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase rounded-full hover:bg-amber-700 transition-colors duration-300"
//                           >
//                             Edit
//                           </button>
//                         )}
//                         {permissions.delete_category && (
//                           <button
//                             onClick={() => deleteCategory(category.id)}
//                             className="px-4 py-2 bg-transparent border border-red-500 text-red-500 text-xs font-medium uppercase rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
//                           >
//                             Delete
//                           </button>
//                         )}
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
//                 <h3 className="text-2xl font-light text-white mb-2">No categories found</h3>
//                 <p className="text-gray-400 max-w-md mx-auto">
//                   {searchTerm ? "No categories match your search." : "There are no categories to display."}
//                 </p>
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//                   >
//                     Clear search
//                   </button>
//                 )}
//               </div>
//             )}
//           </>
//         )}

//         {/* Pagination */}
//         {pagination.total_pages > 1 && (
//           <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-4">
//             <div className="text-gray-400 text-sm">
//               Page {pagination.current_page} of {pagination.total_pages} • Total {pagination.count} categories
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handlePageChange(1)}
//                 disabled={pagination.current_page === 1}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="First page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={() => handlePageChange(pagination.current_page - 1)}
//                 disabled={!pagination.previous}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="Previous page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
//                   let pageNum;
//                   if (pagination.total_pages <= 5) {
//                     pageNum = i + 1;
//                   } else if (pagination.current_page <= 3) {
//                     pageNum = i + 1;
//                   } else if (pagination.current_page >= pagination.total_pages - 2) {
//                     pageNum = pagination.total_pages - 4 + i;
//                   } else {
//                     pageNum = pagination.current_page - 2 + i;
//                   }
                  
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => handlePageChange(pageNum)}
//                       className={`w-8 h-8 rounded-full text-sm transition-colors ${
//                         pagination.current_page === pageNum
//                           ? 'bg-amber-600 text-white'
//                           : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
//                       }`}
//                       aria-label={`Page ${pageNum}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={() => handlePageChange(pagination.current_page + 1)}
//                 disabled={!pagination.next}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="Next page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={() => handlePageChange(pagination.total_pages)}
//                 disabled={pagination.current_page === pagination.total_pages}
//                 className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
//                 aria-label="Last page"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                   <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryCom;






'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const CategoryCom = () => {
  const router = useRouter();
  const { permissions = {
    create_category: false,
    read_category: false,
    update_category: false,
    delete_category: false
  } } = useContext(AuthContext);
  
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    total_pages: 1,
    current_page: 1,
    limit: 12,
    next: false,
    previous: false
  });

  useEffect(() => {
    const fetchCategories = async () => {
      if (!permissions.read_category) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { current_page, limit } = pagination;
        
        const res = await AxiosInstance.get('/ecommerce/category', {
          params: {
            page: current_page,
            limit: limit,
            search: searchTerm
          }
        });

        if (res?.data?.data) {
          setCategories(res.data.data.categories || []);
          setPagination({
            count: res.data.data.count,
            total_pages: res.data.data.total_pages,
            current_page: res.data.data.current_page,
            limit: res.data.data.limit,
            next: res.data.data.next,
            previous: res.data.data.previous
          });
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        if (error.response?.status === 403) {
          toast.error('You do not have permission to view categories');
        } else {
          toast.error('Failed to load categories', {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [pagination.current_page, pagination.limit, searchTerm, refreshKey, permissions.read_category]);

  const deleteCategory = async (id) => {
    if (!permissions.delete_category) {
      toast.error('You do not have permission to delete categories');
      return;
    }
    
    try {
      await AxiosInstance.delete(`/ecommerce/category?id=${id}`);
      setRefreshKey(prev => !prev);
      toast.success('Category deleted successfully', {
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
      toast.error('Error deleting category', {
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

  const updateCategory = (categoryId) => {
    if (!permissions.update_category) {
      toast.error('You do not have permission to update categories');
      return;
    }
    router.push(`/updatecategorypage?categoryid=${categoryId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, current_page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setPagination(prev => ({ ...prev, current_page: newPage }));
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ 
      ...prev, 
      limit: newLimit,
      current_page: 1
    }));
  };

  if (!permissions.read_category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to view categories. Please contact your administrator.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    );
  }

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
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white mb-2">OUR COLLECTIONS</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-1"></div>
            <p className="text-gray-400 text-sm">Manage product categories</p>
          </div>
        </div>
        
        {/* Stats and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-800/50 p-4 rounded-xl gap-4">
          {permissions.create_category && (
            <button
              className="px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
              onClick={() => router.push('/addcategorypage')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Category
            </button>
          )}

          <div className="text-amber-400 font-light">
            Showing {categories.length} of {pagination.count} categories
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <select 
                value={pagination.limit}
                onChange={handleLimitChange}
                className="bg-gray-700 text-white rounded-full px-3 py-2 border border-gray-600 focus:outline-none focus:ring-amber-500"
              >
                <option value="12">12 per page</option>
                <option value="24">24 per page</option>
                <option value="36">36 per page</option>
                <option value="48">48 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(pagination.limit)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800 rounded-lg aspect-square"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories List */}
        {!isLoading && (
          <>
            {categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
                    <img
                      src={`http://localhost:8000/${category.image}`}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={category.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                      <h3 className="text-xl font-light text-white mb-1">{category.name}</h3>
                      <p className="text-gray-300 text-sm font-light mb-4 line-clamp-2">{category.description}</p>
                      
                      <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {permissions.update_category && (
                          <button
                            onClick={() => updateCategory(category.id)}
                            className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase rounded-full hover:bg-amber-700 transition-colors duration-300"
                          >
                            Edit
                          </button>
                        )}
                        {permissions.delete_category && (
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="px-4 py-2 bg-transparent border border-red-500 text-red-500 text-xs font-medium uppercase rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
                          >
                            Delete
                          </button>
                        )}
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
                <h3 className="text-2xl font-light text-white mb-2">No categories found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {searchTerm ? "No categories match your search." : "There are no categories to display."}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {pagination.total_pages > 1 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-4">
            <div className="text-gray-400 text-sm">
              Page {pagination.current_page} of {pagination.total_pages} • Total {pagination.count} categories
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.current_page === 1}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                aria-label="First page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={!pagination.previous}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                  let pageNum;
                  if (pagination.total_pages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.current_page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.current_page >= pagination.total_pages - 2) {
                    pageNum = pagination.total_pages - 4 + i;
                  } else {
                    pageNum = pagination.current_page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-full text-sm transition-colors ${
                        pagination.current_page === pageNum
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                      aria-label={`Page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={!pagination.next}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.total_pages)}
                disabled={pagination.current_page === pagination.total_pages}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
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
      </div>
    </div>
  );
};

export default CategoryCom;