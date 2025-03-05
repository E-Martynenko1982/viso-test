import { FC, useState } from 'react';
import { IMeal } from '../../types';
import {
  CardContainer,
  CardTitle,
  CardImage,
  CardParagraph,
  CardActions,
  StyledRouterLink,
  StyledButton,
} from './ReceipeCardStyles';

interface RecipeCardProps {
  meal: IMeal;
  onAddToSelected?: (meal: IMeal) => void;
}

export const RecipeCard: FC<RecipeCardProps> = ({ meal, onAddToSelected }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (onAddToSelected) {
      onAddToSelected(meal);
      setClicked(true);
    }
  };

  return (
    <CardContainer>
      <CardTitle variant="h6">{meal.strMeal}</CardTitle>
      <CardImage src={meal.strMealThumb} alt={meal.strMeal} />
      <CardParagraph>Категорія: {meal.strCategory}</CardParagraph>
      <CardParagraph>Походження: {meal.strArea}</CardParagraph>
      <CardActions>
        <StyledRouterLink to={`/recipe/${meal.idMeal}`}>
          Детальніше
        </StyledRouterLink>
        {onAddToSelected && (
          <StyledButton variant="contained" onClick={handleClick}>
            {clicked ? 'Додано' : 'Додати до вибраних'}
          </StyledButton>
        )}
      </CardActions>
    </CardContainer>
  );
};

