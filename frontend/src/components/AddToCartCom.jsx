// 'use client';
// import React, { useContext } from 'react';
// import { CartContext } from "@/components/CartContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';

// const AddToCartPage = () => {
//     const { cartItems, removeFromCart } = useContext(CartContext);
//     const router = useRouter();

//     const handleRemoveFromCart = (product) => {
//         removeFromCart(product);
//         toast.success('Product removed from cart');
//     };

//     const handleProceedToCheckout = () => {
//         router.push('/checkoutpage');
//     };

//     const handleContinueShopping = () => {
//         router.push('/publicproducts');
//     };

//     return (
//         <div className="container mx-auto mt-4 mb-24 ml-52">
//             <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-3/4">
//                 {cartItems.length > 0 ? (
//                     cartItems.map((item) => (
//                         <div key={item.id} className="bg-black shadow-lg rounded-lg p-4">
//                             <img
//                                 src={`http://localhost:8000/${item.image}`}
//                                 alt="Product"
//                                 className="card-img-top w-full h-64 object-cover"
//                             />
//                             <div className="p-4">
//                                 <h5 className="text-lg font-semibold">Name: {item.name}</h5>
//                                 <p className="text-white">Price: ${item.price}</p>
//                                 <div className="flex mt-4">
//                                     <button
//                                         className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600"
//                                         onClick={() => handleRemoveFromCart(item)}
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-center col-span-full">Your cart is empty</p>
//                 )}
//             </div>

//             {cartItems.length > 0 && (
//                 <div className="flex justify-center mt-6 space-x-4">
//                     <button
//                         className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
//                         onClick={handleProceedToCheckout}
//                     >
//                         Proceed to Checkout
//                     </button>
//                     <button
//                         className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
//                         onClick={handleContinueShopping}
//                     >
//                         Continue Shopping
//                     </button>
//                 </div>
//             )}

//             <ToastContainer />
//         </div>
//     );
// };

// export default AddToCartPage;




'use client';
import React, { useContext } from 'react';
import { CartContext } from "@/components/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';

const AddToCartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const router = useRouter();

    const handleRemoveFromCart = (product) => {
        removeFromCart(product);
        toast.success('Item removed from your cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(item, newQuantity);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleProceedToCheckout = () => {
        router.push('/checkoutpage');
    };

    const handleContinueShopping = () => {
        router.push('/publicproducts');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-light tracking-wider text-gray-900 mb-2">Your Shopping Bag</h1>
                    <p className="text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="lg:w-2/3">
                            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
                                {/* Table Header */}
                                <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100">
                                    <div className="col-span-5 font-medium text-gray-500 uppercase text-xs tracking-wider">Product</div>
                                    <div className="col-span-2 font-medium text-gray-500 uppercase text-xs tracking-wider">Price</div>
                                    <div className="col-span-3 font-medium text-gray-500 uppercase text-xs tracking-wider">Quantity</div>
                                    <div className="col-span-2 font-medium text-gray-500 uppercase text-xs tracking-wider">Total</div>
                                </div>

                                {/* Cart Items */}
                                {cartItems.map((item) => (
                                    <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            {/* Product Info */}
                                            <div className="col-span-5 flex items-center">
                                                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={`http://localhost:8000/${item.image}`}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                    <button
                                                        onClick={() => handleRemoveFromCart(item)}
                                                        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-all"
                                                    >
                                                        <FaTimes className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="font-serif text-lg text-gray-900">{item.name}</h3>
                                                    <p className="text-gray-500 text-sm">{item.color || 'One Color'} / {item.size || 'One Size'}</p>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-2">
                                                <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                                            </div>

                                            {/* Quantity */}
                                            <div className="col-span-3">
                                                <div className="flex items-center border border-gray-200 rounded-md w-fit">
                                                    <button
                                                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                        className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <FaMinus className="h-3 w-3" />
                                                    </button>
                                                    <span className="px-4 py-1 text-center w-12">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                        className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <FaPlus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className="col-span-2">
                                                <p className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
                                <h2 className="text-xl font-serif font-light text-gray-900 mb-6">Order Summary</h2>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-gray-100 pb-4">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="text-gray-900 font-medium">${calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-4">
                                        <span className="text-gray-500">Shipping</span>
                                        <span className="text-gray-900 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-4">
                                        <span className="text-gray-500">Tax</span>
                                        <span className="text-gray-900 font-medium">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <span className="text-lg font-medium">Total</span>
                                        <span className="text-lg font-medium">${calculateTotal()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleProceedToCheckout}
                                    className="mt-2 w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={handleContinueShopping}
                                    className="mt-4 w-full bg-white text-black py-3 px-4 rounded-md border border-black hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
                                >
                                    <FiShoppingBag className="mr-2" />
                                    Continue Shopping
                                </button>

                                <p className="mt-6 text-center text-sm text-gray-500">
                                    Free shipping and returns on all orders
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Your bag is empty</h3>
                        <p className="mt-1 text-gray-500">Start adding some items to your bag</p>
                        <button
                            onClick={handleContinueShopping}
                            className="mt-8 bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors duration-300"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToCartPage;