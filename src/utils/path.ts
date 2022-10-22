import { API_URL } from "./const";

const baseV1 = (url: string) => `${API_URL}/api/v1/${url}`

export class Path {
    static Auth = class {
      static signIn = baseV1('auth/login')
      static me = baseV1('accounts/me')
    }
}