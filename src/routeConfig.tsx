import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FolderIcon from '@mui/icons-material/Folder';

import {
  CommonReferencePage,
  EmployeesPage,
  HomePage,
  LoginPage,
} from 'src/pages'

export interface IRoutes {
  permissions: ReadonlyArray<Permissions>
  path: string
  page: JSX.Element
  title: string
  display: boolean
  logo?: JSX.Element
}

export const ROUTES: ReadonlyArray<IRoutes> = [
  {
    path: '/auth/sign-in',
    page: <LoginPage />,
    title: '',
    display: false,
    permissions: [],
  },
  {
    path: '',
    page: <HomePage />,
    title: '',
    display: true,
    permissions: [],
  },
  {
    path: '/employees',
    page: <EmployeesPage />,
    title: 'employees',
    display: true,
    permissions: [],
    logo: <AccountCircleIcon />,
  },
  {
    path: '/common-reference',
    page: <CommonReferencePage />,
    title: 'common-reference',
    display: true,
    permissions: [],
    logo: <FolderIcon/>
  },
]
