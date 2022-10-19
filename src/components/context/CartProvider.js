import React from 'react';
import cartContext from './cart-context';

function CartProvider(props) {
  const addItemToCart = (item) => {};
  const removeItemFromCart = (id) => {};
  const cartContextValues = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <cartContext.Provider value={cartContextValues}>
      {props.children}
    </cartContext.Provider>
  );
}

export default CartProvider;
