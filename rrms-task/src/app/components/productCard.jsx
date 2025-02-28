'use client'

import React, { useState, useEffect } from "react";
import Product from '../classes/product';

const ProductLabel = ({ label, value }) => {
    return (
        <div className = 'flex flex-row' >
            <p className='font-bold mr-2'>{label}: </p><p>{value}</p>
        </div >
    )
}

const ProductCard = ({ productInfo, onClose }) => {
    const labelCSS = 'font bold mr-2';

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xs">
            <div className='flex flex-row text-white bg-gray-800 rounded-2xl'>
                <div className='flex flex-col m-2 p-4 gap-4 rounded-lg'>
                    <button className='absolute top-2 right-2 rounded-3xl text-white bg-red-500 p-4' onClick={onClose}>Close</button>
                    <ProductLabel label='Name' value={productInfo.name} />
                    <ProductLabel label='Price' value={productInfo.price} />
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
            <td className='p-4'>{product.price}</td>
            <td className='p-4'>{product.category}</td>
            <td className='p-4'>{product.stock}</td>
        </tr>
    )
}

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
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
        setOpenModal(true);
    }

    return (
        <div>
            <table className='bg-gray-800 rounded-lg m-12'>
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

            {openModal && <ProductCard onClose={() => setOpenModal(false)} productInfo={modalProduct} />}
        </div>


    )
}


export { ProductCard, ProductRow, ProductTable };