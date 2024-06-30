/**
 * Abstract argument
 */
class Arg {

    // optional value 
    // eg: for argument --filter=toto , toto is the value
    value 

    constructor(value) {
        this.value = value
    }

    handle() {
        throw new Error(`Implementation missing for argument of type [${this.constructor}]`)
    }

}

module.exports = Arg
