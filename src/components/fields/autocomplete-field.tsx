import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import {AutocompleteProps, AutocompleteRenderInputParams} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

import {TextField, TextFieldProps} from './text-field'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Input<T> = {
  renderInput?: (inputParams: AutocompleteRenderInputParams) => React.ReactNode
  label?: string
  required?: boolean
  error?: boolean
  helperText?: string
  inputVariant?: TextFieldProps['variant']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionLabel?: (val: any) => string
  defaultValue?: PathValue<FieldValues, Path<FieldValues>>
}

type ControlProps<FV extends AnyShape> = {
  control: Control<FV>
  name: Path<FV>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any
}

export type AutocompleteFieldProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  FieldValues extends AnyShape,
> = Omit<
  AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
  'value' | 'name' | 'renderInput'
> &
  Input<Value> &
  ControlProps<FieldValues>

export function AutocompleteField<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  FieldValues extends AnyShape,
>({
  renderInput,
  control,
  name,
  rules,
  label,
  required = false,
  error,
  onFocus,
  multiple,
  helperText,
  inputVariant,
  defaultValue,
  ...props
}: AutocompleteFieldProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  FieldValues
>) {
  const renderDefaultInput = (inputProps: AutocompleteRenderInputParams) => (
    <TextField
      {...inputProps}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      variant={inputVariant}
    />
  )

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue ?? undefined}
      render={(innerProps) => (
        <Autocomplete
          {...props}
          onFocus={onFocus}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          multiple={multiple}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={
            multiple
              ? innerProps.field.value ?? []
              : innerProps.field.value ?? null
          }
          renderInput={renderInput ?? renderDefaultInput}
          onChange={(event, value) => {
            // if (props.onChange) props.onChange(event, value, reason)

            innerProps.field.onChange(value)
          }}
          onBlur={() => {
            // if (props.onBlur) props.onBlur(event)

            innerProps.field.onBlur()
          }}
        />
      )}
    />
  )
}
