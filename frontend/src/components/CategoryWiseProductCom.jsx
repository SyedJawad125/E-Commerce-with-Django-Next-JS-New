'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

const CategoryWiseProductCom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categoryId = searchParams.get('categoryId'); // Safely retrieve categoryId from query params

    console.log('Category ID:', categoryId); // Debugging: Log the categoryId

    if (categoryId) {
      const fetchProduct = async () => {
        try {
          const res = await AxiosInstance.get(`/ecommerce/publicproduct?category=${categoryId}`);
          console.log('API Response:', res.data); // Debugging: Log the API response
          if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
            setProducts(res.data.data.data);
          } else {
            console.error('Unexpected API response structure:', res.data);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProduct();
    }
  }, [searchParams]);

  const handleBackButton = () => {
    router.push('/publiccategories');
  };
  const handleProductClick = (ProductId) => {
    router.push(`/productdetailpage?ProductId=${ProductId}`);
};

  return (
<div className="container mx-auto mt-4 mb-24 ml-52">
  <div className="row mb-12">
    <div className="col-12">
      <button
        type="button"
        className="btn btn-secondary top-right-button"
        onClick={handleBackButton}
      >
        Go Back
      </button>
    </div>
  </div>
  <h2 className="text-2xl font-bold mb-6">Products</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-3/4">
    {products.length ? (
      products.map((product) => (
        <div key={product.id} className="bg-black shadow-lg rounded-lg p-4" onClick={() => handleProductClick(product.id)}>
          <div className="card hover:scale-105">
            <img
              src={`http://localhost:8000/${product.image}`}
              className="card-img-top w-full h-64 object-cover "
              alt={product.name}
            />
            <div className="card-body bg-gray-800" >
              <h5 className="card-title text-lg font-bold text-white">{product.name}</h5>
              <p className="card-text text-white">{product.description}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No products found for this category.</p>
    )}
  </div>
</div>


  );
};

export default CategoryWiseProductCom;
