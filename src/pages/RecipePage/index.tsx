import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMealById } from '../../api/mealApi'
import { IMeal } from '../../types'

export const RecipePage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: meal, isLoading } = useQuery<IMeal | null>({
    queryKey: ['mealById', id],
    queryFn: () => getMealById(id!),
    enabled: !!id,
  })

  if (isLoading) return <p>Завантаження...</p>
  if (!meal) return <p>Рецепт не знайдено</p>

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p>Категорія: {meal.strCategory}</p>
      <p>Регіон: {meal.strArea}</p>
      <p>{meal.strInstructions}</p>
    </div>
  )
}
