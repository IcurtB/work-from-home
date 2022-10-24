import { API_URL } from "./const";

const baseV1 = (url: string) => `${API_URL}/api/v1/${url}`

export class Path {
    static Auth = class {
      static signIn = baseV1('auth/login')
      static me = baseV1('accounts/me')
    }
    static TundukURLs = class {
      static zagsDatas = baseV1('tunduk/zags-data-by-pin')
    }
    static CommonReference = class {
      static search = baseV1('common-references/search')
    }
    static Role = class {
      static getAll = baseV1('roles')
    }
    static Employees = class {
      static searh = baseV1('employees/search')
    }
}