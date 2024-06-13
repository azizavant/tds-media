import { ReactNode } from 'react'
import { Layout as BaseLayout } from 'antd'
import cn from 'clsx'

import styles from './styles.module.sass'
import { NavBlock } from '../../feature/NavBlock'


const { Content } = BaseLayout

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {

  return (
    <BaseLayout className={ styles.layout }>
      <NavBlock/>
      <Content
        className={ cn(styles.content) }
      >
        { children }
      </Content>
    </BaseLayout>
  )
}