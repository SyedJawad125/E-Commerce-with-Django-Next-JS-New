import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import PublicCategoriesCom from "@/components/PublicCategoriesCom";
import PublicCategoryLeftSideSlider from "@/components/PublicCategoryLeftSideSlider";



const page = () => {
  return (
    <div className="bg-gray-50">
      <TopNavbarCom/>
      <NavbarCom/>
      {/* <PublicCategoriesCom/> */}

      {/* Main content area with slider and products */}
      <div className="flex flex-1">
        {/* Left slider taking 12% width */}
        <div className="w-[12%]">
          <PublicCategoryLeftSideSlider />
        </div>

        {/* Right product section taking remaining 88% */}
        <div className="w-[88%] ">
          <PublicCategoriesCom />
        </div>
      </div>
      <FooterCom />
    </div>
  )
}

export default page