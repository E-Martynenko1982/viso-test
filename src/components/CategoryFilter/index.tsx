import { FC } from 'react';
import { StyledLabel, StyledSelect } from './CategoryFilterStyles';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChangeCategory: (cat: string) => void;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onChangeCategory,
}) => {
  return (
    <div>
      <StyledLabel htmlFor="category-select">Категорія:</StyledLabel>
      <StyledSelect
        id="category-select"
        value={selectedCategory}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeCategory(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};
