// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const EmployeeCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [records, setRecords] = useState([]);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/employee', {
//           params: {
//             limit: recordsPerPage,
//             offset: (currentPage - 1) * recordsPerPage,
//           },
//         });

//         if (res && res.data && res.data.data.data) {
//           setRecords(res.data.data.data);
//           setTotalPages(Math.ceil(res.data.count / recordsPerPage));
//           setData(res.data);
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, [currentPage]);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
//       if (res) {
//         toast.success('Employee deleted successfully!');
//         setCurrentPage(1);
//       }
//     } catch (error) {
//       toast.error('Error deleting employee!');
//     }
//   };

//   // const updateRecord = (empid) => {
//   //   router.push(`/updateemployeepage?empid=${empid}`);
//   // };
//   const updateRecord = (empid) => {
//     router.push(`/updateemployeepage?empid=${empid}`);
//   };

//   const DetailRecord = (employeeId) => {
//     router.push(`/epmloyeesdetail?EpmloyeeId=${employeeId}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setCurrentPage(1);
//   };

//   const filteredRecords = Array.isArray(records) ? records.filter((record) => {
//     const fullName = `${record.first_name?.toLowerCase() || ''} ${record.last_name?.toLowerCase() || ''}`;
//     const idMatch = record.id?.toString() === searchTerm;
//     const nameMatch = fullName.includes(searchTerm);
//     return idMatch || nameMatch;
//   }) : [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <ToastContainer 
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
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
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Employee Records</h1>
//             <p className="text-gray-300">Manage your organization's workforce</p>
//           </div>
          
//           {permissions.create_employee && (
//             <button
//               onClick={() => router.push('/addemployeepage')}
//               className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//               </svg>
//               Add Employee
//             </button>
//           )}
//         </div>

//         {/* Stats and Search */}
//         <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-2xl">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//               <div className="bg-indigo-600 p-3 rounded-lg mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Total Employees</p>
//                 <p className="text-white text-2xl font-bold">{data?.data?.count || 0}</p>
//               </div>
//             </div>

//             <div className="w-full md:w-1/3">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by ID or Name"
//                   value={searchTerm}
//                   onChange={handleSearch}
//                   className="block w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Employee Table */}
//         <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
//           {/* Table Header */}
//           <div className="grid grid-cols-12 bg-gray-900 p-4 text-gray-300 font-semibold uppercase text-sm tracking-wider">
//             <div className="col-span-1">S.No</div>
//             <div className="col-span-2">ID</div>
//             <div className="col-span-3">Name</div>
//             <div className="col-span-2">Position</div>
//             <div className="col-span-2">Department</div>
//             <div className="col-span-2 text-right">Actions</div>
//           </div>

//           {/* Table Body */}
//           {filteredRecords.length > 0 ? (
//             <ul className="divide-y divide-gray-700">
//               {filteredRecords.map((item, index) => (
//                 <li key={item.id} className="hover:bg-gray-750 transition-colors duration-200">
//                   <div className="grid grid-cols-12 items-center p-4">
//                     <div className="col-span-1 text-gray-300">{(currentPage - 1) * recordsPerPage + index + 1}</div>
//                     <div className="col-span-2 text-white font-medium">{item.id}</div>
//                     <div className="col-span-3 text-white">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                           {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-medium">{item.first_name} {item.last_name}</p>
//                           <p className="text-gray-400 text-sm">{item.email}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-span-2 text-gray-300">{item.position}</div>
//                     <div className="col-span-2">
//                       <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
//                         {item.department}
//                       </span>
//                     </div>
//                     <div className="col-span-2 flex justify-end space-x-2">
//                       <button
//                         onClick={() => DetailRecord(item.id)}
//                         className="p-2 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors"
//                         title="View Details"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       </button>
                      
//                       {permissions.update_employee && (
//                         <button
//                           onClick={() => updateRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-green-400 hover:bg-gray-600 hover:text-green-300 transition-colors"
//                           title="Edit"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                         </button>
//                       )}
                      
//                       {permissions.delete_employee && (
//                         <button
//                           onClick={() => deleteRecord(item.id)}
//                           className="p-2 rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors"
//                           title="Delete"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="p-8 text-center text-gray-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <p className="text-xl">No employees found</p>
//               <p className="mt-1">Try adjusting your search or add a new employee</p>
//             </div>
//           )}

//           {/* Pagination */}
//           {filteredRecords.length > 0 && (
//             <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700">
//               <div className="flex-1 flex justify-between sm:hidden">
//                 <button
//                   onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-400">
//                     Showing <span className="font-medium">{(currentPage - 1) * recordsPerPage + 1}</span> to{' '}
//                     <span className="font-medium">{Math.min(currentPage * recordsPerPage, data?.data?.count || 0)}</span> of{' '}
//                     <span className="font-medium">{data?.data?.count || 0}</span> results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                       disabled={currentPage === 1}
//                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
//                     >
//                       <span className="sr-only">Previous</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                       <button
//                         key={index + 1}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                           currentPage === index + 1
//                             ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
//                             : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
//                         }`}
//                       >
//                         {index + 1}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                       disabled={currentPage === totalPages}
//                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700"
//                     >
//                       <span className="sr-only">Next</span>
//                       <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCom;



