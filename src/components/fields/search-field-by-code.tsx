import {useRef} from 'react'
import {Control, Controller} from 'react-hook-form'
import {Search} from '@mui/icons-material'
import {CircularProgress, IconButton, InputAdornment} from '@mui/material'

import {TextField, TextFieldProps} from './text-field'

interface Props extends Omit<TextFieldProps, 'InputProps'> {
  InputProps?: Omit<TextFieldProps['InputProps'], 'endAdornment'>
  loading: boolean
  startSearch: (code: string) => void
  control: Control<AnyShape>
  name: string
}
export const SearchFieldByCode = ({
  control,
  loading,
  type,
  startSearch,
  name,
  ...props
}: Props) => {
  const codeRef = useRef('')
  

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {ref, ...data}}) => {
        return (
          <TextField
            {...data}
            type={type}
            inputRef={ref}
            label={props.label}
            error={props.error}
            helperText={props.helperText}
            value={data.value ||  ''}
            disabled={loading || props.disabled}
            onKeyDown={(event) => {
              if (loading || event.key !== "Enter") return;
              event.preventDefault();
              startSearch(codeRef.current);
              props.onKeyDown?.(event);
            }}
            InputProps={{
              ...(props.InputProps ?? {}),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => startSearch(codeRef.current)}
                    disabled={loading || props.disabled}
                    aria-label={`search`}
                    title={`search`}
                    tabIndex={-1}
                  >
                    {loading ? <CircularProgress size={24} /> : <Search />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )
      }}
    />
  )
}