// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';

// const OrdersCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const ordersPerPage = 8;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setIsLoading(true);
//         const res = await AxiosInstance.get('/ecommerce/order');
//         if (res?.data?.data?.data) {
//           setOrders(res.data.data.data);
//           setFilteredOrders(res.data.data.data);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//         toast.error('Failed to load orders', {
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

//     fetchOrders();
//   }, []);

//   const deleteOrder = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/order?id=${id}`);
//       if (res) {
//         setFilteredOrders(prev => prev.filter(order => order.id !== id));
//         toast.success('Order deleted successfully', {
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
//       toast.error('Error deleting order', {
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

//   const updateOrder = (orderId) => {
//     router.push(`/updateorderpage?orderid=${orderId}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = orders.filter((order) => {
//       const idMatch = order.id.toString() === value;
//       const nameMatch = order.customer_name?.toLowerCase().includes(value);
//       const emailMatch = order.customer_email?.toLowerCase().includes(value);
//       const phoneMatch = order.customer_phone?.toLowerCase().includes(value);
//       return idMatch || nameMatch || emailMatch || phoneMatch;
//     });

//     setFilteredOrders(filtered);
//     setCurrentPage(1);
//   };

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer theme="dark" />

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Orders Management</h1>
//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//             <svg
//               className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Orders List */}
//         {!isLoading && (
//           <>
//             {currentOrders.length > 0 ? (
//               <div className="space-y-6">
//                 {currentOrders.map((order) => (
//                   <div key={order.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//                     <div className="p-6">
//                       <div className="flex flex-col md:flex-row justify-between mb-4">
//                         <div>
//                           <h2 className="text-xl font-semibold text-white">Order #{order.id}</h2>
//                           <p className="text-gray-400 text-sm">
//                             Placed on: {formatDate(order.created_at)}
//                           </p>
//                         </div>
//                         <div className="mt-4 md:mt-0">
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                             order.status === 'pending' ? 'bg-yellow-500 text-black' :
//                             order.status === 'completed' ? 'bg-green-500 text-white' :
//                             'bg-gray-500 text-white'
//                           }`}>
//                             {order.status}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Customer Details</h3>
//                           <p className="text-gray-300">Name: {order.customer_name || 'N/A'}</p>
//                           <p className="text-gray-300">Email: {order.customer_email || 'N/A'}</p>
//                           <p className="text-gray-300">Phone: {order.customer_phone || 'N/A'}</p>
//                         </div>

//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Delivery Info</h3>
//                           <p className="text-gray-300">Address: {order.delivery_address || 'N/A'}</p>
//                           <p className="text-gray-300">City: {order.city || 'N/A'}</p>
//                           <p className="text-gray-300">Delivery Date: {formatDate(order.delivery_date)}</p>
//                         </div>

//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Payment Info</h3>
//                           <p className="text-gray-300">Method: {order.payment_method || 'N/A'}</p>
//                           <p className="text-gray-300">
//                             Status: {order.payment_status ? (
//                               <span className="text-green-400">Paid</span>
//                             ) : (
//                               <span className="text-red-400">Unpaid</span>
//                             )}
//                           </p>
//                           <p className="text-gray-300">Total: ${order.bill || '0'}</p>
//                         </div>
//                       </div>

//                       <div className="mb-6">
//                         <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
//                             <thead className="bg-gray-600">
//                               <tr>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unit Price</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-600">
//                               {order.order_details?.map((item) => (
//                                 <tr key={item.id}>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     Product #{item.sales_product}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     ${item.unit_price}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.quantity}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     ${item.total_price}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>

//                       <div className="flex justify-end space-x-3">
//                         {permissions.update_order && (
//                           <button
//                             onClick={() => updateOrder(order.id)}
//                             className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//                           >
//                             Edit Order
//                           </button>
//                         )}
//                         {permissions.delete_order && (
//                           <button
//                             onClick={() => deleteOrder(order.id)}
//                             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                           >
//                             Delete Order
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-white text-center text-lg py-10">No orders found.</p>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center mt-10 space-x-2">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => paginate(i + 1)}
//                     className={`px-4 py-2 rounded-full ${
//                       currentPage === i + 1
//                         ? 'bg-amber-500 text-black font-semibold'
//                         : 'bg-gray-700 text-white hover:bg-amber-600'
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersCom;



// 'use client';
// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';
// import { useReactToPrint } from 'react-to-print';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const OrdersCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const ordersPerPage = 8;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setIsLoading(true);
//         const res = await AxiosInstance.get('/ecommerce/order');
//         if (res?.data?.data?.data) {
//           setOrders(res.data.data.data);
//           setFilteredOrders(res.data.data.data);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//         toast.error('Failed to load orders', {
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

//     fetchOrders();
//   }, []);

//   const deleteOrder = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/order?id=${id}`);
//       if (res) {
//         setFilteredOrders(prev => prev.filter(order => order.order_id !== id));
//         toast.success('Order deleted successfully', {
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
//       toast.error('Error deleting order', {
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

