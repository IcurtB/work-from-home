import { useQuery } from "react-query"

import { PageFilterResponseModel } from "src/models"
import { Path, request } from "src/utils"

import { AutocompleteField } from "./index"

interface IProps {
  multiple?: boolean
  form: any
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

export const SearchField = ({type, form, registerName}: IProps) => {

    const {data} = useQuery([], async() => {
      return await request<PageFilterResponseModel, {filter: {typeCode?: string}}>('POST', Path.CommonReference.search, {body: {filter: {typeCode: type}}})
    }, {enabled: !!type})
    
    return (
      <AutocompleteField
        control={form.control}
        name={registerName}
        options={data?.content ?? []}
        getOptionLabel={(val) => val.title}
        isOptionEqualToValue={(opt, val) => opt.title === val.title}
      />
    )
}