import chalk from 'chalk'

const calculateDigit = (partialKey) => {
  let weight = 2
  const base = reverse(partialKey)
  const sum = base.reduce((acc, item) => {
    acc += item * weight
    weight = weight === 9 ? 2 : weight + 1
    return acc
  }, 0)

  const mod = sum % 11
  const digit = mod === 0 || mod === 1 ? 0 : 11 - mod
  return digit
}

const reverse = (arr) => {
  return arr
    .split('')
    .reduce((acc, item) => [+item].concat(acc), [])
}

const generateContingencyKeyFrom = (key) => {
  const partOne = key.substr(0, 34)
  const partTwo = key.substring(35, key.length - 1)
  const tempKey = `${partOne}9${partTwo}`

  const newKey = `${tempKey}${calculateDigit(tempKey)}`
  return newKey
}

const generateOriginalKeyFrom = (key) => {
  const partOne = key.substr(0, 34)
  const partTwo = key.substring(35, key.length - 1)
  const tempKey = `${partOne}9${partTwo}`

  const newKey = `${tempKey}${calculateDigit(tempKey)}`
  return newKey
}

const extractTypeOfEmission = (key) => {
  return key.substr(34, 1)

}
const buildOtherAccessKey = (accessKey) => {
  const key = accessKey.replace(/[^\d]+/g, '')
  const typeOfEmission = extractTypeOfEmission(key)

  let result = ''
  if (typeOfEmission === '9') {
    console.log(chalk.green('Foi informada uma chave de contingência.\n\nGerando chave original:'))
    result = generateOriginalKeyFrom(key)
  } else if (typeOfEmission === '1') {
    console.log(chalk.green('Foi informada uma chave de original.\n\nGerando chave de contingência:'))
    result = generateContingencyKeyFrom(key)
  } else {
    console.log(chalk.orange('Couldn\'t to identifier type of emission.'))
  }
  return result
}

let args = process.argv.slice(2)
const chaveAcesso = args[0]

if (!chaveAcesso) {
  console.error(chalk.red('Access key not provided.'))
  process.exit(1)
}

const newKey = buildOtherAccessKey(chaveAcesso)
console.log(newKey);
