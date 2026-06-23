import * as yup from 'yup'

export const createTransferSchema = yup.object({
  value: yup.number().typeError("Value must be a number").required(),
  currency: yup.string().required(),
  payeerDocument: yup.string().required(),
  transferDate: yup.string().required()
})