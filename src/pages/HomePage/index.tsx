import { FC, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IMeal } from '../../types';
import { searchMealsByName, getAllCategories } from '../../api/mealApi';
import { RecipeCard } from '../../components/ReceipeCard';
import { Pagination } from '../../components/Pagination';
import { paginateArray } from '../../utils';
import {
  HomePageContainer,
  Title,
  CenteredRow,
  SelectedCount,
  CardsWrapper
} from './HomePageStyles';
import { SearchBar } from '../../components/SearchBar';
import { CategoryFilter } from '../../components/CategoryFilter';

export const HomePage: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [selectedMeals, setSelectedMeals] = useState<IMeal[]>(() => {
    const stored = localStorage.getItem('selectedMeals');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
  }, [selectedMeals]);

  const { data: mealsData = [] } = useQuery<IMeal[]>({
    queryKey: ['meals', searchValue],
    queryFn: () => searchMealsByName(searchValue),
  });

  const { data: categoriesData = [] } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const filteredMeals =
    selectedCategory === 'All'
      ? mealsData
      : mealsData.filter(m => m.strCategory === selectedCategory);
  const totalPages = Math.ceil(filteredMeals.length / pageSize);
  const mealsPage = paginateArray(filteredMeals, currentPage, pageSize);

  const onAddToSelected = (meal: IMeal) => {
    setSelectedMeals(prev => {
      if (!prev.find(m => m.idMeal === meal.idMeal)) {
        return [...prev, meal];
      }
      return prev;
    });
  };

  return (
    <HomePageContainer>
      <Title>Усі рецепти</Title>

      <CenteredRow>
        <SearchBar onSearch={setSearchValue} />
      </CenteredRow>

      <CenteredRow>
        <CategoryFilter
          categories={categoriesData}
          selectedCategory={selectedCategory}
          onChangeCategory={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
        />
      </CenteredRow>

      <SelectedCount>Обраних рецептів: {selectedMeals.length}</SelectedCount>

      <CardsWrapper>
        {mealsPage.map(meal => {
          const isSelected = !!selectedMeals.find(m => m.idMeal === meal.idMeal);
          return (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              onAddToSelected={onAddToSelected}
              isSelected={isSelected}
            />
          );
        })}
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
