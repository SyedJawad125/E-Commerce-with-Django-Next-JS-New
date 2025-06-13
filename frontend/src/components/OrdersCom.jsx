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





'use client';
import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const OrdersCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [orders, setOrders] = useState([]); // This will hold the orders for the current page
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Corresponds to backend's 'limit'
  const [totalOrdersCount, setTotalOrdersCount] = useState(0); // Total count from backend
  const [totalPages, setTotalPages] = useState(1); // Total pages from backend
  const [isLoading, setIsLoading] = useState(true);

  // Memoize fetchOrders to prevent unnecessary re-renders and enable better control with useCallback
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const offset = (currentPage - 1) * limit; // Calculate offset based on current page and limit
      const res = await AxiosInstance.get('/ecommerce/order', {
        params: {
          page: currentPage,
          limit: limit,
          offset: offset,
          search: searchTerm // Pass search term to backend for filtering
        }
      });
      if (res?.data?.data) {
        const { orders, count, total_pages, current_page, limit: resLimit, offset: resOffset } = res.data.data;
        setOrders(orders || []); // Set orders for the current page
        setTotalOrdersCount(count);
        setTotalPages(total_pages);
        setCurrentPage(current_page);
        setLimit(resLimit); // Update limit based on backend response if needed
      }
    } catch (error) {
      console.error('Error occurred:', error);
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
  }, [currentPage, limit, searchTerm]); // Dependencies for useCallback

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Re-run when fetchOrders changes

  const deleteOrder = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/ecommerce/order?id=${id}`);
      if (res) {
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
        // After deletion, re-fetch orders to get updated pagination data
        fetchOrders(); 
      }
    } catch (error) {
      toast.error('Error deleting order', {
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page on new search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const pdfRefs = useRef({});

  // Function to handle PDF download
  const handleDownloadPdf = async (orderId) => {
    const element = pdfRefs.current[orderId];
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`order_${orderId}.pdf`);
  };

  // Function to handle print
  const handlePrint = useReactToPrint({
    content: () => pdfRefs.current[orderId],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer theme="dark" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Orders Management</h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            className="mt-6 md:mt-0 px-6 py-3 bg-transparent border border-amber-500 text-amber-500 font-medium text-sm leading-tight uppercase rounded-full hover:bg-amber-500 hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out transform hover:scale-105 flex items-center"
            onClick={() => router.push('/addorderpage')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Order
          </button>
        </div>

        {/* Orders List */}
        {!isLoading && (
          <>
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.order_id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {/* Hidden div for PDF content */}
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
                          <p>Total: ${order.order_summary?.total || '0'}</p>
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

                    {/* Visible order card */}
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-white">Order #{order.order_id}</h2>
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
                          <p className="text-gray-300">Total: ${order.order_summary?.total || '0'}</p>
                          <p className="text-gray-300">Status: {order.status}</p>
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
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    {item.product_id}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    {item.product_name}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    {item.product_type}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    PKR {item.unit_price}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    {item.quantity}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    PKR {item.total_price}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    {item.is_discounted ? 'Yes' : 'No'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleDownloadPdf(order.order_id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                          Download PDF
                        </button>
                        <button
                          onClick={() => updateOrder(order.order_id)}
                          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                        >
                          Edit Order
                        </button>
                        <button
                          onClick={() => deleteOrder(order.order_id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center text-lg py-10">No orders found.</p>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === 1
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-amber-600'
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-full ${
                      currentPage === i + 1
                        ? 'bg-amber-500 text-black font-semibold'
                        : 'bg-gray-700 text-white hover:bg-amber-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === totalPages
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-amber-600'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        {isLoading && (
          <div className="text-white text-center text-lg py-10">Loading orders...</div>
        )}
      </div>
    </div>
  );
};

export default OrdersCom;