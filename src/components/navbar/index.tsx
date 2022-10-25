import {useEffect, useMemo, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Button, Link as MuiLink, Stack} from '@mui/material'

import {useActions} from 'src/hooks'
import {userSignOutAction} from 'src/store/auth'

import {ROUTES} from '../../routeConfig'

import {ChangeLang} from './change-lang'

export const NavBar = () => {
  const [renderNav, setRenderNav] = useState(false)
  const {signOut} = useActions({signOut: userSignOutAction})
  const location = useLocation()

  const links = useMemo(() => ROUTES.filter((i) => i.display), [])

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
            {links.map((i) => (
              <MuiLink
                to={i.path}
                key={i.path}
                underline='hover'
                component={Link}
                sx={styles.center}
              >
                {i.logo} {i.title}
              </MuiLink>
            ))}
          </Stack>
          <Stack direction='row' spacing='16px' alignItems='center' mx='16px'>
            <ChangeLang />
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
    fontWeight: '500',
    fontSize: '0.85rem',
  },
}
