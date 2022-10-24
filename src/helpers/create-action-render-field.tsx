import React from 'react'

import {InputField} from '../components'

interface ActionField {
  name: string
  label: string
  type?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  inputProps?: unknown
}

export const createActionRenderField = <Shape extends AnyShape>({control, formState}: Shape) => (props: ActionField) => {
  const {name, ...rest} = props
  const {errors} = formState
  return(
    <InputField
    name={name}
      control={control}
      {...rest}
        error={!!errors[name as keyof typeof errors]}
        helperText={errors[name as keyof typeof errors]?.message ?? ''}
      label={rest.label}
    />
  )
}

