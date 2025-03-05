import { FC, useState, useEffect } from 'react';
import { IMeal } from '../../types';
import { SelectedRecipesList } from '../../components/SelectedRecipesList';

export const SelectedPage: FC = () => {
  const [selectedMeals, setSelectedMeals] = useState<IMeal[]>(() => {
    const stored = localStorage.getItem('selectedMeals');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
  }, [selectedMeals]);

  const handleRemoveMeal = (idMeal: string) => {
    setSelectedMeals(prev => prev.filter(m => m.idMeal !== idMeal));
  };

  return (
    <SelectedRecipesList
      selectedMeals={selectedMeals}
      onRemoveMeal={handleRemoveMeal}
    />
  );
};
