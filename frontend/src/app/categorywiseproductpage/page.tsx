import React from 'react'
import CategoryWiseProductCom from "@/components/CategoryWiseProductCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div className="bg-gray-50">
        <TopNavbarCom/>
        <NavbarCom/>
        <CategoryWiseProductCom/>
        <FooterCom />
    </div>
  )
}

export default page