import React, { useEffect, useReducer } from 'react';
import cartContext from './cart-context';

export const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const updatedAmount =
        state.totalAmount +
        action.payload.item.amount * action.payload.item.price;
      const foundItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item.id
      );
      let updatedItems;
      const foundCartItem = state.items[foundItemIndex];
      if (foundCartItem) {
        const updatedItem = {
          ...foundCartItem,
          amount: foundCartItem.amount + action.payload.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[foundItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.payload.item];
      }
      return {
        totalAmount: updatedAmount,
        items: updatedItems,
      };

    case 'REMOVE':
      const newTotalAmount =
        state.totalAmount -
        action.payload.item.price * action.payload.item.amount;

      const indexOfItem = state.items.findIndex(
        (item) => item.id === action.payload.item.id
      );

      let newItems;
      if (state.items[indexOfItem].amount - action.payload.item.amount < 1) {
        newItems = state.items.filter(
          (item) => item.id !== action.payload.item.id
        );
      } else {
        const targetItem = state.items[indexOfItem];
        const newItem = {
          ...targetItem,
          amount: targetItem.amount - action.payload.item.amount,
        };
        newItems = [...state.items];
        newItems[indexOfItem] = newItem;
      }
      return {
        totalAmount: newTotalAmount.toFixed(2),
        items: newItems,
      };
    default:
      return { ...state };
  }
};
const cartStorage = JSON.parse(localStorage.getItem('cart'));
function CartProvider(props) {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    cartStorage || {
      items: [],
      totalAmount: 0,
    }
  );
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);
  const cartContextValues = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    cartDispatch: cartDispatch,
  };
  return (
    <cartContext.Provider value={cartContextValues}>
      {props.children}
    </cartContext.Provider>
  );
}

export default CartProvider;
