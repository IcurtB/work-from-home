import 'react-toastify/dist/ReactToastify.css'

import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

import {useAppSelector} from 'src/hooks'
import {Layout} from 'src/layout'
import {ROUTES} from 'src/routeConfig'
import {getToken} from 'src/utils'

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
    <Layout>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>{routes}</Routes>
      </LocalizationProvider>
    </Layout>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
