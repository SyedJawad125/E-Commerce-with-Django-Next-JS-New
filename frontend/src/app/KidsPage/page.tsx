'use client'
import React from 'react'
import KidsCom from "@/components/KidsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import NewArrivalsPageLeftSideSlider from "@/components/NewArrivalsPageLeftSideSlider";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div className="bg-gray-50">
      <TopNavbarCom/>
      <NavbarCom/>
      <KidsCom/>
      <FooterCom />
    </div>
  )
}

export default page