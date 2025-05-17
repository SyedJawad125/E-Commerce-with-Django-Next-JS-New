'use client'
import React from 'react'
import NewArrivalsCom from "@/components/NewArrivalsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <NewArrivalsCom/>
      <FooterCom />
    </div>
  )
}

export default page