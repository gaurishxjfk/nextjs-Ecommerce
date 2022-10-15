import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  const incQuantity = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQuantity = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (prod) => prod._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevQty) => prevQty + quantity);

    if (checkProductInCart) {
      const updatedCartItem = cartItems.map((cartProd) => {
        if (cartProd._id === product._id)
          return {
            ...cartProd,
            quantity: cartProd.quantity + quantity,
          };
        return cartProd;
      });

      setCartItems(updatedCartItem);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${quantity} ${product.name} added to cart`);
    setQty(1);
  };

  const deleteItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setTotalPriceAndTotalQuantity(updatedCartItems);
    setCartItems(updatedCartItems);
  };

  const toggleCartItemQuantity = (product, value) => {
    const updatedCartItems = cartItems.map((prod) => {
      if (prod._id === product._id) {
        if (value === "add") {
          return {
            ...prod,
            quantity: prod.quantity + 1,
          };
        } else {
          return {
            ...prod,
            quantity: prod.quantity - 1 < 1 ? 1 : prod.quantity - 1,
          };
        }
      }
      return prod;
    });
    setTotalPriceAndTotalQuantity(updatedCartItems);
    setCartItems(updatedCartItems);
  };

  const setTotalPriceAndTotalQuantity = (updatedCartItems) => {
    let totalSum = 0;
    let totalQty = 0;
    updatedCartItems.forEach((item) => {
      totalSum = totalSum + item.quantity * item.price;
      totalQty = totalQty + item.quantity;
    });
    setTotalPrice(totalSum);
    setTotalQuantity(totalQty);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        incQuantity,
        decQuantity,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        deleteItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
