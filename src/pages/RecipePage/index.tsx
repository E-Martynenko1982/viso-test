import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMealById } from '../../api/mealApi';
import { IMeal } from '../../types';
import {
  RecipePageContainer,
  RecipeTitle,
  RecipeImage,
  RecipeInfo,
  InstructionsContainer,
} from './RecipePageStyles';

export const RecipePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: meal, isLoading } = useQuery<IMeal | null>({
    queryKey: ['mealById', id],
    queryFn: () => getMealById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (!meal) return <p>Рецепт не знайдено</p>;

  return (
    <RecipePageContainer>
      <RecipeTitle variant="h4">{meal.strMeal}</RecipeTitle>
      <RecipeImage src={meal.strMealThumb} alt={meal.strMeal} />
      <RecipeInfo>Категорія: {meal.strCategory}</RecipeInfo>
      <RecipeInfo>Регіон: {meal.strArea}</RecipeInfo>
      <InstructionsContainer>
        <p>{meal.strInstructions}</p>
      </InstructionsContainer>
    </RecipePageContainer>
  );
};

