// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
// import AxiosInstance from "@/components/AxiosInstance";

// interface Category {
//   id: number;
//   name: string;
//   // Add other fields if necessary
// }
// const UpdateEmployee = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const employeeId = searchParams.get('id'); // Extract product ID from query params

//   const [first_name, setfirst_name] = useState('');
//   const [last_name, setlast_name] = useState('');
//   const [email, setemail] = useState('');
//   const [phone_number, setphone_number] = useState('');
//   const [date_of_birth, setdate_of_birth] = useState('');
//   const [hire_date, sethire_date] = useState('');
//   const [position, setposition] = useState('');
//   const [department, setdepartment] = useState('');
//   const [salary, setsalary] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [employeeRecords, setEmployeeRecords] = useState<Category[]>([]);

//   // useEffect(() => {

//     // const fetchProductDetails = async () => {
//     //   try {
//     //     if (productId) {
//     //       const res = await AxiosInstance.get(`/ecommerce/product/${productId}`);
//     //       console.log('Product details response:', res.data); // Log the response
//     //       if (res && res.data) {
//     //         const product = res.data.data;
//     //         setName(product.name);
//     //         setDescription(product.description);
//     //         setPrice(product.price);
//     //         setProdHasCategory(product.prodHasCategory);
//     //       }
//     //     }
//     //   } catch (error) {
//     //     console.log('Error fetching product details:', error);
//     //   }
//     // };




//     // Fetch categories for the dropdown list
//   //   const fetchMenu = async () => {
//   //     try {
//   //       const res = await AxiosInstance.get('/ecommerce/category');
//   //       if (res) {
//   //         setCategoryRecords(res.data.data.data);
//   //       }
//   //     } catch (error) {
//   //       console.log('Error occurred:', error);
//   //     }
//   //   };
//   //   fetchMenu();
//   // }, []);

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('first_name', first_name);
//       formData.append('last_name', last_name);
//       formData.append('email', email);
//       formData.append('phone_number', phone_number);
//       formData.append('date_of_birth', date_of_birth);
//       formData.append('hire_date', hire_date);
//       formData.append('position', position);
//       formData.append('department', department);
//       formData.append('salary', salary);
//       if (image) formData.append('image', image);
//       // formData.append('prod_has_category', prodHasCategory);

//       const response = await AxiosInstance.patch('/ecommerce/employee/?id=${employeeId}', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       if (response) {
//         console.log('Response:', response.data);
//         router.push('/employeepage');
//       }    // , { state: { message: 'Product Added!' } }
      
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 ml-20">
//   <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Update Employee Here:</h2>
//   <form className="mt-3" onSubmit={handleSubmit}>

//     {/* First Name and Last Name on the same row */}
//     <div className="grid grid-cols-2 gap-2 mb-4"> {/* Reduced gap */}
//         <div>
//             <label htmlFor="first_name" className="block text-sm font-medium text-gray-1000">
//             First Name
//             </label>
//             <input
//             type="text"
//             id="first_name"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={first_name}
//             onChange={(e) => setfirst_name(e.target.value)}
//             />
//         </div>
//         <div>
//             <label htmlFor="last_name" className="block text-sm font-medium text-gray-1000">
//             Last Name
//             </label>
//             <input
//             type="text"
//             id="last_name"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={last_name}
//             onChange={(e) => setlast_name(e.target.value)}
//             />
//         </div>
//     </div>
//     <div className="grid grid-cols-2 gap-4 mb-4">
//         {/* Email */}
//         <div className="mb-4">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-1000">
//             Email
//         </label>
//         <input
//             type="text"
//             id="email"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={email}
//             onChange={(e) => setemail(e.target.value)}
//         />
//         </div>

//         {/* Phone Number */}
//         <div className="mb-4">
//         <label htmlFor="phone_number" className="block text-sm font-medium text-gray-1000">
//             Phone Number
//         </label>
//         <input
//             type="text"
//             id="phone_number"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={phone_number}
//             onChange={(e) => setphone_number(e.target.value)}
//         />
//         </div>
//     </div>
//     <div className="grid grid-cols-2 gap-4 mb-4">
//         {/* Date of Birth */}
//         <div className="mb-4">
//         <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-1000">
//             Date Of Birth
//         </label>
//         <input
//             type="text"
//             id="date_of_birth"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={date_of_birth}
//             onChange={(e) => setdate_of_birth(e.target.value)}
//         />
//         </div>

//         {/* Hire Date */}
//         <div className="mb-4">
//         <label htmlFor="hire_date" className="block text-sm font-medium text-gray-1000">
//             Hire Date
//         </label>
//         <input
//             type="text"
//             id="hire_date"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={hire_date}
//             onChange={(e) => sethire_date(e.target.value)}
//         />
//         </div>
//     </div>

//     <div className="grid grid-cols-2 gap-4 mb-4">
//         {/* Position */}
//         <div className="mb-4">
//         <label htmlFor="position" className="block text-sm font-medium text-gray-1000">
//             Position
//         </label>
//         <input
//             type="text"
//             id="position"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={position}
//             onChange={(e) => setposition(e.target.value)}
//         />
//         </div>

