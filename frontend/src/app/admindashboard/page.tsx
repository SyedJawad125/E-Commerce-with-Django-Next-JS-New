'use client'
import React from 'react'
import AdminSideNavbarCom from "@/components/AdminSideNavbarCom";
import AdminDashboardCom from "@/components/AdminDashboardCom";


const AdminDashborad = () => {
  return (
    <div className="flex h-screen">
      
      <div className="w-[16%] bg-gray-800 text-white">
        <AdminSideNavbarCom />
      </div>
      <div className="w-[84%] p-6 bg-black">
        <AdminDashboardCom />
      </div>
    </div> 
  )
}

export default AdminDashborad