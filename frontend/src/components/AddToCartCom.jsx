// 'use client';
// import React, { useContext } from 'react';
// import { CartContext } from "@/components/CartContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';
// import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
// import { FiShoppingBag } from 'react-icons/fi';

// // Helper function to safely format prices
// const formatPrice = (price) => {
//   if (price === null || price === undefined) return '0.00';
//   const num = typeof price === 'number' ? price : parseFloat(price);
//   return isNaN(num) ? '0.00' : num.toFixed(2);
// };

// const AddToCartPage = () => {
//     const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
//     const router = useRouter();

//     const handleRemoveFromCart = (product) => {
//         removeFromCart(product);
//         toast.success('Item removed from your cart', {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//         });
//     };

//     const handleQuantityChange = (item, newQuantity) => {
//         if (newQuantity < 1) return;
//         updateQuantity(item, newQuantity);
//     };

//     const calculateTotal = () => {
//         return cartItems.reduce((total, item) => {
//             // Use final_price if it exists (sale product), otherwise use price
//             const price = item.final_price !== undefined ? item.final_price : item.price;
//             return total + (parseFloat(price) * item.quantity);
//         }, 0).toFixed(2);
//     };

//     const handleProceedToCheckout = () => {
//         router.push('/checkoutpage');
//     };

//     const handleContinueShopping = () => {
//         router.push('/publicproducts');
//     };

//     // Helper function to get the display price of an item
//     const getDisplayPrice = (item) => {
//         const price = item.final_price !== undefined ? item.final_price : item.price;
//         return formatPrice(price);
//     };

//     // Helper function to get the display total for an item
//     const getDisplayTotal = (item) => {
//         const price = item.final_price !== undefined ? item.final_price : item.price;
//         return (parseFloat(price) * item.quantity).toFixed(2);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//             <ToastContainer 
//                 position="top-right"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//             />
            
//             <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-serif font-light tracking-wider text-gray-900 mb-2">Your Shopping Bag</h1>
//                     <p className="text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
//                 </div>

//                 {cartItems.length > 0 ? (
//                     <div className="flex flex-col lg:flex-row gap-12">
//                         {/* Cart Items */}
//                         <div className="lg:w-2/3">
//                             <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
//                                 {/* Table Header */}
//                                 <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100">
//                                     <div className="col-span-5 font-medium text-gray-500 uppercase text-xs tracking-wider">Product</div>
//                                     <div className="col-span-2 font-medium text-gray-500 uppercase text-xs tracking-wider">Price</div>
//                                     <div className="col-span-3 font-medium text-gray-500 uppercase text-xs tracking-wider">Quantity</div>
//                                     <div className="col-span-2 font-medium text-gray-500 uppercase text-xs tracking-wider">Total</div>
//                                 </div>

//                                 {/* Cart Items */}
//                                 {cartItems.map((item) => (
//                                     <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
//                                         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
//                                             {/* Product Info */}
//                                             <div className="col-span-5 flex items-center">
//                                                 <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                                                     <img
//                                                         src={`http://localhost:8000/${item.image}`}
//                                                         alt={item.name}
//                                                         className="h-full w-full object-cover object-center"
//                                                     />
//                                                     <button
//                                                         onClick={() => handleRemoveFromCart(item)}
//                                                         className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-all"
//                                                     >
//                                                         <FaTimes className="h-3 w-3" />
//                                                     </button>
//                                                 </div>
//                                                 <div className="ml-4">
//                                                     <h3 className="font-serif text-lg text-gray-900">{item.name}</h3>
//                                                     <p className="text-gray-500 text-sm">{item.color || 'One Color'} / {item.size || 'One Size'}</p>
//                                                     {/* Show discount info if it's a sale product */}
//                                                     {item.discount_percent > 0 && (
//                                                         <p className="text-red-600 text-sm mt-1">
//                                                             {item.discount_percent}% OFF (Was ${formatPrice(item.original_price)})
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             {/* Price */}
//                                             <div className="col-span-2">
//                                                 <p className="text-gray-900 font-medium">${getDisplayPrice(item)}</p>
//                                             </div>

