import {useCallback, useEffect, useState} from 'react'
import {Box, Divider, Paper, Typography as MuiP} from '@mui/material'

import {AppTable, Dashboard, HeadCell} from 'src/components'
import {
  NotaryResultModel,
  NotarySearchModel,
  SearchResponseModel,
} from 'src/models'
import {Path, request} from 'src/utils'

export const TableNotaryController = () => {
  const [content, setContent] = useState<NotaryContent>()
  const [pages, setPage] = useState({page: 0, limit: 5})
  const commonReferenceFetch = useCallback(
    async (filter?: NotarySearchModel['filter']) => {
      const body: NotarySearchModel = {
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
      const res = await request<NotaryContent, NotarySearchModel>(
        'POST',
        Path.Notary.search,
        {body},
      )
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
  return (
    <>
      <Paper>
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
const headCells: HeadCell<NotaryResultModel>[] = [
  {
    label: 'notaries.fio',
    render: ({entity}) =>
      `${entity.employeeData?.surname} ${entity.employeeData?.name} ${entity.employeeData?.patronymic}`,
  },
  {
    label: 'notaries.address',
    render: ({entity}) => entity.employeeData?.address,
  },
]
type NotaryContent = SearchResponseModel<NotaryResultModel>
