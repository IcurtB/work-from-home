type key = 'accessToken' | 'refreshToken'

export const setToken = (token: string, name: key) => localStorage.setItem(name, token)

export const getToken = (name: key) => {
  return localStorage.getItem(name)
}

export const removeToken = (name: key) => {
  localStorage.removeItem(name)
}
