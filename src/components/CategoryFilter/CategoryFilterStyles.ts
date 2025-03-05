import { styled } from '@mui/material/styles';

export const StyledLabel = styled('label')(({ theme }) => ({
  fontSize: '1rem',
  marginRight: theme.spacing(1),
  color: 'wheat',
}));

export const StyledSelect = styled('select')(({ theme }) => ({
  padding: theme.spacing(0.5),
  fontSize: '1.1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
  },
}));