//                                             {/* Quantity */}
//                                             <div className="col-span-3">
//                                                 <div className="flex items-center border border-gray-200 rounded-md w-fit">
//                                                     <button
//                                                         onClick={() => handleQuantityChange(item, item.quantity - 1)}
//                                                         className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
//                                                     >
//                                                         <FaMinus className="h-3 w-3" />
//                                                     </button>
//                                                     <span className="px-4 py-1 text-center w-12">{item.quantity}</span>
//                                                     <button
//                                                         onClick={() => handleQuantityChange(item, item.quantity + 1)}
//                                                         className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
//                                                     >
//                                                         <FaPlus className="h-3 w-3" />
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                             {/* Total */}
//                                             <div className="col-span-2">
//                                                 <p className="text-gray-900 font-medium">${getDisplayTotal(item)}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Order Summary */}
//                         <div className="lg:w-1/3">
//                             <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
//                                 <h2 className="text-xl font-serif font-light text-gray-900 mb-6">Order Summary</h2>
                                
//                                 <div className="space-y-4">
//                                     <div className="flex justify-between border-b border-gray-100 pb-4">
//                                         <span className="text-gray-500">Subtotal</span>
//                                         <span className="text-gray-900 font-medium">${calculateTotal()}</span>
//                                     </div>
//                                     <div className="flex justify-between border-b border-gray-100 pb-4">
//                                         <span className="text-gray-500">Shipping</span>
//                                         <span className="text-gray-900 font-medium">Free</span>
//                                     </div>
//                                     <div className="flex justify-between border-b border-gray-100 pb-4">
//                                         <span className="text-gray-500">Tax</span>
//                                         <span className="text-gray-900 font-medium">Calculated at checkout</span>
//                                     </div>
//                                     <div className="flex justify-between pt-4">
//                                         <span className="text-lg font-medium">Total</span>
//                                         <span className="text-lg font-medium">${calculateTotal()}</span>
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={handleProceedToCheckout}
//                                     className="mt-2 w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
//                                 >
//                                     Proceed to Checkout
//                                 </button>

//                                 <button
//                                     onClick={handleContinueShopping}
//                                     className="mt-4 w-full bg-white text-black py-3 px-4 rounded-md border border-black hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
//                                 >
//                                     <FiShoppingBag className="mr-2" />
//                                     Continue Shopping
//                                 </button>

//                                 <p className="mt-6 text-center text-sm text-gray-500">
//                                     Free shipping and returns on all orders
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-center py-16">
//                         <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
//                         <h3 className="mt-4 text-lg font-medium text-gray-900">Your bag is empty</h3>
//                         <p className="mt-1 text-gray-500">Start adding some items to your bag</p>
//                         <button
//                             onClick={handleContinueShopping}
//                             className="mt-8 bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors duration-300"
//                         >
//                             Continue Shopping
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AddToCartPage;




// 'use client';
// import React, { useContext } from 'react';
// import { CartContext } from "@/components/CartContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation';
// import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
// import { FiShoppingBag } from 'react-icons/fi';

// const formatPrice = (price) => {
//   if (price === null || price === undefined) return '0.00';
//   const num = typeof price === 'number' ? price : parseFloat(price);
//   return isNaN(num) ? '0.00' : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// };

// const AddToCartPage = () => {
//     const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
//     const router = useRouter();

//     const handleRemoveFromCart = (product) => {
//         removeFromCart(product);
//         toast.success('Item removed from your cart', {
//             position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//         });
//     };

//     const handleQuantityChange = (item, newQuantity) => {
//         if (newQuantity < 1) return;
//         updateQuantity(item, newQuantity);
//     };

//     const calculateTotal = () => {
//         return cartItems.reduce((total, item) => {
//             const price = item.final_price !== undefined ? item.final_price : item.price;
//             return total + (parseFloat(price) * item.quantity);
//         }, 0);
//     };

//     const handleProceedToCheckout = () => {
//         if (cartItems.length === 0) {
//             toast.error('Your cart is empty');
//             return;
//         }
//         router.push('/checkoutpage');
//     };

//     const handleContinueShopping = () => {
//         router.push('/publicproducts');
//     };

//     const getDisplayPrice = (item) => {
//         const price = item.final_price !== undefined ? item.final_price : item.price;
//         return formatPrice(price);
//     };