//   const updateOrder = (orderid) => {
//     router.push(`/updateorderpage?orderid=${orderid}`);
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = orders.filter((order) => {
//       const idMatch = order.order_id.toString() === value;
//       const nameMatch = order.customer_info?.name?.toLowerCase().includes(value);
//       const emailMatch = order.customer_info?.email?.toLowerCase().includes(value);
//       const phoneMatch = order.customer_info?.phone?.toLowerCase().includes(value);
//       return idMatch || nameMatch || emailMatch || phoneMatch;
//     });

//     setFilteredOrders(filtered);
//     setCurrentPage(1);
//   };

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };


//   const pdfRefs = useRef({});

//   // Function to handle PDF download
//   const handleDownloadPdf = async (orderId) => {
//     const element = pdfRefs.current[orderId];
//     if (!element) return;

//     const canvas = await html2canvas(element, {
//       scale: 2, // Higher quality
//       useCORS: true,
//       allowTaint: true,
//     });

//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`order_${orderId}.pdf`);
//   };

//   // Function to handle print
//   const handlePrint = useReactToPrint({
//     content: () => pdfRefs.current[orderId],
//   });

//   return (
//   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//     <ToastContainer theme="dark" />

//     <div className="max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Orders Management</h1>
//         <div className="relative w-full md:w-64">
//           <input
//             type="text"
//             placeholder="Search orders..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
//           />
//           <svg
//             className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
//         <button
//           className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
//           onClick={() => router.push('/addorderpage')}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//           </svg>
//           Add Order
//         </button>
//       </div>

//       {/* Orders List */}
//       {!isLoading && (
//         <>
//           {currentOrders.length > 0 ? (
//             <div className="space-y-6">
//               {currentOrders.map((order) => (
//                 <div key={order.order_id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//                   {/* Hidden div for PDF content */}
//                   <div style={{ position: 'absolute', left: '-9999px' }}>
//                     <div 
//                       ref={(el) => (pdfRefs.current[order.order_id] = el)}
//                       className="bg-white p-6 text-black"
//                       style={{ width: '210mm', minHeight: '297mm' }}
//                     >
//                       <h1 className="text-2xl font-bold mb-4">Order #{order.order_id}</h1>
                      
//                       <div className="mb-6">
//                         <h2 className="text-xl font-semibold border-b pb-2 mb-2">Customer Details</h2>
//                         <p>Name: {order.customer_info?.name || 'N/A'}</p>
//                         <p>Email: {order.customer_info?.email || 'N/A'}</p>
//                         <p>Phone: {order.customer_info?.phone || 'N/A'}</p>
//                       </div>

//                       <div className="mb-6">
//                         <h2 className="text-xl font-semibold border-b pb-2 mb-2">Delivery Info</h2>
//                         <p>Address: {order.delivery_info?.address || 'N/A'}</p>
//                         <p>City: {order.delivery_info?.city || 'N/A'}</p>
//                         <p>Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
//                       </div>

//                       <div className="mb-6">
//                         <h2 className="text-xl font-semibold border-b pb-2 mb-2">Payment Info</h2>
//                         <p>Method: {order.payment_method || 'N/A'}</p>
//                         <p>Total: ${order.order_summary?.total || '0'}</p>
//                         <p>Status: {order.status}</p>
//                       </div>

//                       <div className="mb-6">
//                         <h2 className="text-xl font-semibold border-b pb-2 mb-2">Order Items</h2>
//                         <table className="w-full border-collapse">
//                           <thead>
//                             <tr className="bg-gray-200">
//                               <th className="border p-2">ID</th>
//                               <th className="border p-2">Product</th>
//                               <th className="border p-2">Type</th>
//                               <th className="border p-2">Unit Price</th>
//                               <th className="border p-2">Quantity</th>
//                               <th className="border p-2">Total</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {order.order_summary?.items?.map((item, index) => (
//                               <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                                 <td className="border p-2">{item.product_id}</td>
//                                 <td className="border p-2">{item.product_name}</td>
//                                 <td className="border p-2">{item.product_type}</td>
//                                 <td className="border p-2">PKR {item.unit_price}</td>
//                                 <td className="border p-2">{item.quantity}</td>
//                                 <td className="border p-2">PKR {item.total_price}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       <div className="mt-8 text-right">
//                         <p>Generated on: {new Date().toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Visible order card */}
//                   <div className="p-6">
//                     <div className="flex flex-col md:flex-row justify-between mb-4">
//                       <div>
//                         <h2 className="text-xl font-semibold text-white">Order #{order.order_id}</h2>
//                       </div>
//                       <div className="mt-4 md:mt-0">
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           order.status === 'pending' ? 'bg-yellow-500 text-black' :
//                           order.status === 'completed' ? 'bg-green-500 text-white' :
//                           'bg-gray-500 text-white'
//                         }`}>
//                           {order.status}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//                       <div className="bg-gray-700 p-4 rounded-lg">
//                         <h3 className="text-lg font-medium text-white mb-2">Customer Details</h3>
//                         <p className="text-gray-300">Name: {order.customer_info?.name || 'N/A'}</p>
//                         <p className="text-gray-300">Email: {order.customer_info?.email || 'N/A'}</p>
//                         <p className="text-gray-300">Phone: {order.customer_info?.phone || 'N/A'}</p>
//                       </div>

//                       <div className="bg-gray-700 p-4 rounded-lg">
//                         <h3 className="text-lg font-medium text-white mb-2">Delivery Info</h3>
//                         <p className="text-gray-300">Address: {order.delivery_info?.address || 'N/A'}</p>
//                         <p className="text-gray-300">City: {order.delivery_info?.city || 'N/A'}</p>
//                         <p className="text-gray-300">Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
//                       </div>

//                       <div className="bg-gray-700 p-4 rounded-lg">
//                         <h3 className="text-lg font-medium text-white mb-2">Payment Info</h3>
//                         <p className="text-gray-300">Method: {order.payment_method || 'N/A'}</p>
//                         <p className="text-gray-300">Total: ${order.order_summary?.total || '0'}</p>
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
//                       <div className="overflow-x-auto">
//                         <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
//                           <thead className="bg-gray-600">
//                             <tr>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unit Price</th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
//                               <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Discounted</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-gray-600">
//                             {order.order_summary?.items?.map((item, index) => (
//                               <tr key={index}>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                   {item.product_id}
//                                 </td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                   {item.product_name}
//                                 </td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                   {item.product_type}
//                                 </td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                   PKR {item.unit_price}
//                                 </td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                   {item.quantity}
//                                 </td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                   PKR {item.total_price}
//                                 </td>
//                                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                   {item.is_discounted ? 'Yes' : 'No'}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>

//                     <div className="flex justify-end space-x-3">
//                       <button
//                         onClick={() => handleDownloadPdf(order.order_id)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                         </svg>
//                         Download PDF
//                       </button>
//                       <button
//                         onClick={() => updateOrder(order.order_id)}
//                         className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//                       >
//                         Edit Order
//                       </button>
//                       <button
//                         onClick={() => deleteOrder(order.order_id)}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                       >
//                         Delete Order
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-white text-center text-lg py-10">No orders found.</p>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-10 space-x-2">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => paginate(i + 1)}
//                   className={`px-4 py-2 rounded-full ${
//                     currentPage === i + 1
//                       ? 'bg-amber-500 text-black font-semibold'
//                       : 'bg-gray-700 text-white hover:bg-amber-600'
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   </div>

