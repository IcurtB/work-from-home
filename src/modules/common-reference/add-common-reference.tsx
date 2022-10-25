import {memo, useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Stack} from '@mui/material'
import {object, SchemaOf, string} from 'yup'

import {AutocompleteField, InputField, Modal} from 'src/components'
import {CommonReference} from 'src/models'
import {Path, REFERENCE_TYPES, request} from 'src/utils'

interface IProps {
  editValue?: CommonReference
  deleteValue?: CommonReference
  refetch: () => void
}
export const AddCommonReference = memo(
  ({editValue: edit, deleteValue: del, refetch}: IProps) => {
    const [isOpen, setOpen] = useState(false)
    const open = () => {
      setOpen(true)
    }
    const close = () => {
      setOpen(false)
    }
    const form = useForm<AddCommonReferenceType>({
      resolver: yupResolver(schema),
      defaultValues: {
        parentId: edit?.parentId ?? del?.parentId ?? undefined,
        title: edit?.title ?? del?.title ?? undefined,
        typeCode: edit?.type.code ?? del?.type.code ?? undefined,
      },
    })
    const {
      formState: {errors},
      control,
      register,
      handleSubmit,
    } = form
    const submit = async (body: AddCommonReferenceType) => {
      if (del) {
        await request('DELETE', Path.CommonReference.option(del.id))
        refetch()
      } else if (edit) {
        await request<never, AddCommonReferenceType>(
          'PUT',
          Path.CommonReference.option(edit.id),
          {body},
        )
        refetch()
      } else {
        await request<never, AddCommonReferenceType>(
          'POST',
          Path.CommonReference.add,
          {body},
        )
        refetch()
      }
    }
    const title = [
      'common-reference.edit',
      'common-reference.add',
      'common-reference.delete',
    ]
    const is = !edit && !del
    const color = is ? 'primary' : edit ? 'success' : 'error'
    const modalTitle = is
      ? `${title[1]}Modal`
      : edit
      ? `${title[0]}Modal`
      : `${title[2]}Modal`
    return (
      <>
        <Button variant='outlined' onClick={open} color={color}>
          {edit && title[0]}
          {!edit && !del && title[1]}
          {del && title[2]}
        </Button>
        <Modal title={modalTitle} open={isOpen} onClose={close} disableFooter>
          <Stack
            component='form'
            onSubmit={handleSubmit(submit)}
            direction='row'
            spacing={2}
          >
            <input type='hidden' {...register('parentId')} />
            <InputField
              control={control}
              name='title'
              label='common-reference.filterTitle'
              disabled={!!del}
              placeholder='Введите название справочника'
              error={!!errors?.title}
              helperText={errors.title?.message || ''}
            />
            <AutocompleteField
              options={REFERENCE_TYPES}
              control={control}
              sx={{minWidth: '250px'}}
              name='typeCode'
              disabled={!!del}
              label='common-reference.filterTypeCode'
              placeholder='Укажите тип справочника'
              error={!!errors?.typeCode}
              helperText={errors.typeCode?.message || ''}
              onChange={(e) => console.log(e)}
            />
            <Button
              type='submit'
              variant='contained'
              sx={{whiteSpace: 'nowrap'}}
              size='small'
              color={color}
            >
              {edit && title[0]}
              {!edit && !del && title[1]}
              {del && title[2]}
            </Button>
          </Stack>
        </Modal>
      </>
    )
  },
)
type AddCommonReferenceType = {
  parentId: number
  title: string
  typeCode: string
}

const schema: SchemaOf<AddCommonReferenceType> = object()
  .shape({
    title: string().required('common-reference.addTitle'),
    typeCode: string().required('common-reference.addTypeCode'),
  })
  .defined()
