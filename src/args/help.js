const Arg = require("./arg");

/**
 * Performs the "help" operation
 */
class HelpArgument extends Arg {

    static message = Object.freeze({
        "usage": "node app.js [OPTION]...",
        "description": "This is a test cli app to play with a simple json dataset",
        "options": {
            "--count": "Add the counts of Peoples and Animals in the output",
            "--filter=string": "Only display the elements having animals matching the provided string in the output",
            "--help": "Display this help message"
        }
    })

    handle(data) {
        return HelpArgument.message
    }

}

module.exports = HelpArgument