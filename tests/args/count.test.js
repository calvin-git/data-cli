const CountArgument = require("../../src/args/count")
const { data } = require("../../src/data")

const countPattern = /\[(\d+)\]$/

// expects every country and person to have the correct count in 'result'
const expectCount = (result) => {
  result.forEach(country => {

    // ensure the people count is present
    expect(country.name).toMatch(countPattern)

    // ensure the people count is correct
    const peopleCount = parseInt(country.name.match(countPattern)[1], 10)
    expect(peopleCount).toBe(country.people.length)

    country.people.forEach(person => {

      // ensure the animal count is present
      expect(person.name).toMatch(countPattern)

      // ensure the animal count is correct
      const animalsCount = parseInt(person.name.match(countPattern)[1], 10)
      expect(animalsCount).toBe(person.animals.length)
    })

  })
}

describe('CountArgument', () => {

  let count

  beforeEach(() => {
    count = new CountArgument()
  })

  it("should count people and animals", () => {
    const result = count.handle(data)
    expect(result).toBeDefined()
    expectCount(result)
  })

})

module.exports = { expectCount }
