import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const AppContainer = styled(Box)(() => ({
  minHeight: '100vh',

  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  color: 'black',
}));

export const NavLinkWrapper = styled('div')({
  display: 'flex',
  gap: '1rem',
  a: {
    marginLeft: '2rem',
    fontSize: '1.2rem',
    color: 'wheat',
    textDecoration: 'none',
    '&:hover': {
      color: 'gold',
    },
  },
});
