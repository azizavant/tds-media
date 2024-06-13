import { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, Tag, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

import { emailRules, required } from '../../shared/utils/formUtils.ts'
import { Api } from '../../shared/api/apiTypes.ts'
import { fullFormat, getFormattedDate } from '../../shared/utils/dateUtils.ts'
import { filterEmptyValues } from '../../shared/utils/objectUtils.ts'
import { ROUTES } from '../../shared/config/routes.ts'
import {
  useGetUser,
  useEditUser,
  useDeleteUser
} from '../../shared/api/requests/users'

import styles from './styles.module.sass'
import { Loader } from '../../shared/ui/Loader'

const FormItem = Form.Item<Api.Users.EditById.Req>

export const User = () => {
  const [form] = Form.useForm<Api.User>()
  const { user_id } = useParams()
  const navigate = useNavigate()


  const { user, isLoading  } = useGetUser(user_id as string)
  const { editUser, isLoading: isUpdating } = useEditUser()
  const { deleteUser, isLoading: isDeleting } = useDeleteUser()

  const [editMode, setEditMode] = useState(false)

  const onEdit = (values: Api.Users.EditById.Req) => {
    if (!user_id) return

    const filteredValues = filterEmptyValues(values)

    editUser({
        user_id,
        data: filteredValues
      }, {
      onSuccess: () => setEditMode(false)
    })
  }

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        skills: user.skills
      })
    }
  }, [user])

  const onDelete = () => {
    if (!user_id) return

    deleteUser(
      user_id,
      { onSuccess: () => navigate(ROUTES.USERS.ROOT.path) }
    )
  }

  const onClick = () => {
    if (editMode) {
      form.submit()
    } else {
      setEditMode(true)
    }
  }

  const back = () => {
    navigate(-1)
  }

  if (isLoading) return <Loader type='global' />

  return (
    <Flex className={styles.container}>
      <Flex align='center' className={styles.header}>
        <Button type='link' icon={<LeftOutlined />} onClick={back}>
          Назад
        </Button>
        <Typography className={styles.title}>
          { !editMode ? 'Информация о пользователе' : 'Редактирование' }
        </Typography>
      </Flex>

      <Form
        onFinish={onEdit}
        form={form}
        layout={'vertical'}
        style={{width: '100%'}}
        initialValues={{skills: []}}
        labelCol={{span: 3}}
      >
        <FormItem
          label='Создано'
          labelCol={{span: 3}}
        >
          <Tag>{user ? getFormattedDate(user.created, fullFormat): ''}</Tag>
        </FormItem>

        <FormItem
          name="name"
          label="Имя"
          rules={ required }
        >
          <Input
            disabled={ !editMode }
            placeholder="Введите имя"
          />
        </FormItem>

        <FormItem
          name='lastName'
          label='Фамилия'
          rules={required}
        >
          <Input
            disabled={!editMode}
            placeholder='Введите фамилию'
          />
        </FormItem>

        <FormItem
          name='email'
          label='Email'
          rules={emailRules}
        >
          <Input
            disabled={!editMode}
            placeholder='Введите email'
          />
        </FormItem>

        <FormItem label='Навыки'>
          <Form.List name="skills">
            { (fields, { add, remove }) => (
              <>
                {/*<>*/}
                  { fields.map(({ key, name, ...restField }) => (
                    <Flex key={ key } gap="small" align="baseline">
                      <Form.Item
                        { ...restField }
                        name={ [name] }
                        rules={ required }
                      >
                        <Input disabled={!editMode} placeholder="Введите навык"/>
                      </Form.Item>
                      { editMode && <MinusCircleOutlined onClick={ () => remove(name) }/> }
                    </Flex>
                  )) }
                {/*</>*/}
                <Form.Item>
                  <Button disabled={!editMode} type="dashed" onClick={ () => add() } block icon={ <PlusOutlined/> }>
                    { fields.length ? 'Добавить другой навык' : 'Добавить навык' }
                  </Button>
                </Form.Item>
              </>
            ) }
          </Form.List>
        </FormItem>

        <Flex gap='middle' justify='end'>
          <Button danger type='primary' onClick={onDelete} loading={isDeleting}>
            Удалить
          </Button>
          <Button type='primary' onClick={onClick} loading={isUpdating}>
            { editMode ? 'Сохранить' : 'Редактировать' }
          </Button>
        </Flex>
      </Form>
    </Flex>
  )
}