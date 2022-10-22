import {FieldValues, useForm} from 'react-hook-form'

// eslint-disable-next-line no-restricted-imports
import { useActions } from '../../hooks'
import { UserLoginRequestDto, UserLoginResponseModel } from '../../models'
import { userMeAction } from '../../store'
import { request, setToken } from '../../utils'
import { Path } from '../../utils/path'

export const Login = () => {
  const {getMe} = useActions({getMe: userMeAction})
  const form = useForm()
  const {register, handleSubmit} = form

  const onSubmit = async(formData: FieldValues) => {
    const res = await request<UserLoginResponseModel, UserLoginRequestDto>
      ('POST', Path.Auth.signIn, {body: {inn: formData.inn, password: formData.password}}, false)
      
    if(res?.authenticationToken) {      
      setToken(res.authenticationToken || '', 'accessToken')
      setToken(res.refreshToken || '', 'refreshToken')
    }
    getMe()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('inn')} type='text' />
      <input {...register('password')} type='password' />
      <button type='submit'>submit</button>
    </form>
  )
}