'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const EmployeeCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginationData, setPaginationData] = useState({
    count: 0,
    total_pages: 1,
    current_page: 1,
    limit: 10,
    offset: 0,
    next: false,
    previous: false
  });

  const fetchEmployees = async (page = 1, limit = 10, offset = 0) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get('/ecommerce/employee', {
        params: {
          page,
          limit,
          offset,
        },
      });

      if (res && res.data && res.data.data) {
        setRecords(res.data.data.data);
        setPaginationData({
          count: res.data.data.count,
          total_pages: res.data.data.total_pages,
          current_page: res.data.data.current_page,
          limit: res.data.data.limit,
          offset: res.data.data.offset,
          next: res.data.data.next,
          previous: res.data.data.previous,
        });
      } else {
        console.error('Unexpected response structure:', res);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
      if (res) {
        toast.success('Employee deleted successfully!');
        fetchEmployees(paginationData.current_page, paginationData.limit, paginationData.offset);
      }
    } catch (error) {
      toast.error('Error deleting employee!');
    }
  };

  const updateRecord = (empid) => {
    router.push(`/updateemployeepage?empid=${empid}`);
  };

  const DetailRecord = (employeeId) => {
    router.push(`/epmloyeesdetail?EpmloyeeId=${employeeId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= paginationData.total_pages) {
      fetchEmployees(newPage, paginationData.limit, (newPage - 1) * paginationData.limit);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    fetchEmployees(1, newLimit, 0);
  };

  const filteredRecords = Array.isArray(records) ? records.filter((record) => {
    const fullName = `${record.first_name?.toLowerCase() || ''} ${record.last_name?.toLowerCase() || ''}`;
    const idMatch = record.id?.toString() === searchTerm;
    const nameMatch = fullName.includes(searchTerm);
    return idMatch || nameMatch;
  }) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Employee Records</h1>
            <p className="text-gray-300">Manage your organization's workforce</p>
          </div>
          
          {permissions.create_employee && (
            <button
              onClick={() => router.push('/addemployeepage')}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Add Employee
            </button>
          )}
        </div>

        {/* Stats and Search */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Employees</p>
                <p className="text-white text-2xl font-bold">{paginationData.count || 0}</p>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by ID or Name"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="block w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-900 p-4 text-gray-300 font-semibold uppercase text-sm tracking-wider">
            <div className="col-span-1">S.No</div>
            <div className="col-span-2">ID</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Position</div>
            <div className="col-span-2">Department</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-xl">Loading employees...</p>
            </div>
          ) : filteredRecords.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {filteredRecords.map((item, index) => (
                <li key={item.id} className="hover:bg-gray-750 transition-colors duration-200">
                  <div className="grid grid-cols-12 items-center p-4">
                    <div className="col-span-1 text-gray-300">{(paginationData.current_page - 1) * paginationData.limit + index + 1}</div>
                    <div className="col-span-2 text-white font-medium">{item.id}</div>
                    <div className="col-span-3 text-white">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {item.first_name?.charAt(0)}{item.last_name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{item.first_name} {item.last_name}</p>
                          <p className="text-gray-400 text-sm">{item.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-gray-300">{item.position}</div>
                    <div className="col-span-2">
                      <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                        {item.department}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      <button
                        onClick={() => DetailRecord(item.id)}
                        className="p-2 rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors"
                        title="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      {permissions.update_employee && (
                        <button
                          onClick={() => updateRecord(item.id)}
                          className="p-2 rounded-full bg-gray-700 text-green-400 hover:bg-gray-600 hover:text-green-300 transition-colors"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      
                      {permissions.delete_employee && (
                        <button
                          onClick={() => deleteRecord(item.id)}
                          className="p-2 rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl">No employees found</p>
              <p className="mt-1">Try adjusting your search or add a new employee</p>
            </div>
          )}

          {/* Pagination */}
          {filteredRecords.length > 0 && (
            <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(paginationData.current_page - 1)}
                  disabled={!paginationData.previous}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(paginationData.current_page + 1)}
                  disabled={!paginationData.next}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-400">
                    Showing <span className="font-medium">{(paginationData.current_page - 1) * paginationData.limit + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(paginationData.current_page * paginationData.limit, paginationData.count)}</span> of{' '}
                    <span className="font-medium">{paginationData.count}</span> results
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Items per page:</span>
                    <select 
                      value={paginationData.limit}
                      onChange={handleLimitChange}
                      className="border rounded p-1 bg-gray-700 text-white text-sm"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(paginationData.current_page - 1)}
                      disabled={!paginationData.previous}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {Array.from({ length: Math.min(5, paginationData.total_pages) }, (_, i) => {
                      let pageNum;
                      if (paginationData.total_pages <= 5) {
                        pageNum = i + 1;
                      } else if (paginationData.current_page <= 3) {
                        pageNum = i + 1;
                      } else if (paginationData.current_page >= paginationData.total_pages - 2) {
                        pageNum = paginationData.total_pages - 4 + i;
                      } else {
                        pageNum = paginationData.current_page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            paginationData.current_page === pageNum
                              ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    {paginationData.total_pages > 5 && paginationData.current_page < paginationData.total_pages - 2 && (
                      <>
                        <span className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400">
                          ...
                        </span>
                        <button
                          onClick={() => handlePageChange(paginationData.total_pages)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            paginationData.current_page === paginationData.total_pages
                              ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                          }`}
                        >
                          {paginationData.total_pages}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handlePageChange(paginationData.current_page + 1)}
                      disabled={!paginationData.next}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCom;