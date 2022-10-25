import {CommonReference, RolesResponseModel,SearchModel} from 'src/models'

export type NotaryFilterModel = {
  inn?: string
  name?: string
  notaryTypeId?: number
  patronymic?: string
  surname?: string
}
export type NotarySearchModel = SearchModel<NotaryFilterModel>

export type NotaryResultModel = {
  employeeData: {
    address: string
    dateOfBirth: string
    email: string
    employeeId: number
    enabled: boolean
    gender: CommonReference
    inn: string
    name: string
    patronymic: string
    phone: string
    photo: string
    rank: CommonReference
    role: RolesResponseModel
    roles: RolesResponseModel[]
    surname: string
    username: string
  }
  notaryData: {
    chiefNotaryId: number
    country: CommonReference
    district: CommonReference
    juridicalAddress: string
    latitude: number
    license: string
    licenseFrom: string
    localGovernment: CommonReference
    longitude: number
    notaryType: CommonReference
    officeAddress: string
    region: CommonReference
  }
  notaryId: number
}

