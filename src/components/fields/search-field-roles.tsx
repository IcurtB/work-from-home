import { Control } from "react-hook-form"
import { useQuery } from "react-query"
import { TextFieldProps } from "@mui/material"

import { RolesResponseModel } from "../../models"
import { Path, request } from "../../utils"

import { AutocompleteField } from "./index"

interface IProps extends Omit<TextFieldProps, 'InputProps'> {
  InputProps?: Omit<TextFieldProps['InputProps'], 'endAdornment'>
  multiple?: boolean
  control: Control
  label: string
  registerName: string
  get: 'all' | 'one'
  type?: 
      'ROLE_ADMIN' 
      | 'ROLE_NOTARY' 
      | 'ROLE_EMPLOYEE'
}

export const SearchFieldRoles = ({type, control, registerName, multiple, error, get, helperText, label}: IProps) => {
  const {data} = useQuery([get], async() => {
    if(get === 'all') {
      return await request<RolesResponseModel[]>('GET', Path.Role.getAll, {})
    } else if (get === 'one') {
      return await request<RolesResponseModel[], {filter: {typeCode?: string}}>('GET', Path.Role.getAll, {body: {filter: {typeCode: type}}})
    }
  })

  const roles = data && data?.map((i) => i.code)
    
  return (
    <AutocompleteField
      label={label}
      control={control}
      multiple={multiple}
      name={registerName}
      options={roles ?? []}
      error={error}
      helperText={`${helperText}`}
    />
  )
}