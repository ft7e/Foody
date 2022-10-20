import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const [inputValid, setInputValid] = useState(true);
  const inputValue = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = inputValue.current.value;
    const enteredAmountValue = parseInt(enteredAmount);
    if (enteredAmount.trim().length === 0) {
      setInputValid(false);
      return;
    }
    props.addToCart(enteredAmountValue);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputValue}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button type='submit'>+ Add</button>
      {!inputValid && <p>Input must be 1 to 5</p>}
    </form>
  );
};

export default MealItemForm;
