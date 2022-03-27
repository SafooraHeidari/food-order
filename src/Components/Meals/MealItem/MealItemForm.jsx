import React, { useContext, useRef } from "react";

import CartContext from "../../../store/CartContext";
import Input from "../../Input/Input";
import classes from "./MealItemForm.module.css"

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const handleSubmit = (event) => {
        event.preventDefault();
        const amount = amountInputRef.current.value;
        props.onAddToCart(+amount);
    }
    const cartCtx = useContext(CartContext);
    return(
        <form className={classes.form} onSubmit={handleSubmit}>
            <Input ref={amountInputRef} label="Amount" input={{type:'number', id:'amount', min:'1', max:'5', step:'1', defaultValue:'1'}}/>
            <button>+ ADD</button>
        </form>
    )
}

export default MealItemForm;