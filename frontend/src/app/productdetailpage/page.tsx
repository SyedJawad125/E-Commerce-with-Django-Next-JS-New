'use client'
import React from 'react'
import ProductDetailsCom from "@/components/ProductDetailsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <ProductDetailsCom/>
      <FooterCom/>
    </div>
  )
}

export default page