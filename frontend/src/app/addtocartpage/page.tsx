'use client'
import React from 'react'
import AddToCartCom from '@/components/AddToCartCom';
import TopNavbarCom from '@/components/TopNavbarCom';
import NavbarCom from '@/components/NavbarCom';

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <AddToCartCom/>
    </div>
  )
}

export default page