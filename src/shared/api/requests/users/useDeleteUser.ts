import { api } from '../../config'
import { Api } from '../../apiTypes.ts'
import { useMutation } from '@tanstack/react-query'
import { errorHandler } from '../../config/utils.ts'
import { successNotification } from '../../../ui/openNotification'


export const deleteUser = async (user_id: string) => {
  return await api.delete(
    Api.Users.DeleteById.URL,
    {
      replaceUrl: { user_id }
    })
}

export const useDeleteUser = () => {
  const {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      successNotification({ message: 'Пользователь успешно удален!' })
    },
    onError: error => errorHandler(error)
  })

  return {
    deleteUser: mutate,
    isLoading: isPending,
    data,
    error,
    isSuccess,
    isError
  }
}