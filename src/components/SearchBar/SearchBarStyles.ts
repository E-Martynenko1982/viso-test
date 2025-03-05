import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const StyledInput = styled(TextField)(() => ({
  backgroundColor: '#fff',
  borderRadius: '4px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#999',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
}));
