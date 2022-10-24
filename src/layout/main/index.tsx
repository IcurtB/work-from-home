import React from 'react'
import {Box} from '@mui/material'

import {Breadcrumbs, NavBar} from 'src/components'

interface IProps {
  children: React.ReactNode
}

export const Layout = ({children}: IProps) => {
  return (
    <Box>
      <NavBar />
      <Box component={'header'} sx={style.box}></Box>
      <Box component={'nav'} ml='25px' mt='-75px'>
        <Breadcrumbs />
      </Box>
      <Box component={'main'} sx={{minHeight: '100%'}}>
        <Box sx={style.main}>{children}</Box>
      </Box>
    </Box>
  )
}

const style = {
  box: {
    height: '180px',
    backgroundImage: "url('notary-public.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPositionY: '35%',
  },

  main: {
    boxShadow: 3,
    margin: '25px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '25px',
    height: 'calc(100vh - 180px)',
  },
  forBoxT: {
    gridRowEnd: '4',
    color: 'white',
    marginLeft: '25px',
    justifySelf: 'end',
  },
  forT: {
    textTransform: 'uppercase',
    fontWeight: '500',
    letterSpacing: '1px',
    fontSize: '14px',
  },
}
