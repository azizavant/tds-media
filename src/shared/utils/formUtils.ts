import type { Rule } from 'rc-field-form/lib/interface'

export const required = [{
  required: true,
  message: 'Поле должно быть заполнено'
}]

export const emailRules: Rule[] = [
  {
    type: 'email',
    message: 'Неправильный формат!',
  },
  {
    required: true,
    message: 'Введите почту!',
  },
]