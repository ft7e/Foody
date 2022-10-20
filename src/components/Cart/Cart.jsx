import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../context/cart-context';
import { useContext } from 'react';
import CartItem from './CartItem';
import { ACTIONS } from '../context/CartProvider';
const Cart = (props) => {
  const ctx = useContext(CartContext);
  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctx.items.map((item) => (
        <li key={item.id}>
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            id={item.id}
            onRemove={() =>
              ctx.cartDispatch({
                type: ACTIONS.REMOVE,
                payload: { item: { ...item, amount: 1 } },
              })
            }
            onAdd={() =>
              ctx.cartDispatch({
                type: ACTIONS.ADD,
                payload: { item: { ...item, amount: 1 } },
              })
            }
          />
        </li>
      ))}
    </ul>
  );
  const hasItems = ctx.items.length > 0;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{ctx.totalAmount.toFixed(2)} $</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
