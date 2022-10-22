import React, { HTMLInputTypeAttribute } from 'react'
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material'

export interface TextFieldProps
  extends Omit<MuiTextFieldProps, 'variant' | 'type'> {
  type?: HTMLInputTypeAttribute | undefined
  variant?: MuiTextFieldProps['variant']
}

export const TextField = (props: TextFieldProps) => {

  const muiProps: MuiTextFieldProps = {
    ...props,
    size: 'small',
    required: props.required ?? false,
    variant:  props.variant ?? 'outlined',
    // label:  props.label,
    type: props.type,
    InputProps: props.InputProps,
    InputLabelProps:
      props.InputLabelProps || props.required
        ? {...props.InputLabelProps, required: props.required}
        : undefined,
  }

  return <MuiTextField {...muiProps} />
}

