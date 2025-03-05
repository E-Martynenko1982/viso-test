import { FC, useMemo } from 'react';
import { IMeal } from '../types';
import { RecipeCard } from './ReceipeCard';

interface SelectedRecipesListProps {
  selectedMeals: IMeal[];
  onRemoveMeal?: (idMeal: string) => void; // Якщо хочемо видаляти з вибраних
}

export const SelectedRecipesList: FC<SelectedRecipesListProps> = ({
  selectedMeals,
  onRemoveMeal,
}) => {
  // Об’єднані інгредієнти
  const combinedIngredients = useMemo(() => {
    const allIngredientsMap: Record<string, string[]> = {};

    selectedMeals.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof IMeal;
        const measureKey = `strMeasure${i}` as keyof IMeal;
        const ing = meal[ingredientKey];
        const measure = meal[measureKey];

        if (ing && ing.trim() !== '') {
          const ingredientName = ing.trim();
          if (!allIngredientsMap[ingredientName]) {
            allIngredientsMap[ingredientName] = measure && measure.trim() !== '' ? [measure] : [];
          } else {
            if (measure && measure.trim() !== '') {
              allIngredientsMap[ingredientName].push(measure);
            }
          }
        }
      }
    });

    return allIngredientsMap;
  }, [selectedMeals]);

  // Перетворюємо мапу в масив для відображення
  const ingredientsArray = Object.entries(combinedIngredients);

  return (
    <div>
      <h2>Вибрані рецепти</h2>

      {selectedMeals.length === 0 && <p>Немає вибраних рецептів</p>}
      {selectedMeals.map((meal) => (
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
            {ingredientsArray.map(([ingName, measures]) => (
              <li key={ingName}>
                {ingName} – {measures.join(', ')}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
