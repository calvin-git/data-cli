const CountArgument = require("./count")
const FilterArgument = require("./filter")
const HelpArgument = require("./help")

module.exports = {
    "--count": CountArgument,
    "--filter": FilterArgument,
    "--help": HelpArgument,
}
