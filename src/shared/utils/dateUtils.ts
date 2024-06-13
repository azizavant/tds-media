import dayjs, { Dayjs } from 'dayjs'


export const getFormattedDate = (dateStr?: string | Date | Dayjs | null, format: string = backDateFormat) => {
  return dayjs(dateStr).format(format)
}

export const dateFormat = 'DD.MM.YYYY'
export const backDateFormat = 'YYYY-MM-DD'
export const fullFormat = 'YYYY-MM-DD HH:mm'
