import { useContext } from 'react';
import CartContext from '../../../store/CartContext';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

export default function MealItem({name, description, price, id}){
//   const pricee = `$${price.toFixed(2)}`;
const cartCtx = useContext(CartContext);
const addHandler = (amount) => {
  cartCtx.addItem({
    id: id,
    name: name,
    price: price,
    amount: amount
  })
}

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <MealItemForm onAddToCart ={addHandler}/>
    </li>
  );
};