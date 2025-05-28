'use client'
import React from 'react'
import PublicSalesProductsCom from "@/components/PublicSalesProductsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import PublicProductLeftSideSlider from "@/components/PublicProductLeftSideSlider";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top navbars */}
      <TopNavbarCom />
      <NavbarCom />
      <PublicSalesProductsCom />
      
      {/* <div className="flex flex-1">
        <div className="w-[12%]">
          <PublicProductLeftSideSlider />
        </div>
        <div className="w-[88%] ">
          <PublicSalesProductsCom />
        </div>
      </div> */}

      {/* Footer at the bottom */}
      <FooterCom />
    </div>
  );
};

export default page;
