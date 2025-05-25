'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // for navigation
import { useSearchParams } from 'next/navigation'; // for query parameters
import AxiosInstance from "@/components/AxiosInstance";


type CategoryData = {
  id: string;
  name: string;
  description: string;
  image?: File;
};

const UpdateCategory = () => {
  const [data, setData] = useState<CategoryData | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // useEffect(() => {
  //   const queryData = searchParams.get('data');

  //   if (queryData) {
  //     try {
  //       const parsedData: CategoryData = JSON.parse(decodeURIComponent(queryData));
  //       setData(parsedData);
  //       setName(parsedData.name || '');
  //       setDescription(parsedData.description || '');
  //     } catch (error) {
  //       console.error('Failed to parse query data:', error);
  //     }
  //   } else {
  //     console.warn('No data found in query parameters');
  //   }
  // }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) {
      return; // Exit if data is null
    }

    try {
      const formData = new FormData();
      formData.append('id', data.id);
  
      formData.append('name', name);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      const response = await AxiosInstance.patch('/ecommerce/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response) {
        console.log('Response:', response.data);
        router.push('/category?message=Category Updated!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  if (!data) {
    return <div>Loading...</div>; // This will show if data is still null
  }

  return (
    <div className="container mx-auto mt-8 px-4 md:px-8">
      <h2 className="text-xl font-semibold mb-4">Update Category Here:</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="mt-1 block w-full text-md text-gray-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
