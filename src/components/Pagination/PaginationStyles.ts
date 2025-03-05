import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const PaginationContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const PaginationButton = styled(Button)(({ theme }) => ({
  color: 'wheat',
  minWidth: '40px',
  padding: theme.spacing(0.5),
  fontSize: '1rem',
}));
