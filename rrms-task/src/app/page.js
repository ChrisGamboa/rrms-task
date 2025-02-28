'use client'
import React, { useState, useEffect } from 'react';
import { ProductTable } from './components/productCard';

const productButtonProps = {
  text: 'Products',
  color: 'bg-blue-600',
}
const cartButtonProps = {
  text: 'Carts',
  color: 'bg-green-700'
}

export default function Home() {
  const [openProducts, setOpenProducts] = useState(false);
  const [openCarts, setOpenCarts] = useState(false);

  return (
    <div className='flex-col'>
      <div className='flex flex-row justify-center'>
        <button className='flex w-auto rounded-xl m-2 p-4 bg-opacity-25 text-white text-base bg-blue-600' onClick={() => setOpenProducts(!openProducts)}>Products</button>
        <button className='flex w-auto rounded-xl m-2 p-4 bg-opacity-25 text-white text-base bg-green-700' onClick={() => setOpenCarts(!openCarts)}>Carts</button>
      </div>

      <div className='flex flex-row flex-wrap justify-center'>
        {openProducts && <ProductTable />}
      </div>
    </div>
  );
}