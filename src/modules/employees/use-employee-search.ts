import { useState } from "react"
import { UseFormReturn } from "react-hook-form"

import { CommonReference, TundukAddressByPinModel, TundukPasswordPhotoModel, TundukZagsDataByPinModel } from "../../models"
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

        const zags = await request<TundukZagsDataByPinModel, {pin: string}>('POST', Path.TundukURLs.zagsDatas, {body: {pin}})
        const address = await request<TundukAddressByPinModel, {pin: string}>('GET', Path.TundukURLs.address, {body: {pin: pin}})
        const photo = await request<TundukPasswordPhotoModel, {pin: string}>('GET', Path.TundukURLs.lastPhoto, {body: {pin: pin}})
        
        if(address) {
          setValue('address', address.address)
        }

        if(photo) {
          setValue('photo', photo.photo)
        }

        if(zags) {
          const {gender: g} = zags
          const gender: CommonReference = {
            parentId: g?.parentId,
            id: g?.id,
            title: g.title,
            type: g.type,
          }
          setValue('dateOfBirth', zags.dateOfBirth.toLocaleString())
          setValue('gender', gender)
          setValue('name', zags.name)
          setValue('surname', zags.surname)
          setValue('patronymic', zags?.patronymic)
        }
        setLoading(false)
    }

    return {search, loading} as const
}