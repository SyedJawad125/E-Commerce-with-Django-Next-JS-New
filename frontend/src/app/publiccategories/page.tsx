import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import PublicCategoriesCom from "@/components/PublicCategoriesCom";


const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <PublicCategoriesCom/>
      <FooterCom />
    </div>
  )
}

export default page