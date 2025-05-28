'use client'
import React from 'react'
import NewArrivalsCom from "@/components/NewArrivalsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import NewArrivalsPageLeftSideSlider from "@/components/NewArrivalsPageLeftSideSlider";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div className="bg-gray-50">
      <TopNavbarCom/>
      <NavbarCom/>
      <NewArrivalsCom/>
      {/* <div className="flex flex-1">   
        <div className="w-[12%]">
          <NewArrivalsPageLeftSideSlider />
        </div>
        <div className="w-[88%] ">
          <NewArrivalsCom />
        </div>
      </div> */}
      <FooterCom />
    </div>
  )
}

export default page