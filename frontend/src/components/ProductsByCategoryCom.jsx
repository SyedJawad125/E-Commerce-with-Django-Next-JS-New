// import React, { useEffect, useState } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';


// const PublicProduct = () => {
//   const router = useRouter();
//   const { categoryId } = router.query;

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     if (categoryId) {
//       const fetchProducts = async () => {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/publicproduct?category=${categoryId}`);
//           if (res) {
//             setProducts(res.data.data.data);
//           }
//         } catch (error) {
//           console.log('Error fetching products:', error);
//         }
//       };
//       fetchProducts();
//     }
//   }, 
//   [categoryId]
// );

// //   const handleProductClick = (ProductId) => {
// //     router.push({
// //       pathname: '/productdetailpage',
// //       query: { ProductId: ProductId }
// //     });
// //   };

//   const handleBackButton = () => {
//     router.push('/publiccategory');
//   };

//   return (
//     <div className="container mx-auto mt-4 mb-20 ml-20">
//       <div className="flex justify-end mb-12">
//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={handleBackButton}
//         >
//           Goto Back
//         </button>
//       </div>
//       <h2 className="text-2xl font-bold mb-8">Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//         {products.length ? (
//           products.map((product) => (
//             <div className="card cursor-pointer" key={product.id} onClick={() => handleProductClick(product.id)}>
//               <img src={`http://localhost:8000/${product.image}`} className="card-img-top w-full h-48 object-cover" alt={product.name} />
//               <div className="card-body p-4">
//                 <h5 className="card-title text-lg font-semibold">{product.name}</h5>
//                 <p className="card-text">{product.description}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products found for this category.</p>
//         )}
//       </div>
//       {/* <CategoryVerticalSlider /> */}
//     </div>
//   );
// };

// export default PublicProduct;
