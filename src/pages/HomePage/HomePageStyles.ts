import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const HomePageContainer = styled(Box)(() => ({
  padding: '1rem',
  backgroundColor: 'transparent',
}));

export const Title = styled('h1')({
  textAlign: 'center',
  color: 'wheat',
});

export const CenteredRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
}));

export const SelectedCount = styled('strong')({
  textAlign: 'center',
  display: 'block',
  marginBottom: '1rem',
  color: 'wheat',
  fontSize: '1.2rem',
});

export const CardsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'center',
}));
