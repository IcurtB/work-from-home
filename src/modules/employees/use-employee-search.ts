import { useState } from "react"
import { UseFormReturn } from "react-hook-form"

import { CommonReference, EmployeesDatasModel, TundukZagsDataByPin } from "../../models"
import { Path, request } from "../../utils"

type FormMethods = Pick<
  UseFormReturn,
  'getValues' | 'setValue' | 'trigger'
>
interface Props {
  form: FormMethods
}

export const useEmployeeSearch = ({form}: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const {getValues, setValue, trigger} = form
    
    const search = async() => {
        const isValue = await trigger('inn')
        if(!isValue) return
        setLoading(true)
        const pin = await getValues('inn')

        const zags = await request<TundukZagsDataByPin, {pin: string}>('POST', Path.TundukURLs.zagsDatas, {body: {pin}})
        const roles = await request('GET', Path.Role.getAll, {})
        console.log(roles);
        
        if(zags) {
          const {gender: g} = zags
          const gender: CommonReference = {
            parentId: g?.parentId,
            id: g?.id,
            title: g.title,
            type: g.type,
          }
          setValue('dateOfBirth', zags.dateOfBirth.toLocaleString())
          // setValue('gender', gender)
          setValue('name', zags.name)
          setValue('surname', zags.surname)
          setValue('patronymic', zags?.patronymic)
        }
        setLoading(false)
    }

    return {search, loading} as const
}