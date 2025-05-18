import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from "@/components/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        address: '',
        email: '',
        paymentMethod: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const generateInvoice = () => {
        const doc = new jsPDF();
    
        // Add content directly
        doc.text('Invoice', 10, 10);
        doc.text(`Name: ${form.name}`, 10, 20);
        doc.text(`Address: ${form.address}`, 10, 30);
        doc.text(`Email: ${form.email}`, 10, 40);
        doc.text(`Payment Method: ${form.paymentMethod}`, 10, 50);
    
        doc.text('Order Summary:', 10, 70);
        cartItems.forEach((item, index) => {
            doc.text(`${item.name} - Quantity: ${item.quantity} - Price: PKR. ${item.price}/-`, 10, 80 + (index * 10));
        });
    
        doc.text(`Total Products: ${totalProducts}`, 10, 80 + (cartItems.length * 10) + 10);
        doc.text(`Total Price: PKR. ${totalPrice}/-`, 10, 80 + (cartItems.length * 10) + 20);
    
        doc.save('invoice.pdf');
    };
    

//     const generateInvoice = () => {
//     const doc = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: [100, 150], // smaller slip size
//     });

//     const margin = 10;
//     let y = margin;

//     doc.setFontSize(14);
//     doc.setTextColor(40, 40, 40);
//     doc.text('🧾 Invoice Receipt', margin, y);
//     y += 8;

//     doc.setFontSize(10);
//     doc.setTextColor(80, 80, 80);
//     doc.text(`👤 Name: ${form.name}`, margin, y);
//     y += 5;
//     doc.text(`🏠 Address: ${form.address}`, margin, y);
//     y += 5;
//     doc.text(`📧 Email: ${form.email}`, margin, y);
//     y += 5;
//     doc.text(`💳 Payment: ${form.paymentMethod}`, margin, y);
//     y += 8;

//     doc.setDrawColor(180);
//     doc.line(margin, y, 90, y); // horizontal line
//     y += 4;

//     doc.setFontSize(11);
//     doc.setTextColor(50, 50, 50);
//     doc.text('🛒 Order Summary:', margin, y);
//     y += 6;

//     doc.setFontSize(9);
//     cartItems.forEach((item, index) => {
//         doc.text(`- ${item.name}`, margin, y);
//         y += 4;
//         doc.text(`Qty: ${item.quantity} | PKR: ${item.price}/-`, margin + 4, y);
//         y += 5;
//     });

//     y += 4;
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
//     doc.text(`📦 Total Products: ${totalProducts}`, margin, y);
//     y += 5;
//     doc.text(`💰 Total Price: PKR. ${totalPrice}/-`, margin, y);

//     doc.save('invoice.pdf');
// };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        // Simulate checkout process
        console.log('Order placed', form, cartItems);

        // Generate Invoice
        generateInvoice();

        // Clear cart and reset form
        clearCart();

        setForm({
            name: '',
            address: '',
            email: '',
            paymentMethod: '',
        });

        toast.success('Order placed successfully');
        // router.push('/');
    };

    const handleContinueShopping = () => {
        router.push('/publicproducts');
    };

    const totalPrice = cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity || 0), 0);
    const totalProducts = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="container mx-auto mt-4 mb-24 ml-52">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 p-4">
                    <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-500">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-500">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-500">Payment Method</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={form.paymentMethod}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="" disabled>Select Payment Method</option>
                                <option value="Credit Card">Cash On Delivery</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors w-1/2"
                            >
                                Place Order
                            </button>
                            <button
                                type="button"
                                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors w-1/2"
                                onClick={handleContinueShopping}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </form>
                </div>
                <div className="lg:w-1/2 p-4 mt-6 lg:mt-0 ml-10">
                    <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item) => (
                                <div className="flex border-b border-gray-200 py-4" key={item.id}>
                                    <div className="w-1/6">
                                        <img
                                            src={`http://localhost:8000/${item.image}`}
                                            alt={item.name}
                                            className="rounded-lg"
                                        />
                                    </div>
                                    <div className="w-2/3 pl-4">
                                        <h4 className="text-lg font-medium">{item.name}</h4>
                                        <p className="text-gray-600">PKR. {item.price}/-</p>
                                        <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4">
                                <h4 className="text-lg font-medium">Total Products: {totalProducts}</h4>
                                <h4 className="text-lg font-medium">Total Price: PKR. {totalPrice}/-</h4>
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default CheckoutPage;

