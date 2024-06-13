import { ItemType } from 'antd/es/menu/interface'
import { UnorderedListOutlined, RetweetOutlined } from '@ant-design/icons'
import { ROUTES } from '../../shared/config/routes.ts'


export const getMenuItems = (toPage: (url: string) => void): ItemType[] => ([
  {
    key: 'users_expand',
    icon: <UnorderedListOutlined />,
    label: 'Пользователи',
    children: [
      {
        key: ROUTES.USERS.ROOT.path,
        label: 'Все',
        onClick: () => toPage(ROUTES.USERS.ROOT.path)
      }
    ]
  },
  {
    key: '/others',
    icon: <RetweetOutlined />,
    label: 'Другое'
  }
])