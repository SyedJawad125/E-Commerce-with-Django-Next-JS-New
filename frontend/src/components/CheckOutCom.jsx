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

//     const getUnitPrice = (item) => {
//         return item.final_price !== undefined ? Number(item.final_price) : Number(item.price) || 0;
//     };

//     const getItemPrice = (item) => {
//         const unitPrice = getUnitPrice(item);
//         return unitPrice * (item.quantity || 1);
//     };

//     const getTotalPrice = () => {
//         return cartItems.reduce((total, item) => {
//             return total + getItemPrice(item);
//         }, 0);
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
//         cartItems.forEach((item) => {
//             const unitPrice = getUnitPrice(item);
//             const regularPrice = Number(item.price) || 0;
//             const isOnSale = item.final_price !== undefined && unitPrice < regularPrice;

//             doc.text(`${item.name}`, 20, yPosition);
//             if (isOnSale) {
//                 doc.setTextColor(255, 0, 0);
//                 doc.text(`PKR ${unitPrice.toLocaleString()} x ${item.quantity} (SALE)`, 160, yPosition);
//                 doc.setTextColor(255, 255, 255);
//             } else {
//                 doc.text(`PKR ${unitPrice.toLocaleString()} x ${item.quantity}`, 160, yPosition);
//             }
//             doc.text(`PKR ${(unitPrice * item.quantity).toLocaleString()}`, 190, yPosition);
//             yPosition += 10;
//         });
        
//         // Total
//         doc.setFontSize(12);
//         doc.text('TOTAL:', 160, yPosition + 20);
//         doc.text(`PKR ${getTotalPrice().toLocaleString()}`, 190, yPosition + 20);
        
//         doc.save('luxury-invoice.pdf');
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (cartItems.length === 0) {
//             toast.error('Your cart is empty');
//             return;
//         }

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
//         router.push('/publicproducts');
//     };

//     const totalProducts = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

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
//                                 {/* Shipping Information */}
//                                 <div className="mb-12">
//                                     <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-2">Shipping Information</h3>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                         <div>
//                                             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                                             <input
//                                                 type="text"
//                                                 id="firstName"
//                                                 name="firstName"
//                                                 value={form.firstName}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                                             <input
//                                                 type="text"
//                                                 id="lastName"
//                                                 name="lastName"
//                                                 value={form.lastName}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="md:col-span-2">
//                                             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                                             <input
//                                                 type="text"
//                                                 id="address"
//                                                 name="address"
//                                                 value={form.address}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                                             <input
//                                                 type="text"
//                                                 id="city"
//                                                 name="city"
//                                                 value={form.city}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                                             <select
//                                                 id="country"
//                                                 name="country"
//                                                 value={form.country}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             >
//                                                 <option value="Pakistan">Pakistan</option>
//                                                 <option value="United States">United States</option>
//                                                 <option value="United Kingdom">United Kingdom</option>
//                                                 <option value="Canada">Canada</option>
//                                             </select>
//                                         </div>
//                                         <div>
//                                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                                             <input
//                                                 type="email"
//                                                 id="email"
//                                                 name="email"
//                                                 value={form.email}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                                             <input
//                                                 type="tel"
//                                                 id="phone"
//                                                 name="phone"
//                                                 value={form.phone}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Payment Method */}
//                                 <div className="mb-12">
//                                     <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-2">Payment Method</h3>
//                                     <div className="space-y-4">
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id="credit-card"
//                                                 name="paymentMethod"
//                                                 value="credit-card"
//                                                 checked={form.paymentMethod === 'credit-card'}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4 text-black focus:ring-black"
//                                             />
//                                             <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">Credit Card</label>
//                                         </div>
//                                         {form.paymentMethod === 'credit-card' && (
//                                             <div className="ml-7 mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//                                                 <div className="md:col-span-2">
//                                                     <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
//                                                     <input
//                                                         type="text"
//                                                         id="cardNumber"
//                                                         name="cardNumber"
//                                                         value={form.cardNumber}
//                                                         onChange={handleChange}
//                                                         placeholder="1234 5678 9012 3456"
//                                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
//                                                     <input
//                                                         type="text"
//                                                         id="cardExpiry"
//                                                         name="cardExpiry"
//                                                         value={form.cardExpiry}
//                                                         onChange={handleChange}
//                                                         placeholder="MM/YY"
//                                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
//                                                         placeholder="CVC"
//                                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         )}
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id="paypal"
//                                                 name="paymentMethod"
//                                                 value="paypal"
//                                                 checked={form.paymentMethod === 'paypal'}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4 text-black focus:ring-black"
//                                             />
//                                             <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">PayPal</label>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id="bank-transfer"
//                                                 name="paymentMethod"
//                                                 value="bank-transfer"
//                                                 checked={form.paymentMethod === 'bank-transfer'}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4 text-black focus:ring-black"
//                                             />
//                                             <label htmlFor="bank-transfer" className="ml-3 block text-sm font-medium text-gray-700">Bank Transfer</label>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Save Info and Submit */}
//                                 <div className="flex items-center mb-6">
//                                     <input
//                                         type="checkbox"
//                                         id="saveInfo"
//                                         name="saveInfo"
//                                         checked={form.saveInfo}
//                                         onChange={handleChange}
//                                         className="h-4 w-4 text-black focus:ring-black"
//                                     />
//                                     <label htmlFor="saveInfo" className="ml-3 block text-sm text-gray-700">Save this information for next time</label>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
//                                 >
//                                     Complete Order
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
//                                         {cartItems.map((item) => {
//                                             const unitPrice = getUnitPrice(item);
//                                             const regularPrice = Number(item.price) || 0;
//                                             const isOnSale = item.final_price !== undefined && unitPrice < regularPrice;

//                                             return (
//                                                 <div key={item.id} className="flex justify-between items-start">
//                                                     <div className="flex items-center">
//                                                         <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
//                                                             <img
//                                                                 src={`http://localhost:8000/${item.image}`}
//                                                                 alt={item.name}
//                                                                 className="h-full w-full object-cover object-center"
//                                                             />
//                                                         </div>
//                                                         <div>
//                                                             <h4 className="text-sm text-gray-900 font-medium">{item.name}</h4>
//                                                             <p className="text-gray-700 text-sm">Qty: {item.quantity || 1}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-right">
//                                                         {isOnSale && (
//                                                             <>
//                                                                 <p className="font-medium text-gray-900 line-through text-sm">
//                                                                     PKR {regularPrice.toLocaleString()}
//                                                                 </p>
//                                                                 <p className="font-medium text-red-600">
//                                                                     PKR {unitPrice.toLocaleString()} × {item.quantity || 1}
//                                                                 </p>
//                                                             </>
//                                                         )}
//                                                         {!isOnSale && (
//                                                             <p className="font-medium text-gray-900">
//                                                                 PKR {unitPrice.toLocaleString()} × {item.quantity || 1}
//                                                             </p>
//                                                         )}
//                                                         <p className="font-medium text-gray-900">
//                                                             PKR {(unitPrice * (item.quantity || 1)).toLocaleString()}/-
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>

//                                     <div className="space-y-4 border-t border-gray-100 pt-4 mb-6">
//                                         <div className="flex justify-between">
//                                             <span className="text-gray-900">Subtotal</span>
//                                             <span className="font-medium text-gray-900">PKR {getTotalPrice().toLocaleString()}/-</span>
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

//                                     <div className="flex justify-between border-t border-gray-900 pt-4 mb-6">
//                                         <span className="text-lg font-medium text-gray-900">Total</span>
//                                         <span className="text-lg font-medium text-gray-900">PKR {getTotalPrice().toLocaleString()}/-</span>
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





// 'use client';
// import React, { useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { CartContext } from "@/components/CartContext";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import jsPDF from 'jspdf';
// import { FaLock, FaArrowLeft, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

// const CheckoutPage = () => {
//     const { cartItems, clearCart } = useContext(CartContext);
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);
//     const [form, setForm] = useState({
//         customer_name: '',
//         customer_email: '',
//         customer_phone: '',
//         delivery_address: '',
//         city: '',
//         payment_method: 'credit_card',
//     });

