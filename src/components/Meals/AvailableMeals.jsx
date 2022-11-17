import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import axios from 'axios';

const mealsData = axios.create({
  baseURL:
    'https://trial-37b18-default-rtdb.europe-west1.firebasedatabase.app/',
});
const mealsFromDb = async () => {
  try {
    const response = await mealsData.get('/meals.json');
    const dataObj = response.data;
    const readyData = [];
    for (const key in dataObj) {
      readyData.push({
        id: key,
        name: dataObj[key].name,
        price: dataObj[key].price,
        description: dataObj[key].description,
      });
    }
    return readyData;
  } catch {
    console.log('Error fetching Data');
  }
};
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    (async () => {
      const mealsArr = await mealsFromDb();
      setMeals([...mealsArr]);
    })();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
