'use client'

import React, { useState, useEffect } from "react";
import Product from '../classes/product';

const ProductLabel = ({ label, value }) => {
    return (
        <div className='flex flex-row' >
            <p className='font-bold mr-2'>{label}: </p><p>{value}</p>
        </div >
    )
}

const ProductInputInfo = ({ label }) => {
    return (
        <div className='grid-cols-2 grid gap-2'>
            <label className='font-bold mr-2 p-2'>{label}: </label>
            <input className='col-auto bg-gray-600 rounded-xl m-2 p-1' type='text' />
        </div>
    )
}

const AddProductModal = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xs">
            <div className='flex flex-row text-white bg-gray-800 rounded-2xl'>
                <div className='flex flex-col m-2 p-4 gap-4 rounded-lg'>
                    <button className='absolute top-2 right-2 rounded-3xl text-white bg-red-500 p-4' onClick={onClose}>Close</button>
                    <form className='flex flex-col'>
                        <ProductInputInfo label='Name' />
                        <ProductInputInfo label='Price' />
                        <ProductInputInfo label='Category' />
                        <ProductInputInfo label='Description' />
                        <ProductInputInfo label='Stock' />
                        <ProductInputInfo label='Rating' />
                        <ProductInputInfo label='Rating Count' />
                        <ProductInputInfo label='Image URL' />
                        <ProductInputInfo label='SKU' />
                        <button className='bg-blue-600 text-white p-2 m-4 rounded-xl'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ProductInfoModal = ({ productInfo, onClose }) => {
    const labelCSS = 'font bold mr-2';

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xs">
            <div className='flex flex-row text-white bg-gray-800 rounded-2xl'>
                <div className='flex flex-col m-2 p-4 gap-4 rounded-lg'>
                    <button className='absolute top-2 right-2 rounded-3xl text-white bg-red-500 p-4' onClick={onClose}>Close</button>
                    <ProductLabel label='Name' value={productInfo.name} />
                    <ProductLabel label='Price' value={'$' + productInfo.price} />
                    <ProductLabel label='Category' value={productInfo.category} />
                    <ProductLabel label='Description' value={productInfo.description} />
                    <ProductLabel label='Stock' value={productInfo.stock} />
                    <ProductLabel label='Rating' value={productInfo.rating} />
                    <ProductLabel label='Rating Count' value={productInfo.rating_count} />
                    <ProductLabel label='Image URL' value={productInfo.image_url} />
                    <ProductLabel label='SKU' value={productInfo.sku} />
                </div>
            </div>
        </div>

    )
}

const ProductRow = ({ product, onClick }) => {
    return (
        <tr className='text-lefts border border-gray-700' onClick={onClick}>
            <td className='p-4'>{product.name}</td>
            <td className='p-4'>{'$' + product.price}</td>
            <td className='p-4'>{product.category}</td>
            <td className='p-4'>{product.stock}</td>
        </tr>
    )
}

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [openProductInfoModal, setopenProductInfoModal] = useState(false);
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [modalProduct, setModalProduct] = useState({});

    useEffect(() => {
        fetch('https://api.jsoning.com/mock/public/products')
            .then(response => response.json())
            .then(data => {
                const newProducts = data.map(product => new Product(product));
                console.log(newProducts);
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
            })
    }, []);

    const handleRowClick = (product) => {
        setModalProduct(product);
        setopenProductInfoModal(true);
    }

    return (
        <div>
            <div className='flex flex-row justify-center'>
                <button className='flex w-auto rounded-xl m-2 p-4 bg-opacity-25 text-white text-base bg-green-600'
                onClick={() => setOpenAddProductModal(true)}>Add Product</button>
            </div>
            <table className='bg-gray-800 rounded-lg m-8'>
                <thead className='bg-gray-900 m-2 border-separate'>
                    <tr className='text-left border border-gray-700'>
                        <th className='p-4'>Name</th>
                        <th className='p-4'>Price</th>
                        <th className='p-4'>Category</th>
                        <th className='p-4'>Stock</th>
                    </tr>
                </thead>
                <tbody className='m-2'>
                    {products.map(product => (
                        <ProductRow onClick={() => handleRowClick(product)} product={product} key={product.id} />
                    ))}
                </tbody>
            </table>

            {openProductInfoModal && <ProductInfoModal onClose={() => setopenProductInfoModal(false)} productInfo={modalProduct} />}
            {openAddProductModal && <AddProductModal onClose={() => setOpenAddProductModal(false)} />}
        </div>


    )
}


export { ProductTable };