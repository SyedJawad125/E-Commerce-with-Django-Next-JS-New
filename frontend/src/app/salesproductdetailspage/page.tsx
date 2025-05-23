'use client'
import React from 'react'
import SalesProductDetailsCom from "@/components/SalesProductDetailsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <SalesProductDetailsCom/>
    </div>
  )
}

export default page