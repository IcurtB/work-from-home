import { Route, Routes } from 'react-router-dom';

import { Layout } from './layout';
import { ROUTES } from './routeConfig';

function App() {
  const routes = ROUTES.map((route) => {
    return <Route path={route.path} key={route.path} element={route.page} />
  })

  return (
    <Layout>
      <Routes>
        {routes}
      </Routes>
    </Layout>
  );
}

// eslint-disable-next-line import/no-default-export
export default App