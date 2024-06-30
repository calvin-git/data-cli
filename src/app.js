const Cli = require("./cli");

// create cli
const cli = new Cli()

// get user arguments input
const input = process.argv.slice(2)

// handle input and get result
const result = cli.handle(input)

// print result
console.log(JSON.stringify(result, null, 2))
