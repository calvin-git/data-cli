const Arg = require("./arg");

/**
 * Performs the "count" operation
 */
class CountArgument extends Arg {

    handle(data) {
        return data.map(country => this.getCountry(country))
    }

    getCountry(country) {
        const people = this.getPeople(country.people)
        const name = `${country.name} [${people.length}]`
        return { ...country, name, people }
    }

    getPeople(people) {
        return people.map(person => {
            const animalsCount = person.animals.length
            const name = `${person.name} [${animalsCount}]`
            return { ...person, name }
        })
    }

}

module.exports = CountArgument
