import { useForm } from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {yupResolver} from '@hookform/resolvers/yup'
import { Box, Button, Grid } from '@mui/material'
import * as yup from 'yup'

import { AutocompleteField, SearchField,SearchFieldByCode } from '../../components'
import { createActionRenderField } from '../../helpers'

import {useEmployeeSearch} from './index'

export const EmployeesAdd = () => {
  const form = useForm({resolver: yupResolver(schema)})
  const {control, formState, handleSubmit} = form
  const {errors} = formState
  const {t} = useTranslation()
  const {search, loading} = useEmployeeSearch({form})
  const renderField = createActionRenderField({control, formState})
  
  const renderInput = [
    {
      name: 'surname',
      label: t('employees.surname'),
      colSpanMd: 4,
      color: 'success',
    },
    {
      name: 'name',
      label: t('employees.name'),
      colSpanMd: 4,
    },
    {
      name: 'patronymic',
      label: t('employees.patronymic'),
      colSpanMd: 4,
    },
    {
      name: 'email',
      label: t('employees.email'),
      colSpanMd: 4,
    },
    {
      name: 'address',
      label: t('employees.address'),
      colSpanMd: 8,
    },
    {
      name: 'phone',
      label: t('employees.phone'),
      colSpanMd: 4,
      type: 'tel',
    },
    {
      name: 'dateOfBirth',
      label: t('employees.dateOfBirth'),
      colSpanMd: 4,
      type: 'date',
    },
  ]

  const onSubmit = (formData: any) => {
    console.log(formData);
    
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <SearchFieldByCode
        control={control}
        loading={loading}
        startSearch={search}
        name='inn'
        label='inn'
        error={!!errors.inn}
        // helperText={errors.inn?.message}
      />
      {renderInput.map(({colSpanMd, ...rest}) => {
        return (
          <Grid key={rest.name} item xs={colSpanMd}>
            {renderField(rest)}
          </Grid>
        )
      })}
      <SearchField multiple={true} form={form} registerName='gender' type='GENDER' />
      <Button type='submit'>submit</Button>
    </Box>
  )
}

const schema = yup.object({
  inn: yup.string().required('req')
})