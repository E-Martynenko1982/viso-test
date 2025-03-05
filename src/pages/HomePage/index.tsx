import { FC, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { searchMealsByName, getAllCategories } from '../../api/mealApi'
import { SearchBar } from '../../components/SearchBar'
import { RecipeCard } from '../../components/ReceipeCard'
import { CategoryFilter } from '../../components/CategoryFilter'
import { Pagination } from '../../components/Pagination'
import { IMeal } from '../../types'
import { paginateArray } from '../../utils'

export const HomePage: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMeals, setSelectedMeals] = useState<IMeal[]>([])
  const queryClient = useQueryClient()
  const pageSize = 10

  const { data, isLoading, isError, error } = useQuery<IMeal[]>({
    queryKey: ['meals', searchValue],
    queryFn: () => searchMealsByName(searchValue),
  })

  const { data: categoriesData } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  })

  const meals = data ?? []
  const filteredMeals = selectedCategory === 'All'
    ? meals
    : meals.filter(m => m.strCategory === selectedCategory)

  const totalPages = Math.ceil(filteredMeals.length / pageSize)
  const mealsPage = paginateArray(filteredMeals, currentPage, pageSize)

  const onAddToSelected = (meal: IMeal) => {
    setSelectedMeals(prev => {
      if (prev.find(m => m.idMeal === meal.idMeal)) {
        return prev
      }
      return [...prev, meal]
    })
  }

  useEffect(() => {
    queryClient.setQueryData(['selectedMeals'], selectedMeals)
  }, [selectedMeals, queryClient])

  return (
    <div style={{ backgroundColor: '#f7f7f7', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Усі рецепти</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <SearchBar onSearch={val => setSearchValue(val)} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <CategoryFilter
          categories={categoriesData ?? []}
          selectedCategory={selectedCategory}
          onChangeCategory={cat => {
            setSelectedCategory(cat)
            setCurrentPage(1)
          }}
        />
      </div>
      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Сталася помилка: {(error as Error).message}</p>}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <strong>Обраних рецептів: {selectedMeals.length}</strong>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        {!isLoading && !isError && mealsPage.map(meal => (
          <RecipeCard key={meal.idMeal} meal={meal} onAddToSelected={onAddToSelected} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  )
}
