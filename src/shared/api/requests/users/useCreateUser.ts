import { api } from '../../config'
import { Api } from '../../apiTypes.ts'
import { useMutation } from '@tanstack/react-query'
import { errorHandler } from '../../config/utils.ts'
import { invalidateQuery } from '../../reactQuery/client.config.ts'
import { UserQueryKeys } from '../../reactQuery/queryKeys.ts'
import { successNotification } from '../../../ui/openNotification'


const createUser = async (data: Api.Users.Post.Req) => {
  const res = await api.post(Api.Users.Post.URL, data)

  return res as Api.Users.Post.Resp
}

export const useCreateUser = () => {
  const {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      successNotification({ message: 'Пользователь успешно добавлен!' })
      invalidateQuery(UserQueryKeys.USERS)
    },
    onError: error => errorHandler(error)
  })

  return {
    createUser: mutate,
    isLoading: isPending,
    data,
    error,
    isSuccess,
    isError
  }
}