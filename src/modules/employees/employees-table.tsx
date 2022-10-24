import { useQuery } from 'react-query'

import { AppTable, HeadCell } from '../../components'
import { EmployeesDatasModel, EmployeesFilterRequestModel,EmployeesFilterResponseModel } from '../../models'
import { Path, request } from '../../utils'

export const EmployeesTable = () => {
  const body: EmployeesFilterRequestModel = {
    filter: {
      inn: undefined,
      name: undefined,
      patronymic: undefined,
      surname: undefined,
      role: undefined
    },
    pageRequest: {
      limit: 10,
      page: 0
    },
    sorting: {
      sortBy: 'ID',
      sortDirection: 'ASC'
    }
  }

  const {data} = useQuery([], async() => {
    const res = await request<EmployeesFilterResponseModel, EmployeesFilterRequestModel>('POST', Path.Employees.searh, {body: body})
    return res
  }, {refetchOnWindowFocus: true})

  return (
    <div>
      <AppTable headCells={headCells} list={data?.content || []} />
    </div>
  )
}

const headCells: HeadCell<EmployeesDatasModel>[] = [
  {
    label: 'name',
    render: ({entity}) => entity.name,
  },
  {
    label: 'surname',
    render: ({entity}) => entity.surname,
  },
  {
    label: 'patronymic',
    render: ({entity}) => entity?.patronymic,
  },
  {
    label: 'inn',
    render: ({entity}) => entity.inn,
  },
]
