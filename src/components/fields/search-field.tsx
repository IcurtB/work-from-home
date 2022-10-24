import { Control } from "react-hook-form"
import { useQuery } from "react-query"
import { TextFieldProps } from "@mui/material"

import { PageFilterResponseModel } from "src/models"
import { Path, request } from "src/utils"

import { AutocompleteField } from "./index"

interface IProps extends Omit<TextFieldProps, 'InputProps'> {
  InputProps?: Omit<TextFieldProps['InputProps'], 'endAdornment'>
  multiple?: boolean
  control: Control
  label: string
  registerName: string
  type?: 
      'NOTARY_TYPE' 
      | 'COUNTRY' 
      | 'REGION' 
      | 'DISTRICT' 
      | 'LOCAL_GOVERNMENT' 
      | 'NOTARY_ACTION_TYPE' 
      | 'GENDER'
      | 'MARITAL_STATUS'
      | 'DOCUMENT_TYPE'
      | 'CLIENT_TYPE'
      | 'ACTION_SIDE'
      | 'RANK'
      | 'NATIONALITY'
}

export const SearchField = ({type, control, registerName, multiple, error, helperText, label}: IProps) => {
  const {data} = useQuery([], async() => {
    return await request<PageFilterResponseModel, {filter: {typeCode?: string}}>('POST', Path.CommonReference.search, {body: {filter: {typeCode: type}}})
  }, {enabled: !!type})
    
  return (
    <AutocompleteField
      control={control}
      multiple={multiple}
      name={registerName}
      options={data?.content ?? []}
      getOptionLabel={(val) => val.title}
      error={error}
      helperText={`${helperText}`}
      label={label}
      isOptionEqualToValue={(opt, val) => opt.title === val.title}
    />
  )
}