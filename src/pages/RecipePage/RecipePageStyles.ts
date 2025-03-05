import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const RecipePageContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '1rem',
}));

export const RecipeTitle = styled(Typography)({
  fontSize: '2rem',
  textAlign: 'center',
  marginBottom: '1rem',
});

export const RecipeImage = styled('img')({
  maxWidth: '100%',
  borderRadius: '8px',
  marginBottom: '1rem',
});

export const RecipeInfo = styled(Typography)({
  fontSize: '1.5rem',
  marginBottom: '0.5rem',
});

export const InstructionsContainer = styled('article')(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: theme.spacing(2),
  lineHeight: 1.6,
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
}));
