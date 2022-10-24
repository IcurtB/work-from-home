import axios, {AxiosError, Method} from 'axios'

import { generateNotyfy } from '../helpers'
import {store} from '../store'
import {getToken} from '../utils'

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
    // generateNotyfy({message: 'loading...', type: 'info', autoClose: 1000})
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
    
    generateNotyfy({message: error.message, type: 'error', id: url})
    if (error.response?.status === 403) {
      store.dispatch({
        type: 'user/sign-out'
      })
    }
  }
}
