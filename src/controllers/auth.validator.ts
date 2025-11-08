import * as z from 'zod'

const Register = z.object({
  name: z.string().min(4).max(50),
  email: z.email(),
  password: z.string().min(4).max(50)
})

const Login = z.object({
  email: z.email(),
  password: z.string().min(4).max(50)
})

export const validateRegister = (data: any) => {
  return Register.parse(data)
}

export const validateLogin = (data: any) => {
  return Login.parse(data)
}
