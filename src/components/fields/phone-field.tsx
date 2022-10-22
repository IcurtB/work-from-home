import React, {useRef, useState} from 'react'
import {AsYouType} from 'libphonenumber-js'
import {useRifm} from 'rifm'

import {TextField, TextFieldProps} from './text-field'

interface PhoneFieldProps extends Omit<TextFieldProps, 'onChange'> {
  type?: 'tel'
  onChange?: (value: string) => void
  value?: string | number
  defaultValue?: string | number
}

// TODO: check libphonenumber-js bundle size
// TODO: support both 0 and +996 as country code
// TODO: debug controlled vs uncontrolled behavior, e.g. don't use state on controlled component
export const PhoneField = (props: PhoneFieldProps) => {
  const initValue = (props.value ?? props.defaultValue)?.toString() ?? ''
  const [uncontrolledValue, setUncontrolledValue] = useState(initValue)
  const value = props.value?.toString() ?? uncontrolledValue

  const formatter = useRef(new AsYouType('KG'))

  const rifm = useRifm({
    value,
    onChange: (value: string) => {
      const result = value.replaceAll(/\D/g, '')
      setUncontrolledValue(result)
      props.onChange?.(result)
    },
    format: (raw: string) => {
      const rawNumber = raw.replaceAll(/\D/g, '').slice(0, 10)

      formatter.current.reset()
      formatter.current.input(rawNumber)

      const number = formatter.current.getChars()
      const template = formatter.current.getTemplate()
      const codeSize = template.startsWith('xxxxx') ? 4 : 3

      return replace(number, codeSize)
    },
  })
  return (
    <TextField
      {...props}
      value={rifm.value}
      onChange={rifm.onChange}
      placeholder={props.placeholder ?? '0 (___) ___-___'}
    />
  )
}

const replace = (phone: string, codeSize = 3) => {
  const codeEndAt = codeSize + 1
  const part1Size = 10 - codeEndAt - 3

  const outerCode = phone.slice(0, 1).padEnd(1, '0')
  const innerCode = phone.slice(1, codeEndAt).padEnd(codeSize, '_')
  const part1 = phone.slice(codeEndAt, 10 - 3).padEnd(part1Size, '_')
  const part2 = phone.slice(10 - 3, 10).padEnd(3, '_')

  return `${outerCode} (${innerCode}) ${part1}-${part2}`
}
