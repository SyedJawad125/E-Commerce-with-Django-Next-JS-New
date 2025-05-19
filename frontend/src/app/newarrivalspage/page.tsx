'use client'
import React from 'react'
import NewArrivalsCom from "@/components/NewArrivalsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import NewArrivalsPageLeftSideSlider from "@/components/NewArrivalsPageLeftSideSlider";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      {/* <NewArrivalsCom/> */}
      {/* Main content area with slider and products */}
      <div className="flex flex-1">
        {/* Left slider taking 12% width */}
        <div className="w-[12%]">
          <NewArrivalsPageLeftSideSlider />
        </div>

        {/* Right product section taking remaining 88% */}
        <div className="w-[88%] ">
          <NewArrivalsCom />
        </div>
      </div>
      <FooterCom />
    </div>
  )
}

export default page