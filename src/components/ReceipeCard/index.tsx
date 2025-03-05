import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IMeal } from '../../types'

interface RecipeCardProps {
  meal: IMeal
  onAddToSelected?: (meal: IMeal) => void
}

export const RecipeCard: FC<RecipeCardProps> = ({ meal, onAddToSelected }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      margin: '0.5rem',
      width: '250px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    }}>
      <h3 style={{ textAlign: 'center' }}>{meal.strMeal}</h3>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
      />
      <p>Категорія: {meal.strCategory}</p>
      <p>Походження: {meal.strArea}</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '0.5rem' }}>
        <Link to={`/recipe/${meal.idMeal}`}>Детальніше</Link>
        {onAddToSelected && (
          <button onClick={() => onAddToSelected(meal)}>
            Додати до вибраних
          </button>
        )}
      </div>
    </div>
  )
}


