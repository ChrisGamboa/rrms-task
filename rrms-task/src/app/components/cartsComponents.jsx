import React, { useState, useEffect } from 'react';
import Carts from '../classes/carts';
import User from '../classes/user';
import CartsAndUsers from '../classes/cartsAndUsers'

const abandonedUser = {
    id: 'Abandoned',
    firstname: 'Abandoned',
    lastname: 'Abandoned',
    email: 'Abandoned',
    username: 'Abandoned',
    address: 'Abandoned',
    city: 'Abandoned',
    state: 'Abandoned',
    zipcode: 'Abandoned',
    country: 'Abandoned',
    phone: 'Abandoned',
}

const CartLabel = ({ label, value }) => {
    return (
        <div className='grid grid-cols-2 grid-cols-[30%_70%] border-b border-gray-600 my-4' >
            <p className='font-bold'>{label}: </p>
            <p className='overflow-truncate'>{value}</p>
        </div >
    )
}

const CartProductLabel = ({ item }) => {
    const [productInfo, setProductInfo] = useState({});

    useEffect(() => {
        fetch(`https://api.jsoning.com/mock/public/products/${item.productId}`)
            .then(response => response.json())
            .then(productData => {
                setProductInfo({ name: productData.name, description: productData.description });
            })

    })
    return (
        <div>
            <div className='grid grid-cols-1 border-b border-gray-600 my-4' >
                <div className='grid-cols-2 m-2'>
                    <p className='font-bold'>Product Name:</p>
                    <p className=''>{productInfo.name}</p>
                </div>
                <div className='grid-cols-2 m-2'>
                    <p className='font-bold'>Product Description:</p>
                    <p className=''>{productInfo.description}</p>
                </div>
                <div className='grid-cols-2 m-2'>
                    <p className='font-bold'>Quantity:</p>
                    <p className=''>{item.quantity}</p>
                </div>
            </div >

        </div>
    )
}

const CartInfoModal = ({ cartAndUser, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-xs">
            <div className='h-[70dvh] md:h-[70dvh] overflow-y-scroll w-auto text-white bg-gray-800 rounded-2xl'>
                <div className='m-2 p-2 rounded-lg'>
                    <h2 className='font-bold flex justify-left text-2xl ml-8 mb-2'>Cart Details</h2>
                    <CartLabel label='First Name' value={cartAndUser.user.firstname} />
                    <CartLabel label='Last Name' value={cartAndUser.user.lastname} />
                    <CartLabel label='E-Mail' value={cartAndUser.user.email} />
                    <CartLabel label='City' value={cartAndUser.user.city} />
                    <CartLabel label='State' value={cartAndUser.user.state} />
                    <CartLabel label='Zipcode' value={cartAndUser.user.zipcode} />
                    <CartLabel label='Phone Number' value={cartAndUser.user.phone} />
                    <h2 className='font-bold text-xl'>Items</h2>
                    {cartAndUser.cart.items.map(item => (
                        <CartProductLabel item={item} key={item.productId} />
                    ))}
                </div>
                <div className='flex justify-center'>
                    <button className='rounded-xl text-white bg-red-500 p-3 px-8 m-4 transition transform active:scale-90' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>

    )
}

const CartsRow = ({ cartAndUser, onClick }) => {
    let numOfItems = cartAndUser.cart.items.map(item => item.quantity).reduce((a, b) => a + b, 0);
    console.log(cartAndUser)
    return (
        <tr className='text-lefts border border-gray-700' onClick={onClick}>
            <td className='p-4'>{cartAndUser.user.firstname}</td>
            <td className='p-4'>{cartAndUser.user.lastname}</td>
            <td className='p-4'>{cartAndUser.cart.date}</td>
            <td className='p-4'>{cartAndUser.cart.status}</td>
            <td className='p-4'>{numOfItems}</td>
        </tr>
    )
}


const CartsTable = ({ closeTable }) => {
    const [modalCart, setModalCart] = useState({});
    const [openCartInfoModal, setOpenCartInfoModal] = useState(false);
    const [cartAndUsers, setCartAndUsers] = useState([]);

    useEffect(() => {
        fetch('https://api.jsoning.com/mock/public/carts')
            .then(response => response.json())
            .then(async (cartsResponse) => {
                // Convert response into Carts objects
                const newCarts = cartsResponse.map(cart => new Carts(cart));

                // Fetch users for each cart using Promise.all()
                const cartsAndUsers = await Promise.all(newCarts.map(async (cart) => {
                    let userData;

                    try {
                        const response = await fetch(`https://api.jsoning.com/mock/public/users/${cart.userId}`);

                        if (response.ok) {
                            userData = await response.json();
                            console.log(`User found for cart ${cart.id}:`, userData); // ✅ Debugging
                        } else {
                            console.warn(`User not found for cart ${cart.id}, using abandoned user`);
                            userData = abandonedUser;
                        }
                    } catch (error) {
                        console.error(`Error fetching user ${cart.userId}:`, error);
                        userData = abandonedUser;
                    }

                    const newCartsAndUsers = new CartsAndUsers(cart, new User(userData));
                    console.log("Constructed CartsAndUsers:", newCartsAndUsers); // ✅ Debugging
                    return newCartsAndUsers;
                }));
                setCartAndUsers(cartsAndUsers);
            })
            .catch(error => console.error("Error fetching carts:", error));
    }, []);

    const handleRowClick = (cartAndUser) => {
        setModalCart(cartAndUser);
        setOpenCartInfoModal(true);
    }

    return (
        <div>
            <table className='w-full bg-gray-800 rounded-l m-2'>
                <thead className='bg-gray-900 border-separate rounded-l'>
                    <tr className='text-left border border-gray-700'>
                        <th className='p-2 sm:p-4'>First Name</th>
                        <th className='p-2 sm:p-4'>Last Name</th>
                        <th className='p-2 sm:p-4'>Date</th>
                        <th className='p-2 sm:p-4'>Status</th>
                        <th className='p-2 sm:p-4'># of items</th>
                    </tr>
                </thead>
                <tbody className='m-2'>
                    {cartAndUsers.map(userCart => (
                        <CartsRow onClick={() => handleRowClick(userCart)} cartAndUser={userCart} key={userCart.cart.id} />
                    ))}
                </tbody>
            </table>
            <div className='flex flex-row justify-center'>
                <button className='flex w-auto rounded-xl m-2 p-4 bg-opacity-25 text-white text-base bg-red-500 transition transform active:scale-90'
                    onClick={closeTable}>Close</button>
            </div>
            {openCartInfoModal && <CartInfoModal onClose={() => setOpenCartInfoModal(false)} cartAndUser={modalCart} />}
        </div>
    )
}

export { CartsTable };