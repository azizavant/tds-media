import { notification } from 'antd'

type Props = {
  description?: string
  placement?: 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'
  message?: string
  duration?: number | null
}


export const successNotification = (props: Props) => {
  const { description = '', placement = 'topRight', message = 'Операция успешно выполнена!', duration = 2.5 } = props

  notification.success({
    message: message,
    description: description,
    placement: placement,
    duration: duration
  })
}


export const errorNotification = (props: Props) => {
  const { description = '', placement = 'topRight', message, duration = 0 } = props

  notification.error({
    message: message,
    description: description,
    placement: placement,
    duration: duration,
  })
}