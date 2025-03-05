import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMealsByName } from '../api/mealApi';
import { SearchBar } from '../components/SearchBar';
import { RecipeCard } from '../components/ReceipeCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Pagination } from '../components/Pagination';
import { IMeal } from '../types';

export const HomePage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, error } = useQuery<IMeal[]>({
    queryKey: ['meals', searchValue],
    queryFn: () => searchMealsByName(searchValue),
    // keepPreviousData: true, // Видалено, оскільки ця опція не підтримується у вашій версії
  });

  // Якщо даних немає, використовуємо порожній масив
  const meals: IMeal[] = data ?? [];

  // Фільтрація за категорією з явною типізацією параметра
  const filteredMeals = selectedCategory === 'All'
    ? meals
    : meals.filter((meal: IMeal) => meal.strCategory === selectedCategory);

  // Пагінація
  const totalItems = filteredMeals.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const mealsPage = filteredMeals.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Усі рецепти</h1>

      <SearchBar onSearch={(val) => setSearchValue(val)} />

      <CategoryFilter
        categories={[]} // Передайте реальний масив категорій, якщо він є
        selectedCategory={selectedCategory}
        onChangeCategory={setSelectedCategory}
      />

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Сталася помилка: {(error as Error).message}</p>}
      {!isLoading && !isError && mealsPage.map((meal: IMeal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};


