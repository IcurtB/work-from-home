import { CommonReference } from "../common/common.models"

export type UserLoginRequestDto = {
  inn: string
  password: string
}

export type UserLoginResponseModel = {
  authenticationToken: string
  refreshToken: string
}

export type UserModel = {
  credentialsValid: boolean
  id: number
  inn: string
  name: string
  notaryType: CommonReference
  patronymic: string
  permissions: string[]
  role: string
  surname: string
  username: string
}
