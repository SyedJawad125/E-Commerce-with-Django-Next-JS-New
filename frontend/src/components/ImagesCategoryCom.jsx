'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const ImagesCategoryCom = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    categories: [],
    count: 0,
    current_page: 1,
    limit: 10,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, [data.current_page, data.limit]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance.get(
        `/images/categories?page=${data.current_page}&limit=${data.limit}`
      );
      
      if (res.data && res.data.status_code === 200) {
        setData({
          categories: res.data.data.categories || [],  // Changed from res.data.data.data to res.data.data.categories
          count: res.data.data.count || 0,
          current_page: res.data.data.current_page || data.current_page,
          limit: res.data.data.limit || data.limit
        });
      } else {
        console.error('Unexpected response structure:', res);
        toast.error('Failed to load categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error fetching categories');
      if (error.response && error.response.status === 404) {
        toast.error('Categories endpoint not found');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const deleteCategory = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/images/categories?id=${id}`);
      if (res.data.status_code === 200) {
        toast.success('Category deleted successfully!');
        fetchCategories(); // Refresh the data
      }
    } catch (error) {
      toast.error('Error deleting category!');
    }
  };

  const updateCategory = async (id) => {
    router.push(`/UpdateImagesCategoryPage?id=${id}`);
  };

  const handleSearch = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    try {
      const res = await AxiosInstance.get(`/images/categories?search=${value}`);
      if (res && res.data && res.data.data) {
        setData(prev => ({
          ...prev,
          categories: res.data.data.data || [],
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

  // Calculate total pages based on count and limit
  const total_pages = Math.ceil(data.count / data.limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Categories Management</h1>
        {/* Header Section */}
    <div className="flex justify-between items-center mb-12">
      
      
      <button 
        onClick={() => router.push('/AddImagesCategoryPage')}
        className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transform hover:scale-105 transition-transform"
      >
        Add Category
      </button>
      
    </div>  
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Items per page:</span>
            <select
              value={data.limit}
              onChange={handleLimitChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.categories.length > 0 ? (
                    data.categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.created_by?.get_full_name || 'System'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateCategory(category.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {total_pages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(data.current_page - 1) * data.limit + 1}</span> to{' '}
                      <span className="font-medium">{Math.min(data.current_page * data.limit, data.count)}</span> of{' '}
                      <span className="font-medium">{data.count}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={data.current_page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">First</span>
                        &laquo;
                      </button>
                      <button
                        onClick={() => handlePageChange(Math.max(1, data.current_page - 1))}
                        disabled={data.current_page === 1}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        &lsaquo;
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, total_pages) }, (_, i) => {
                        let pageNum;
                        if (total_pages <= 5) {
                          pageNum = i + 1;
                        } else if (data.current_page <= 3) {
                          pageNum = i + 1;
                        } else if (data.current_page >= total_pages - 2) {
                          pageNum = total_pages - 4 + i;
                        } else {
                          pageNum = data.current_page - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              data.current_page === pageNum
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => handlePageChange(Math.min(total_pages, data.current_page + 1))}
                        disabled={data.current_page === total_pages}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        &rsaquo;
                      </button>
                      <button
                        onClick={() => handlePageChange(total_pages)}
                        disabled={data.current_page === total_pages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Last</span>
                        &raquo;
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImagesCategoryCom;