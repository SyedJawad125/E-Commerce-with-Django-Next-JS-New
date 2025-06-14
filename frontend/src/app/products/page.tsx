'use client';
import React from 'react'
import ProductsCom from "@/components/ProductsCom";
import AdminSideNavbarCom from "@/components/AdminSideNavbarCom";



const page = () => {
  return (
     <div className="flex h-screen">
      
      <div className="w-[16%] bg-gray-800 text-white">
        <AdminSideNavbarCom />
      </div>
      <div className="w-[84%] p-6 bg-black">
        <ProductsCom />
      </div>
    </div> 
  )
}

export default page