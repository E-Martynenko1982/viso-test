import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppContainer, NavLinkWrapper } from './AppStyles';

export const App: FC = () => {
  return (
    <AppContainer>
      <header>
        <NavLinkWrapper>
          <Link to="/">Усі рецепти</Link>
          <Link to="/selected">Вибрані рецепти</Link>
        </NavLinkWrapper>
      </header>

      <main>
        <Outlet />
      </main>
    </AppContainer>
  );
};

export default App;


