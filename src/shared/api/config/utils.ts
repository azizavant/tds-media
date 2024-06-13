import { AxiosError } from 'axios'
import { errorNotification } from '../../ui/openNotification'

export type ReplaceUrl = { [key: string]: string | number };

export const replaceUrlFn = (url: string, replaceUrl: ReplaceUrl) => {
  const splitUrl = url.split('/')

  return splitUrl
    .map((part) => {
      if (part.startsWith(':')) {
        const key = part.slice(1)

        return replaceUrl[key] ? String(replaceUrl[key]) : part
      }

      return part
    })
    .join('/')
}

export const filterNonNull = (obj: Record<string, unknown>) => {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => {
    return !Number.isNaN(v as any) || v && (v as string).length
  }))
}

export const errorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    errorNotification({
      message: error.message,
      description: error.response?.data,
      duration: 8
    })
  }
}