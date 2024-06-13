import styles from './style.module.sass'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { ROUTES } from '../../shared/config/routes.ts'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Typography.Text style={ { fontSize: '60px' } }>
        404
      </Typography.Text>
      <Typography.Text>Такой страницы нет</Typography.Text>
      <Button color='primary' onClick={ () => navigate(ROUTES.USERS.ROOT.path) }>
        На главную
      </Button>
    </div>
  )
}
