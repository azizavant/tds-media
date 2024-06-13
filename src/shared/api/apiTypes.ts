
export namespace Api {

  export type User = {
    id: string
    name: string,
    lastName: string,
    email: string,
    skills: string[],
    created: string,
  }

  export namespace Users {
    export namespace Get {
      export const URL = '/users' as const

      export type Query = {
        limit?: number
        offset?: number
      }

      export type Resp = User[]
    }

    export namespace Post {
      export const URL = '/users' as const

      export type Req = {
        name: string,
        lastName: string,
        email: string,
        skills: string[]
        created: string
      }

      export type Resp = User
    }

    export namespace GetById {
      export const URL = '/users/:user_id' as const

      export type Resp = User
    }

    export namespace EditById {
      export const URL = '/users/:user_id' as const

      export type Req = {
        name?: string,
        lastName?: string,
        email?: string,
        skills?: string[]
      }

      export type Resp = Partial<User>
    }

    export namespace DeleteById {
      export const URL = '/users/:user_id' as const

      export type Resp = {
        success: boolean
      }
    }
  }
}