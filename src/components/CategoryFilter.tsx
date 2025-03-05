import { FC } from 'react';

interface CategoryFilterProps {
  categories: string[];             // Список категорій
  selectedCategory: string;         // Поточна вибрана категорія
  onChangeCategory: (cat: string) => void; // Колбек при виборі категорії
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onChangeCategory,
}) => {
  return (
    <div>
      <label htmlFor="category-select">Категорія:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onChangeCategory(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};
