'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import AxiosInstance from '@/components/AxiosInstance'
import { Order, OrderItem, Product, SalesProduct } from '@/types'

interface FormData {
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  city: string
  payment_method: string
}

interface PaymentMethod {
  value: string
  label: string
}

const UpdateOrder = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const orderId = params.id

  const [formData, setFormData] = useState<FormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    city: '',
    payment_method: 'cash',
  })
  const [items, setItems] = useState<OrderItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOrderLoading, setIsOrderLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const paymentMethods: PaymentMethod[] = [
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'card', label: 'Credit Card' },
    { value: 'bank', label: 'Bank Transfer' },
  ]

  const fetchOrderData = useCallback(async () => {
    try {
      const [orderRes, productsRes, salesProductsRes] = await Promise.all([
        AxiosInstance.get(`/ecommerce/order/${orderId}`),
        AxiosInstance.get('/products'),
        AxiosInstance.get('/salesproductpage'),
      ])

      const orderData: Order = orderRes.data.data
      
      setFormData({
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        delivery_address: orderData.delivery_address,
        city: orderData.city,
        payment_method: orderData.payment_method,
      })

      setItems(
        orderData.order_details.map((item: { id: any; product: { id: any; name: any }; sales_product: { id: any; name: any }; quantity: any; unit_price: any; total_price: any }) => ({
          id: item.id,
          product_type: item.product ? 'product' : 'sales_product',
          product_id: item.product?.id || item.sales_product?.id || 0,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price,
          product_name: item.product?.name || item.sales_product?.name || '',
        }))
      )

      setProducts(productsRes.data.data)
      setSalesProducts(salesProductsRes.data.data)
    } catch (err) {
      setError('Failed to fetch order data. Please try again later.')
      console.error('Error fetching data:', err)
    } finally {
      setIsOrderLoading(false)
    }
  }, [orderId])

  useEffect(() => {
    fetchOrderData()
  }, [fetchOrderData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems]
      const updatedItem = { ...updatedItems[index], [field]: value }

      // Recalculate total price if quantity or unit price changes
      if (field === 'quantity' || field === 'unit_price') {
        updatedItem.total_price = updatedItem.quantity * updatedItem.unit_price
      }

      // Update product name when product changes
      if (field === 'product_id') {
        const productList = updatedItem.product_type === 'product' ? products : salesProducts
        const selectedProduct = productList.find(p => p.id === value)
        if (selectedProduct) {
          updatedItem.product_name = selectedProduct.name
          updatedItem.unit_price = updatedItem.product_type === 'product' 
            ? selectedProduct.price 
            : selectedProduct.final_price
          updatedItem.total_price = updatedItem.quantity * updatedItem.unit_price
        }
      }

      updatedItems[index] = updatedItem
      return updatedItems
    })
  }

  const addNewItem = () => {
    if (products.length === 0) return

    setItems(prevItems => [
      ...prevItems,
      {
        id: 0, // 0 indicates new item
        product_type: 'product',
        product_id: products[0].id,
        product_name: products[0].name,
        quantity: 1,
        unit_price: products[0].price,
        total_price: products[0].price,
      },
    ])
  }

  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total_price, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Prepare items to update (both new and existing)
      const itemsToUpdate = items.map(item => ({
        id: item.id,
        product_type: item.product_type,
        product_id: item.product_id,
        quantity: item.quantity,
      }))

      // Items to delete are those with quantity <= 0 (only existing items)
      const deleteItems = items
        .filter(item => item.id !== 0 && item.quantity <= 0)
        .map(item => item.id)

      const payload = {
        id: orderId,
        ...formData,
        items: itemsToUpdate,
        delete_items: deleteItems,
        full_update: true, // Indicate we want to replace all items
      }

      const response = await AxiosInstance.put('/orders/update', payload)

      if (response.data) {
        router.push('/orders')
      }
    } catch (err) {
      setError('Failed to update order. Please try again.')
      console.error('Error updating order:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isOrderLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading order data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Update Order #{orderId}</h2>
            <p className="mt-1 text-indigo-100">
              Update the customer information and order items below
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div>
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
                  Customer Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.customer_email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Phone <span className="text-red-500">*</span>
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
                  {paymentMethods.map(method => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
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
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Order Items Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
                <button
                  type="button"
                  onClick={addNewItem}
                  disabled={products.length === 0}
                  className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    products.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Add Item
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-gray-500">No items in this order</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id || `new-${index}`} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Product Type */}
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Type
                          </label>
                          <select
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                            value={item.product_type}
                            onChange={(e) => handleItemChange(index, 'product_type', e.target.value)}
                          >
                            <option value="product">Regular Product</option>
                            <option value="sales_product">Sales Product</option>
                          </select>
                        </div>

                        {/* Product Selection */}
                        <div className="md:col-span-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product
                          </label>
                          <select
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                            value={item.product_id}
                            onChange={(e) => handleItemChange(index, 'product_id', parseInt(e.target.value))}
                          >
                            {(item.product_type === 'product' ? products : salesProducts).map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name} - $
                                {item.product_type === 'product' ? product.price : product.final_price}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          />
                        </div>

                        {/* Unit Price */}
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Unit Price
                          </label>
                          <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              className="block w-full pl-7 pr-3 py-2 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                              value={item.unit_price}
                              onChange={(e) => handleItemChange(index, 'unit_price', parseFloat(e.target.value) || 0)}
                              readOnly // Typically unit price comes from product selection
                            />
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className="md:col-span-1 flex items-end">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="w-full px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Total Price */}
                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {item.product_name || 'Selected product'}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          Item Total: <span className="text-indigo-600">${item.total_price.toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Order Summary</h3>
              <div className="flex justify-between border-b border-gray-200 py-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm font-medium">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-lg font-bold text-indigo-600">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={() => router.push('/orders')}
                className="px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Updating...' : 'Update Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateOrder