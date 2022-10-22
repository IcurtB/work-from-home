// eslint-disable-next-line no-restricted-imports
import { HomePage, Login } from './pages'

export const ROUTES = [
    {
        path: '',
        page: <HomePage />,
        title: '',
        display: true
    },
    {
        path: '/auth/sign-in',
        page: <Login />,
        title: '',
        display: false
    }
]