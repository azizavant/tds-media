import { Api } from '../../apiTypes.ts'
import { api } from '../../config'
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { errorHandler } from '../../config/utils.ts'
import { UserQueryKeys } from '../../reactQuery/queryKeys.ts'


const getUsersInfinite = async (
  { pageParam }: QueryFunctionContext<QueryKey, number>,
  params: Api.Users.Get.Query
) => {
  const res = await api.get(Api.Users.Get.URL, {
    params: { ...params, offset: pageParam }
  })

  return {
    users: res as Api.Users.Get.Resp,
    prevStart: pageParam,
  }
}

const LIMIT = 10

/** WITH INFINITE SCROLL */
export const useGetUsersInfinite = (params: Api.Users.Get.Query) => {
  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [UserQueryKeys.USERS, params],
    queryFn: context => getUsersInfinite(context, { limit: LIMIT, ...params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.users.length < (params.limit || LIMIT))
        return null

      return lastPage.prevStart + (params.limit || LIMIT)
    },
  })

  if (isError) {
    errorHandler(error)
  }

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}