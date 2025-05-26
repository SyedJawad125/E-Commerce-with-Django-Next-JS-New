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

      {/* Main content area with slider and products */}
      <div className="flex flex-1">
        {/* Left slider taking 15% width */}
        <div className="w-[12%]">
          <PublicProductLeftSideSlider />
        </div>

        {/* Right product section taking remaining 85% */}
        <div className="w-[88%] ">
          <PublicProductsCom />
        </div>
      </div>

      {/* Footer at the bottom */}
      <FooterCom />
    </div>
  );
};

export default page;
