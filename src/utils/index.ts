import { IMeal } from '../types';

export function paginateArray<T>(items: T[], currentPage: number, pageSize: number): T[] {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function createPagesArray(totalPages: number): (number | string)[] {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  return [...Array.from({ length: 7 }, (_, i) => i + 1), '...', totalPages];
}

export function combineIngredients(meals: IMeal[]): Record<string, string[]> {
  return meals.reduce<Record<string, string[]>>((acc, meal) => {
    Array.from({ length: 20 }, (_, i) => i + 1).forEach(n => {
      const ingredientKey = `strIngredient${n}` as keyof IMeal;
      const measureKey = `strMeasure${n}` as keyof IMeal;

      const ing = meal[ingredientKey];
      const measure = meal[measureKey];

      if (typeof ing === 'string' && ing.trim()) {
        const key = ing.trim();
        acc[key] = acc[key] || [];
        if (typeof measure === 'string' && measure.trim()) {
          acc[key].push(measure.trim());
        }
      }
    });
    return acc;
  }, {});
}
