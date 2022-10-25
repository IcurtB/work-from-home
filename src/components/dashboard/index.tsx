import {memo, ReactNode, useState} from 'react'
// import {useTranslation} from 'react-i18next'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'

interface IProps {
  children: ReactNode
}
export const Dashboard = memo(({children}: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  // const {t} = useTranslation()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Button
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='outlined'
        color='info'
        size='small'
      >
        methods
      </Button>

      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {children}
      </Menu>
    </>
  )
})
