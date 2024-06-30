const FilterArgument = require("../../src/args/filter")
const { data } = require("../../src/data")

// expects every animal name to include a given substring
const expectFilter = (result, substring) => {
    result.forEach(country => {
        country.people.forEach(person => {
            person.animals.forEach(animal => {
                expect(animal.name.includes(substring)).toBe(true)
            })
        })
    })
}

describe("FilterArgument", () => {

    let filter

    beforeEach(() => {
        filter = new FilterArgument()
    })

    it("should filter animals containing 'ry'", () => {
        const ry = "ry"
        filter.value = ry
        const result = filter.handle(data)
        expect(result).toBeDefined()
        expectFilter(result, ry)
    })

})

module.exports = { expectFilter }

