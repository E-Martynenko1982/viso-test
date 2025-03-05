import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';


export const App: FC = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Усі рецепти</Link> | {' '}
          <Link to="/selected">Вибрані рецепти</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
