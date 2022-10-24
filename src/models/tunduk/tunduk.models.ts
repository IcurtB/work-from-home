import { CommonReference } from "../index"

export type TundukZagsDataByPinModel = {
  citizenship: string,
  dateOfBirth: string,
  deathDate: string,
  gender: CommonReference,
  maritalStatus: CommonReference,
  name: string,
  nationality: string,
  patronymic: string,
  pin: string,
  pinBlocked: true,
  pinGenerationDate: string,
  surname: string
}

export type TundukPasswordPhotoModel = {
  error: string,
  errorMessage: string,
  photo: string
}

export type TundukAddressByPinModel = {
  address: string,
  dateAction: string,
  dateCreated: string,
  error: string
}