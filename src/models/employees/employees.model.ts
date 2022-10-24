import { CommonReference,PageRequestModel, PageSortingModel } from "../index"

export type EmployeesFilterRequestModel = {
    filter: {
      inn?: string,
      name?: string,
      patronymic?: string,
      role?: string,
      surname?: string
    },
    pageRequest: PageRequestModel
    sorting: PageSortingModel
}

export type EmployeesFilterResponseModel = {
    content: EmployeesDatasModel[],
    numberOfElements: number,
    page: number,
    totalElements: number,
    totalPages: number
}

export type EmployeesDatasModel = {
    address: string,
    dateOfBirth: string,
    email: string,
    employeeId: number,
    enabled: true,
    gender: CommonReference,
    inn: string,
    name: string,
    patronymic: string,
    phone: string,
    photo: string,
    rank: CommonReference,
    role: {
      code: string,
      id: number,
      roadmaps: [
        {
          actionType: string,
          id: number
        }
      ]
    },
    roles: [
      {
        code: string,
        id: number,
        roadmaps: [
          {
            actionType: string,
            id: number
          }
        ]
      }
    ],
    surname: string,
    username: string
}