//     const getDisplayTotal = (item) => {
//         const price = item.final_price !== undefined ? item.final_price : item.price;
//         return formatPrice(parseFloat(price)) * item.quantity;
//     };

//     // Prepare cart items in backend-compatible format
//     const getBackendCompatibleItems = () => {
//         return cartItems.map(item => ({
//             product_type: item.isSalesProduct ? 'sales_product' : 'product',
//             product_id: item.id,
//             quantity: item.quantity
//         }));
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//             <ToastContainer 
//                 position="top-right"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//             />
            
            
//             <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-serif font-light tracking-wider text-gray-900 mb-2">Your Shopping Bag</h1>
//                     <p className="text-gray-500">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</p>
//                 </div>

//                 {cartItems.length > 0 ? (
//                     <div className="flex flex-col lg:flex-row gap-12">
//                         {/* Cart Items */}
//                         <div className="lg:w-2/3">
//                             <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
//                                 {/* Table Header */}
//                                 <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100">
//                                     <div className="col-span-5 font-medium text-gray-500 uppercase text-xs tracking-wider">Product</div>
//                                     <div className="col-span-2 font-medium text-gray-500 uppercase text-xs tracking-wider">Price</div>
//                                     <div className="col-span-3 font-medium text-gray-500 uppercase text-xs tracking-wider">Quantity</div>
//                                     <div className="col-span-2 font-medium text-gray-500 uppercase text-xs tracking-wider">Total</div>
//                                 </div>

//                                 {/* Cart Items */}
//                                 {cartItems.map((item) => (
//                                     <div key={`${item.id}-${item.size}-${item.color}`} className="p-4 border-b border-gray-100 last:border-b-0">
//                                         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
//                                             {/* Product Info */}
//                                             <div className="col-span-5 flex items-center">
//                                                 <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                                                     <img
//                                                         src={`http://localhost:8000${item.image}`}
//                                                         alt={item.name}
//                                                         className="h-full w-full object-cover object-center"
//                                                     />
//                                                     <button
//                                                         onClick={() => handleRemoveFromCart(item)}
//                                                         className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70 transition-all"
//                                                     >
//                                                         <FaTimes className="h-3 w-3" />
//                                                     </button>
//                                                 </div>
//                                                 <div className="ml-4">
//                                                     <h3 className="font-serif text-lg text-gray-900">{item.name}</h3>
//                                                     <p className="text-gray-500 text-sm">
//                                                         {item.color || 'One Color'} / {item.size || 'One Size'}
//                                                     </p>
//                                                     {item.discount_percent > 0 && (
//                                                         <p className="text-red-600 text-sm mt-1">
//                                                             {item.discount_percent}% OFF (Was ${formatPrice(item.original_price)})
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             {/* Price */}
//                                             <div className="col-span-2">
//                                                 <p className="text-gray-900 font-medium">${getDisplayPrice(item)}</p>
//                                             </div>

//                                             {/* Quantity */}
//                                             <div className="col-span-3">
//                                                 <div className="flex items-center border border-gray-200 rounded-md w-fit">
//                                                     <button
//                                                         onClick={() => handleQuantityChange(item, item.quantity - 1)}
//                                                         className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
//                                                     >
//                                                         <FaMinus className="h-3 w-3" />
//                                                     </button>
//                                                     <span className="px-4 py-1 text-center w-12">{item.quantity}</span>
//                                                     <button
//                                                         onClick={() => handleQuantityChange(item, item.quantity + 1)}
//                                                         className="px-3 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
//                                                     >
//                                                         <FaPlus className="h-3 w-3" />
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                             {/* Total */}
//                                             <div className="col-span-2">
//                                                 <p className="text-gray-900 font-medium">${getDisplayTotal(item)}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Order Summary */}
//                         <div className="lg:w-1/3">
//                             <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
//                                 <h2 className="text-xl font-serif font-light text-gray-900 mb-6">Order Summary</h2>
                                
