'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const ImagesCategoryCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext);
  
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
    if (!permissions.read_images_category) {
            return (
              <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
                <div className="text-center p-8 max-w-md">
                  <h2 className="text-2xl text-amber-400 mb-4">Access Denied</h2>
                  <p className="text-gray-300 mb-6">
                    You don't have permission to view Images. Please contact your administrator.
                  </p>
                  <button 
                    onClick={() => router.push('/')}
                    className="px-6 py-2 bg-amber-600 rounded-full hover:bg-amber-700 text-white transition-colors"
                  >
                    Return to Dashboard
                  </button>
                </div>
                <ToastContainer position="top-right" autoClose={2000} />
              </div>
            );
          }

  return (
    
  <div className="min-h-screen bg-black text-white px-6 py-10">
    <ToastContainer position="top-right" autoClose={3000} />
    
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-amber-400">Images Categories Management</h1>
      {permissions.create_images_category && (
        <button 
          onClick={() => router.push('/AddImagesCategoryPage')}
          className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full shadow-md transition"
        >
          Add Category
        </button>
      )}
    </div>

    {/* Search + Limit */}
    <div className="bg-gray-900 p-4 rounded-xl mb-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 px-4 py-2 rounded-md bg-black border border-amber-500 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <div className="flex items-center gap-2 text-gray-300">
          <label>Items per page:</label>
          <select
            value={data.limit}
            onChange={handleLimitChange}
            className="bg-black border border-amber-500 px-3 py-1 rounded-md text-white focus:outline-none"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto rounded-lg shadow-xl">
      {isLoading ? (
        <div className="text-center p-10">
          <div className="animate-spin h-12 w-12 border-4 border-amber-400 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading categories...</p>
        </div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-amber-500 bg-gray-950">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-amber-400">ID</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-amber-400">Category Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-amber-400">Created By</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {data.categories.length > 0 ? (
                data.categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-800 transition">
                    <td className="px-6 py-4 text-sm text-gray-300">{category.id}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{category.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {category.created_by?.get_full_name || 'System'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 space-x-4">
                      {permissions.update_images_category && (
                        <button
                          onClick={() => updateCategory(category.id)}
                          className="text-amber-400 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {permissions.delete_images_category && (
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-6 py-4 text-gray-500">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {total_pages > 1 && (
            <div className="flex items-center justify-between mt-6 text-gray-300">
              <div>
                Showing <span className="text-amber-400">{(data.current_page - 1) * data.limit + 1}</span> to{' '}
                <span className="text-amber-400">{Math.min(data.current_page * data.limit, data.count)}</span> of{' '}
                <span className="text-amber-400">{data.count}</span> results
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={data.current_page === 1}
                  className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30"
                >
                  First
                </button>
                <button
                  onClick={() => handlePageChange(Math.max(1, data.current_page - 1))}
                  disabled={data.current_page === 1}
                  className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30"
                >
                  Prev
                </button>

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
                      className={`px-3 py-1 rounded ${
                        data.current_page === pageNum
                          ? 'bg-amber-500 text-black'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(Math.min(total_pages, data.current_page + 1))}
                  disabled={data.current_page === total_pages}
                  className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30"
                >
                  Next
                </button>
                <button
                  onClick={() => handlePageChange(total_pages)}
                  disabled={data.current_page === total_pages}
                  className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-white disabled:opacity-30"
                >
                  Last
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

export default ImagesCategoryCom;