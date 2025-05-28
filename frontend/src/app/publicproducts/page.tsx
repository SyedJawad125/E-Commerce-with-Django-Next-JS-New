'use client'
import React from 'react'
import PublicProductsCom from "@/components/PublicProductsCom";
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

      
      {/* <div className="flex flex-1">
        <div className="w-[0%]">
          <PublicProductLeftSideSlider />
        </div>
        <div className="w-[100%] ">
          <PublicProductsCom />
        </div>
      </div> */}

      
       <PublicProductsCom />
      {/* Footer at the bottom */}
      <FooterCom />
    </div>
  );
};

export default page;
