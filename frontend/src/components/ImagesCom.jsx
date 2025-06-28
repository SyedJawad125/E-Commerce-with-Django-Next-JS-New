// 'use client';
// import React, { useEffect, useState, useContext} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';
// import Image from 'next/image';


// const ImagesCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 12;

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/images/images');
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
//       const res = await AxiosInstance.delete(`/images/images?id=${id}`);
//       if (res) {
//         setFilteredRecords(filteredRecords.filter(record => record.id !== id));
//         toast.success('Product deleted successfully!');
//       }
//     } catch (error) {
//       toast.error('Error deleting product!');
//     }
//   };

//   const updateRecord = async (imgid) => {
//     router.push(`/updateimagespage?imgid=${imgid}`);
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
//       <h2 className="text-2xl font-bold mb-4">List Of Images</h2>

//        {/* Conditionally render the Add Employee button based on user permissions */}
//        {/* {permissions.create_product && ( */}
//       <button
//         className='btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
//         onClick={() => router.push('/addimagespage')}
//       >
//         Add Images
//       </button>
//       {/* )} */}

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
//                 <Image
//                     src={`http://localhost:8000${item.image}`}
//                     width={200}
//                     height={200}
//                     className="card-image w-full h-48 object-cover"
//                     alt="imagesCom"
//                     onError={(e) => {
//                       e.target.src = '/fallback-image.jpg'; // Add a fallback image
//                     }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title text-lg font-bold">Name: {item.name}</h5>
//                     <p className="card-text">Category: {item.category_name}</p>
          
//                     <div className="flex">
//                     {/* {permissions.delete_product && ( */}
//                       <button
//                         className="btn btn-danger bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600"
//                         onClick={() => deleteRecord(item.id)}
//                       >
//                         Delete
//                       </button>
//                     {/* )} */}

//                       {/* Conditionally render the Update and Delete buttons based on user permissions */}
//                     {/* {permissions.update_product && ( */}
//                       <button
//                         className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded  hover:bg-blue-600"
//                         onClick={() => updateRecord(item.id)}
//                       >
//                         Update
//                       </button>
//                     {/* )} */}

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

// export default ImagesCom;



'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';
import Image from 'next/image';

const ImagesCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [data, setData] = useState({
    images: [],
    count: 0,
    total_pages: 1,
    current_page: 1,
    limit: 12,
    offset: 0,
    next: false,
    previous: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [data.current_page, data.limit, data.offset]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance.get(
        `/images/images?page=${data.current_page}&limit=${data.limit}&offset=${data.offset}`
      );
      if (res && res.data && res.data.data) {
        setData({
          images: res.data.data.images || [],
          count: res.data.data.count || 0,
          total_pages: res.data.data.total_pages || 1,
          current_page: res.data.data.current_page || 1,
          limit: res.data.data.limit || 12,
          offset: res.data.data.offset || 0,
          next: res.data.data.next || false,
          previous: res.data.data.previous || false
        });
      } else {
        console.error('Unexpected response structure:', res);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Error fetching images');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/images/images?id=${id}`);
      if (res) {
        toast.success('Image deleted successfully!');
        fetchImages(); // Refresh the data
      }
    } catch (error) {
      toast.error('Error deleting image!');
    }
  };

  const updateRecord = async (imgid) => {
    router.push(`/updateimagespage?imgid=${imgid}`);
  };

  const handleSearch = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    try {
      const res = await AxiosInstance.get(`/images/images?search=${value}`);
      if (res && res.data && res.data.data) {
        setData(prev => ({
          ...prev,
          images: res.data.data.images || [],
          count: res.data.data.count || 0,
          current_page: 1 // Reset to first page when searching
        }));
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handlePageChange = (page) => {
    setData(prev => ({
      ...prev,
      current_page: page
    }));
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setData(prev => ({
      ...prev,
      limit: newLimit,
      current_page: 1 // Reset to first page when changing limit
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
  <ToastContainer position="top-right" autoClose={2000} />
  
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-4xl font-light text-white">LUXURY IMAGES</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mt-1"></div>
      </div>
      
      <button 
        onClick={() => router.push('/addimagespage')}
        className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transform hover:scale-105 transition-transform"
      >
        Add Images
      </button>
      <button 
        onClick={() => router.push('/ImagesCategoryPage')}
        className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transform hover:scale-105 transition-transform"
      >
        Images Category
      </button>
    </div>  
    

    {/* Search and Stats Section */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-800/50 rounded-xl mb-8 gap-4">
      <div className="text-amber-400">
        Showing {data.images.length} of {data.count} items
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
            placeholder="Search by name or category..."
            className="w-full pl-10 py-3 bg-gray-700 rounded-full text-white focus:ring-amber-500 focus:outline-none"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <select 
            value={data.limit}
            onChange={handleLimitChange}
            className="bg-gray-700 text-white rounded-full px-3 py-2 focus:outline-none focus:ring-amber-500"
          >
            <option value="12">12 per page</option>
            <option value="24">24 per page</option>
            <option value="36">36 per page</option>
            <option value="48">48 per page</option>
          </select>
        </div>
      </div>
    </div>

    {/* Images Grid */}
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
        {data.images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.images.map(item => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden hover:shadow-lg hover:shadow-amber-400/20 transition-all"
              >
                <div className="aspect-square bg-gray-800">
                  <Image
                    src={`http://localhost:8000${item.image}`}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/fallback-image.jpg';
                    }}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <div className="p-4 absolute bottom-0 left-0 right-0">
                  <span className="text-xs text-amber-400 uppercase">{item.category_name}</span>
                  <h3 className="text-lg font-medium text-white line-clamp-1">{item.name}</h3>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          updateRecord(item.id); 
                        }}
                        className="p-2 bg-amber-600/90 rounded-lg hover:bg-amber-600 transition-colors"
                        aria-label="Edit image"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          deleteRecord(item.id); 
                        }}
                        className="p-2 bg-red-600/90 rounded-lg hover:bg-red-600 transition-colors"
                        aria-label="Delete image"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-300">
            <p>No images match your search.</p>
            <button 
              onClick={() => router.push('/addimagespage')}
              className="mt-6 px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
            >
              Add Images
            </button>
          </div>
        )}

        {/* Enhanced Pagination */}
        {data.total_pages > 1 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-4">
            <div className="text-gray-400 text-sm">
              Page {data.current_page} of {data.total_pages} • {data.count} total items
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(1)}
                disabled={data.current_page === 1}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                aria-label="First page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={() => handlePageChange(data.current_page - 1)}
                disabled={!data.previous}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, data.total_pages) }, (_, i) => {
                  let pageNum;
                  if (data.total_pages <= 5) {
                    pageNum = i + 1;
                  } else if (data.current_page <= 3) {
                    pageNum = i + 1;
                  } else if (data.current_page >= data.total_pages - 2) {
                    pageNum = data.total_pages - 4 + i;
                  } else {
                    pageNum = data.current_page - 2 + i;
                  }
                  
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-full text-sm transition-colors ${
                        data.current_page === pageNum
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
                onClick={() => handlePageChange(data.current_page + 1)}
                disabled={!data.next}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={() => handlePageChange(data.total_pages)}
                disabled={data.current_page === data.total_pages}
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

export default ImagesCom;