import { FC, useMemo } from 'react'
import { IMeal } from '../../types'
import { RecipeCard } from '../ReceipeCard'
import { combineIngredients } from '../../utils'

interface SelectedRecipesListProps {
  selectedMeals: IMeal[]
  onRemoveMeal?: (idMeal: string) => void
}

export const SelectedRecipesList: FC<SelectedRecipesListProps> = ({
  selectedMeals,
  onRemoveMeal,
}) => {
  const combined = useMemo(() => combineIngredients(selectedMeals), [selectedMeals])
  const ingredientsArray = Object.entries(combined)

  return (
    <div>
      <h2>Вибрані рецепти</h2>
      {selectedMeals.length === 0 && <p>Немає вибраних рецептів</p>}
      {selectedMeals.map(meal => (
        <div key={meal.idMeal}>
          <RecipeCard meal={meal} />
          {onRemoveMeal && (
            <button onClick={() => onRemoveMeal(meal.idMeal)}>
              Видалити з вибраних
            </button>
          )}
        </div>
      ))}
      {selectedMeals.length > 0 && (
        <>
          <h3>Усі інгредієнти для вибраних рецептів:</h3>
          <ul>
            {ingredientsArray.map(([ingredient, measures]) => (
              <li key={ingredient}>
                {ingredient}: {measures.join(', ')}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
