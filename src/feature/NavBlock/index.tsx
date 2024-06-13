import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import styles from './styles.module.sass'
import { getMenuItems } from './utils.tsx'

const { Sider } = Layout


export const NavBlock = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { pathname } = location
  const [url, setUrl] = useState(pathname)

  const toPage = (url: string) => {
    setUrl(url)
    navigate(url)
  }

  return (
    <Sider
      width={ 200 }
    >
      <Menu
        mode="inline"
        className={ styles.menu }
        selectedKeys={ [url] }
        items={ getMenuItems(toPage) }
      />
    </Sider>
  )
}
