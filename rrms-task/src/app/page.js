'use client'
import React, { useState, useEffect } from 'react';
import { ProductTable } from './components/productComponents';
import { CartsTable } from './components/cartsComponents';

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
        <h1 className='text-4xl justify-center m-4 p-4'>Rapid Response Inventory and Cart Management</h1>
      </div>
      <div className='flex flex-row justify-center'>
        <button className='flex w-auto rounded-xl m-2 p-4 bg-opacity-25 text-white text-base bg-blue-600 transition transform active:scale-90' onClick={() => setOpenProducts(!openProducts)}>Products </button>
        <button className='flex w-auto rounded-xl m-2 p-4 bg-opacity-25 text-white text-base bg-blue-600 transition transform active:scale-90' onClick={() => setOpenCarts(!openCarts)}>Carts 🛒</button>
      </div>

      <div className='flex flex-row justify-center'>
        <div>
          {openProducts && <h2 className='text-3xl m-4'>Products Table</h2>}
          {openProducts && <ProductTable closeTable={() => setOpenProducts(false)} />}
        </div>
        <div className='overflow-x-auto max-w-[90%]'>
          {openCarts && <h2 className='text-3xl m-4'>Carts Table</h2>}
          {openCarts && <CartsTable closeTable={() => setOpenCarts(false)} />}
        </div>
      </div>
    </div>
  );
}