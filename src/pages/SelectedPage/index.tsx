import { FC } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IMeal } from '../../types';
import { SelectedRecipesList } from '../../components/SelectedRecipesList';

export const SelectedPage: FC = () => {
  const queryClient = useQueryClient();

  const { data: selectedMeals = [] } = useQuery<IMeal[]>({
    queryKey: ['selectedMeals'],
    enabled: false,
    initialData: () =>
      queryClient.getQueryData<IMeal[]>(['selectedMeals']) || [],
  });

  const handleRemoveMeal = (idMeal: string) => {
    const updated = selectedMeals.filter(m => m.idMeal !== idMeal);
    queryClient.setQueryData(['selectedMeals'], updated);
  };

  return (
    <SelectedRecipesList
      selectedMeals={selectedMeals}
      onRemoveMeal={handleRemoveMeal}
    />
  );
};

