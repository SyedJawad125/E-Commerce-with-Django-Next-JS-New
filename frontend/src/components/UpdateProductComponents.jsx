// 'use client';
// import React from 'react'
// import {useState, useEffect} from 'react'
// import {  useLocation } from 'react-router-dom'
// import AxiosInstance from "@/components/AxiosInstance";


// const UpdateProductComponents = () => {
    

//   const location = useLocation()
//   const data = location.state.data

//   const [name, setname] = useState(data.name)
//   const [description, setdescription] = useState(data.description)
//   const [price, setprice] = useState(data.price)
//   const [image, setimage] = useState(data.image)
//   const [prod_has_category, setprod_has_category] = useState(data.prod_has_category)

// //   const [categoryRecords, setcategoryRecords] = useState([])

//   useEffect(()=>{
//     // For dropdown list
//     const fetchMenu = async () =>{
//       const res = await AxiosInstance.get('/ecommerce/category') 
//       try{
//           if (res){
//             setcategoryRecords(res.data.data.data)
//           }
//       }
//       catch (error){
//           console.log('error occured', error)
//       }
//   }
//   fetchMenu();
 

//   }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('id',data.id)
//       formData.append('name',name)
//       formData.append('description',description)
//       formData.append('price',price)
//       formData.append('image',image)
//       formData.append('prod_has_category',prod_has_category)

//         // const payload = {"name":name , "description":description,"restaurant":restaurant }
        
//         const response = await AxiosInstance.patch('/ecommerce/product', formData , {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//         if (response){
//         console.log('Response:', response.data);
//         navigate('/product', {state: {message: 'Product Updated!'}})
//         }
//         // Handle success
//     } catch (error) {
//         console.error('Error:', error);
//         // Handle error
//     }
//     };
//   return (
//     <div className="container mx-auto px-4 mt-4" style={{ marginLeft: '200px' }}>
//       <h2 className="text-2xl font-semibold mb-4">Add Product Here :</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             id="name"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//           <input
//             type="text"
//             id="description"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
//           <input
//             type="text"
//             id="price"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
//           <input
//             type="file"
//             id="image"
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>
//         {/* <div className="mb-4">
//           <label htmlFor="category" className="block text-sm font-medium text-gray-700">Select Category</label>
//           <select
//             id="category"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             onChange={(e) => setProdHasCategory(e.target.value)}
//           >
//             <option value="" disabled>Select Category</option>
//             {categoryRecords.length > 0 ? (
//               categoryRecords.map((item) => (
//                 <option value={item.id} key={item.id}>{item.name}</option>
//               ))
//             ) : (
//               <option value="" disabled>No Records</option>
//             )}
//           </select>
//         </div> */}
//         <button
//           type="submit"
//           className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

// export default UpdateProductComponents