// import React, { useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { CartContext } from "@/components/CartContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';

// const CheckoutPage = () => {
//     const { cartItems, clearCart } = useContext(CartContext);
//     const router = useRouter();
//     const [form, setForm] = useState({
//         name: '',
//         address: '',
//         email: '',
//         paymentMethod: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const generateInvoice = () => {
//         const doc = new jsPDF();
    
//         // Add content directly
//         doc.text('Invoice', 10, 10);
//         doc.text(`Name: ${form.name}`, 10, 20);
//         doc.text(`Address: ${form.address}`, 10, 30);
//         doc.text(`Email: ${form.email}`, 10, 40);
//         doc.text(`Payment Method: ${form.paymentMethod}`, 10, 50);
    
//         doc.text('Order Summary:', 10, 70);
//         cartItems.forEach((item, index) => {
//             doc.text(`${item.name} - Quantity: ${item.quantity} - Price: PKR. ${item.price}/-`, 10, 80 + (index * 10));
//         });
    
//         doc.text(`Total Products: ${totalProducts}`, 10, 80 + (cartItems.length * 10) + 10);
//         doc.text(`Total Price: PKR. ${totalPrice}/-`, 10, 80 + (cartItems.length * 10) + 20);
    
//         doc.save('invoice.pdf');
//     };
    

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (cartItems.length === 0) {
//             toast.error('Your cart is empty');
//             return;
//         }

//         // Simulate checkout process
//         console.log('Order placed', form, cartItems);

//         // Generate Invoice
//         generateInvoice();

//         // Clear cart and reset form
//         clearCart();

//         setForm({
//             name: '',
//             address: '',
//             email: '',
//             paymentMethod: '',
//         });

//         toast.success('Order placed successfully');
//         // router.push('/');
//     };

//     const handleContinueShopping = () => {
//         router.push('/publicproducts');
//     };

//     const totalPrice = cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity || 0), 0);
//     const totalProducts = cartItems.reduce((total, item) => total + item.quantity, 0);

//     return (
//         <div className="container mx-auto mt-4 mb-24 ml-52">
//             <div className="flex flex-col lg:flex-row">
//                 <div className="lg:w-1/3 p-4">
//                     <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-500">Name</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={form.name}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="address" className="block text-sm font-medium text-gray-500">Address</label>
//                             <input
//                                 type="text"
//                                 id="address"
//                                 name="address"
//                                 value={form.address}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={form.email}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-500">Payment Method</label>
//                             <select
//                                 id="paymentMethod"
//                                 name="paymentMethod"
//                                 value={form.paymentMethod}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 required
//                             >
//                                 <option value="" disabled>Select Payment Method</option>
//                                 <option value="Credit Card">Cash On Delivery</option>
//                                 <option value="Credit Card">Credit Card</option>
//                                 <option value="PayPal">PayPal</option>
//                                 <option value="Bank Transfer">Bank Transfer</option>
//                             </select>
//                         </div>
//                         <div className="flex gap-4">
//                             <button
//                                 type="submit"
//                                 className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-1/2"
//                             >
//                                 Place Order
//                             </button>
//                             <button
//                                 type="button"
//                                 className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors w-1/2"
//                                 onClick={handleContinueShopping}
//                             >
//                                 Continue Shopping
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="lg:w-1/2 p-4 mt-6 lg:mt-0 ml-10">
//                     <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
//                     {cartItems.length > 0 ? (
//                         <>
//                             {cartItems.map((item) => (
//                                 <div className="flex border-b border-gray-200 py-4" key={item.id}>
//                                     <div className="w-1/6">
//                                         <img
//                                             src={`http://localhost:8000/${item.image}`}
//                                             alt={item.name}
//                                             className="rounded-lg"
//                                         />
//                                     </div>
//                                     <div className="w-2/3 pl-4">
//                                         <h4 className="text-lg font-medium">{item.name}</h4>
//                                         <p className="text-gray-600">PKR. {item.price}/-</p>
//                                         <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className="mt-4">
//                                 <h4 className="text-lg font-medium">Total Products: {totalProducts}</h4>
//                                 <h4 className="text-lg font-medium">Total Price: PKR. {totalPrice}/-</h4>
//                             </div>
//                         </>
//                     ) : (
//                         <p>Your cart is empty</p>
//                     )}
//                 </div>
//             </div>

//             <ToastContainer />
//         </div>
//     );
// };

// export default CheckoutPage;



// import React, { useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { CartContext } from "@/components/CartContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import jsPDF from 'jspdf';
// import { FaLock, FaArrowLeft, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from 'react-icons/fa';
// import { SiBankofamerica } from 'react-icons/si';

// const CheckoutPage = () => {
//     const { cartItems, clearCart } = useContext(CartContext);
//     const router = useRouter();
//     const [form, setForm] = useState({
//         firstName: '',
//         lastName: '',
//         address: '',
//         city: '',
//         country: 'Pakistan',
//         email: '',
//         phone: '',
//         paymentMethod: 'credit-card',
//         cardNumber: '',
//         cardExpiry: '',
//         cardCvc: '',
//         saveInfo: false
//     });

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm({
//             ...form,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const generateInvoice = () => {
//         const doc = new jsPDF();
        
//         // Luxury Invoice Design
//         doc.setFillColor(20, 20, 20);
//         doc.rect(0, 0, 210, 297, 'F');
//         doc.setTextColor(255, 255, 255);
//         doc.setFontSize(24);
//         doc.text('INVOICE', 105, 30, { align: 'center' });
        
//         // Company Info
//         doc.setFontSize(12);
//         doc.text('LUXURY COLLECTION', 20, 50);
//         doc.text('DHA 2, Islamabad, Pakistan', 20, 60);
//         doc.text('contact@luxurycollection.com', 20, 70);
        
//         // Customer Info
//         doc.text(`Customer: ${form.firstName} ${form.lastName}`, 20, 90);
//         doc.text(`Email: ${form.email}`, 20, 100);
//         doc.text(`Address: ${form.address}, ${form.city}, ${form.country}`, 20, 110);
        
//         // Invoice Items
//         doc.setFontSize(14);
//         doc.text('ORDER SUMMARY', 20, 130);
        
//         doc.setFontSize(10);
//         let yPosition = 140;
//         cartItems.forEach((item, index) => {
//             doc.text(`${item.name}`, 20, yPosition);
//             doc.text(`PKR ${item.price.toLocaleString()} x ${item.quantity}`, 160, yPosition);
//             doc.text(`PKR ${(item.price * item.quantity).toLocaleString()}`, 190, yPosition);
//             yPosition += 10;
//         });
        
//         // Total
//         doc.setFontSize(12);
//         doc.text('TOTAL:', 160, yPosition + 20);
//         doc.text(`PKR ${totalPrice.toLocaleString()}`, 190, yPosition + 20);
        
//         doc.save('luxury-invoice.pdf');
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (cartItems.length === 0) {
//             toast.error('Your cart is empty');
//             return;
//         }

//         // Simulate checkout process
//         generateInvoice();
//         clearCart();

//         toast.success('Order placed successfully!', {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//         });

//         setTimeout(() => {
//             router.push('/');
//         }, 3500);
//     };

//     const handleContinueShopping = () => {
//         router.push('/collections');
//     };

//     const totalPrice = cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity || 0), 0);
//     const totalProducts = cartItems.reduce((total, item) => total + item.quantity, 0);

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <ToastContainer 
//                 position="top-center"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="colored"
//             />
            
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex items-center mb-8 cursor-pointer" onClick={() => router.back()}>
//                     <FaArrowLeft className="text-gray-600 mr-2" />
//                     <span className="text-gray-600 hover:text-gray-900">Back to Shopping</span>
//                 </div>

//                 <h1 className="text-3xl font-serif font-light tracking-wider text-gray-900 mb-2">Checkout</h1>
//                 <p className="text-gray-500 mb-8">Complete your purchase with confidence</p>

//                 <div className="flex flex-col lg:flex-row gap-12">
//                     {/* Checkout Form */}
//                     <div className="lg:w-2/3">
//                         <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 p-8">
//                             <div className="flex items-center mb-8">
//                                 <FaLock className="text-green-500 mr-2" />
//                                 <span className="text-sm text-gray-500">Secure Checkout</span>
//                             </div>

//                             <form onSubmit={handleSubmit}>
//                                 <h2 className="text-xl font-serif font-light mb-6 border-b border-gray-100 pb-4">Shipping Information</h2>
                                
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                     <div>
//                                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                                         <input
//                                             type="text"
//                                             id="firstName"
//                                             name="firstName"
//                                             value={form.firstName}
//                                             onChange={handleChange}
//                                             className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                                         <input
//                                             type="text"
//                                             id="lastName"
//                                             name="lastName"
//                                             value={form.lastName}
//                                             onChange={handleChange}
//                                             className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="md:col-span-2">
//                                         <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                                         <input
//                                             type="text"
//                                             id="address"
//                                             name="address"
//                                             value={form.address}
//                                             onChange={handleChange}
//                                             className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                                         <input
//                                             type="text"
//                                             id="city"
//                                             name="city"
//                                             value={form.city}
//                                             onChange={handleChange}
//                                             className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                                         <select
//                                             id="country"
//                                             name="country"
//                                             value={form.country}
//                                             onChange={handleChange}
//                                             className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                             required
//                                         >
//                                             <option value="Pakistan">Pakistan</option>
//                                             <option value="United States">United States</option>
//                                             <option value="United Kingdom">United Kingdom</option>
//                                             <option value="Canada">Canada</option>
//                                             <option value="UAE">UAE</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                                         <input
//                                             type="email"
//                                             id="email"
//                                             name="email"
//                                             value={form.email}
//                                             onChange={handleChange}
//                                             className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                                         <input
//                                             type="tel"
//                                             id="phone"
//                                             name="phone"
//                                             value={form.phone}
//                                             onChange={handleChange}
//                                             className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                             required
//                                         />
//                                     </div>
//                                 </div>

//                                 <h2 className="text-xl font-serif font-light mb-6 border-b border-gray-100 pb-4">Payment Method</h2>
                                
//                                 <div className="space-y-4 mb-8">
//                                     <div className="flex items-center space-x-4">
//                                         <input
//                                             type="radio"
//                                             id="credit-card"
//                                             name="paymentMethod"
//                                             value="credit-card"
//                                             checked={form.paymentMethod === 'credit-card'}
//                                             onChange={handleChange}
//                                             className="h-4 w-4 text-black focus:ring-black"
//                                         />
//                                         <label htmlFor="credit-card" className="flex items-center">
//                                             <span className="mr-2">Credit Card</span>
//                                             <div className="flex space-x-2">
//                                                 <FaCcVisa className="text-blue-900" />
//                                                 <FaCcMastercard className="text-red-600" />
//                                             </div>
//                                         </label>
//                                     </div>
                                    
//                                     {form.paymentMethod === 'credit-card' && (
//                                         <div className="ml-8 space-y-4">
//                                             <div>
//                                                 <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
//                                                 <input
//                                                     type="text"
//                                                     id="cardNumber"
//                                                     name="cardNumber"
//                                                     value={form.cardNumber}
//                                                     onChange={handleChange}
//                                                     placeholder="1234 5678 9012 3456"
//                                                     className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                                     required
//                                                 />
//                                             </div>
//                                             <div className="grid grid-cols-2 gap-4">
//                                                 <div>
//                                                     <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
//                                                     <input
//                                                         type="text"
//                                                         id="cardExpiry"
//                                                         name="cardExpiry"
//                                                         value={form.cardExpiry}
//                                                         onChange={handleChange}
//                                                         placeholder="MM/YY"
//                                                         className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
//                                                     <input
//                                                         type="text"
//                                                         id="cardCvc"
//                                                         name="cardCvc"
//                                                         value={form.cardCvc}
//                                                         onChange={handleChange}
//                                                         placeholder="123"
//                                                         className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
                                    
//                                     <div className="flex items-center space-x-4">
//                                         <input
//                                             type="radio"
//                                             id="paypal"
//                                             name="paymentMethod"
//                                             value="paypal"
//                                             checked={form.paymentMethod === 'paypal'}
//                                             onChange={handleChange}
//                                             className="h-4 w-4 text-black focus:ring-black"
//                                         />
//                                         <label htmlFor="paypal" className="flex items-center">
//                                             <span className="mr-2">PayPal</span>
//                                             <FaCcPaypal className="text-blue-700" />
//                                         </label>
//                                     </div>
                                    
//                                     <div className="flex items-center space-x-4">
//                                         <input
//                                             type="radio"
//                                             id="bank-transfer"
//                                             name="paymentMethod"
//                                             value="bank-transfer"
//                                             checked={form.paymentMethod === 'bank-transfer'}
//                                             onChange={handleChange}
//                                             className="h-4 w-4 text-black focus:ring-black"
//                                         />
//                                         <label htmlFor="bank-transfer" className="flex items-center">
//                                             <span className="mr-2">Bank Transfer</span>
//                                             <SiBankofamerica className="text-blue-800" />
//                                         </label>
//                                     </div>
                                    
//                                     <div className="flex items-center space-x-4">
//                                         <input
//                                             type="radio"
//                                             id="cash-on-delivery"
//                                             name="paymentMethod"
//                                             value="cash-on-delivery"
//                                             checked={form.paymentMethod === 'cash-on-delivery'}
//                                             onChange={handleChange}
//                                             className="h-4 w-4 text-black focus:ring-black"
//                                         />
//                                         <label htmlFor="cash-on-delivery" className="flex items-center">
//                                             <span className="mr-2">Cash on Delivery</span>
//                                         </label>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center mb-8">
//                                     <input
//                                         type="checkbox"
//                                         id="saveInfo"
//                                         name="saveInfo"
//                                         checked={form.saveInfo}
//                                         onChange={handleChange}
//                                         className="h-4 w-4 text-black focus:ring-black"
//                                     />
//                                     <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700">
//                                         Save this information for next time
//                                     </label>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className="w-full bg-black text-white py-4 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300 font-medium tracking-wider"
//                                 >
//                                     COMPLETE PURCHASE
//                                 </button>
//                             </form>
//                         </div>
//                     </div>

//                     {/* Order Summary */}
//                     <div className="lg:w-1/3">
//                         <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 sticky top-8">
//                             <h2 className="text-xl text-gray-900 font-serif font-light mb-6 border-b border-gray-900 pb-4">Order Summary</h2>
                            
//                             {cartItems.length > 0 ? (
//                                 <>
//                                     <div className="space-y-4 mb-6">
//                                         {cartItems.map((item) => (
//                                             <div key={item.id} className="flex justify-between items-start">
//                                                 <div className="flex items-center">
//                                                     <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
//                                                         <img
//                                                             src={`http://localhost:8000/${item.image}`}
//                                                             alt={item.name}
//                                                             className="h-full w-full object-cover object-center"
//                                                         />
//                                                     </div>
//                                                     <div>
//                                                         <h4 className="text-sm text-gray-900 font-medium">{item.name}</h4>
//                                                         <p className="text-gray-700 text-sm">Qty: {item.quantity}</p>
//                                                     </div>
//                                                 </div>
//                                                 <p className="font-medium text-gray-900">PKR {item.price.toLocaleString()}</p>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <div className="space-y-4 border-t border-gray-100 pt-4 mb-6">
//                                         <div className="flex justify-between">
//                                             <span className="text-gray-900">Subtotal</span>
//                                             <span className="font-medium text-gray-900">PKR {totalPrice.toLocaleString()}</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-gray-900">Shipping</span>
//                                             <span className="font-medium text-gray-900">Free</span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-gray-900">Tax</span>
//                                             <span className="font-medium text-gray-900">PKR 0</span>
//                                         </div>
//                                     </div>

//                                     <div className="flex justify-between border-t border-gray-100 pt-4 mb-6">
//                                         <span className="text-lg font-medium">Total</span>
//                                         <span className="text-lg font-medium">PKR {totalPrice.toLocaleString()}</span>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <p className="text-center py-8 text-gray-500">Your cart is empty</p>
//                             )}

//                             <button
//                                 onClick={handleContinueShopping}
//                                 className="w-full bg-white text-black py-3 px-4 rounded-md border border-black hover:bg-gray-50 transition-colors duration-300 mt-4"
//                             >
//                                 Continue Shopping
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CheckoutPage;




import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from "@/components/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { FaLock, FaArrowLeft, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from 'react-icons/fa';
import { SiBankofamerica } from 'react-icons/si';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: 'Pakistan',
        email: '',
        phone: '',
        paymentMethod: 'credit-card',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        saveInfo: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const getUnitPrice = (item) => {
        return item.final_price !== undefined ? Number(item.final_price) : Number(item.price) || 0;
    };

    const getItemPrice = (item) => {
        const unitPrice = getUnitPrice(item);
        return unitPrice * (item.quantity || 1);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + getItemPrice(item);
        }, 0);
    };

    const generateInvoice = () => {
        const doc = new jsPDF();
        
        // Luxury Invoice Design
        doc.setFillColor(20, 20, 20);
        doc.rect(0, 0, 210, 297, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.text('INVOICE', 105, 30, { align: 'center' });
        
        // Company Info
        doc.setFontSize(12);
        doc.text('LUXURY COLLECTION', 20, 50);
        doc.text('DHA 2, Islamabad, Pakistan', 20, 60);
        doc.text('contact@luxurycollection.com', 20, 70);
        
        // Customer Info
        doc.text(`Customer: ${form.firstName} ${form.lastName}`, 20, 90);
        doc.text(`Email: ${form.email}`, 20, 100);
        doc.text(`Address: ${form.address}, ${form.city}, ${form.country}`, 20, 110);
        
        // Invoice Items
        doc.setFontSize(14);
        doc.text('ORDER SUMMARY', 20, 130);
        
        doc.setFontSize(10);
        let yPosition = 140;
        cartItems.forEach((item) => {
            const unitPrice = getUnitPrice(item);
            const regularPrice = Number(item.price) || 0;
            const isOnSale = item.final_price !== undefined && unitPrice < regularPrice;

            doc.text(`${item.name}`, 20, yPosition);
            if (isOnSale) {
                doc.setTextColor(255, 0, 0);
                doc.text(`PKR ${unitPrice.toLocaleString()} x ${item.quantity} (SALE)`, 160, yPosition);
                doc.setTextColor(255, 255, 255);
            } else {
                doc.text(`PKR ${unitPrice.toLocaleString()} x ${item.quantity}`, 160, yPosition);
            }
            doc.text(`PKR ${(unitPrice * item.quantity).toLocaleString()}`, 190, yPosition);
            yPosition += 10;
        });
        
        // Total
        doc.setFontSize(12);
        doc.text('TOTAL:', 160, yPosition + 20);
        doc.text(`PKR ${getTotalPrice().toLocaleString()}`, 190, yPosition + 20);
        
        doc.save('luxury-invoice.pdf');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        generateInvoice();
        clearCart();

        toast.success('Order placed successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        setTimeout(() => {
            router.push('/');
        }, 3500);
    };

    const handleContinueShopping = () => {
        router.push('/publicproducts');
    };

    const totalProducts = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8 cursor-pointer" onClick={() => router.back()}>
                    <FaArrowLeft className="text-gray-600 mr-2" />
                    <span className="text-gray-600 hover:text-gray-900">Back to Shopping</span>
                </div>

                <h1 className="text-3xl font-serif font-light tracking-wider text-gray-900 mb-2">Checkout</h1>
                <p className="text-gray-500 mb-8">Complete your purchase with confidence</p>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 p-8">
                            <div className="flex items-center mb-8">
                                <FaLock className="text-green-500 mr-2" />
                                <span className="text-sm text-gray-500">Secure Checkout</span>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Shipping Information */}
                                <div className="mb-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-2">Shipping Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={form.address}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={form.city}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                            <select
                                                id="country"
                                                name="country"
                                                value={form.country}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            >
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="United States">United States</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Canada">Canada</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-2">Payment Method</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="credit-card"
                                                name="paymentMethod"
                                                value="credit-card"
                                                checked={form.paymentMethod === 'credit-card'}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-black focus:ring-black"
                                            />
                                            <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">Credit Card</label>
                                        </div>
                                        {form.paymentMethod === 'credit-card' && (
                                            <div className="ml-7 mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="md:col-span-2">
                                                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                                    <input
                                                        type="text"
                                                        id="cardNumber"
                                                        name="cardNumber"
                                                        value={form.cardNumber}
                                                        onChange={handleChange}
                                                        placeholder="1234 5678 9012 3456"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                                                    <input
                                                        type="text"
                                                        id="cardExpiry"
                                                        name="cardExpiry"
                                                        value={form.cardExpiry}
                                                        onChange={handleChange}
                                                        placeholder="MM/YY"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                                    <input
                                                        type="text"
                                                        id="cardCvc"
                                                        name="cardCvc"
                                                        value={form.cardCvc}
                                                        onChange={handleChange}
                                                        placeholder="CVC"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="paypal"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={form.paymentMethod === 'paypal'}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-black focus:ring-black"
                                            />
                                            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">PayPal</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="bank-transfer"
                                                name="paymentMethod"
                                                value="bank-transfer"
                                                checked={form.paymentMethod === 'bank-transfer'}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-black focus:ring-black"
                                            />
                                            <label htmlFor="bank-transfer" className="ml-3 block text-sm font-medium text-gray-700">Bank Transfer</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Save Info and Submit */}
                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        id="saveInfo"
                                        name="saveInfo"
                                        checked={form.saveInfo}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-black focus:ring-black"
                                    />
                                    <label htmlFor="saveInfo" className="ml-3 block text-sm text-gray-700">Save this information for next time</label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
                                >
                                    Complete Order
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 sticky top-8">
                            <h2 className="text-xl text-gray-900 font-serif font-light mb-6 border-b border-gray-900 pb-4">Order Summary</h2>
                            
                            {cartItems.length > 0 ? (
                                <>
                                    <div className="space-y-4 mb-6">
                                        {cartItems.map((item) => {
                                            const unitPrice = getUnitPrice(item);
                                            const regularPrice = Number(item.price) || 0;
                                            const isOnSale = item.final_price !== undefined && unitPrice < regularPrice;

                                            return (
                                                <div key={item.id} className="flex justify-between items-start">
                                                    <div className="flex items-center">
                                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                                                            <img
                                                                src={`http://localhost:8000/${item.image}`}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm text-gray-900 font-medium">{item.name}</h4>
                                                            <p className="text-gray-700 text-sm">Qty: {item.quantity || 1}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        {isOnSale && (
                                                            <>
                                                                <p className="font-medium text-gray-900 line-through text-sm">
                                                                    PKR {regularPrice.toLocaleString()}
                                                                </p>
                                                                <p className="font-medium text-red-600">
                                                                    PKR {unitPrice.toLocaleString()} × {item.quantity || 1}
                                                                </p>
                                                            </>
                                                        )}
                                                        {!isOnSale && (
                                                            <p className="font-medium text-gray-900">
                                                                PKR {unitPrice.toLocaleString()} × {item.quantity || 1}
                                                            </p>
                                                        )}
                                                        <p className="font-medium text-gray-900">
                                                            PKR {(unitPrice * (item.quantity || 1)).toLocaleString()}/-
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="space-y-4 border-t border-gray-100 pt-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-900">Subtotal</span>
                                            <span className="font-medium text-gray-900">PKR {getTotalPrice().toLocaleString()}/-</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-900">Shipping</span>
                                            <span className="font-medium text-gray-900">Free</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-900">Tax</span>
                                            <span className="font-medium text-gray-900">PKR 0</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-t border-gray-900 pt-4 mb-6">
                                        <span className="text-lg font-medium text-gray-900">Total</span>
                                        <span className="text-lg font-medium text-gray-900">PKR {getTotalPrice().toLocaleString()}/-</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center py-8 text-gray-500">Your cart is empty</p>
                            )}

                            <button
                                onClick={handleContinueShopping}
                                className="w-full bg-white text-black py-3 px-4 rounded-md border border-black hover:bg-gray-50 transition-colors duration-300 mt-4"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;