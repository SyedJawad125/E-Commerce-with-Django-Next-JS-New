// 'use client';
// import React, { useEffect, useState, useContext} from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const CategoryCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
//   const [records, setRecords] = useState([]);
//   const [data, setData] = useState([]);
//   const [flag, setFlag] = useState(false);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/category');
//         if (res && res.data && res.data.data && res.data.data.data) {
//           setRecords(res.data.data.data);
//           setData(res.data);
//           setFilteredRecords(res.data.data.data); // Set initial filtered records
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, [flag]);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/category?id=${id}`);
//       if (res) {
//         console.log('Delete Successfully');
//         setFlag(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateRecord = async (item) => {
//     router.push('/updatecategorypage', { state: { data: item } });
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
//       <h2 className="text-2xl font-bold mb-4">COLLECTIONS</h2>
//       {/* Conditionally render the Add Employee button based on user permissions */}
//       {permissions.create_category && (
//       <button
//         className='btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded'
//         onClick={() => router.push('/addcategorypage')}
//       >
//         Add Category
//       </button>
//       )}
       
//       <br />
//       <br />

//       {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}

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
//                     <h5 className="card-title text-lg font-bold">{item.name}</h5>
//                     <p className="card-text">Des: {item.description}</p>
//                     <div className="flex">

//                     {permissions.delete_category && (
//                       <button
//                         className="btn btn-danger bg-red-500 text-white py-2 px-4 rounded mr-2"
//                         onClick={() => deleteRecord(item.id)}
//                       >
//                         Delete
//                       </button>
//                     )}

//                     {permissions.update_category && (

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
//             <p>No categories found.</p>
//           )}
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         <ul className="flex list-none">
//           {[...Array(totalPages)].map((_, index) => (
//             <li key={index} className="mx-1">
//               <button
//                 className={`px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
//                 onClick={() => paginate(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CategoryCom;



'use client';
import React, { useEffect, useState, useContext } from 'react';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const CategoryCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const recordsPerPage = 8;

  useEffect(() => {
    const receiveData = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get('/ecommerce/category');
        if (res?.data?.data?.data) {
          setRecords(res.data.data.data);
          setData(res.data);
          setFilteredRecords(res.data.data.data);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      } finally {
        setIsLoading(false);
      }
    };

    receiveData();
  }, [flag]);

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/ecommerce/category?id=${id}`);
      if (res) {
        setFlag(prev => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecord = async (item) => {
    router.push('/updatecategorypage', { state: { data: item } });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = records.filter((record) => {
      const idMatch = record.id.toString() === value;
      const nameMatch = record.name.toLowerCase().includes(value);
      return idMatch || nameMatch;
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
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-light text-white mb-2">OUR COLLECTIONS</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          </div>
          
          {permissions.create_category && (
            <button
              className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105"
              onClick={() => router.push('/addcategorypage')}
            >
              + Add New Collection
            </button>
          )}
        </div>

        {/* Stats and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="text-amber-400 font-light mb-4 md:mb-0">
            {data?.data ? (
              <span className="text-white">Total: <span className="text-amber-400">{data.data.count}</span> Collections</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>
          
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-gray-400 transition duration-300"
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-800 rounded-lg h-64"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Category Grid */}
        {!isLoading && (
          <>
            {currentRecords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentRecords.map((item) => (
                  <div 
                    key={item.id} 
                    className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>
                    <img
                      src={`http://localhost:8000/${item.image}`}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                      <h3 className="text-xl font-light text-white mb-1">{item.name}</h3>
                      <p className="text-gray-300 text-sm font-light mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {permissions.update_category && (
                          <button
                            onClick={() => updateRecord(item)}
                            className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase rounded-full hover:bg-amber-700 transition-colors duration-300"
                          >
                            Edit
                          </button>
                        )}
                        {permissions.delete_category && (
                          <button
                            onClick={() => deleteRecord(item.id)}
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
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-white">No collections found</h3>
                <p className="mt-1 text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
              >
                &lt;
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index + 1 === currentPage 
                      ? 'bg-amber-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  } transition-colors`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 disabled:opacity-30 hover:bg-gray-800 transition-colors"
              >
                &gt;
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCom;