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
//     const doc = new jsPDF();
    
//     // Set document properties
//     doc.setProperties({
//         title: `Invoice #${orderData.order_id}`,
//         subject: 'Invoice from GOHAR COLLECTION',
//         author: 'GOHAR COLLECTION',
//     });

//     // Add logo or header
//     doc.setFillColor(40, 40, 40);
//     doc.rect(0, 0, 210, 30, 'F');
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(20);
//     doc.text('GOHAR COLLECTION', 105, 20, { align: 'center' });
    
//     // Invoice title and details
//     doc.setFontSize(12);
//     doc.setTextColor(100, 100, 100);
//     doc.text('INVOICE', 20, 45);
//     doc.setFontSize(10);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 45);
//     doc.text(`Invoice #: ${orderData.order_id}`, 160, 50);
//     doc.text(`Status: ${orderData.status}`, 160, 55);
    
//     // Company and customer info
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
    
//     // Company info
//     doc.text('From:', 20, 65);
//     doc.setFont(undefined, 'bold');
//     doc.text('GOHAR COLLECTION', 20, 70);
//     doc.setFont(undefined, 'normal');
//     doc.text('Sector D, DHA 2, ISB.', 20, 75);
//     doc.text('contact@luxury.com', 20, 80);
    
//     // Customer info
//     doc.text('To:', 20, 95);
//     doc.setFont(undefined, 'bold');
//     doc.text(orderData.customer_info.name, 20, 100);
//     doc.setFont(undefined, 'normal');
//     doc.text(orderData.delivery_info.address, 20, 105);
//     doc.text(orderData.customer_info.phone, 20, 110);
//     doc.text(orderData.customer_info.email, 20, 115);
    
//     // Items table header
//     doc.setFillColor(240, 240, 240);
//     doc.rect(20, 130, 170, 8, 'F');
//     doc.setTextColor(0, 0, 0);
//     doc.setFont(undefined, 'bold');
//     doc.text('Item', 20, 135);
//     doc.text('Unit Price', 100, 135);
//     doc.text('Qty', 140, 135);
//     doc.text('Total', 170, 135);
    
//     // Items list
//     doc.setFont(undefined, 'normal');
//     let yPosition = 145;
    
//     orderData.order_summary.items.forEach(item => {
//         doc.text(item.product_name, 20, yPosition);
//         doc.text(`PKR ${item.unit_price.toLocaleString()}`, 100, yPosition);
//         doc.text(`${item.quantity}`, 140, yPosition);
//         doc.text(`PKR ${item.total_price.toLocaleString()}`, 170, yPosition);
//         yPosition += 10;
//     });
    
//     // Total section
//     doc.setFont(undefined, 'bold');
//     doc.text('Subtotal:', 140, yPosition + 10);
//     doc.text(`PKR ${orderData.order_summary.total.toLocaleString()}`, 170, yPosition + 10);
    
//     doc.text('Shipping:', 140, yPosition + 20);
//     doc.text('PKR 0', 170, yPosition + 20);
    
//     doc.text('Tax:', 140, yPosition + 30);
//     doc.text('PKR 0', 170, yPosition + 30);
    
//     doc.setFontSize(12);
//     doc.text('Total Amount:', 140, yPosition + 45);
//     doc.text(`PKR ${orderData.order_summary.total.toLocaleString()}`, 170, yPosition + 45);
    
//     // Footer
//     doc.setFontSize(8);
//     doc.setTextColor(100, 100, 100);
//     doc.text('Thank you for your business!', 105, 280, { align: 'center' });
//     doc.text('Terms & Conditions: Payment due within 15 days', 105, 285, { align: 'center' });
//     doc.text('GOHAR COLLECTION | Sector D, DHA 2, ISB. | contact@luxury.com', 105, 290, { align: 'center' });
    
//     doc.save(`invoice-${orderData.order_id}.pdf`);
// };

//     const prepareOrderDataForConfirmation = (responseData) => {
//         return {
//             order_id: responseData.order_id,
//             customer_info: {
//                 name: form.customer_name,
//                 email: form.customer_email,
//                 phone: form.customer_phone
//             },
//             delivery_info: {
//                 address: form.delivery_address,
//                 city: form.city,
//                 estimated_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
//             },
//             payment_method: form.payment_method,
//             payment_status: true,
//             status: 'Confirmed',
//             order_summary: {
//                 items: cartItems.map(item => ({
//                     product_name: item.name,
//                     unit_price: getUnitPrice(item),
//                     quantity: item.quantity || 1,
//                     total_price: getUnitPrice(item) * (item.quantity || 1)
//                 })),
//                 subtotal: getTotalPrice(),
//                 total: getTotalPrice()
//             }
//         };
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
//             const orderResponse = response.data.data;
//             generateInvoice(orderResponse);
//             clearCart();

//             // Prepare and store order data for confirmation page
//             const confirmationData = prepareOrderDataForConfirmation(orderResponse);
//             localStorage.setItem('latestOrder', JSON.stringify(confirmationData));

//             toast.success('Order placed successfully!', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//                 onClose: () => {
//                     router.push('/orderconfirmation');
//                 }
//             });

//         } catch (error) {
//             let errorMsg = 'Failed to place order';
            
//             if (error.response) {
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
//                 errorMsg = 'No response from server - please try again';
//             } else {
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
//                                                 className="w-full px-4 py-2 border border-gray-300  text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
//                                                 className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
//                                                 className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
//                                                 className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
//                                                 className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

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

    // Function to get the main image URL for a product
    const getMainImage = (item) => {
        // If the item has image_urls array (like in PublicProducts)
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
                    total_price: getUnitPrice(item) * (item.quantity || 1),
                    image_url: getMainImage(item) // Include image URL in order data
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
        // Use item.isSales to determine the product_type correctly
        const items = cartItems.map(item => ({
            product_type: item.isSales ? 'sales_product' : 'product',
            product_id: item.id,
            quantity: item.quantity || 1
        }));

        const orderData = {
            customer_name: form.customer_name,
            customer_email: form.customer_email,
            customer_phone: form.customer_phone,
            delivery_address: form.delivery_address,
            city: form.city,
            payment_method: form.payment_method,
            items: items
        };

        const response = await AxiosInstance.post('/ecommerce/publicorder', orderData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        });

        const orderResponse = response.data.data;
        generateInvoice(orderResponse);
        clearCart();

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
                                                                src={getMainImage(item)}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm text-gray-900 font-medium">{item.name}</h4>
                                                            <p className="text-gray-700 text-sm">Qty: {item.quantity || 1}</p>
                                                            {item.color && <p className="text-gray-500 text-xs">Color: {item.color}</p>}
                                                            {item.size && <p className="text-gray-500 text-xs">Size: {item.size}</p>}
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