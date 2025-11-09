export type Shorten = {
  shortCode: string
  url: string
}

export type Code = Pick<Shorten, 'shortCode'>

export type Pagination = {
  pageNumber: number
  nPerPage: number
}

export type Auth = {
  name: string
  email: string
  password: string
}

export type Login = Omit<Auth, 'name'>

export type HashAuth = {
  name: string
  email: string
  hashedPassword: string
}

export type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>

export type Payload = {
  email: string
  type: string
}

export type Rate = {
  times: number
  minutes: number
}
