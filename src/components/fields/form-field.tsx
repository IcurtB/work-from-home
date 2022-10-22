import {Controller} from 'react-hook-form'
import {DatePicker, DateTimePicker} from '@mui/x-date-pickers'
import dayjs from 'dayjs'

import {DATA_FORMATS} from '../../utils'

import {PhoneField} from './phone-field'
import {TextField} from './text-field'

export function FormField({
  control,
  type,
  name,
  label,
  required,
  error,
  helperText,
  variant,
  children,
  disabled,
  inputProps,
  multiline,
  rows,
  typetext
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const innerProps = {
    name,
    label,
    required,
    error,
    helperText,
    variant,
    children,
    disabled,
    multiline,
    rows,
    typetext,
  }

  if (type === 'tel') {
    return (
      <Controller
        control={control}
        name={name}
        render={({field:{ ref, ...data}}) => (
          <PhoneField
            {...data}
            value={data.value}
            {...innerProps}
            type='tel'
            inputRef={ref}
          />
        )}
      />
    )
  }

  if (type)
    return (
      <Controller
        name={name}
        control={control}
        render={({field}) => {
          const {value = null, onChange, ref, ...rest} = field
          switch (type) {
            case 'datetime-local':
              return (
                <DateTimePicker
                  {...innerProps}
                  {...rest}
                  ampm={false}
                  className={'width: 100%'}
                  ampmInClock={false}
                  inputRef={ref}
                  value={value}
                  onChange={(value, keyboardInputValue) => {
                    onChange(
                      value
                        ? dayjs(value).format(DATA_FORMATS.YYYY_MMM_DD_HH_MM)
                        : undefined,
                      keyboardInputValue ?? '',
                    )
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat={DATA_FORMATS.YYYY_MMM_DD_HH_MM}
                />
              )
            case 'date':
              return (
                <DatePicker
                  {...innerProps}
                  {...rest}
                  className={'width: 100%'}
                  inputRef={ref}
                  value={value}
                  onChange={(value, keyboardInputValue) => {
                    onChange(
                      dayjs(value).format(DATA_FORMATS.YYYY_MM_DD),
                      keyboardInputValue ?? '',
                    )
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat={DATA_FORMATS.YYYY_MM_DD}
                />
              )
            default:
              throw new Error(`Input type "${type}" is not supported}`)
          }
        }}
      />
    )

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {ref, ...data}}) => {
        return (
          <TextField
            {...innerProps}
            inputProps={inputProps}
            {...data}
            type={typetext}
            inputRef={ref}
            value={data.value ?? ''}
          />
        )
      }}
    />
  )
}

