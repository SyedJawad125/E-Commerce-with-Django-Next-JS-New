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
  const [categories, setCategories] = useState([]); // Add categories state
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

    const fetchCategories = async () => {
      try {
        const res = await AxiosInstance.get('/ecommerce/category'); // Adjust the endpoint as needed
        if (res?.data?.data) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    receiveData();
    fetchCategories();
  }, []);

  // ... rest of your existing code ...

  const handleCategoryClick = (categoryId) => {
    // Implement category filtering logic here
    const filtered = records.filter(record => record.category_id === categoryId);
    setFilteredRecords(filtered);
    setCurrentPage(1);
  };

  // Calculate slider height based on viewport height minus some padding
  const sliderHeight = 'calc(100vh - 2rem)';

  return (
    <div className="flex min-h-screen bg-gray-50 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Left Side - Categories Slider */}
      {categories.length > 0 && (
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
      )}

      {/* ... rest of your existing JSX ... */}

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