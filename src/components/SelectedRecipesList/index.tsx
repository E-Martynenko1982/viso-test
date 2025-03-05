import { FC, useMemo } from 'react';
import { IMeal } from '../../types';
import { RecipeCard } from '../ReceipeCard';
import { combineIngredients } from '../../utils';
import {
  SelectedListContainer,
  RecipesTitle,
  NoRecipes,
  ArticlesTitle,
  IngredientsArticle,
  IngredientsList,
  RemoveButton
} from './SelectedRecipesListStyles';

interface SelectedRecipesListProps {
  selectedMeals: IMeal[];
  onRemoveMeal?: (idMeal: string) => void;
}

export const SelectedRecipesList: FC<SelectedRecipesListProps> = ({
  selectedMeals,
  onRemoveMeal,
}) => {
  const combined = useMemo(
    () => combineIngredients(selectedMeals),
    [selectedMeals]
  );
  const ingredientsArray = Object.entries(combined);

  return (
    <SelectedListContainer>
      <RecipesTitle>Вибрані рецепти</RecipesTitle>

      {selectedMeals.length === 0 && (
        <NoRecipes>Немає вибраних рецептів</NoRecipes>
      )}

      {selectedMeals.map(meal => (
        <div key={meal.idMeal} style={{ marginBottom: '1rem' }}>
          <RecipeCard meal={meal} />

          {onRemoveMeal && (
            <RemoveButton
              variant="contained"
              onClick={() => onRemoveMeal(meal.idMeal)}
            >
              Видалити з вибраних
            </RemoveButton>
          )}
        </div>
      ))}

      {selectedMeals.length > 0 && (
        <>
          <ArticlesTitle>Усі інгредієнти для вибраних рецептів:</ArticlesTitle>
          <IngredientsArticle>
            <IngredientsList>
              {ingredientsArray.map(([ingredient, measures]) => (
                <li key={ingredient}>
                  {ingredient}: {measures.join(', ')}
                </li>
              ))}
            </IngredientsList>
          </IngredientsArticle>
        </>
      )}
    </SelectedListContainer>
  );
};
