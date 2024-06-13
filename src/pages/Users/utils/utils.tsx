import { Api } from '../../../shared/api/apiTypes.ts'
import { TableProps, Tag } from 'antd'
import { ReactNode } from 'react'
import { getFormattedDate } from '../../../shared/utils/dateUtils.ts'
import { removeDuplicateObjects } from '../../../shared/utils/objectUtils.ts'

type ColumnType = {
  key: keyof Api.User
  dataIndex: keyof Api.User
  map?: (user: Api.User) => ReactNode
  [key: string]: unknown
}

export type Filters = Parameters<NonNullable<TableProps['onChange']>>[1]

type ColumnsParams = {
  filteredInfo?: Filters
  users?: Api.User[]
}

export const getColumns = ({filteredInfo, users}: ColumnsParams): ColumnType[] => ([
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: '20%',
    filters:
      removeDuplicateObjects(users, (item) => item.name)
        ?.map(user => ({
          text: user.name, value: user.name
        })),
    filteredValue: filteredInfo?.name || null,
    onFilter: (value: string, record: Record<string, string>) => record.name.includes(value as string),
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
    align: 'center',
    filters:
      removeDuplicateObjects(users, (item) => item.lastName)
        ?.map(user => ({
          text: user.lastName, value: user.lastName
        })),
    filteredValue: filteredInfo?.lastName || null,
    onFilter: (value: string, record: Record<string, string>) => record.lastName.includes(value as string),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    filters:
      removeDuplicateObjects(users, (item) => item.email)
        ?.map(user => ({
          text: user.email, value: user.email
        })),
    filteredValue: filteredInfo?.email || null,
    onFilter: (value: string, record: Record<string, string>) => record.email.includes(value as string),
  },
  {
    title: 'Навыки',
    dataIndex: 'skills',
    key: 'skills',
    align: 'center',
    map: (user: Api.User) => (
      user.skills.length ?
        user.skills.map(item => (
          <Tag key={item}>
            { item }
          </Tag>
        ))
        : '-'
    ),
  },
  {
    title: 'Дата',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
    map: (user: Api.User) => getFormattedDate(user.created),
    filters:
      removeDuplicateObjects(users, (item) => item.created)
        ?.map(user => ({
          text: getFormattedDate(user.created), value: getFormattedDate(user.created)
        })),
    filteredValue: filteredInfo?.created || null,
    onFilter: (value: string, record: Record<string, string>) => record.created === value,
  }
])

export const getRows = (users: Api.User[]) => {
  return users.map((user, i) => {
    const row: any = {}

    getColumns({}).forEach((column) => {
      row[column.key] = column?.map
        ? column.map(user)
        : user[column.key as keyof Api.User]
    })
    row.key = user.id + i
    row.id = user.id

    return row
  })
}
