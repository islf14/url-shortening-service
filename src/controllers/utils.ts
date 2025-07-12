export function ShortName({ url }: { url: string }) {
  // filter only chars
  const clean = url.replace(/\.|(www)|(com)/g, '')
  console.log(clean)
  console.log('length: ', clean.length)

  //
  let threeCount = 3
  if (0 <= clean.length && clean.length < 3) {
    threeCount = clean.length
  }
  //
  const limit = 10
  let validName = false
  let limitCount = 0
  let fiveCount = 0

  // serching name
  while (limitCount < limit && validName === false) {
    if (threeCount > 0) {
      while (fiveCount < 5 && validName === false) {
        const name = clean.slice(0, threeCount) + stringRandom(3 - threeCount)
        const newName = name + numberRandom(3)
        console.log(newName)
        fiveCount++
        // ask the db if it exists // no found
        // if ok then change validname to true
      }
      threeCount--
      fiveCount = 0
    } else {
      const nn = stringRandom(3) + numberRandom(3)
      console.log(nn)
      limitCount++
      // ask the db if it exists // no found
      // if ok then change validname to true
    }
  }

  return 'new name returned'
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
