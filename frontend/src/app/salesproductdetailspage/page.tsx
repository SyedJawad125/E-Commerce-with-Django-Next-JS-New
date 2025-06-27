'use client'
import React from 'react'
import SalesProductDetailsCom from "@/components/SalesProductDetailsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <SalesProductDetailsCom/>
      <FooterCom />

    </div>
  )
}

export default page