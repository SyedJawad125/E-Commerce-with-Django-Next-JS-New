// 'use client';
// import React, { useEffect, useState, useContext} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';


// const SalesProductsCom = () => {
  
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
//         const res = await AxiosInstance.get('/ecommerce/salesproduct');
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
//       const res = await AxiosInstance.delete(`/ecommerce/salesproduct?id=${id}`);
//       if (res) {
//         setFilteredRecords(filteredRecords.filter(record => record.id !== id));
//         toast.success('Product deleted successfully!');
//       }
//     } catch (error) {
//       toast.error('Error deleting product!');
//     }
//   };

//   const updateRecord = async (item) => {
//     router.push(`/updatesalesproductpage?id=${item.id}`);
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
//       <h2 className="text-2xl font-bold mb-4">SALES</h2>

//        {/* Conditionally render the Add Employee button based on user permissions */}
//        {permissions.create_product && (
//       <button
//         className='btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded'
//         onClick={() => router.push('/addsalesproductpage')}
//       >
//         Add Sales Product
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
//                     <p className="card-text">Old Price: {item.original_price}</p>
//                     <p className="card-text">Discount: {item.discount_percent}</p>
//                     <p className="card-text">Price: {item.final_price}</p>
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

// export default SalesProductsCom;



'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const SalesProductsCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const recordsPerPage = 8;

  useEffect(() => {
    const receiveData = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get('/ecommerce/salesproduct');
        if (res?.data?.data?.data) {
          setRecords(res.data.data.data);
          setFilteredRecords(res.data.data.data);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    receiveData();
  }, []);

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/ecommerce/salesproduct?id=${id}`);
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

  const updateRecord = async (saleproductid) => {
    router.push(`/updatesalesproductpage?saleproductid=${saleproductid}`);
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
   <div className="flex min-h-screen bg-gray-50 bg-gradient-to-b from-gray-900 to-gray-800">
  {/* Left Side - Categories Slider */}
  <div className="w-[10%] bg-gray-800 shadow-lg ml-4 relative overflow-hidden" style={{ height: sliderHeight }}>
    <div className="absolute top-0 left-0 right-0 animate-scrollUp">
      {/* Combined list for smooth scroll */}
      {[...categories, ...categories].map((category, index) => (
        <div
          key={`${category.id}-${index}`}
          onClick={() => handleCategoryClick(category.id)}
          className="shadow-md cursor-pointer p-2 hover:bg-gray-700 transition duration-300"
        >
          <img
            src={`http://localhost:8000/${category.image}`}
            alt={category.name}
            className="w-full h-28 object-cover rounded"
          />
        </div>
      ))}
    </div>

    {/* Top and bottom gradient masks */}
    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-800 to-transparent z-10 pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-800 to-transparent z-10 pointer-events-none" />
  </div>

  {/* Right Side - Products */}
  <div className="w-[85%] py-12 px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-4xl font-light text-white mb-2">EXCLUSIVE OFFERS</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
        </div>
        
        {permissions.create_product && (
          <button
            className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105"
            onClick={() => router.push('/addsalesproductpage')}
          >
            + Add Sale Product
          </button>
        )}
      </div>

      {/* Stats and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="text-amber-400 font-light mb-4 md:mb-0">
          <span className="text-white">Showing <span className="text-amber-400">{filteredRecords.length}</span> exclusive offers</span>
        </div>
        
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search sale products..."
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
              <div className="bg-gray-800 rounded-lg h-80"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
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
                  className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20"
                >
                  {/* Sale Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.discount_percent}% OFF
                  </div>
                  
                  {/* Image with Text Overlay */}
                  <div className="relative h-80 w-full">
                    <img
                      src={`http://localhost:8000/${item.image}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                      <h3 className="text-xl font-light text-white mb-1">{item.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-400 font-medium">${item.final_price}</span>
                        <span className="text-gray-400 line-through text-sm">${item.original_price}</span>
                      </div>
                      <p className="text-gray-300 text-xs font-light mt-1 line-clamp-2">{item.description}</p>
                      <span className="text-xs text-gray-400 uppercase block mt-1">{item.category_name}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <div className="flex space-x-3">
                      {permissions.update_product && (
                        <button
                          onClick={() => updateRecord(item.id)}
                          className="px-4 py-2 bg-amber-600 text-white text-xs font-medium uppercase rounded-full hover:bg-amber-700 transition-colors duration-300"
                        >
                          Edit
                        </button>
                      )}
                      {permissions.delete_product && (
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
              <h3 className="mt-4 text-lg font-medium text-white">No sale products found</h3>
              <p className="mt-1 text-gray-400">Try adjusting your search or add new sale products</p>
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

  {/* Animation */}
  <style jsx>{`
    @keyframes scrollUp {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-${categories.length * 120}px);
      }
    }
    .animate-scrollUp {
      animation: scrollUp ${categories.length * 5}s linear infinite;
    }
  `}</style>
</div>

  );
};

export default SalesProductsCom;