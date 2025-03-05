import { FC, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { IMeal } from '../../types'
import { RecipeCard } from '../../components/ReceipeCard'
import { combineIngredients } from '../../utils'

export const SelectedPage: FC = () => {
  const queryClient = useQueryClient()
  const selectedMeals = queryClient.getQueryData<IMeal[]>(['selectedMeals']) || []

  const combinedMap = useMemo(() => combineIngredients(selectedMeals), [selectedMeals])
  const ingredientsArray = Object.entries(combinedMap)

  return (
    <div>
      <h1>Вибрані рецепти</h1>
      {selectedMeals.map(meal => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
      <h2>Список усіх інгредієнтів:</h2>
      <ul>
        {ingredientsArray.map(([ingredient, measures]) => (
          <li key={ingredient}>
            {ingredient}: {measures.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  )
}
