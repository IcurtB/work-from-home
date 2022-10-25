import React from 'react'

export const AddNotaryController = () => {
  return <div>AddNotaryController</div>
}
type AddNotaryControllerType = {
  employeeData: {
    address: string
    dateOfBirth: string
    email: string
    genderId: number
    inn: string
    name: string
    patronymic: string
    phone: string
    photo: string
    rankId: number
    role: string
    roles: string[]
    surname: string
  }
  notaryData: {
    chiefNotaryId: number
    countryId: number
    districtId: number
    juridicalAddress: string
    latitude: number
    license: string
    licenseFrom: string
    localGovernmentId: number
    longitude: number
    notaryTypeId: number
    officeAddress: string
    regionId: number
  }
}
