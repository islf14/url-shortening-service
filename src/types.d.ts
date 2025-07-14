export type Shorten = {
  shortCode: string
  url: string
}

export type Code = Pick<Shorten, 'shortCode'>
