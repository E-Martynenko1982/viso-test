import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const AppContainer = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundImage: `url("/assets/images/background.png")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  color: '#fff',
}));

export const NavLinkWrapper = styled('div')({
  display: 'flex',
  gap: '1rem',
  a: {
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
