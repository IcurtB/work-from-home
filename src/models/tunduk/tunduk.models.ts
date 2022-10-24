import { CommonReference } from "../index"

export type TundukZagsDataByPin = {
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