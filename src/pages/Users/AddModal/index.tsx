import { Button, Flex, Form, Input, Modal } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import { useCreateUser } from '../../../shared/api/requests/users'

import { emailRules, required } from '../../../shared/utils/formUtils.ts'
import { filterEmptyValues } from '../../../shared/utils/objectUtils.ts'
import { FormFooter } from '../../../shared/ui/FormFooter'
import { Api } from '../../../shared/api/apiTypes.ts'


const FormItem = Form.Item<Api.Users.Post.Req>

export type Props = {
  isOpen: boolean
  onClose: () => void
}

const formLayout = { labelCol: { span: 10 } }

export const AddModal = ({ isOpen, onClose }: Props) => {
  const [form] = Form.useForm()

  const { createUser, isLoading } = useCreateUser()

  const onFinish = (values: Api.Users.Post.Req) => {
    const filteredValues = filterEmptyValues(values)

    filteredValues.created = new Date().toISOString()
    createUser(
      filteredValues as Api.Users.Post.Req,
      { onSuccess: onClose }
    )
  }

  const afterClose = () => {
    form.resetFields()
  }

  return (
    <Modal
      title='Создание нового пользователя'
      open={isOpen}
      onCancel={onClose}
      width={600}
      destroyOnClose
      footer={false}
      afterClose={afterClose}
    >
      <Form
        onFinish={onFinish}
        form={form}
        {...formLayout}
        layout={'vertical'}
        initialValues={{skills: []}}
      >
        <FormItem
          name='name'
          label='Имя'
          rules={required}
        >
          <Input
            placeholder='Введите имя'
          />
        </FormItem>

        <FormItem
          name='lastName'
          label='Фамилия'
          rules={required}
        >
          <Input
            placeholder='Введите фамилию'
          />
        </FormItem>

        <FormItem
          name='email'
          label='Email'
          rules={emailRules}
        >
          <Input
            placeholder='Введите email'
          />
        </FormItem>

        <FormItem label='Навыки'>
          <Form.List name="skills">
            { (fields, { add, remove }) => (
              <>
                <Flex wrap>
                  { fields.map(({ key, name, ...restField }) => (
                    <Flex key={ key } gap="small" align="baseline" style={ { width: '50%' } }>
                      <Form.Item
                        { ...restField }
                        name={ [name] }
                        rules={ required }
                      >
                        <Input placeholder="Введите навык"/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={ () => remove(name) }/>
                    </Flex>
                  )) }
                </Flex>
                <Form.Item>
                  <Button type="dashed" onClick={ () => add() } block icon={ <PlusOutlined/> }>
                    { fields.length ? 'Добавить другой навык' : 'Добавить навык' }
                  </Button>
                </Form.Item>
              </>
            ) }
          </Form.List>
        </FormItem>

        <FormFooter
          isLoading={isLoading}
          onCancel={onClose}
        />
      </Form>
    </Modal>
  )
}