//         {/* Department */}
//         <div className="mb-4">
//         <label htmlFor="department" className="block text-sm font-medium text-gray-1000">
//             Department
//         </label>
//         <input
//             type="text"
//             id="department"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={department}
//             onChange={(e) => setdepartment(e.target.value)}
//         />
//         </div>
//     </div>

//     <div className="grid grid-cols-2 gap-4 mb-4">
//         {/* Salary */}
//         <div className="mb-4">
//         <label htmlFor="salary" className="block text-sm font-medium text-gray-1000">
//             Salary
//         </label>
//         <input
//             type="text"
//             id="salary"
//             className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//             value={salary}
//             onChange={(e) => setsalary(e.target.value)}
//         />
//         </div>

//         {/* Upload Image */}
//         <div className="mb-4">
//         <label htmlFor="image" className="block text-sm font-medium text-gray-1000">
//             Upload Image
//         </label>
//         <input
//             type="file"
//             id="image"
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg 
//             file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 
//             hover:file:bg-indigo-100"
//             onChange={(e) => setImage(e.target.files?.[0] || null)}
//         />
//         </div>
//     </div>


//     <button
//       type="submit"
//       className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
//       text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
//       focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
//     >
//       Submit
//     </button>
//   </form>
// </div>

  
//   );
// };

// export default UpdateEmployee;



'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import Image from 'next/image';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  hire_date: string;
  position: string;
  department: string;
  salary: number;
  image?: string;
}

const UpdateEmployee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('empid'); // Changed from 'id' to 'empid' to match first code

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    hire_date: '',
    position: '',
    department: '',
    salary: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch employee data based on employeeId
  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!employeeId) return;
      
      try {
        setLoading(true);
        const res = await AxiosInstance.get(`/ecommerce/employee?id=${employeeId}`);
        const employeeData = res?.data?.data?.data[0]; // Matching the first code's data structure
        
        if (employeeData) {
          setFormData({
            first_name: employeeData.first_name || '',
            last_name: employeeData.last_name || '',
            email: employeeData.email || '',
            phone_number: employeeData.phone_number || '',
            date_of_birth: employeeData.date_of_birth || '',
            hire_date: employeeData.hire_date || '',
            position: employeeData.position || '',
            department: employeeData.department || '',
            salary: employeeData.salary?.toString() || ''
          });

          // Handle image preview if employee has an image (matching first code's implementation)
          if (employeeData.image) {
            const baseUrl = 'http://127.0.0.1:8000/';
            setImagePreview(`${baseUrl}${employeeData.image}`);
          } else {
            console.log('No image found for this employee.');
          }
        } else {
          console.error('No employee found with this ID:', employeeId);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image input and preview (matching first code's implementation)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle form submission to update employee details (matching first code's implementation)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', employeeId as string); // Directly append the employee ID as a string
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('date_of_birth', formData.date_of_birth);
      formDataToSend.append('hire_date', formData.hire_date);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('salary', formData.salary);

      if (image) formDataToSend.append('image', image); // Append new image only if selected

      const response = await AxiosInstance.patch(`/ecommerce/employee`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        console.log('Response:', response.data);
        router.push('/employeepage');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 ml-20">Loading employee data...</div>;
  }

  return (
    <div className="container mx-auto px-4 ml-20">
      <h2 className="mt-4 text-2xl font-bold mb-10">Update Employee Details:</h2>
      <form className="mt-2" onSubmit={handleSubmit}>
        {/* First Name and Last Name */}
        <div className="flex mb-4 space-x-20">
          <div className="w-1/3">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-1000">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-1000">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Email and Phone Number */}
        <div className="flex mb-4 space-x-20">
          <div className="w-1/3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-1000">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-1000">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Date of Birth and Hire Date */}
        <div className="flex mb-4 space-x-20">
          <div className="w-1/3">
            <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-1000">Date of Birth</label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.date_of_birth}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="hire_date" className="block text-sm font-medium text-gray-1000">Hire Date</label>
            <input
              type="date"
              id="hire_date"
              name="hire_date"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.hire_date}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Position and Department */}
        <div className="flex mb-4 space-x-20">
          <div className="w-1/3">
            <label htmlFor="position" className="block text-sm font-medium text-gray-1000">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="department" className="block text-sm font-medium text-gray-1000">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
              value={formData.department}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Salary */}
        <div className="mb-4 w-2/3">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-1000">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={formData.salary}
            onChange={handleInputChange}
          />
        </div>

        {/* Image Upload - matching first code's implementation */}
        <div className="mb-4 flex items-center space-x-4">
          <div className="relative">
            <label htmlFor="image" className="block text-sm font-medium text-gray-1000">Employee Image</label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="mt-1 inline-block px-4 py-2 border text-white rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Choose Image
            </label>
            <span className="ml-4 text-sm text-gray-600">
              {image ? image.name : "No file chosen"}
            </span>
          </div>
          {imagePreview && (
            <div className="w-40 h-25">
              <Image 
                src={imagePreview.trim()}
                alt="Employee" 
                className="h-24 w-24 object-cover"
                width={160}
                height={120}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 mb-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;