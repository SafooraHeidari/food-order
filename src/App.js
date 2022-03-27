import { useState } from "react";

import Header from "./Components/Header/Header";
import MealsSummary from "./Components/Meals/MealsSummary";
import AvailableMeals from "./Components/Meals/AvailableMeals";
import ShoppingCard from "./Components/ShoppingCard/ShoppingCard";
import CartProvider from "./store/CartProvider";


function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <ShoppingCard onCloseCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <MealsSummary/>
      <AvailableMeals/> 
    </CartProvider>
  );
}

export default App;
