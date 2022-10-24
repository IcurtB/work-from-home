import {Navigate, Route, Routes, useLocation} from 'react-router-dom'

import {useAppSelector} from './hooks'
import {Layout} from './layout'
import {ROUTES} from './routeConfig'
import {getToken} from './utils'

function App() {
  const token = getToken('accessToken')
  const {user} = useAppSelector((state) => state)
  const location = useLocation()

  const routes = ROUTES.map((route) => {
    return <Route path={route.path} key={route.path} element={route.page} />
  })

  if (!token && !location.pathname.includes('auth')) {
    return <Navigate to='/auth/sign-in' />
  }

  if (
    user?.user?.inn &&
    location.pathname.includes('auth') &&
    user.loaded &&
    !user.loading
  ) {
    return <Navigate to='/' />
  }

  return (
    <>
      <Layout>
        <Routes>{routes}</Routes>
      </Layout>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
