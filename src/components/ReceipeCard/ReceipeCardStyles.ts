import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

export const CardContainer = styled(Box)(() => ({
  border: '1px solid #ccc',
  padding: '1rem',
  margin: '0.5rem',
  width: '250px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
}));

export const CardTitle = styled(Typography)({
  textAlign: 'center',
});

export const CardImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '4px',
});

export const CardParagraph = styled(Typography)({
  margin: '0.5rem 0',
});

export const CardActions = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '0.5rem',
}));

export const StyledRouterLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

export const StyledButton = styled(Button)(() => ({
  width: '120px',
  textTransform: 'none',
}));
