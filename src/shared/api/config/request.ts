import qs from 'qs'
import { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import { filterNonNull, ReplaceUrl, replaceUrlFn } from './utils.ts'


type AppAxiosRequestConfig = AxiosRequestConfig & {
  replaceUrl?: ReplaceUrl
  needFullAxiosResp?: boolean
}


export class ApiClass {
  headers: Record<string, string> = {}

  constructor(private axios: AxiosInstance) { }

  request(options: AppAxiosRequestConfig) {
    const { needFullAxiosResp, replaceUrl } = options
    let { url } = options

    if (url && replaceUrl) {
      url = replaceUrlFn(url, replaceUrl)
    }

    return this.axios.request({
      ...options,
      url,
      headers: {
        ...this.headers,
        ...options.headers,
      },
      params: filterNonNull({ ...options.params }),
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      },
    }).then((resp) => {
      if (needFullAxiosResp) {
        return resp
      }

      return resp.data
    })
      .catch((error) => {
        const aError = error as AxiosError
        const eStatus = aError.response?.status

        const isAccessError = eStatus === 403

        if (isAccessError) {
          alert('Доступ к запрошенному ресурсу запрещен')
        }

        return Promise.reject(error)
      })
  }

  get(url: string, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'GET',
      url,
    })
  }

  post(url: string, data: Record<string, unknown>, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'POST',
      data: { ...data },
      url,
    })
  }

  put(url: string, data: Record<string, unknown>, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'PUT',
      data,
      url,
    })
  }

  patch(url: string, data: Record<string, unknown>, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'PATCH',
      data,
      url,
    })
  }

  delete(url: string, options?: AppAxiosRequestConfig) {
    return this.request({
      ...options,
      method: 'DELETE',
      url,
    })
  }
}
