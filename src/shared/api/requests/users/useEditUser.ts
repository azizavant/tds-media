import { Api } from '../../apiTypes.ts'
import { api } from '../../config'
import { useMutation } from '@tanstack/react-query'
import { errorHandler } from '../../config/utils.ts'
import { invalidateQuery } from '../../reactQuery/client.config.ts'
import { UserQueryKeys } from '../../reactQuery/queryKeys.ts'
import { successNotification } from '../../../ui/openNotification'

type EditUserArgs = {
  user_id: string
  data: Api.Users.EditById.Req
}

export const editUser = async ({ user_id, data }: EditUserArgs) => {
  return await api.patch(
    Api.Users.EditById.URL,
    data,
    {
      replaceUrl: { user_id }
    }
  )
}

export const useEditUser = () => {
  const {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      successNotification({ message: 'Успешно изменено!' })
      invalidateQuery(UserQueryKeys.USER)
    },
    onError: error => errorHandler(error)
  })

  return {
    editUser: mutate,
    isLoading: isPending,
    data,
    error,
    isSuccess,
    isError
  }
}