//     useEffect(() => {
//         const userData = JSON.parse(localStorage.getItem('user'));
//         if (userData) {
//             setForm(prev => ({
//                 ...prev,
//                 customer_name: userData.name || '',
//                 customer_email: userData.email || '',
//                 customer_phone: userData.phone || ''
//             }));
//         }
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm({
//             ...form,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const getUnitPrice = (item) => {
//         return item.final_price !== undefined ? Number(item.final_price) : Number(item.price) || 0;
//     };

//     const getTotalPrice = () => {
//         return cartItems.reduce((total, item) => {
//             return total + (getUnitPrice(item) * (item.quantity || 1));
//         }, 0);
//     };

//     const generateInvoice = (orderData) => {
//         const doc = new jsPDF();
        
//         // Invoice design
//         doc.setFillColor(20, 20, 20);
//         doc.rect(0, 0, 210, 297, 'F');
//         doc.setTextColor(255, 255, 255);
//         doc.setFontSize(24);
//         doc.text('INVOICE', 105, 30, { align: 'center' });
        
//         // Company Info
//         doc.setFontSize(12);
//         doc.text('LUXURY COLLECTION', 20, 50);
//         doc.text('123 Main Street, City', 20, 60);
//         doc.text('contact@luxury.com', 20, 70);
        
//         // Customer Info
//         doc.text(`Customer: ${orderData.customer_info.name}`, 20, 90);
//         doc.text(`Email: ${orderData.customer_info.email}`, 20, 100);
//         doc.text(`Phone: ${orderData.customer_info.phone}`, 20, 110);
//         doc.text(`Address: ${orderData.delivery_info.address}`, 20, 120);
        
//         // Order Info
//         doc.text(`Order #: ${orderData.order_id}`, 20, 140);
//         doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 150);
//         doc.text(`Status: ${orderData.status}`, 20, 160);
        
//         // Order Items
//         doc.setFontSize(14);
//         doc.text('ORDER SUMMARY', 20, 180);
        
//         doc.setFontSize(10);
//         let yPosition = 190;
        
//         orderData.order_summary.items.forEach(item => {
//             doc.text(`${item.product_name}`, 20, yPosition);
//             doc.text(`PKR ${item.unit_price.toLocaleString()} x ${item.quantity}`, 160, yPosition);
//             doc.text(`PKR ${item.total_price.toLocaleString()}`, 190, yPosition);
//             yPosition += 10;
//         });
        
//         // Total
//         doc.setFontSize(12);
//         doc.text('TOTAL:', 160, yPosition + 20);
//         doc.text(`PKR ${orderData.order_summary.total.toLocaleString()}`, 190, yPosition + 20);
        
//         doc.save(`invoice-${orderData.order_id}.pdf`);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (cartItems.length === 0) {
//             toast.error('Your cart is empty');
//             return;
//         }

//         setIsLoading(true);

//         try {
//             // Prepare items in backend-compatible format
//             const items = cartItems.map(item => ({
//                 product_type: item.final_price !== undefined ? 'sales_product' : 'product',
//                 product_id: item.id,
//                 quantity: item.quantity || 1
//             }));

//             // Prepare the complete order data
//             const orderData = {
//                 customer_name: form.customer_name,
//                 customer_email: form.customer_email,
//                 customer_phone: form.customer_phone,
//                 delivery_address: form.delivery_address,
//                 city: form.city,
//                 payment_method: form.payment_method,
//                 items: items
//             };

//             // Send to backend using Axios
//             const response = await AxiosInstance.post('/ecommerce/publicorder', orderData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
//                 }
//             });

//             // On success
//             generateInvoice(response.data.data);
//             clearCart();

//             toast.success('Order placed successfully!', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//             });

//             setTimeout(() => {
//                 router.push('/order-confirmation');
//             }, 3500);

//         } catch (error) {
//             let errorMsg = 'Failed to place order';
            
//             if (error.response) {
//                 // Server responded with error status
//                 if (error.response.status === 400) {
//                     errorMsg = error.response.data.message || 'Validation error';
//                 } else if (error.response.status === 401) {
//                     errorMsg = 'Please login to place an order';
//                 } else if (error.response.status === 403) {
//                     errorMsg = 'You do not have permission to perform this action';
//                 } else {
//                     errorMsg = error.response.data.message || `Server error: ${error.response.status}`;
//                 }
//             } else if (error.request) {
//                 // Request was made but no response
//                 errorMsg = 'No response from server - please try again';
//             } else {
//                 // Other errors
//                 errorMsg = error.message || 'Unknown error occurred';
//             }

//             toast.error(errorMsg);
//             console.error('Checkout error:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleContinueShopping = () => {
//         router.push('/publicproducts');
//     };

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
//                                 {/* Shipping Information */}
//                                 <div className="mb-12">
//                                     <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-2">Shipping Information</h3>
//                                     <div className="grid grid-cols-1 gap-6">
//                                         <div>
//                                             <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                                             <input
//                                                 type="text"
//                                                 id="customer_name"
//                                                 name="customer_name"
//                                                 value={form.customer_name}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                                             <input
//                                                 type="email"
//                                                 id="customer_email"
//                                                 name="customer_email"
//                                                 value={form.customer_email}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                                             <input
//                                                 type="tel"
//                                                 id="customer_phone"
//                                                 name="customer_phone"
//                                                 value={form.customer_phone}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                                             <input
//                                                 type="text"
//                                                 id="delivery_address"
//                                                 name="delivery_address"
//                                                 value={form.delivery_address}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                         <div>
//                                             <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                                             <input
//                                                 type="text"
//                                                 id="city"
//                                                 name="city"
//                                                 value={form.city}
//                                                 onChange={handleChange}
//                                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Payment Method */}
//                                 <div className="mb-12">
//                                     <h3 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-100 pb-2">Payment Method</h3>
//                                     <div className="space-y-4">
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id="credit_card"
//                                                 name="payment_method"
//                                                 value="credit_card"
//                                                 checked={form.payment_method === 'credit_card'}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4 text-black focus:ring-black"
//                                             />
//                                             <label htmlFor="credit_card" className="ml-3 block text-sm font-medium text-gray-700">Credit Card</label>
//                                             <FaCcVisa className="ml-4 text-blue-800" />
//                                             <FaCcMastercard className="ml-2 text-red-600" />
//                                         </div>
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id="debit_card"
//                                                 name="payment_method"
//                                                 value="debit_card"
//                                                 checked={form.payment_method === 'debit_card'}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4 text-black focus:ring-black"
//                                             />
//                                             <label htmlFor="debit_card" className="ml-3 block text-sm font-medium text-gray-700">Debit Card</label>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id="paypal"
//                                                 name="payment_method"
//                                                 value="paypal"
//                                                 checked={form.payment_method === 'paypal'}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4 text-black focus:ring-black"
//                                             />
//                                             <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">PayPal</label>
//                                             <FaCcPaypal className="ml-4 text-blue-700" />
//                                         </div>
//                                         <div className="flex items-center">
//                                             <input
//                                                 type="radio"
//                                                 id="cash_on_delivery"
//                                                 name="payment_method"
//                                                 value="cash_on_delivery"
//                                                 checked={form.payment_method === 'cash_on_delivery'}
//                                                 onChange={handleChange}
//                                                 className="h-4 w-4 text-black focus:ring-black"
//                                             />
//                                             <label htmlFor="cash_on_delivery" className="ml-3 block text-sm font-medium text-gray-700">Cash on Delivery</label>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     disabled={isLoading}
//                                     className={`w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                                 >
//                                     {isLoading ? 'Processing...' : 'Complete Order'}
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
//                                         {cartItems.map((item) => {
//                                             const unitPrice = getUnitPrice(item);
//                                             const regularPrice = Number(item.price) || 0;
//                                             const isOnSale = item.final_price !== undefined && unitPrice < regularPrice;

//                                             return (
//                                                 <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between items-start">
//                                                     <div className="flex items-center">
//                                                         <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
//                                                             <img
//                                                                 src={`http://localhost:8000${item.image}`}
//                                                                 alt={item.name}
//                                                                 className="h-full w-full object-cover object-center"
//                                                             />
//                                                         </div>
//                                                         <div>
//                                                             <h4 className="text-sm text-gray-900 font-medium">{item.name}</h4>
//                                                             <p className="text-gray-700 text-sm">Qty: {item.quantity || 1}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="text-right">
//                                                         {isOnSale && (
//                                                             <>
//                                                                 <p className="font-medium text-gray-900 line-through text-sm">
//                                                                     PKR {regularPrice.toLocaleString()}
//                                                                 </p>
//                                                                 <p className="font-medium text-red-600">
//                                                                     PKR {unitPrice.toLocaleString()} × {item.quantity || 1}
//                                                                 </p>
//                                                             </>
//                                                         )}
//                                                         {!isOnSale && (
//                                                             <p className="font-medium text-gray-900">
//                                                                 PKR {unitPrice.toLocaleString()} × {item.quantity || 1}
//                                                             </p>
//                                                         )}
//                                                         <p className="font-medium text-gray-900">
//                                                             PKR {(unitPrice * (item.quantity || 1)).toLocaleString()}/-
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>

//                                     <div className="space-y-4 border-t border-gray-100 pt-4 mb-6">
//                                         <div className="flex justify-between">
//                                             <span className="text-gray-900">Subtotal</span>
//                                             <span className="font-medium text-gray-900">PKR {getTotalPrice().toLocaleString()}/-</span>
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

//                                     <div className="flex justify-between border-t border-gray-900 pt-4 mb-6">
//                                         <span className="text-lg font-medium text-gray-900">Total</span>
//                                         <span className="text-lg font-medium text-gray-900">PKR {getTotalPrice().toLocaleString()}/-</span>
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




'use client';
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from "@/components/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import jsPDF from 'jspdf';
import { FaLock, FaArrowLeft, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        delivery_address: '',
        city: '',
        payment_method: 'credit_card',
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setForm(prev => ({
                ...prev,
                customer_name: userData.name || '',
                customer_email: userData.email || '',
                customer_phone: userData.phone || ''
            }));
        }
    }, []);

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

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (getUnitPrice(item) * (item.quantity || 1));
        }, 0);
    };

    // const generateInvoice = (orderData) => {
    //     const doc = new jsPDF();
        
    //     // Invoice design
    //     doc.setFillColor(20, 20, 20);
    //     doc.rect(0, 0, 210, 297, 'F');
    //     doc.setTextColor(255, 255, 255);
    //     doc.setFontSize(24);
    //     doc.text('INVOICE', 105, 30, { align: 'center' });
        
    //     // Company Info
    //     doc.setFontSize(12);
    //     doc.text('LUXURY COLLECTION', 20, 50);
    //     doc.text('123 Main Street, City', 20, 60);
    //     doc.text('contact@luxury.com', 20, 70);
        
    //     // Customer Info
    //     doc.text(`Customer: ${orderData.customer_info.name}`, 20, 90);
    //     doc.text(`Email: ${orderData.customer_info.email}`, 20, 100);
    //     doc.text(`Phone: ${orderData.customer_info.phone}`, 20, 110);
    //     doc.text(`Address: ${orderData.delivery_info.address}`, 20, 120);
        
    //     // Order Info
    //     doc.text(`Order #: ${orderData.order_id}`, 20, 140);
    //     doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 150);
    //     doc.text(`Status: ${orderData.status}`, 20, 160);
        
    //     // Order Items
    //     doc.setFontSize(14);
    //     doc.text('ORDER SUMMARY', 20, 180);
        
    //     doc.setFontSize(10);
    //     let yPosition = 190;
        
    //     orderData.order_summary.items.forEach(item => {
    //         doc.text(`${item.product_name}`, 20, yPosition);
    //         doc.text(`PKR ${item.unit_price.toLocaleString()} x ${item.quantity}`, 160, yPosition);
    //         doc.text(`PKR ${item.total_price.toLocaleString()}`, 190, yPosition);
    //         yPosition += 10;
    //     });
        
    //     // Total
    //     doc.setFontSize(12);
    //     doc.text('TOTAL:', 160, yPosition + 20);
    //     doc.text(`PKR ${orderData.order_summary.total.toLocaleString()}`, 190, yPosition + 20);
        
    //     doc.save(`invoice-${orderData.order_id}.pdf`);
    // };


    const generateInvoice = (orderData) => {
    const doc = new jsPDF();
    
    // Set document properties
    doc.setProperties({
        title: `Invoice #${orderData.order_id}`,
        subject: 'Invoice from GOHAR COLLECTION',
        author: 'GOHAR COLLECTION',
    });

    // Add logo or header
    doc.setFillColor(40, 40, 40);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('GOHAR COLLECTION', 105, 20, { align: 'center' });
    
    // Invoice title and details
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('INVOICE', 20, 45);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 45);
    doc.text(`Invoice #: ${orderData.order_id}`, 160, 50);
    doc.text(`Status: ${orderData.status}`, 160, 55);
    
    // Company and customer info
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Company info
    doc.text('From:', 20, 65);
    doc.setFont(undefined, 'bold');
    doc.text('GOHAR COLLECTION', 20, 70);
    doc.setFont(undefined, 'normal');
    doc.text('Sector D, DHA 2, ISB.', 20, 75);
    doc.text('contact@luxury.com', 20, 80);
    
    // Customer info
    doc.text('To:', 20, 95);
    doc.setFont(undefined, 'bold');
    doc.text(orderData.customer_info.name, 20, 100);
    doc.setFont(undefined, 'normal');
    doc.text(orderData.delivery_info.address, 20, 105);
    doc.text(orderData.customer_info.phone, 20, 110);
    doc.text(orderData.customer_info.email, 20, 115);
    
    // Items table header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 130, 170, 8, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text('Item', 20, 135);
    doc.text('Unit Price', 100, 135);
    doc.text('Qty', 140, 135);
    doc.text('Total', 170, 135);
    
    // Items list
    doc.setFont(undefined, 'normal');
    let yPosition = 145;
    
    orderData.order_summary.items.forEach(item => {
        doc.text(item.product_name, 20, yPosition);
        doc.text(`PKR ${item.unit_price.toLocaleString()}`, 100, yPosition);
        doc.text(`${item.quantity}`, 140, yPosition);
        doc.text(`PKR ${item.total_price.toLocaleString()}`, 170, yPosition);
        yPosition += 10;
    });
    
    // Total section
    doc.setFont(undefined, 'bold');
    doc.text('Subtotal:', 140, yPosition + 10);
    doc.text(`PKR ${orderData.order_summary.total.toLocaleString()}`, 170, yPosition + 10);
    
    doc.text('Shipping:', 140, yPosition + 20);
    doc.text('PKR 0', 170, yPosition + 20);
    
    doc.text('Tax:', 140, yPosition + 30);
    doc.text('PKR 0', 170, yPosition + 30);
    
    doc.setFontSize(12);
    doc.text('Total Amount:', 140, yPosition + 45);
    doc.text(`PKR ${orderData.order_summary.total.toLocaleString()}`, 170, yPosition + 45);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for your business!', 105, 280, { align: 'center' });
    doc.text('Terms & Conditions: Payment due within 15 days', 105, 285, { align: 'center' });
    doc.text('GOHAR COLLECTION | Sector D, DHA 2, ISB. | contact@luxury.com', 105, 290, { align: 'center' });
    
    doc.save(`invoice-${orderData.order_id}.pdf`);
};

    const prepareOrderDataForConfirmation = (responseData) => {
        return {
            order_id: responseData.order_id,
            customer_info: {
                name: form.customer_name,
                email: form.customer_email,
                phone: form.customer_phone
            },
            delivery_info: {
                address: form.delivery_address,
                city: form.city,
                estimated_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
            },
            payment_method: form.payment_method,
            payment_status: true,
            status: 'Confirmed',
            order_summary: {
                items: cartItems.map(item => ({
                    product_name: item.name,
                    unit_price: getUnitPrice(item),
                    quantity: item.quantity || 1,
                    total_price: getUnitPrice(item) * (item.quantity || 1)
                })),
                subtotal: getTotalPrice(),
                total: getTotalPrice()
            }
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setIsLoading(true);

        try {
            // Prepare items in backend-compatible format
            const items = cartItems.map(item => ({
                product_type: item.final_price !== undefined ? 'sales_product' : 'product',
                product_id: item.id,
                quantity: item.quantity || 1
            }));

            // Prepare the complete order data
            const orderData = {
                customer_name: form.customer_name,
                customer_email: form.customer_email,
                customer_phone: form.customer_phone,
                delivery_address: form.delivery_address,
                city: form.city,
                payment_method: form.payment_method,
                items: items
            };

            // Send to backend using Axios
            const response = await AxiosInstance.post('/ecommerce/publicorder', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                }
            });

            // On success
            const orderResponse = response.data.data;
            generateInvoice(orderResponse);
            clearCart();

            // Prepare and store order data for confirmation page
            const confirmationData = prepareOrderDataForConfirmation(orderResponse);
            localStorage.setItem('latestOrder', JSON.stringify(confirmationData));

            toast.success('Order placed successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => {
                    router.push('/orderconfirmation');
                }
            });

        } catch (error) {
            let errorMsg = 'Failed to place order';
            
            if (error.response) {
                if (error.response.status === 400) {
                    errorMsg = error.response.data.message || 'Validation error';
                } else if (error.response.status === 401) {
                    errorMsg = 'Please login to place an order';
                } else if (error.response.status === 403) {
                    errorMsg = 'You do not have permission to perform this action';
                } else {
                    errorMsg = error.response.data.message || `Server error: ${error.response.status}`;
                }
            } else if (error.request) {
                errorMsg = 'No response from server - please try again';
            } else {
                errorMsg = error.message || 'Unknown error occurred';
            }

            toast.error(errorMsg);
            console.error('Checkout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinueShopping = () => {
        router.push('/publicproducts');
    };

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
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                id="customer_name"
                                                name="customer_name"
                                                value={form.customer_name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300  text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                id="customer_email"
                                                name="customer_email"
                                                value={form.customer_email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                id="customer_phone"
                                                name="customer_phone"
                                                value={form.customer_phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                            <input
                                                type="text"
                                                id="delivery_address"
                                                name="delivery_address"
                                                value={form.delivery_address}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                                                id="credit_card"
                                                name="payment_method"
                                                value="credit_card"
                                                checked={form.payment_method === 'credit_card'}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-black focus:ring-black"
                                            />
                                            <label htmlFor="credit_card" className="ml-3 block text-sm font-medium text-gray-700">Credit Card</label>
                                            <FaCcVisa className="ml-4 text-blue-800" />
                                            <FaCcMastercard className="ml-2 text-red-600" />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="debit_card"
                                                name="payment_method"
                                                value="debit_card"
                                                checked={form.payment_method === 'debit_card'}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-black focus:ring-black"
                                            />
                                            <label htmlFor="debit_card" className="ml-3 block text-sm font-medium text-gray-700">Debit Card</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="paypal"
                                                name="payment_method"
                                                value="paypal"
                                                checked={form.payment_method === 'paypal'}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-black focus:ring-black"
                                            />
                                            <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">PayPal</label>
                                            <FaCcPaypal className="ml-4 text-blue-700" />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="cash_on_delivery"
                                                name="payment_method"
                                                value="cash_on_delivery"
                                                checked={form.payment_method === 'cash_on_delivery'}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-black focus:ring-black"
                                            />
                                            <label htmlFor="cash_on_delivery" className="ml-3 block text-sm font-medium text-gray-700">Cash on Delivery</label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isLoading ? 'Processing...' : 'Complete Order'}
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
                                                <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between items-start">
                                                    <div className="flex items-center">
                                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                                                            <img
                                                                src={`http://localhost:8000${item.image}`}
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