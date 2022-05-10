const firstnames = require('./data/firstnames')
const lastnames = require('./data/lastnames')
const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
const domains = require('./data/domains')
const { v4: uuid } = require('uuid')
const pickRandom = require('./helpers/pickRandom')
const nArray = require('./helpers/nArray')

const factories = {
  firstname: () => {
    return pickRandom(firstnames)
  },
  lastname: () => {
    return pickRandom(lastnames)
  },
  uuid: () => {
    return uuid()
  },
  email: () => {
    let randomString = ''
    nArray(10).forEach(i => randomString += pickRandom(characters)) // generate 10 random characters
    const randomDomain = pickRandom(domains)
    return randomString + '@' + randomDomain
  },
  phoneNumber: (options) => {
    const numbers = nArray(10)
    let randomPhoneNumber = ''
    nArray(options.length).forEach(i => randomPhoneNumber += pickRandom(numbers)) // generate n random numbers as a string
    return randomPhoneNumber
  },
  countryCode: () => {
    const numbers = nArray(10)
    let randomPhoneNumber = ''
    nArray(2).forEach(i => randomPhoneNumber += pickRandom(numbers))
    return randomPhoneNumber
  }
}

module.exports = (template, n = 1) => {
  const records = []
  nArray(n).forEach(i => {
    const randomValues = {}
    Object.entries(template).forEach(([ field, options ]) => {
      const { type, enumeration, ordered } = options
      if (enumeration) {
        if (ordered) randomValues[field] = enumeration[(i + enumeration.length) % enumeration.length]
        else randomValues[field] = pickRandom(enumeration)
      } else {
        randomValues[field] = factories[type](options)
      }
    })
    records.push(randomValues)
  })
  return n === 1 ? records[0] : records
}