export type Shorten = {
  shortCode: string
  url: string
}

export type Code = Pick<Shorten, 'shortCode'>

export type Pagination = {
  pageNumber: number
  nPerPage: number
}
