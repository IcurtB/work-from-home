import React from 'react'
import {useForm} from 'react-hook-form'
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined'
import {Button, Stack} from '@mui/material'

import {AutocompleteField, InputField} from 'src/components'
import {FilterModel} from 'src/models'
import {REFERENCE_TYPES} from 'src/utils'

interface IProps {
  filter: (val: FilterModel) => void
}
export const FilterCommonReference = ({filter}: IProps) => {
  const form = useForm<FilterModel>()
  const {handleSubmit, control, reset} = form
  const submit = async (formData: FilterModel) => {
    const is = Object.values(formData).some((i) => i !== undefined)
    if (!is) return
    filter(formData)
    reset()
  }
  return (
    <Stack
      component='form'
      onSubmit={handleSubmit(submit)}
      direction='row'
      spacing={2}
    >
      <InputField
        control={control}
        name='title'
        label='common-reference.filterTitle'
        placeholder='Введите название справочника'
      />
      <AutocompleteField
        options={REFERENCE_TYPES}
        control={control}
        sx={{minWidth: '250px'}}
        name='typeCode'
        label='common-reference.filterTypeCode'
        placeholder='Укажите тип справочника'
      />
      <Button
        type='submit'
        variant='outlined'
        size='small'
        startIcon={<ContentPasteSearchOutlinedIcon />}
      >
        Поиск
      </Button>
    </Stack>
  )
}
