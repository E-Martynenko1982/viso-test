import { FC, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { searchMealsByName, getAllCategories } from '../../api/mealApi';
import { SearchBar } from '../../components/SearchBar';
import { RecipeCard } from '../../components/ReceipeCard';
import { CategoryFilter } from '../../components/CategoryFilter';
import { Pagination } from '../../components/Pagination';
import { IMeal } from '../../types';
import { paginateArray } from '../../utils';
import {
  HomePageContainer,
  Title,
  CenteredRow,
  SelectedCount,
  CardsWrapper
} from './HomePageStyles';

export const HomePage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const queryClient = useQueryClient();


  const { data, isLoading, isError, error } = useQuery<IMeal[]>({
    queryKey: ['meals', searchValue],
    queryFn: () => searchMealsByName(searchValue),
  });


  const { data: categoriesData } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });


  const { data: selectedMeals = [] } = useQuery<IMeal[]>({
    queryKey: ['selectedMeals'],

    queryFn: async () =>
      queryClient.getQueryData<IMeal[]>(['selectedMeals']) || [],
    enabled: false,
    initialData: () =>
      queryClient.getQueryData<IMeal[]>(['selectedMeals']) || [],
  });

  const meals = data ?? [];
  const filteredMeals =
    selectedCategory === 'All'
      ? meals
      : meals.filter(m => m.strCategory === selectedCategory);

  const totalPages = Math.ceil(filteredMeals.length / pageSize);
  const mealsPage = paginateArray(filteredMeals, currentPage, pageSize);


  const onAddToSelected = (meal: IMeal) => {
    const alreadySelected = selectedMeals.find(m => m.idMeal === meal.idMeal);
    if (!alreadySelected) {
      const updated = [...selectedMeals, meal];
      queryClient.setQueryData(['selectedMeals'], updated);
    }
  };

  return (
    <HomePageContainer>
      <Title>Усі рецепти</Title>

      <CenteredRow>
        <SearchBar onSearch={(val) => setSearchValue(val)} />
      </CenteredRow>

      <CenteredRow>
        <CategoryFilter
          categories={categoriesData ?? []}
          selectedCategory={selectedCategory}
          onChangeCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
        />
      </CenteredRow>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Сталася помилка: {(error as Error).message}</p>}

      <SelectedCount>Обраних рецептів: {selectedMeals.length}</SelectedCount>

      <CardsWrapper>
        {!isLoading &&
          !isError &&
          mealsPage.map(meal => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              onAddToSelected={onAddToSelected}
            />
          ))}
      </CardsWrapper>

      <CenteredRow>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CenteredRow>
    </HomePageContainer>
  );
};
