import { API_URL } from "./const";

const baseV1 = (url: string) => `${API_URL}/api/v1/${url}`

export class Path {
    static Auth = class {
      static signIn = baseV1('auth/login')
      static me = baseV1('accounts/me')
    }
    static TundukURLs = class {
      static zagsDatas = baseV1('tunduk/zags-data-by-pin')
      static address = baseV1('tunduk/asb-address')
      static lastPhoto = baseV1('tunduk/passport-last-photo-by-pin')
    }
    static CommonReference = class {
      static add = baseV1('common-references')
      static option = (id: number) => baseV1(`common-references/${id}`)
      static search = baseV1('common-references/search')
    }
    static Role = class {
      static getAll = baseV1('roles')
    }
    static Employees = class {
      static searh = baseV1('employees/search')
    }
    static Notary = class {
      static search = baseV1('notaries/search')
      static option = (id: number) => baseV1(`notaries/${id}`)
      static add = baseV1('notaries')
    }
}