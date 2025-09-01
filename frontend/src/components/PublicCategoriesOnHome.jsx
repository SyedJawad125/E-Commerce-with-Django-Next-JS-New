'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";

const PublicCategoriesOnHome = () => {
  const router = useRouter();
  
  const [records, setRecords] = useState([]);
  const [paginationData, setPaginationData] = useState({
    count: 0,
    total_pages: 1,
    current_page: 1,
    limit: 24,
    offset: 0,
    next: false,
    previous: false
  });
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Fetch categories with pagination
  const fetchCategories = async (page = 1, limit = 24, offset = 0) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        offset: offset.toString()
      });

      const res = await AxiosInstance.get(`/ecommerce/publiccategory?${params}`);
      
      if (res && res.data && res.data.data) {
        console.log('Categories response:', res.data.data); // Debug log
        setRecords(res.data.data.data || []);
        setPaginationData({
          count: res.data.data.count || 0,
          total_pages: res.data.data.total_pages || 1,
          current_page: res.data.data.current_page || 1,
          limit: res.data.data.limit || 24,
          offset: res.data.data.offset || 0,
          next: res.data.data.next || false,
          previous: res.data.data.previous || false,
        });
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (router.query && router.query.name) {
      toast.success(router.query.name);
      router.push('/products', undefined, { shallow: true });
    } else if (flag) {
      toast.success('Product deleted');
      setFlag(false);
    }

    fetchCategories();
  }, [flag, router.query?.name]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= paginationData.total_pages) {
      fetchCategories(newPage, paginationData.limit, paginationData.offset);
    }
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    fetchCategories(1, newLimit, 0); // Reset to page 1 when changing limit
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/categorywiseproductpage?categoryId=${categoryId}`);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, paginationData.current_page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(paginationData.total_pages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-5xl font-extrabold font-serif text-gray-900 tracking-wide text-center mb-12">
          🧺 Browse Our Collections
        </h2>

        {/* Results info and limit selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            Total: {paginationData.count} categories
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Items per page:</label>
            <select
              value={paginationData.limit}
              onChange={handleLimitChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              disabled={loading}
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading categories...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {records.length > 0 ? (
                records.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleCategoryClick(item.id)}
                    className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative w-full h-44 overflow-hidden">
                      <img
                        src={`${baseURL}${item.image?.startsWith('/') ? '' : '/'}${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          console.log('Image failed to load:', item.image);
                          console.log('Attempted URL:', e.target.src);
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', item.image);
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-grow p-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      </div>
                      <button className="mt-4 w-full py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-300">
                        View Products
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">No categories found.</p>
              )}
            </div>

            {/* Pagination Controls */}
            {paginationData.total_pages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page info */}
                <div className="text-sm text-gray-600">
                  Page {paginationData.current_page} of {paginationData.total_pages}
                </div>

                {/* Pagination buttons */}
                <div className="flex items-center gap-2">
                  {/* First page */}
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={!paginationData.previous || loading}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    First
                  </button>

                  {/* Previous page */}
                  <button
                    onClick={() => handlePageChange(paginationData.current_page - 1)}
                    disabled={!paginationData.previous || loading}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                      className={`px-3 py-2 text-sm rounded-lg border ${
                        pageNum === paginationData.current_page
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next page */}
                  <button
                    onClick={() => handlePageChange(paginationData.current_page + 1)}
                    disabled={!paginationData.next || loading}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>

                  {/* Last page */}
                  <button
                    onClick={() => handlePageChange(paginationData.total_pages)}
                    disabled={!paginationData.next || loading}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default PublicCategoriesOnHome;
// Design
{/* <div className="mx-8 bg-gray-50">     
    <div className="container mx-auto my-4 ml-8 mr-2 w-[calc(100%-6rem)] mt-16">        
        <h2 className="text-4xl font-serif text-gray-900 font-bold mb-4 tracking-wider text-center">Collections</h2>
      <br />
      <br />      
      <br/>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2">
        {records.length > 0 ? (
          records.map((item) => (
            <div
              key={item.id}
              className="card-5 cursor-pointer"
              onClick={() => handleCategoryClick(item.id)}
            >
              <img
                src={`http://localhost:8000/${item.image}`}
                className="card-image5 clickable-image w-full h-40 object-cover transform 
                           transition-transform duration-300 hover:scale-105 border border-black"
                alt={item.name}
              />
              <div className="card-body5 p-4">
                <h5 className="card-title text-black text-sm font-medium -m-6 p-3">{item.name}</h5>
                <p className="card-text text-black text-xs mt-1 -m-6 p-3">Des: {item.description}</p>                
              </div>
            </div>
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
      <ToastContainer />
    </div>
    </div> */}
