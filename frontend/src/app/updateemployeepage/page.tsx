// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
// import AxiosInstance from "@/components/AxiosInstance";
// import Image from 'next/image';

// interface Employee {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   date_of_birth: string;
//   hire_date: string;
//   position: string;
//   department: string;
//   salary: number;
// }

// const UpdateEmployee = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const employeeId = searchParams.get('empid'); // Extract employee ID from query params

//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone_number, setPhoneNumber] = useState('');
//   const [date_of_birth, setDateOfBirth] = useState('');
//   const [hire_date, setHireDate] = useState('');
//   const [position, setPosition] = useState('');
//   const [department, setDepartment] = useState('');
//   const [salary, setSalary] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
//   const [employeeRecords, setEmployeeRecords] = useState<Employee[]>([]);

//   // Fetch employee data based on employeeId
//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       if (employeeId) {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/employee?id=${employeeId}`);
//           const employeeData = res?.data?.data?.data[0]; // Assuming the data is an array
//           if (employeeData) {
//             // Set employee details
//             setFirstName(employeeData.first_name);
//             setLastName(employeeData.last_name);
//             setEmail(employeeData.email);
//             setPhoneNumber(employeeData.phone_number);
//             setDateOfBirth(employeeData.date_of_birth);
//             setHireDate(employeeData.hire_date);
//             setPosition(employeeData.position);
//             setDepartment(employeeData.department);
//             setSalary(employeeData.salary.toString());
  
//             // Handle image preview if employee has an image
//             if (employeeData.image) {
//               // Assuming `employeeData.image` contains just the image filename
//               const baseUrl = ' http://127.0.0.1:8000/'; // Replace with your actual backend base URL
//               setImagePreview(`${baseUrl}${employeeData.image}`);
//             } else {
//               console.log('No image found for this employee.');
//             }
//           } else {
//             console.error('No employee found with this ID:', employeeId);
//           }
//         } catch (error) {
//           console.error('Error fetching employee data:', error);
//         }
//       }
//     };
  
//     fetchEmployeeData();
//   }, [employeeId]);
  

//   // Handle image input and preview
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;

//     if (file && !file.type.startsWith("image/")) {
//       alert("Please select a valid image file.");
//       return;
//     }

//     setImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   };

//   // Handle form submission to update employee details
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('id', employeeId as string); // Directly append the employee ID as a string
//       formData.append('first_name', first_name);
//       formData.append('last_name', last_name);
//       formData.append('email', email);
//       formData.append('phone_number', phone_number);
//       formData.append('date_of_birth', date_of_birth);
//       formData.append('hire_date', hire_date);
//       formData.append('position', position);
//       formData.append('department', department);
//       formData.append('salary', salary);

//       if (image) formData.append('image', image); // Append new image only if selected

//       const response = await AxiosInstance.patch(`/ecommerce/employee`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response) {
//         console.log('Response:', response.data);
//         router.push('/employeepage');
//       }
//     } catch (error) {
//       console.error('Error updating employee:', error);
//     }
//   };

//   return (
// <div className="container mx-auto px-4 ml-20">
//   <h2 className="mt-4 text-2xl font-bold mb-10">Update Employee Details:</h2>
//   <form className="mt-2" onSubmit={handleSubmit}>
//     {/* First Name and Last Name */}
//     <div className="flex mb-4 space-x-20">
//       <div className="w-1/3">
//         <label htmlFor="first_name" className="block text-sm font-medium text-gray-1000">First Name</label>
//         <input
//           type="text"
//           id="first_name"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={first_name}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </div>
//       <div className="w-1/3">
//         <label htmlFor="last_name" className="block text-sm font-medium text-gray-1000">Last Name</label>
//         <input
//           type="text"
//           id="last_name"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={last_name}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//       </div>
//     </div>

//     {/* Email and Phone Number */}
//     <div className="flex mb-4 space-x-20">
//       <div className="w-1/3">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-1000">Email</label>
//         <input
//           type="email"
//           id="email"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="w-1/3">
//         <label htmlFor="phone_number" className="block text-sm font-medium text-gray-1000">Phone Number</label>
//         <input
//           type="text"
//           id="phone_number"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={phone_number}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//         />
//       </div>
//     </div>

//     {/* Date of Birth and Hire Date */}
//     <div className="flex mb-4 space-x-20">
//       <div className="w-1/3">
//         <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-1000">Date of Birth</label>
//         <input
//           type="date"
//           id="date_of_birth"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={date_of_birth}
//           onChange={(e) => setDateOfBirth(e.target.value)}
//         />
//       </div>
//       <div className="w-1/3">
//         <label htmlFor="hire_date" className="block text-sm font-medium text-gray-1000">Hire Date</label>
//         <input
//           type="date"
//           id="hire_date"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={hire_date}
//           onChange={(e) => setHireDate(e.target.value)}
//         />
//       </div>
//     </div>

//     {/* Position and Department */}
//     <div className="flex mb-4 space-x-20">
//       <div className="w-1/3">
//         <label htmlFor="position" className="block text-sm font-medium text-gray-1000">Position</label>
//         <input
//           type="text"
//           id="position"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={position}
//           onChange={(e) => setPosition(e.target.value)}
//         />
//       </div>
//       <div className="w-1/3">
//         <label htmlFor="department" className="block text-sm font-medium text-gray-1000">Department</label>
//         <input
//           type="text"
//           id="department"
//           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//         />
//       </div>
//     </div>

//     {/* Salary */}
//     <div className="mb-4 w-2/3">
//       <label htmlFor="salary" className="block text-sm font-medium text-gray-1000">Salary</label>
//       <input
//         type="number"
//         id="salary"
//         className="mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
//         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
//         value={salary}
//         onChange={(e) => setSalary(e.target.value)}
//       />
//     </div>

//     {/* Image Upload */}
//     <div className="mb-4 flex items-center space-x-4">
//       <div className="relative">
//         <label htmlFor="image" className="block text-sm font-medium text-gray-1000">Employee Image</label>
//         <input
//           type="file"
//           id="image"
//           className="hidden"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//         <label
//           htmlFor="image"
//           className="mt-1 inline-block px-4 py-2 border text-white rounded-lg cursor-pointer hover:bg-blue-600"
//         >
//           Choose Image
//         </label>
//         <span className="ml-4 text-sm text-gray-600">
//           {image ? image.name : "No file chosen"}
//         </span>
//       </div>
//       {imagePreview && (
//         <div className="w-40 h-25">
//           <Image src={imagePreview.trim()}
//           alt="Employee" 
//           className="h-24 w-24 object-cover"
//           width={160}
//           height={120}
//            />
//         </div>
//       )}
//     </div>

//     <button
//       type="submit"
//       className="px-6 py-2 mb-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//     >
//       Update Employee
//     </button>
//   </form>
// </div>

//   );
// };

// export default UpdateEmployee;





'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

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
}

const UpdateProduct = () => {
  const router = useRouter();
  
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
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('date_of_birth', formData.date_of_birth);
      formDataToSend.append('hire_date', formData.hire_date);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('salary', formData.salary);

      if (image) formDataToSend.append('image', image);

      const response = await AxiosInstance.patch('/ecommerce/employee', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response) {
        router.push('/employeepage');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Edit Employee</h2>
            <p className="mt-1 text-indigo-100">Fill in the details below to edit employee data</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </div>

              {/* Hire Date */}
              <div>
                <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Hire Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="hire_date"
                  name="hire_date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.hire_date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Upload Image */}
              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Photo
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Photo
                    </span>
                    <input
                      type="file"
                      id="image"
                      className="sr-only"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      accept="image/*"
                    />
                  </label>
                  {image && (
                    <span className="ml-4 text-sm text-gray-600">{image.name}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => router.push('/employeepage')}
                className="mr-4 px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;