const { data } = require("./data")
const args = require("./args");
const HelpArgument = require("./args/help");

/**
 * The Cli
 */
module.exports = class Cli {

    // handles the cli input string provided by the user
    handle(input) {
        // parse args to get args instances
        const parsedArgs = this.parse(input)

        // sanitize the args instances list
        const sanitizedArgs = this.sanitize(parsedArgs)

        // reduce the dataset through the arguments stream
        const result = sanitizedArgs.reduce((data, arg) => arg.handle(data), data)

        // return result
        return result
    }

    // parses the args input string provided by the user and returns args instances
    parse(input) {
        // for each arg, instantiate its class counterpart
        return input.map(arg => {
            const tokens = arg.split("=")
            const argType = tokens[0]
            const argValue = tokens.slice(1).join("=")
            const ArgClass = args[argType]
            if (ArgClass) { return new ArgClass(argValue) }

            // if some arg is invalid, exit with an error message
            console.log(`Unknown arg [${arg}]`)
            process.exit(-1)
        })
    }

    // sanitizes the args list to ensure its consistency
    sanitize(args) {
        // if the "--help" argument is provided, ignore other arguments
        const helpArgument = args.find(arg => arg instanceof HelpArgument)
        if (helpArgument) {
            return [helpArgument]
        }

        // if the same argument is provided multiple times, only consider its last occurrence
        const sanitizedArgs = []
        for (let i = args.length - 1; i >= 0; i--) {
            if (!sanitizedArgs.some(arg => arg.constructor === args[i].constructor)) {
                sanitizedArgs.unshift(args[i])
            }
        }

        // return sanitized args
        return sanitizedArgs
    }

}
