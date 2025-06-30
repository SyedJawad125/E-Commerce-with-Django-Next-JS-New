// 'use client';
// import { createContext, useState, useContext } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product, quantity = 1) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity } // Update quantity
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity }]; // Add new product with quantity
//       }
//     });
//   };

//   const removeFromCart = (product) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => item.id !== product.id)
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


'use client';
import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity } // Update quantity
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }]; // Add new product with quantity
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  // Add this new function to update quantity directly
  const updateQuantity = (product, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(product);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart,
        updateQuantity // Make sure to include this in the provider value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

//Before Quantity................. 

// 'use client';
// import { createContext, useState, useContext } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (products) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === products.id);
//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === products.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevItems, { ...products, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (product) => {
//     setCartItems((prevItems) => 
//       prevItems.filter((item) => item.id !== product.id)
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
