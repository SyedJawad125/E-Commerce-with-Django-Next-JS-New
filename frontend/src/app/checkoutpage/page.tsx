'use client'
import React from 'react'
import CheckOutCom from "@/components/CheckOutCom";
import TopNavbarCom from '@/components/TopNavbarCom';
import NavbarCom from '@/components/NavbarCom';


const page = () => {
  return (
    <div>
        <TopNavbarCom/>
        <NavbarCom/>
        <CheckOutCom/>
    </div>
  )
}

export default page