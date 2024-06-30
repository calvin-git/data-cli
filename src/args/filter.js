const Arg = require("./arg");

/**
 * Performs the "filter" operation
 */
class FilterArgument extends Arg {

    handle(data) {
        return data
            .map(country => this.getCountry(country))
            .filter(country => country.people.length > 0)
    }

    getCountry(country) {
        const people = country.people
            .map(person => this.getPerson(person))
            .filter(person => person.animals.length > 0)

        return { ...country, people }
    }

    getPerson(person) {
        const animals = person.animals.filter(animal => this.isMatched(animal))
        return { ...person, animals }
    }

    // returns true if 'animal' is matched by 'this' filter argument value, false otherwise
    isMatched(animal) {
        return animal.name.includes(this.value)
    }

}

module.exports = FilterArgument
