import React from 'react'

import { NavBar } from '../../components'

interface IProps {
    children: React.ReactNode
}

export const Layout = ({children}: IProps) => {
  return (
    <div>
        <NavBar/>
        {children}
    </div>
  )
}
