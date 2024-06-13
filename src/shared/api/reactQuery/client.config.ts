import { QueryClient } from '@tanstack/react-query'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { UseQueryOptions } from '@tanstack/react-query/src/types.ts'
import { QueryKeys } from './queryKeys.ts'

export type QueryOptionsType = Omit<UseQueryOptions, 'queryKey' | 'queryFn'>

export const defaultOptions = {
  retry: 0,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  keepPreviousData: true,
}

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultOptions },
})

export const invalidateQuery = (key: QueryKeys) => {
  queryClient.invalidateQueries({ queryKey: [key] })
}

export const invalidateAllQueries = () => {
  queryClient.resetQueries()
}

export const removeQueries = () => {
  queryClient.removeQueries()
}

type FetchInfiniteQueryOptions = {
  queryKey: QueryKeys
  initPageParam?: number
}

export const fetchInfiniteQuery = ({ queryKey, initPageParam = 0 }: FetchInfiniteQueryOptions) => {
  queryClient.fetchInfiniteQuery({
    queryKey: [queryKey],
    initialPageParam: initPageParam,
  })
}
