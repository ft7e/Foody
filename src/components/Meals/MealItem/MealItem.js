import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../context/cart-context';
import { useContext } from 'react';
import { ACTIONS } from '../../context/CartProvider';
const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCart = (amount) => {
    ctx.cartDispatch({
      type: ACTIONS.ADD,
      payload: {
        item: {
          name: props.name,
          amount: amount,
          price: props.price,
          id: props.id,
        },
      },
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addToCart={addToCart} />
      </div>
    </li>
  );
};

export default MealItem;
