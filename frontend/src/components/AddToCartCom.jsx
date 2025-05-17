'use client';
import React, { useContext } from 'react';
import { CartContext } from "@/components/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const AddToCartPage = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const router = useRouter();

    const handleRemoveFromCart = (product) => {
        removeFromCart(product);
        toast.success('Product removed from cart');
    };

    const handleProceedToCheckout = () => {
        router.push('/checkoutpage');
    };

    const handleContinueShopping = () => {
        router.push('/publicproducts');
    };

    return (
        <div className="container mx-auto mt-4 mb-24 ml-52">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-3/4">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="bg-black shadow-lg rounded-lg p-4">
                            <img
                                src={`http://localhost:8000/${item.image}`}
                                alt="Product"
                                className="card-img-top w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h5 className="text-lg font-semibold">Name: {item.name}</h5>
                                <p className="text-white">Price: ${item.price}</p>
                                <div className="flex mt-4">
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600"
                                        onClick={() => handleRemoveFromCart(item)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full">Your cart is empty</p>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                        onClick={handleProceedToCheckout}
                    >
                        Proceed to Checkout
                    </button>
                    <button
                        className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default AddToCartPage;
