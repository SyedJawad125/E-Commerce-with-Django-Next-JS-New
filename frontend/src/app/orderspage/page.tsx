'use client';
import React from 'react'
import OrdersCom from "@/components/OrdersCom";
import AdminSideNavbarCom from "@/components/AdminSideNavbarCom";



const page = () => {
  return (
     <div className="flex h-screen">
      
      <div className="w-[16%] bg-gray-800 text-white">
        <AdminSideNavbarCom />
      </div>
      <div className="w-[84%] p-6 bg-black">
        <OrdersCom />
      </div>
    </div> 
  )
}

export default page


{/* <div className="flex h-screen">
      
      <div className="w-[15%] bg-gray-800 text-white">
        <AdminDashboardCom />
      </div>
      <div className="w-[85%] p-6 bg-gray-100">
        <ProductsCom />
      </div>
    </div> */}