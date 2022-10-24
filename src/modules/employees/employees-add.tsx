import { FieldValues, useForm } from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {yupResolver} from '@hookform/resolvers/yup'
import { Avatar, Box, Button, Grid } from '@mui/material'
import * as yup from 'yup'

import { SearchField,SearchFieldByCode, SearchFieldRoles } from '../../components'
import { createActionRenderField } from '../../helpers'

import {useEmployeeSearch} from './index'

export const EmployeesAdd = () => {
  const form = useForm({resolver: yupResolver(schema)})
  const {control, formState, handleSubmit, register, getValues} = form
  const {errors} = formState
  const {t} = useTranslation()
  const {search, loading} = useEmployeeSearch({form})
  const renderField = createActionRenderField({control, formState})
  const photo = getValues('photo')
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

  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <input type='hidden' {...register('photo')} />
      <SearchFieldByCode
        control={control}
        loading={loading}
        startSearch={search}
        name='inn'
        label='inn'
        error={!!errors.inn}
        helperText={`${errors.inn?.message}`}
      />
      {renderInput.map(({colSpanMd, ...rest}) => {
        return (
          <Grid key={rest.name} item xs={colSpanMd}>
            {renderField(rest)}
          </Grid>
        )
      })}
      <Avatar
        src={`data:image;base64,${photo}`}
        sx={{width: '75%', height: '100%', borderRadius: '3px', mr:'5px'}}
      />
      <SearchField
        error={!!errors.gender}
        helperText={`${errors.gender?.message ?? ''}`}
        control={control}
        registerName='gender'
        type='GENDER' 
        label='Gender'
      />
      <SearchFieldRoles
        error={!!errors.roles}
        helperText={`${errors.roles?.message ?? ''}`}
        get='all'
        control={control}
        multiple
        registerName='roles'
        label='Roles'
      />
      <SearchFieldRoles
        error={!!errors.role}
        helperText={`${errors.role?.message ?? ''}`}
        get='one'
        control={control}
        registerName='role'
        label='Role'
      />
      <Button type='submit'>submit</Button>
    </Box>
  )
}

const schema = yup.object({
  inn: yup.string().required('req'),
  gender: yup.object().required('re').nullable(),
  roles: yup.array().of(yup.string()).required('req').nullable(),
  role: yup.string().required('req').nullable(),
})