//   );
// };

// export default OrdersCom;





// 'use client';
// import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';
// import { useReactToPrint } from 'react-to-print';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const OrdersCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]); // This will hold the orders for the current page
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10); // Corresponds to backend's 'limit'
//   const [totalOrdersCount, setTotalOrdersCount] = useState(0); // Total count from backend
//   const [totalPages, setTotalPages] = useState(1); // Total pages from backend
//   const [isLoading, setIsLoading] = useState(true);

//   // Memoize fetchOrders to prevent unnecessary re-renders and enable better control with useCallback
//   const fetchOrders = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const offset = (currentPage - 1) * limit; // Calculate offset based on current page and limit
//       const res = await AxiosInstance.get('/ecommerce/order', {
//         params: {
//           page: currentPage,
//           limit: limit,
//           offset: offset,
//           search: searchTerm // Pass search term to backend for filtering
//         }
//       });
//       if (res?.data?.data) {
//         const { orders, count, total_pages, current_page, limit: resLimit, offset: resOffset } = res.data.data;
//         setOrders(orders || []); // Set orders for the current page
//         setTotalOrdersCount(count);
//         setTotalPages(total_pages);
//         setCurrentPage(current_page);
//         setLimit(resLimit); // Update limit based on backend response if needed
//       }
//     } catch (error) {
//       console.error('Error occurred:', error);
//       toast.error('Failed to load orders', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentPage, limit, searchTerm]); // Dependencies for useCallback

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]); // Re-run when fetchOrders changes

//   const deleteOrder = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/order?id=${id}`);
//       if (res) {
//         toast.success('Order deleted successfully', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//         // After deletion, re-fetch orders to get updated pagination data
//         fetchOrders(); 
//       }
//     } catch (error) {
//       toast.error('Error deleting order', {
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

//   const updateOrder = (orderid) => {
//     router.push(`/updateorderpage?orderid=${orderid}`);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//     setCurrentPage(1); // Reset to first page on new search
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const pdfRefs = useRef({});

//   // Function to handle PDF download
//   const handleDownloadPdf = async (orderId) => {
//     const element = pdfRefs.current[orderId];
//     if (!element) return;

//     const canvas = await html2canvas(element, {
//       scale: 2, // Higher quality
//       useCORS: true,
//       allowTaint: true,
//     });

