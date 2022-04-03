import { useContext, useState } from 'react';
import CartContext from '../../store/CartContext';
import CartItem from '../Card/CartItem';
import Modal from '../Modal/Modal';
import Checkout from './Checkout';
import classes from './ShoppingCard.module.css';

export default function ShoppingCard(props) {

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);


  const cartCtx = useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemHandler = (item) => {
    cartCtx.addItem({...item, amount:1})
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id)
  };
  const showFormHandler = () => {
    setShowForm(true)
  }

  const confirmDataHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://food-order-16043-default-rtdb.firebaseio.com/orders.json", {
      method:'POST',
      body: JSON.stringify({
        user: userData,
        meals: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true)
  }

  
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
  {isSubmitting && <p>Sending orders ...</p>}
  {!isSubmitting && !didSubmit && <>{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {showForm && <Checkout onConfirm={confirmDataHandler} onCancel={props.onCloseCart}/>}
  {!showForm && <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
    {hasItems && <button className={classes.button} onClick={showFormHandler}>Order</button>}
  </div>}</>}
  {didSubmit && <p>Enjoy your meal :).</p>}
</Modal>

  );
};