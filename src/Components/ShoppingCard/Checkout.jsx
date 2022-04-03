import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = enteredName.trim() !== '';
    const streetIsValid = enteredStreet.trim() !== '';
    const postalCodeIsValid = enteredPostalCode.trim().length === 5;
    const cityIsValid = enteredCity.trim() !== '';

    setFormInputsValidity({
        name: nameIsValid,
        street: streetIsValid,
        postalCode: postalCodeIsValid,
        city: cityIsValid,
    })

    const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;
    if (!formIsValid){
        return
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter your name.</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please enter your street.</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" id="postal-code" ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Postal code must be 5 digits.</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please enter your city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
