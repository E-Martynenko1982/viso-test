import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const SelectedListContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const RecipesTitle = styled('h2')({
  textAlign: 'center',
  marginBottom: '1rem',
});

export const NoRecipes = styled('p')({
  textAlign: 'center',
  fontStyle: 'italic',
});

export const ArticlesTitle = styled('h3')({
  textAlign: 'center',
  marginTop: '2rem',
  marginBottom: '1rem',
});

export const IngredientsArticle = styled('article')(({ theme }) => ({
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: theme.spacing(2),
  width: '70%',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
}));

export const IngredientsList = styled('ul')({
  listStyleType: 'circle',
  paddingLeft: '1.5rem',
  lineHeight: 1.6,
});

export const RemoveButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textTransform: 'none',
}));
