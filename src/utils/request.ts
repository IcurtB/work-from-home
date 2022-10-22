import axios, {AxiosError, Method} from 'axios'

import {getToken} from './local-storage'

interface RequestData<K> {
  body?: K,
  params?: K,
}

export const request = async <T, K = never>(
  method: Method,
  url: string,
  opts?: RequestData<K>,
  withCredentials = true
) => {
  try {
    const res = await axios.request<T>({
      method,
      url,
      data: opts && opts.body,
      params: opts && opts.params,
      headers: withCredentials ? {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${getToken('accessToken')}` || false,
      } : {},
    })
    return res.data
  } catch (err) {
    const error = err as AxiosError
    console.error(error)
    // TODO: поменять на ошибку сервера
    // generateMessage({message: 'Повторите попытку', type: 'error', id: url})
    // if (error.response?.status === 403) {
    //   store.dispatch({
    //     type: 'user/sign-out'
    //   })
    // }
  }
}
