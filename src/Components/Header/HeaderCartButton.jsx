
import React, { useContext, useEffect, useState } from "react";

import CartContext from "../../store/CartContext";
import CartIcon from "../../assets/CartIcon"
import classes from "./HeaderCartButton.module.css"

export default function HeaderCartButton(props){
    const cartCtx = useContext(CartContext);
    const cartItemNumber = cartCtx.items.reduce((curVal, item) => {
        return curVal+item.amount;
    }, 0);

    const [buttonAnimation, setButtonAnimation] = useState(false);
    const btnClasses = `${classes.button} ${buttonAnimation ? classes.bump : ''}`;

    useEffect(()=>{
        if (cartCtx.items.length === 0){
            return;
        }
        setButtonAnimation(true);
        const timer = setTimeout(() => {
            setButtonAnimation(false);
        },300)

        return () => {
            clearTimeout(timer);
        }
    },[cartCtx.items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartItemNumber}</span>
        </button>
    )
}