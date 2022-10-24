import {useEffect, useState} from 'react'
import {useLocation, Link} from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {Box, Button, Stack, Toolbar, Link as MuiLink} from '@mui/material'

import {useActions} from 'src/hooks'
import {userSignOutAction} from 'src/store/auth'

export const NavBar = () => {
  const [renderNav, setRenderNav] = useState(false)
  const {signOut} = useActions({signOut: userSignOutAction})
  const location = useLocation()
  const logOut = () => {
    signOut()
  }

  useEffect(() => {
    setRenderNav(!location.pathname.includes('auth'))
  }, [location.pathname])

  return (
    <div>
      {renderNav ? (
        <Stack direction='row' sx={styles.boxGrid}>
          <Stack direction='row' spacing='16px'>
            <MuiLink
              underline='hover'
              component={Link}
              to='/employees'
              sx={styles.center}
            >
              <AccountCircleIcon /> Сотрудники
            </MuiLink>
            <MuiLink
              underline='hover'
              component={Link}
              to='/employees'
              sx={styles.center}
            >
              <AccountCircleIcon /> Сотрудники
            </MuiLink>
            <MuiLink
              underline='hover'
              component={Link}
              to='/employees'
              sx={styles.center}
            >
              <AccountCircleIcon /> Сотрудники
            </MuiLink>
            <MuiLink
              underline='hover'
              component={Link}
              to='/employees'
              sx={styles.center}
            >
              <AccountCircleIcon /> Сотрудники
            </MuiLink>
            <MuiLink
              underline='hover'
              component={Link}
              to='/employees'
              sx={styles.center}
            >
              <AccountCircleIcon /> Сотрудники
            </MuiLink>
            <MuiLink
              underline='hover'
              component={Link}
              to='/employees'
              sx={styles.center}
            >
              <AccountCircleIcon /> Сотрудники
            </MuiLink>
          </Stack>
          <Stack direction='row' spacing='16px' mx='16px'>
            <Button variant='outlined'>Перевод</Button>
            <Button variant='outlined' onClick={logOut}>
              logout
            </Button>
          </Stack>
        </Stack>
      ) : (
        ''
      )}
    </div>
  )
}
const styles = {
  boxGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '48px',
    color: 'white',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
}
