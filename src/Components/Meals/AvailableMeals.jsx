import classes from "./AvailableMeals.module.css";
import Card from "../Card/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

// addMovieHandler()

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  async function addMealHandler() {
    const response = await fetch(
      "https://food-order-16043-default-rtdb.firebaseio.com/meals.json"
    );
    if (!response.ok){
      throw new Error('Something went wrong')
    }
    const data = await response.json();
    let loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        name: data[key].name,
        description: data[key].name,
        price: data[key].price,
      });
    }
    setMeals(loadedData);
    setLoading(false);
  }

  useEffect(() => 
  {
    addMealHandler().catch((error) => {
    setLoading(false)
    setHttpError(error.message)
    })}, []);

  return (
    <>
    {loading && 
    <section className={classes['meals-loading']}>
    <p>Loading...</p>
    </section>}
    {httpError && <section className={classes['meals-error']}>
    <p>Something went wrong...</p>
    </section>}
  
    {!loading && !httpError && <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>}
    </>
  )
    
}