//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`order_${orderId}.pdf`);
//   };

//   // Function to handle print
//   const handlePrint = useReactToPrint({
//     content: () => pdfRefs.current[orderId],
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer theme="dark" />

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Orders Management</h1>
//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//             <svg
//               className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//           <button
//             className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
//             onClick={() => router.push('/addorderpage')}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//             Add Order
//           </button>
//         </div>

//         {/* Orders List */}
//         {!isLoading && (
//           <>
//             {orders.length > 0 ? (
//               <div className="space-y-6">
//                 {orders.map((order) => (
//                   <div key={order.order_id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//                     {/* Hidden div for PDF content */}
//                     <div style={{ position: 'absolute', left: '-9999px' }}>
//                       <div
//                         ref={(el) => (pdfRefs.current[order.order_id] = el)}
//                         className="bg-white p-6 text-black"
//                         style={{ width: '210mm', minHeight: '297mm' }}
//                       >
//                         <h1 className="text-2xl font-bold mb-4">Order #{order.order_id}</h1>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Customer Details</h2>
//                           <p>Name: {order.customer_info?.name || 'N/A'}</p>
//                           <p>Email: {order.customer_info?.email || 'N/A'}</p>
//                           <p>Phone: {order.customer_info?.phone || 'N/A'}</p>
//                         </div>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Delivery Info</h2>
//                           <p>Address: {order.delivery_info?.address || 'N/A'}</p>
//                           <p>City: {order.delivery_info?.city || 'N/A'}</p>
//                           <p>Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
//                         </div>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Payment Info</h2>
//                           <p>Method: {order.payment_method || 'N/A'}</p>
//                           <p>Total: ${order.order_summary?.total || '0'}</p>
//                           <p>Status: {order.status}</p>
//                         </div>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Order Items</h2>
//                           <table className="w-full border-collapse">
//                             <thead>
//                               <tr className="bg-gray-200">
//                                 <th className="border p-2">ID</th>
//                                 <th className="border p-2">Product</th>
//                                 <th className="border p-2">Type</th>
//                                 <th className="border p-2">Unit Price</th>
//                                 <th className="border p-2">Quantity</th>
//                                 <th className="border p-2">Total</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {order.order_summary?.items?.map((item, index) => (
//                                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                                   <td className="border p-2">{item.product_id}</td>
//                                   <td className="border p-2">{item.product_name}</td>
//                                   <td className="border p-2">{item.product_type}</td>
//                                   <td className="border p-2">PKR {item.unit_price}</td>
//                                   <td className="border p-2">{item.quantity}</td>
//                                   <td className="border p-2">PKR {item.total_price}</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>

//                         <div className="mt-8 text-right">
//                           <p>Generated on: {new Date().toLocaleDateString()}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Visible order card */}
//                     <div className="p-6">
//                       <div className="flex flex-col md:flex-row justify-between mb-4">
//                         <div>
//                           <h2 className="text-xl font-semibold text-white">Order #{order.order_id}</h2>
//                         </div>
//                         <div className="mt-4 md:mt-0">
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                             order.status === 'pending' ? 'bg-yellow-500 text-black' :
//                             order.status === 'completed' ? 'bg-green-500 text-white' :
//                             'bg-gray-500 text-white'
//                           }`}>
//                             {order.status}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Customer Details</h3>
//                           <p className="text-gray-300">Name: {order.customer_info?.name || 'N/A'}</p>
//                           <p className="text-gray-300">Email: {order.customer_info?.email || 'N/A'}</p>
//                           <p className="text-gray-300">Phone: {order.customer_info?.phone || 'N/A'}</p>
//                         </div>

//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Delivery Info</h3>
//                           <p className="text-gray-300">Address: {order.delivery_info?.address || 'N/A'}</p>
//                           <p className="text-gray-300">City: {order.delivery_info?.city || 'N/A'}</p>
//                           <p className="text-gray-300">Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
//                         </div>

//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Payment Info</h3>
//                           <p className="text-gray-300">Method: {order.payment_method || 'N/A'}</p>
//                           <p className="text-gray-300">Total: ${order.order_summary?.total || '0'}</p>
//                           <p className="text-gray-300">Status: {order.status}</p>
//                         </div>
//                       </div>

//                       <div className="mb-6">
//                         <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
//                             <thead className="bg-gray-600">
//                               <tr>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unit Price</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Discounted</th>
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-600">
//                               {order.order_summary?.items?.map((item, index) => (
//                                 <tr key={index}>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.product_id}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.product_name}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.product_type}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     PKR {item.unit_price}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.quantity}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     PKR {item.total_price}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.is_discounted ? 'Yes' : 'No'}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>

//                       <div className="flex justify-end space-x-3">
//                         <button
//                           onClick={() => handleDownloadPdf(order.order_id)}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                           </svg>
//                           Download PDF
//                         </button>
//                         <button
//                           onClick={() => updateOrder(order.order_id)}
//                           className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//                         >
//                           Edit Order
//                         </button>
//                         <button
//                           onClick={() => deleteOrder(order.order_id)}
//                           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                         >
//                           Delete Order
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-white text-center text-lg py-10">No orders found.</p>
//             )}

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="flex justify-center mt-10 space-x-2">
//                 <button
//                   onClick={() => paginate(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-4 py-2 rounded-full ${
//                     currentPage === 1
//                       ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                       : 'bg-gray-700 text-white hover:bg-amber-600'
//                   }`}
//                 >
//                   Previous
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => paginate(i + 1)}
//                     className={`px-4 py-2 rounded-full ${
//                       currentPage === i + 1
//                         ? 'bg-amber-500 text-black font-semibold'
//                         : 'bg-gray-700 text-white hover:bg-amber-600'
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => paginate(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`px-4 py-2 rounded-full ${
//                     currentPage === totalPages
//                       ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                       : 'bg-gray-700 text-white hover:bg-amber-600'
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//         {isLoading && (
//           <div className="text-white text-center text-lg py-10">Loading orders...</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersCom;




// 'use client';
// import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/components/AuthContext';
// import { useReactToPrint } from 'react-to-print';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { debounce } from 'lodash';

// const OrdersCom = () => {
//   const router = useRouter();
//   const { permissions = {} } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalOrdersCount, setTotalOrdersCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const pdfRefs = useRef({});

//   // Debounced search function
//   const debouncedSearch = debounce((value) => {
//     setSearchTerm(value);
//     setCurrentPage(1); // Reset to first page when searching
//   }, 500);

//   const handleSearch = (e) => {
//     debouncedSearch(e.target.value.toLowerCase());
//   };

//   // Clean up debounce on unmount
//   useEffect(() => {
//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, []);

//   const fetchOrders = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const offset = (currentPage - 1) * limit;
//       const res = await AxiosInstance.get('/ecommerce/order', {
//         params: {
//           page: currentPage,
//           limit: limit,
//           offset: offset,
//           search: searchTerm
//         }
//       });
      
//       if (res?.data?.data) {
//         setOrders(res.data.data.orders || []);
//         setTotalOrdersCount(res.data.data.count);
//         setTotalPages(res.data.data.total_pages);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       toast.error('Failed to load orders', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currentPage, limit, searchTerm]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const deleteOrder = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/order?id=${id}`);
//       if (res) {
//         toast.success('Order deleted successfully', {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//         fetchOrders();
//       }
//     } catch (error) {
//       toast.error('Error deleting order', {
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

//   const updateOrder = (orderid) => {
//     router.push(`/updateorderpage?orderid=${orderid}`);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const handleDownloadPdf = async (orderId) => {
//     const element = pdfRefs.current[orderId];
//     if (!element) return;

