import {useCallback, useEffect, useState} from 'react'
import {Box, Divider, Paper, Typography as MuiP} from '@mui/material'

import {AppTable, Dashboard, HeadCell} from 'src/components'
import {
  CommonReference,
  FilterCommonReferenceModel,
  PageFilterResponseModel,
} from 'src/models'
import {Path, request} from 'src/utils'

import {AddCommonReference} from './add-common-reference'
import {FilterCommonReference} from './filter-common-reference'

export const TableCommonReference = () => {
  const [content, setContent] = useState<PageFilterResponseModel>()
  const [pages, setPage] = useState({page: 0, limit: 5})
  const commonReferenceFetch = useCallback(
    async (filter?: FilterCommonReferenceModel['filter']) => {
      const body: FilterCommonReferenceModel = {
        filter: filter ?? {},
        pageRequest: {
          limit: pages.limit || 5,
          page: pages.page || 0,
        },
        sorting: {
          sortBy: 'ID',
          sortDirection: 'ASC',
        },
      }
      const res = await request<
        PageFilterResponseModel,
        FilterCommonReferenceModel
      >('POST', Path.CommonReference.search, {body})

      setContent(res)
    },
    [pages],
  )

  const onChangePage = (page?: number, limit?: number) => {
    setPage((prev) => ({
      page: page || prev.page,
      limit: limit || prev.limit,
    }))
  }
  useEffect(() => {
    commonReferenceFetch()
  }, [commonReferenceFetch])
  const headCells: HeadCell<CommonReference>[] = [
    {
      label: 'common-reference.id',
      render: ({entity}) => entity.id,
    },
    {
      label: 'common-reference.title',
      render: ({entity}) => entity.title,
    },
    {
      label: 'common-reference.typeTitle',
      render: ({entity}) => entity.type.title,
    },
    {
      label: '',
      render: ({entity}) => {
        return (
          <Dashboard>
            <Box sx={style}>
              <AddCommonReference
                editValue={entity}
                refetch={commonReferenceFetch}
              />
              <AddCommonReference
                deleteValue={entity}
                refetch={commonReferenceFetch}
              />
            </Box>
          </Dashboard>
        )
      },
    },
  ]
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <MuiP variant='h3' fontWeight='500'>
          Реестр справочников
        </MuiP>
        <AddCommonReference refetch={commonReferenceFetch} />
      </Box>
      <Divider sx={{my: '12px'}} />
      <Paper elevation={1} sx={{marginBottom: '25px', p: '10px'}}>
        <FilterCommonReference filter={commonReferenceFetch} />
      </Paper>
      <Paper elevation={2}>
        <AppTable
          headCells={headCells}
          list={content?.content || []}
          onChangePage={onChangePage}
          totalCount={content?.totalElements}
        />
      </Paper>
    </>
  )
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'left',
  flexDirection: 'column',
  padding: '10px',
  gap: '8px',
}
