import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import axios from 'axios';

const mealsData = axios.create({
  baseURL:
    'https://trial-37b18-default-rtdb.europe-west1.firebasedatabase.app/',
});

const AvailableMeals = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const mealsFromDb = async () => {
    try {
      setError(false);
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
      setIsLoading(false);
      return readyData;
    } catch {
      setError(true);
      console.log('Error fetching Data');
    }
  };
  useEffect(() => {
    (async () => {
      const mealsArr = await mealsFromDb();
      setMeals([...mealsArr]);
    })();
  }, []);

  let mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if (isLoading) {
    mealsList = 'Loading...';
  }
  if (error) {
    mealsList = 'Error Fetching Data';
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