//     try {
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`order_${orderId}.pdf`);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       toast.error('Failed to generate PDF', {
//         position: "top-center",
//         autoClose: 2000,
//       });
//     }
//   };

//   const handlePrint = (orderId) => {
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Order #${orderId}</title>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 20px; }
//             h1 { color: #333; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//             th { background-color: #f2f2f2; }
//             .section { margin-bottom: 30px; }
//             .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
//           </style>
//         </head>
//         <body>
//           ${pdfRefs.current[orderId].innerHTML}
//           <script>
//             window.onload = function() {
//               window.print();
//               setTimeout(function() {
//                 window.close();
//               }, 1000);
//             };
//           </script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const renderPagination = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
//     let startPage, endPage;

//     if (totalPages <= maxVisiblePages) {
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       const half = Math.floor(maxVisiblePages / 2);
//       if (currentPage <= half + 1) {
//         startPage = 1;
//         endPage = maxVisiblePages;
//       } else if (currentPage >= totalPages - half) {
//         startPage = totalPages - maxVisiblePages + 1;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - half;
//         endPage = currentPage + half;
//       }
//     }

//     if (startPage > 1) {
//       pages.push(
//         <button
//           key={1}
//           onClick={() => setCurrentPage(1)}
//           className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-amber-600"
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         pages.push(<span key="start-ellipsis" className="px-2">...</span>);
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => setCurrentPage(i)}
//           className={`px-4 py-2 rounded-full ${
//             currentPage === i
//               ? 'bg-amber-500 text-black font-semibold'
//               : 'bg-gray-700 text-white hover:bg-amber-600'
//           }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pages.push(<span key="end-ellipsis" className="px-2">...</span>);
//       }
//       pages.push(
//         <button
//           key={totalPages}
//           onClick={() => setCurrentPage(totalPages)}
//           className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-amber-600"
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer theme="dark" />

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Orders Management</h1>
//           <div className="relative w-full md:w-64">
//             <input
//               type="text"
//               placeholder="Search orders..."
//               onChange={handleSearch}
//               className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
//             />
//             <svg
//               className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//           <button
//             className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
//             onClick={() => router.push('/addorderpage')}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//             Add Order
//           </button>
//         </div>

//         {/* Orders List */}
//         {!isLoading && (
//           <>
//             {orders.length > 0 ? (
//               <div className="space-y-6">
//                 {orders.map((order) => (
//                   <div key={order.order_id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//                     {/* Hidden div for PDF content */}
//                     <div style={{ position: 'absolute', left: '-9999px' }}>
//                       <div
//                         ref={(el) => (pdfRefs.current[order.order_id] = el)}
//                         className="bg-white p-6 text-black"
//                         style={{ width: '210mm', minHeight: '297mm' }}
//                       >
//                         <h1 className="text-2xl font-bold mb-4">Order #{order.order_id}</h1>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Customer Details</h2>
//                           <p>Name: {order.customer_info?.name || 'N/A'}</p>
//                           <p>Email: {order.customer_info?.email || 'N/A'}</p>
//                           <p>Phone: {order.customer_info?.phone || 'N/A'}</p>
//                         </div>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Delivery Info</h2>
//                           <p>Address: {order.delivery_info?.address || 'N/A'}</p>
//                           <p>City: {order.delivery_info?.city || 'N/A'}</p>
//                           <p>Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
//                         </div>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Payment Info</h2>
//                           <p>Method: {order.payment_method || 'N/A'}</p>
//                           <p>Total: PKR {order.order_summary?.total || '0'}</p>
//                           <p>Status: {order.status}</p>
//                         </div>

//                         <div className="mb-6">
//                           <h2 className="text-xl font-semibold border-b pb-2 mb-2">Order Items</h2>
//                           <table className="w-full border-collapse">
//                             <thead>
//                               <tr className="bg-gray-200">
//                                 <th className="border p-2">ID</th>
//                                 <th className="border p-2">Product</th>
//                                 <th className="border p-2">Type</th>
//                                 <th className="border p-2">Unit Price</th>
//                                 <th className="border p-2">Quantity</th>
//                                 <th className="border p-2">Total</th>
//                                 <th className="border p-2">Discounted</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {order.order_summary?.items?.map((item, index) => (
//                                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                                   <td className="border p-2">{item.product_id}</td>
//                                   <td className="border p-2">{item.product_name}</td>
//                                   <td className="border p-2">{item.product_type}</td>
//                                   <td className="border p-2">PKR {item.unit_price}</td>
//                                   <td className="border p-2">{item.quantity}</td>
//                                   <td className="border p-2">PKR {item.total_price}</td>
//                                   <td className="border p-2">{item.is_discounted ? 'Yes' : 'No'}</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>

//                         <div className="mt-8 text-right">
//                           <p>Generated on: {new Date().toLocaleDateString()}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Visible order card */}
//                     <div className="p-6">
//                       <div className="flex flex-col md:flex-row justify-between mb-4">
//                         <div>
//                           <h2 className="text-xl font-semibold text-white">Order #{order.order_id}</h2>
//                           <p className="text-gray-400 text-sm">
//                             Created: {formatDate(order.created_at)}
//                           </p>
//                         </div>
//                         <div className="mt-4 md:mt-0">
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                             order.status === 'pending' ? 'bg-yellow-500 text-black' :
//                             order.status === 'completed' ? 'bg-green-500 text-white' :
//                             'bg-gray-500 text-white'
//                           }`}>
//                             {order.status}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Customer Details</h3>
//                           <p className="text-gray-300">Name: {order.customer_info?.name || 'N/A'}</p>
//                           <p className="text-gray-300">Email: {order.customer_info?.email || 'N/A'}</p>
//                           <p className="text-gray-300">Phone: {order.customer_info?.phone || 'N/A'}</p>
//                         </div>

//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Delivery Info</h3>
//                           <p className="text-gray-300">Address: {order.delivery_info?.address || 'N/A'}</p>
//                           <p className="text-gray-300">City: {order.delivery_info?.city || 'N/A'}</p>
//                           <p className="text-gray-300">Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
//                         </div>

//                         <div className="bg-gray-700 p-4 rounded-lg">
//                           <h3 className="text-lg font-medium text-white mb-2">Payment Info</h3>
//                           <p className="text-gray-300">Method: {order.payment_method || 'N/A'}</p>
//                           <p className="text-gray-300">Subtotal: PKR {order.order_summary?.subtotal || '0'}</p>
//                           <p className="text-gray-300">Total: PKR {order.order_summary?.total || '0'}</p>
//                         </div>
//                       </div>

//                       <div className="mb-6">
//                         <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
//                         <div className="overflow-x-auto">
//                           <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
//                             <thead className="bg-gray-600">
//                               <tr>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unit Price</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
//                                 <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Discounted</th>
//                               </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-600">
//                               {order.order_summary?.items?.map((item, index) => (
//                                 <tr key={index}>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.product_id}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.product_name}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.product_type}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     PKR {item.unit_price}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.quantity}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     PKR {item.total_price}
//                                   </td>
//                                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
//                                     {item.is_discounted ? 'Yes' : 'No'}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap justify-end gap-3">
//                         <button
//                           onClick={() => handleDownloadPdf(order.order_id)}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                           </svg>
//                           Download PDF
//                         </button>
//                         <button
//                           onClick={() => handlePrint(order.order_id)}
//                           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                           </svg>
//                           Print
//                         </button>
//                         <button
//                           onClick={() => updateOrder(order.order_id)}
//                           className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                           Edit Order
//                         </button>
//                         <button
//                           onClick={() => deleteOrder(order.order_id)}
//                           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Delete Order
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-white text-lg mb-4">No orders found</p>
//                 {searchTerm && (
//                   <button
//                     onClick={() => {
//                       setSearchTerm('');
//                       setCurrentPage(1);
//                     }}
//                     className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
//                   >
//                     Clear search
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="flex flex-wrap justify-center mt-10 gap-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className={`px-4 py-2 rounded-full ${
//                     currentPage === 1
//                       ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                       : 'bg-gray-700 text-white hover:bg-amber-600'
//                   }`}
//                 >
//                   Previous
//                 </button>
                
//                 {renderPagination()}
                
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className={`px-4 py-2 rounded-full ${
//                     currentPage === totalPages
//                       ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                       : 'bg-gray-700 text-white hover:bg-amber-600'
//                   }`}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//         {isLoading && (
//           <div className="text-center py-10">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
//             <p className="text-white text-lg mt-2">Loading orders...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersCom;





'use client';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const OrdersCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const pdfRefs = useRef({});
  const [refreshKey, setRefreshKey] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    offset: 0,
    totalPages: 1,
    count: 0,
    next: false,
    previous: false
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { currentPage, limit, offset } = pagination;
        const res = await AxiosInstance.get('/ecommerce/order', {
          params: {
            page: currentPage,
            limit: limit,
            offset: offset,
            search: searchTerm
          }
        });
        
        if (res?.data?.data) {
          setOrders(res.data.data.orders || []);
          setPagination(prev => ({
            ...prev,
            count: res.data.data.count,
            totalPages: res.data.data.total_pages,
            next: res.data.data.next,
            previous: res.data.data.previous
          }));
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination.currentPage, pagination.limit, pagination.offset, searchTerm, refreshKey]);

  const deleteOrder = async (id) => {
    try {
      await AxiosInstance.delete(`/ecommerce/order?id=${id}`);
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
  const updateOrder = (orderid) => {
    router.push(`/updateorderpage?orderid=${orderid}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination(prev => ({ 
      ...prev, 
      limit: newLimit,
      currentPage: 1,
      offset: 0
    }));
  };

  const handleOffsetChange = (e) => {
    const newOffset = Math.max(0, parseInt(e.target.value)) || 0;
    setPagination(prev => ({ 
      ...prev, 
      offset: newOffset,
      currentPage: 1
    }));
  };

  const handleDownloadPdf = async (orderId) => {
    const element = pdfRefs.current[orderId];
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`order_${orderId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF', {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handlePrint = (orderId) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Order #${orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          ${pdfRefs.current[orderId].innerHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 1000);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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
            <h1 className="text-4xl font-light text-white mb-2">Orders Management</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-1"></div>
            <p className="text-gray-400 text-sm">Manage and track customer orders</p>
          </div>
        </div>
        
        {/* Stats and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-gray-800/50 p-4 rounded-xl gap-4">
          <button
            className="px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
            onClick={() => router.push('/addorderpage')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Order
          </button>

          <div className="text-amber-400 font-light">
            Showing {orders.length} of {pagination.count} orders
            {pagination.offset > 0 && ` (offset: ${pagination.offset})`}
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
                placeholder="Search orders..."
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
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="30">30 per page</option>
                <option value="50">50 per page</option>
              </select>
              
              <input
                type="number"
                value={pagination.offset}
                onChange={handleOffsetChange}
                min="0"
                max={pagination.count}
                placeholder="Offset"
                className="bg-gray-700 text-white rounded-full px-3 py-2 w-20 border border-gray-600 focus:outline-none focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6">
            {[...Array(pagination.limit)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-800 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-32"></div>
                    <div className="h-3 bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-16 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders List */}
        {!isLoading && (
          <>
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.order_id} className="bg-gray-800/50 rounded-xl shadow-lg overflow-hidden">
                    {/* Hidden PDF content */}
                    <div style={{ position: 'absolute', left: '-9999px' }}>
                      <div
                        ref={(el) => (pdfRefs.current[order.order_id] = el)}
                        className="bg-white p-6 text-black"
                        style={{ width: '210mm', minHeight: '297mm' }}
                      >
                        <h1 className="text-2xl font-bold mb-4">Order #{order.order_id}</h1>
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Customer Details</h2>
                          <p>Name: {order.customer_info?.name || 'N/A'}</p>
                          <p>Email: {order.customer_info?.email || 'N/A'}</p>
                          <p>Phone: {order.customer_info?.phone || 'N/A'}</p>
                        </div>
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Delivery Info</h2>
                          <p>Address: {order.delivery_info?.address || 'N/A'}</p>
                          <p>City: {order.delivery_info?.city || 'N/A'}</p>
                          <p>Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
                        </div>
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Payment Info</h2>
                          <p>Method: {order.payment_method || 'N/A'}</p>
                          <p>Total: PKR {order.order_summary?.total || '0'}</p>
                          <p>Status: {order.status}</p>
                        </div>
                        <div className="mb-6">
                          <h2 className="text-xl font-semibold border-b pb-2 mb-2">Order Items</h2>
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Product</th>
                                <th className="border p-2">Type</th>
                                <th className="border p-2">Unit Price</th>
                                <th className="border p-2">Quantity</th>
                                <th className="border p-2">Total</th>
                                <th className="border p-2">Discounted</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.order_summary?.items?.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                  <td className="border p-2">{item.product_id}</td>
                                  <td className="border p-2">{item.product_name}</td>
                                  <td className="border p-2">{item.product_type}</td>
                                  <td className="border p-2">PKR {item.unit_price}</td>
                                  <td className="border p-2">{item.quantity}</td>
                                  <td className="border p-2">PKR {item.total_price}</td>
                                  <td className="border p-2">{item.is_discounted ? 'Yes' : 'No'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-8 text-right">
                          <p>Generated on: {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Visible Order Card */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-white">Order #{order.order_id}</h2>
                          <p className="text-gray-400 text-sm">
                            Created: {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'pending' ? 'bg-yellow-500 text-black' :
                            order.status === 'completed' ? 'bg-green-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">Customer Details</h3>
                          <p className="text-gray-300">Name: {order.customer_info?.name || 'N/A'}</p>
                          <p className="text-gray-300">Email: {order.customer_info?.email || 'N/A'}</p>
                          <p className="text-gray-300">Phone: {order.customer_info?.phone || 'N/A'}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">Delivery Info</h3>
                          <p className="text-gray-300">Address: {order.delivery_info?.address || 'N/A'}</p>
                          <p className="text-gray-300">City: {order.delivery_info?.city || 'N/A'}</p>
                          <p className="text-gray-300">Delivery Date: {formatDate(order.delivery_info?.estimated_date)}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">Payment Info</h3>
                          <p className="text-gray-300">Method: {order.payment_method || 'N/A'}</p>
                          <p className="text-gray-300">Subtotal: PKR {order.order_summary?.subtotal || '0'}</p>
                          <p className="text-gray-300">Total: PKR {order.order_summary?.total || '0'}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                            <thead className="bg-gray-600">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unit Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Discounted</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                              {order.order_summary?.items?.map((item, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.product_id}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.product_name}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.product_type}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">PKR {item.unit_price}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.quantity}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">PKR {item.total_price}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.is_discounted ? 'Yes' : 'No'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-end gap-3">
                        <button
                          onClick={() => handleDownloadPdf(order.order_id)}
                          className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-blue-600/30 to-blue-700/20 border border-blue-500/30 text-blue-300 rounded-lg hover:from-blue-600/40 hover:to-blue-700/30 transition-all duration-300 group flex items-center shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                          <span className="relative z-10 font-medium">Download PDF</span>
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>

                        <button
                          onClick={() => handlePrint(order.order_id)}
                          className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-purple-600/30 to-purple-700/20 border border-purple-500/30 text-purple-300 rounded-lg hover:from-purple-600/40 hover:to-purple-700/30 transition-all duration-300 group flex items-center shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                          <span className="relative z-10 font-medium">Print</span>
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>

                        <button
                          onClick={() => updateOrder(order.order_id)}
                          className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-amber-600/30 to-amber-700/20 border border-amber-500/30 text-amber-300 rounded-lg hover:from-amber-600/40 hover:to-amber-700/30 transition-all duration-300 group flex items-center shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="relative z-10 font-medium">Edit Order</span>
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>

                        <button
                        onClick={() => deleteOrder(order.order_id)}
                        className="relative overflow-hidden px-4 py-2 bg-gradient-to-r from-red-600/30 to-red-700/20 border border-red-500/30 text-red-300 rounded-lg hover:from-red-600/40 hover:to-red-700/30 transition-all duration-300 group flex items-center shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="relative z-10 font-medium">Delete</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </button>
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
                <h3 className="text-2xl font-light text-white mb-2">No orders found</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {searchTerm ? "No orders match your search." : "There are no orders to display."}
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

        {/* Enhanced Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-4">
            <div className="text-gray-400 text-sm">
              Page {pagination.currentPage} of {pagination.totalPages} • Total {pagination.count} orders
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.currentPage === 1}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                aria-label="First page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.previous}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
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
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.next}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages}
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

export default OrdersCom;