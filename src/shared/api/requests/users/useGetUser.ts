import { Api } from '../../apiTypes.ts'
import { api } from '../../config'
import { useQuery } from '@tanstack/react-query'
import { errorHandler } from '../../config/utils.ts'
import { UserQueryKeys } from '../../reactQuery/queryKeys.ts'


const getUser = async (user_id: string) => {
  const res = await api.get(
    Api.Users.GetById.URL,
    {
        replaceUrl: { user_id }
      }
    )

  return res as Api.Users.GetById.Resp
}


export const useGetUser = (user_id: string) => {
  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: [UserQueryKeys.USER, user_id],
    queryFn: () => getUser(user_id),
    enabled: Boolean(user_id)
  })

  if (isError) {
    errorHandler(error)
  }

  return {
    user: data,
    error,
    isLoading,
    isSuccess,
    isError
  }
}