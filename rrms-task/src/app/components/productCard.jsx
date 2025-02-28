'use client'

import React, { useState, useEffect } from "react";
import Product from '../classes/product';

const ProductCard = ({ productInfo }) => {
    return (
        <div className='flex flex-row text-white bg-gray-800'>
            <div className='flex flex-col m-2 p-4 gap-4'>
                <h3>{productInfo.name}</h3>
                <p>{productInfo.price}</p>
                <p>{productInfo.category}</p>
                <p>{productInfo.description}</p>
                <p>{productInfo.stock}</p>
                <p>{productInfo.rating}</p>
                <p>{productInfo.image_url}</p>
                <p>{productInfo.sku}</p>
            </div>
        </div>
    )
}

const ProductRow = ({ product }) => {
    return (
        <tr className='text-lefts border border-gray-700'>
            <td className='p-4'>{product.name}</td>
            <td className='p-4'>{product.price}</td>
            <td className='p-4'>{product.category}</td>
            <td className='p-4'>{product.stock}</td>
        </tr>
    )
}

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://api.jsoning.com/mock/public/products')
            .then(response => response.json())
            .then(data => {
                const newProducts = data.map(product => new Product(product));
                console.log(newProducts);
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
            })
    }, []);

    return (
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
                    <ProductRow product={product} key={product.id} />
                ))}
            </tbody>
        </table>
    )
}


export { ProductCard, ProductRow, ProductTable };