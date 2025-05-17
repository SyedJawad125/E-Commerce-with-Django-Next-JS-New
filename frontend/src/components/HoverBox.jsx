'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const HoverBox = ({ products }) => {
  const router = useRouter();

  const handleProductClick = (productId) => {
    router.push(`/productdetailpage?productId=${productId}`);
  };

  return (
    <div
  className="absolute bg-white shadow-lg p-5 grid grid-cols-2 gap-1"
  style={{
    top: '100%',
    left: 0,
    zIndex: 1000,
    width: '325px', // Adjust the width as needed
  }}
>
  {products.map((product) => (
    <div key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
      <img src={product.img1 || product.img2} alt={product.name} className="w-32 h-32 object-cover mb-4" />
      <div className="text-black text-base">{product.name}</div>
    </div>
  ))}
</div>
  );
};

export default HoverBox;
