import { useEffect, useMemo, useState } from 'react'
import {useTranslation} from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

// eslint-disable-next-line no-restricted-imports
import { useActions } from '../../hooks'
import { ROUTES } from '../../routeConfig'
import { userSignOutAction } from '../../store/auth'

import { ChangeLang } from './change-lang'

export const NavBar = () => {
  const [renderNav, setRenderNav] = useState(false)
  const {signOut} = useActions({signOut: userSignOutAction})
  const location = useLocation()
  const {t} = useTranslation()

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
        <div style={{display: 'flex'}}>
          <>{t('title')}</>
          {links.map((i) => (
            <Link to={i.path} key={i.path}>{i.title}</Link>
          ))}
          <ChangeLang />
          <button onClick={logOut}>logout</button>
        </div>
      ) : ''}
    </div>
  )
}