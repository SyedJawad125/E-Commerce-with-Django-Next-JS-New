import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import PublicCategoriesCom from "@/components/PublicCategoriesCom";
import PublicProductLeftSideSlider from "@/components/PublicProductLeftSideSlider";



const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      {/* <PublicCategoriesCom/> */}

      {/* Main content area with slider and products */}
      <div className="flex flex-1">
        {/* Left slider taking 15% width */}
        <div className="w-[12%]">
          <PublicProductLeftSideSlider />
        </div>

        {/* Right product section taking remaining 85% */}
        <div className="w-[88%] ">
          <PublicCategoriesCom />
        </div>
      </div>
      <FooterCom />
    </div>
  )
}

export default page