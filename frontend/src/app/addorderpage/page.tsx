'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";

interface Product {
  id: number;
  name: string;
  price: number;
  has_discount?: boolean;
}

interface SalesProduct {
  id: number;
  name: string;
  final_price: number;
  has_discount?: boolean;
}

interface OrderItem {
  product_type: 'product' | 'sales_product';
  product_id: number | null;
  quantity: number;
}

const AddOrder = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    city: '',
    payment_method: 'cash_on_delivery',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { product_type: 'product', product_id: null, quantity: 1 }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  // Calculate delivery date based on backend logic using native Date methods
  useEffect(() => {
    const calculateDeliveryDate = () => {
      const today = new Date();
      const deliveryDate = new Date(today);
      
      // Get day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const dayOfWeek = today.getDay();
      
      if (dayOfWeek === 4 || dayOfWeek === 5) { // Thursday or Friday
        deliveryDate.setDate(today.getDate() + 4);
      } else if (dayOfWeek === 6) { // Saturday
        deliveryDate.setDate(today.getDate() + 3);
      } else {
        deliveryDate.setDate(today.getDate() + 2);
      }
      
      // Format date as YYYY-MM-DD
      const year = deliveryDate.getFullYear();
      const month = String(deliveryDate.getMonth() + 1).padStart(2, '0');
      const day = String(deliveryDate.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    };
    
    setEstimatedDelivery(calculateDeliveryDate());
  }, []);

  // Fetch products and sales products
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const [productsRes, salesProductsRes] = await Promise.all([
        AxiosInstance.get('/ecommerce/product'),
        AxiosInstance.get('/ecommerce/salesproduct')
      ]);
      
      if (productsRes.data) {
        setProducts(productsRes.data.data.data);
      }
      if (salesProductsRes.data) {
        // Convert final_price to number for each sales product
        const salesProductsData = salesProductsRes.data.data.data.map((product: any) => ({
          ...product,
          final_price: Number(product.final_price)
        }));
        setSalesProducts(salesProductsData);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  fetchProducts();
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'quantity' ? parseInt(value) || 1 : value
    };
    setOrderItems(updatedItems);
  };

  const addItem = () => {
    setOrderItems([...orderItems, { product_type: 'product', product_id: null, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    if (orderItems.length > 1) {
      const updatedItems = [...orderItems];
      updatedItems.splice(index, 1);
      setOrderItems(updatedItems);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const payload = {
        ...formData,
        items: orderItems.filter(item => item.product_id !== null)
      };

      const response = await AxiosInstance.post('/ecommerce/order', payload);
      
      if (response.data) {
        router.push('/orderspage');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Create New Order</h2>
            <p className="mt-1 text-indigo-100">Fill in customer details and order items</p>
          </div>
          
          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div className="md:col-span-2">
                <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Customer Email */}
              <div>
                <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.customer_email}
                  onChange={handleChange}
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="customer_phone"
                  name="customer_phone"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Delivery Address */}
              <div className="md:col-span-2">
                <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="delivery_address"
                  name="delivery_address"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.delivery_address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              {/* Payment Method */}
              <div>
                <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <select
                  id="payment_method"
                  name="payment_method"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.payment_method}
                  onChange={handleChange}
                  required
                >
                  <option value="cash_on_delivery">Cash ON Delivery</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">Paypal</option>
                </select>
              </div>

              {/* Estimated Delivery */}
              <div className="md:col-span-2">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800">Estimated Delivery Date</h3>
                  <p className="mt-1 text-lg font-semibold text-blue-900">{estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
              
              {orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  {/* Product Type */}
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      value={item.product_type}
                      onChange={(e) => handleItemChange(index, 'product_type', e.target.value)}
                    >
                      <option value="product">Regular Product</option>
                      <option value="sales_product">Sales Product</option>
                    </select>
                  </div>

                  {/* Product Selection */}
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      value={item.product_id || ''}
                      onChange={(e) => handleItemChange(index, 'product_id', parseInt(e.target.value) || null)}
                      required
                    >
                      <option value="">Select a product</option>
                      {item.product_type === 'product' 
                        ? products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ${product.price.toFixed(2)}
                              {product.has_discount && ' (Discounted)'}
                            </option>
                          ))
                        : salesProducts.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ${product.final_price.toFixed(2)}
                              {product.has_discount && ' (Discounted)'}
                            </option>
                          ))}
                    </select>
                  </div>

                                {/* Quantity */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
              </div>

              {/* Remove Button */}
              <div className="md:col-span-2 flex items-end">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                  disabled={orderItems.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* <div className="flex justify-end">
            <button
              type="button"
              onClick={addItem}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              + Add Item
            </button>
          </div> */}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
         <button
              type="button"
              onClick={addItem}
              className="px-6 py-2 bg-green-600 mr-4 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              + Add Item
            </button>
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Order...' : 'Create Order'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default AddOrder;