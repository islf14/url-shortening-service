import { UrlModel } from '../models/url.model'

export async function ShortName({ url }: { url: string }) {
  // filter only letters
  const clean = url.replace(/\.|(www)|(com)/g, '')
  // letters from url for search
  let threeCount = 3
  if (0 <= clean.length && clean.length < 3) {
    threeCount = clean.length
  }
  const limit = 20
  let validName = false
  let limitCount = 0
  let fiveCount = 0
  let newName = ''

  // serching name
  do {
    if (threeCount > 0) {
      do {
        const name = clean.slice(0, threeCount) + stringRandom(3 - threeCount)
        newName = name + numberRandom(3)
        // ask the db if the name exists
        const data = await UrlModel.view({ short: newName })
        if (data === null) validName = true
        fiveCount++
      } while (fiveCount < 5 && validName === false)
      // plus a random letter
      threeCount--
      fiveCount = 0
      // random all name ulti limit
    } else {
      newName = stringRandom(3) + numberRandom(3)
      // ask the db if the name exists
      const data = await UrlModel.view({ short: newName })
      if (data === null) validName = true
      limitCount++
    }
  } while (limitCount < limit && validName === false)

  // return name o error
  if (validName === true) {
    return newName
  } else {
    throw new Error('try again, name not available.')
  }
}

//
function stringRandom(length: number) {
  let result = ''
  if (length === 0) return result
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    const randomInd = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomInd)
  }
  return result
}

function numberRandom(length: number) {
  const strRdm = Math.random().toString().split('.')[1].slice(0, length)
  return strRdm
}
