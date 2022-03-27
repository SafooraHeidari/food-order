import { useReducer } from "react"
import CartContext from "./CartContext"

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {

    if (action.type === 'addItem') {
        const updatedTotalAmount = state.totalAmount + action.payload.amount * action.payload.price;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id)
        const existingItem = state.items[existingCartItemIndex];
        
        let updatedItems;
        if(existingItem){
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount+action.payload.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.payload);
        }
        
        return {items: updatedItems, totalAmount: updatedTotalAmount}
    }

    if (action.type === 'removeItem'){
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload)
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.payload);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount-1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        
        return {items: updatedItems, totalAmount: updatedTotalAmount}

    }
    return defaultCartState
}



const CartProvider = (props) => {

    const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => dispatch({type:'addItem', payload: item});
    const removeItemFromCartHandler = (id) => dispatch({type:'removeItem', payload: id});

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartProvider