import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IMeal } from '../types';

// Можливий проп тайп:
interface RecipeCardProps {
  meal: IMeal;
  // Наприклад, callback для додавання рецепта у вибрані
  onAddToSelected?: (meal: IMeal) => void;
}

export const RecipeCard: FC<RecipeCardProps> = ({ meal, onAddToSelected }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0' }}>
      <h3>{meal.strMeal}</h3>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: '200px', height: 'auto' }}
      />
      <p>Категорія: {meal.strCategory}</p>
      <p>Походження: {meal.strArea}</p>

      {/* Посилання на детальну сторінку рецепта */}
      <Link to={`/recipe/${meal.idMeal}`}>
        Детальніше
      </Link>

      {/* Кнопка додавання до вибраних (за бажанням) */}
      {onAddToSelected && (
        <button onClick={() => onAddToSelected(meal)}>Додати до вибраних</button>
      )}
    </div>
  );
};
