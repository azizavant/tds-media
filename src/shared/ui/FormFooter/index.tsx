import { ReactElement } from 'react'
import { Button, ButtonProps } from 'antd'
import cn from 'clsx'

import styles from './styles.module.sass'


type Props = {
  onCancel: () => void
  okText?: string
  cancelText?: string
  position?: 'left' | 'right'
  leftElement?: ReactElement
  okElement?: ReactElement | null
  okTypeProps?: ButtonProps
  className?: string
  actionClass?: string
  isLoading?: boolean
  hideCancelButton?: boolean
  confirmDisabled?: boolean
}


export const FormFooter = (props: Props) => {
  const {
    onCancel,
    position = 'right',
    okText = 'Создать',
    leftElement,
    okTypeProps,
    okElement,
    className,
    actionClass,
    hideCancelButton = false,
    isLoading = false,
    cancelText = 'Отменить',
    confirmDisabled,
  } = props
  const defaultOkButtonProps = okTypeProps ?? {
    type: 'primary',
    htmlType:'submit',
  }

  return (
    <div className={
      cn(
        className,
        styles.footer,
        position === 'left' && styles.left,
        position === 'right' && styles.right,
      )
    }
    >
      <div>
        { leftElement && { ...leftElement } }
      </div>

      <div className={actionClass}>
        {
          !hideCancelButton && (
            <Button
              onClick={onCancel}
              className={styles.cancelBtn}
            >
              { cancelText }
            </Button>
          )
        }
        {
          okElement ?? (
            <Button
              {...defaultOkButtonProps}
              loading={isLoading}
              disabled={confirmDisabled}
            >
              { okText }
            </Button>
          )
        }
      </div>
    </div>
  )
}