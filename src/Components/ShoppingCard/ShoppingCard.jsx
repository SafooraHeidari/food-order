import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import CartItem from '../Card/CartItem';
import Modal from '../Modal/Modal';
import classes from './ShoppingCard.module.css';

export default function ShoppingCard(props) {


  const cartCtx = useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemHandler = (item) => {
    cartCtx.addItem({...item, amount:1})
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id)
  };
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} 
        onAdd={addItemHandler.bind(null, item)} 
        onRemove={removeItemHandler.bind(null, item.id)}/>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};