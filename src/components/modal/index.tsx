import React from 'react'
import {Close} from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material'

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

type BootstrapDialogTitle = {
  id: string
  onClose: () => void
  children: React.ReactNode
}

type Props = {
  open: boolean
  onClose: () => void
  onSubmit?: () => void
  children: React.ReactNode
  title: string | boolean
  disableFooter?: boolean
  saveTitle?: string
}

const BootstrapDialogTitle = (props: BootstrapDialogTitle) => {
  const {children, onClose, ...other} = props

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export const Modal = ({
  onClose,
  open,
  children,
  title,
  disableFooter,
  onSubmit,
  saveTitle = 'Save changes',
}: Props) => {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={open}
      sx={style}
    >
      <BootstrapDialogTitle id='customized-dialog-title' onClose={onClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers >
        {children}
      </DialogContent>
      {!disableFooter && (
        <DialogActions>
          <Button autoFocus onClick={onSubmit}>
            {saveTitle}
          </Button>
        </DialogActions>
      )}
    </BootstrapDialog>
  )
}

const style = {
  '& .MuiDialog-container > div': {
    maxWidth: 'none'
  }
}