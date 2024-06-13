
export const ROUTES = {
  USERS: {
    ROOT: {
      path: '/users',
    },
    USER: {
      createPath: (user_id: string = ':user_id') => `/users/${user_id}`
    }
  }
}