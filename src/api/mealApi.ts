import axios from 'axios';
import { IMeal } from '../types';

const mealApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

export async function searchMealsByName(name: string): Promise<IMeal[]> {
  const { data } = await mealApi.get<{ meals: IMeal[] | null }>(`/search.php?s=${name}`);
  return data.meals || [];
}

export async function getMealById(id: string): Promise<IMeal | null> {
  const { data } = await mealApi.get<{ meals: IMeal[] | null }>(`/lookup.php?i=${id}`);
  return data.meals ? data.meals[0] : null;
}

export async function getAllCategories(): Promise<string[]> {
  const { data } = await mealApi.get<{ meals: IMeal[] | null }>('/list.php?c=list');
  if (!data.meals) return [];
  return data.meals.map((item: { strCategory: string }) => item.strCategory);
}
