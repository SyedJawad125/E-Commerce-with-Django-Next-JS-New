'use client'
import Image from "next/image";
import Link from 'next/link';
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import BannerSliderHomeCom from "@/components/BannerSliderHomeCom";
import PublicSalesProductsOnHome from "@/components/PublicSalesProductsOnHome";
import NewArrivalOnHome from "@/components/NewArrivalOnHome";
import PublicCategoriesOnHome from "@/components/PublicCategoriesOnHome";
import PublicProductsOnHome from "@/components/PublicProductsOnHome";
import KidsComOnHome from "@/components/KidsComOnHome";
import ContentpageHome from "@/components/ContentpageHome";
import AdModal from "@/components/AdModal";


export default function Home() {
  return (
    <div className="bg-gray-50">
    <AdModal />
    <TopNavbarCom />
    <NavbarCom />
    <BannerSliderHomeCom />
    <PublicSalesProductsOnHome />
    <PublicCategoriesOnHome />
    <KidsComOnHome />
    <NewArrivalOnHome />
    <PublicProductsOnHome />
    <FooterCom />
  </div>
  );
}

{/* <>
    <TopNavbarCom />
    <NavbarCom />
    <div className="flex flex-col min-h-screen">  
      {/* Container for main and footer */}
      // <main className="flex grow">  
        {/* Grow ensures main takes up available space */}
    //     <LeftSideSliderCom />
    //     <div className="ml-[15%] w-[85%]">
    //       <BannerSliderHomeCom />
    //     </div>
    //   </main>
    //   <FooterCom />
    // </div>
  // </> */}