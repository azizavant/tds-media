import { CSSProperties } from 'react'
import { Spin } from 'antd'
import cn from 'clsx'
import { LoadingOutlined } from '@ant-design/icons'

import styles from './styles.module.sass'

type Props = {
  size?: number
  className?: string
  tip?: string
  style?: CSSProperties
  type?: 'local' | 'global'
}

export const Loader = (props: Props) => {
  const { size = 24, className, tip, type = 'local' } = props
  const isGlobal = type === 'global'

  const loaderStyles = cn(className, {
    [styles.globalWrapper]: isGlobal,
    [styles.wrapper]: !isGlobal,
  })

  return (
    <div className={loaderStyles} style={props.style}>
      <Spin
        className={cn({
          [styles.globalLoader]: isGlobal,
        })}
        indicator={<LoadingOutlined style={{ fontSize: size }} spin />}
        tip={tip}
      />
    </div>
  )
}