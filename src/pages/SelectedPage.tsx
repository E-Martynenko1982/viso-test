import { FC, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IMeal } from '../types';
import { RecipeCard } from '../components/ReceipeCard';

export const SelectedPage: FC = () => {
  const queryClient = useQueryClient();
  // Дістаємо масив обраних рецептів (або пустий масив за замовчуванням)
  const selectedMeals = queryClient.getQueryData<IMeal[]>(['selectedMeals']) || [];

  const combinedIngredients = useMemo(() => {
    // Зберігаємо Map типу: <ingredientName, string[]>
    const allIngredientsMap: Record<string, string[]> = {};

    selectedMeals.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof IMeal;
        const measureKey = `strMeasure${i}` as keyof IMeal;

        const ing = meal[ingredientKey];
        const measure = meal[measureKey];

        // Перевіряємо, що ing - непорожній рядок
        if (typeof ing === 'string' && ing.trim() !== '') {
          const ingredientName = ing.trim();

          // Ініціалізуємо масив, якщо треба
          if (!allIngredientsMap[ingredientName]) {
            allIngredientsMap[ingredientName] = [];
          }

          // Якщо measure - непорожній рядок, додаємо
          if (typeof measure === 'string' && measure.trim() !== '') {
            allIngredientsMap[ingredientName].push(measure.trim());
          }
        }
      }
    });

    return allIngredientsMap;
  }, [selectedMeals]);

  // Перетворюємо Map у масив [ingredientName, arrayOfMeasures]
  const ingredientsArray = Object.entries(combinedIngredients);

  return (
    <div>
      <h1>Вибрані рецепти</h1>

      {selectedMeals.map((meal) => (
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
  );
};
