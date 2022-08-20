type repeatedNumbers = {
  [key: string]: number
}

function rand(min: number, max: number) {
  const randomNum = Math.random() * (max - min) + min
  return Math.round(randomNum)
}

function randoms(range = 1e8) {
  const numbers: repeatedNumbers = {}
  const maxNumber = 1000

  for (let i = 1; i <= maxNumber; i++) {
    numbers[i] = 0
  }

  for (let i = 0; i < range; i++) {
    const number = rand(1, 1000)
    numbers[number] += 1
  }

  return numbers
}

// process.on('message', (msg: number) => {
//   if (!msg) {
//     return process.exit(1)
//   }
//   if (process.send) {
//     process.send(randoms(msg))
//     process.exit()
//   }
// })

export default randoms