//                                 <div className="space-y-4">
//                                     <div className="flex justify-between border-b border-gray-100 pb-4">
//                                         <span className="text-gray-500">Subtotal</span>
//                                         <span className="text-gray-900 font-medium">${calculateTotal()}</span>
//                                     </div>
//                                     <div className="flex justify-between border-b border-gray-100 pb-4">
//                                         <span className="text-gray-500">Shipping</span>
//                                         <span className="text-gray-900 font-medium">Free</span>
//                                     </div>
//                                     <div className="flex justify-between border-b border-gray-100 pb-4">
//                                         <span className="text-gray-500">Tax</span>
//                                         <span className="text-gray-900 font-medium">Calculated at checkout</span>
//                                     </div>
//                                     <div className="flex justify-between pt-4">
//                                         <span className="text-lg font-medium">Total</span>
//                                         <span className="text-lg font-medium">${calculateTotal()}</span>
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={handleProceedToCheckout}
//                                     className="mt-2 w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
//                                 >
//                                     Proceed to Checkout
//                                 </button>

//                                 <button
//                                     onClick={handleContinueShopping}
//                                     className="mt-4 w-full bg-white text-black py-3 px-4 rounded-md border border-black hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
//                                 >
//                                     <FiShoppingBag className="mr-2" />
//                                     Continue Shopping
//                                 </button>

//                                 <p className="mt-6 text-center text-sm text-gray-500">
//                                     Free shipping and returns on all orders
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="text-center py-16">
//                         <FiShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
//                         <h3 className="mt-4 text-lg font-medium text-gray-900">Your bag is empty</h3>
//                         <p className="mt-1 text-gray-500">Start adding some items to your bag</p>
//                         <button
//                             onClick={handleContinueShopping}
//                             className="mt-8 bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors duration-300"
//                         >
//                             Continue Shopping
//                         </button>
//                     </div>
//                 )}
//             </div>
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

const formatPrice = (price) => {
  if (price === null || price === undefined) return '0.00';
  const num = typeof price === 'number' ? price : parseFloat(price);
  return isNaN(num) ? '0.00' : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const AddToCartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const router = useRouter();
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

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

    // const handleQuantityChange = (item, newQuantity) => {
    //     if (newQuantity < 1) return;
    //     updateQuantity(item, newQuantity);
    // };

    // AddToCartCom.jsx
const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
        // If quantity would go below 1, remove the item instead
        handleRemoveFromCart(item);
    } else {
        updateQuantity(item, newQuantity);
    }
};

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.final_price !== undefined ? item.final_price : item.price;
            return total + (parseFloat(price) * item.quantity);
        }, 0);
    };

    const handleProceedToCheckout = () => {
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        router.push('/checkoutpage');
    };

    const handleContinueShopping = () => {
        router.push('/publicproducts');
    };

    const getDisplayPrice = (item) => {
        const price = item.final_price !== undefined ? item.final_price : item.price;
        return formatPrice(price);
    };

    const getDisplayTotal = (item) => {
        const price = item.final_price !== undefined ? item.final_price : item.price;
        return formatPrice(parseFloat(price) * item.quantity);
    };

    // Process image URLs similar to PublicProducts component
    const getMainImage = (item) => {
        // If the item already has a processed image_urls array (from PublicProducts)
        if (item.image_urls && item.image_urls.length > 0) {
            return `${baseURL}${item.image_urls[0].startsWith('/') ? '' : '/'}${item.image_urls[0]}`;
        }
        // Fallback to the image property if it exists
        if (item.image) {
            return `${baseURL}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
        }
        // Default image if none available
        return '/default-product-image.jpg';
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
                                    <div key={`${item.id}-${item.size}-${item.color}`} className="p-4 border-b border-gray-100 last:border-b-0">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            {/* Product Info */}
                                            <div className="col-span-5 flex items-center">
                                                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={getMainImage(item)}
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
                                                    <p className="text-gray-500 text-sm">
                                                        {item.color || 'One Color'} / {item.size || 'One Size'}
                                                    </p>
                                                    {item.discount_percent > 0 && (
                                                        <p className="text-red-600 text-sm mt-1">
                                                            {item.discount_percent}% OFF (Was ${formatPrice(item.original_price)})
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-2">
                                                <p className="text-gray-900 font-medium">${getDisplayPrice(item)}</p>
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
                                                <p className="text-gray-900 font-medium">${getDisplayTotal(item)}</p>
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
                                        <span className="text-gray-900 font-medium">${formatPrice(calculateTotal())}</span>
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
                                        <span className="text-lg font-medium">${formatPrice(calculateTotal())}</span>
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