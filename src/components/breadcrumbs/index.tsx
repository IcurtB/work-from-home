import {Link, useLocation} from 'react-router-dom'
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography,
} from '@mui/material'
import {deepOrange} from '@mui/material/colors'

export const Breadcrumbs = () => {
  const location = useLocation()

  const routes = location.pathname.split('/')
  return (
    <MuiBreadcrumbs sx={styles.whiteBold}>
      <MuiLink
        underline='hover'
        component={Link}
        to='/employees'
        sx={styles.center}
      >
        home
      </MuiLink>
      {routes.map((value, index, routesArray) => {
        if (!value) return undefined

        if (index === routesArray.length - 1)
          return (
            <Typography sx={styles.forTypo} key={value}>
              asdasdads
            </Typography>
          )

        const to = routesArray.slice(0, index + 1).join('/')

        return (
          <MuiLink
            underline='hover'
            component={Link}
            to={to}
            sx={styles.whiteBold}
            key={value}
          >
            asdasd
            {/* <Trans id={withNamespace(value)} /> */}
          </MuiLink>
        )
      })}
    </MuiBreadcrumbs>
  )
}
const styles = {
  whiteBold: {
    textTransform: 'capitalize',
    textDecorationLine: 'none',
    fontWeight: '700',
    color: '#303f9f',
  },
  forTypo: {
    textTransform: 'capitalize',
    color: deepOrange[700],
    fontWeight: '700',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // color: 'white',
    fontWeight: 'bold',
  },
}
