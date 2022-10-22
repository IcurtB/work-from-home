import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// eslint-disable-next-line no-restricted-imports
import { useActions } from '../../hooks'
import { userSignOutAction } from '../../store/auth'

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
        <div>
          Navbar
          <button onClick={logOut}>logout</button>
        </div>
      ) : ''}
    </div>
  )
}