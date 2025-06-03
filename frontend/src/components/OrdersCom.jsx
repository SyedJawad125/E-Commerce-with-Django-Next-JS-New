'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const OrdersCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 8;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get('/ecommerce/order');
        if (res?.data?.data?.data) {
          setOrders(res.data.data.data);
          setFilteredOrders(res.data.data.data);
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
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/ecommerce/order?id=${id}`);
      if (res) {
        setFilteredOrders(prev => prev.filter(order => order.id !== id));
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

  const updateOrder = (orderId) => {
    router.push(`/updateorderpage?orderid=${orderId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = orders.filter((order) => {
      const idMatch = order.id.toString() === value;
      const nameMatch = order.customer_name?.toLowerCase().includes(value);
      const emailMatch = order.customer_email?.toLowerCase().includes(value);
      const phoneMatch = order.customer_phone?.toLowerCase().includes(value);
      return idMatch || nameMatch || emailMatch || phoneMatch;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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
        </div>

        {/* Orders List */}
        {!isLoading && (
          <>
            {currentOrders.length > 0 ? (
              <div className="space-y-6">
                {currentOrders.map((order) => (
                  <div key={order.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-white">Order #{order.id}</h2>
                          <p className="text-gray-400 text-sm">
                            Placed on: {formatDate(order.created_at)}
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
                          <p className="text-gray-300">Name: {order.customer_name || 'N/A'}</p>
                          <p className="text-gray-300">Email: {order.customer_email || 'N/A'}</p>
                          <p className="text-gray-300">Phone: {order.customer_phone || 'N/A'}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">Delivery Info</h3>
                          <p className="text-gray-300">Address: {order.delivery_address || 'N/A'}</p>
                          <p className="text-gray-300">City: {order.city || 'N/A'}</p>
                          <p className="text-gray-300">Delivery Date: {formatDate(order.delivery_date)}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-2">Payment Info</h3>
                          <p className="text-gray-300">Method: {order.payment_method || 'N/A'}</p>
                          <p className="text-gray-300">
                            Status: {order.payment_status ? (
                              <span className="text-green-400">Paid</span>
                            ) : (
                              <span className="text-red-400">Unpaid</span>
                            )}
                          </p>
                          <p className="text-gray-300">Total: ${order.bill || '0'}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-3">Order Items</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                            <thead className="bg-gray-600">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Unit Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                              {order.order_details?.map((item) => (
                                <tr key={item.id}>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    Product #{item.sales_product}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    ${item.unit_price}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    {item.quantity}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                                    ${item.total_price}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        {permissions.update_order && (
                          <button
                            onClick={() => updateOrder(order.id)}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                          >
                            Edit Order
                          </button>
                        )}
                        {permissions.delete_order && (
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Delete Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center text-lg py-10">No orders found.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 space-x-2">
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
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersCom;