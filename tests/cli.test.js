const Cli = require("../src/cli.js")

const CountArgument = require("../src/args/count.js")
const FilterArgument = require("../src/args/filter.js")
const HelpArgument = require("../src/args/help.js")

const { expectCount } = require("./args/count.test.js")
const { expectFilter } = require("./args/filter.test.js")


describe("Cli", () => {

    let cli
    let exitSpy

    beforeEach(() => {
        cli = new Cli()
        exitSpy = jest.spyOn(process, "exit").mockImplementation(() => { })
        console.log = jest.fn()
    })

    afterEach(() => {
        exitSpy.mockRestore()
    })

    describe("handle", () => {
        it("should filter animals containing 'ry'", () => {
            const ry = "ry"
            const input = [`--filter=${ry}`]
            const result = cli.handle(input)
            expect(result).toBeDefined()
            expectFilter(result, ry)
        })

        it("should count people and animals", () => {
            const input = ["--count"]
            const result = cli.handle(input)           
            expect(result).toBeDefined()
            expectCount(result)
        })

        it("should filter animals containing 'ry' and then count people and animals", () => {
            const ry = "ry"
            const input = [`--filter=${ry}`, "--count"]
            const result = cli.handle(input)
            expect(result).toBeDefined()
            expectFilter(result, ry)
            expectCount(result)
        })

        it("should count only once", () => {
            const input = ["--count", "--count"]
            const result = cli.handle(input)
            expect(result).toBeDefined()
            const matches = result[0].name.match(/\[\d+\]/g) || []
            expect(matches.length).toBe(1)
        })

        it("should display help", () => {
            const input = ["--help"]
            const result = cli.handle(input)
            expect(result).toBeDefined()
            expect(result).toEqual(HelpArgument.message)
        })

        it("should exit with an error message", () => {
            const arg = "--unknown"
            const input = [arg]
            cli.parse(input)
            expect(console.log).toHaveBeenCalledWith(`Unknown arg [${arg}]`)
            expect(exitSpy).toHaveBeenCalledWith(-1)
        })

    })

    describe("parse", () => {
        it("should instantiate argument classes based on input", () => {
            const value1 = "value1"
            const value2 = "value2"
            const input = [`--filter=${value1}`, `--count=${value2}`]
            const result = cli.parse(input)
            expect(result.length).toBe(2)
            expect(result[0]).toBeInstanceOf(FilterArgument)
            expect(result[0].value).toEqual(value1)
            expect(result[1]).toBeInstanceOf(CountArgument)
            expect(result[1].value).toEqual(value2)
        })

        it("should exit with an error message for unknown arg", () => {
            const arg = "--unknown=value"
            const input = [arg]
            cli.parse(input)
            expect(console.log).toHaveBeenCalledWith(`Unknown arg [${arg}]`)
            expect(exitSpy).toHaveBeenCalledWith(-1)
        })
    })

    describe("sanitize", () => {
        it("should return only the help argument if provided", () => {
            const help = new HelpArgument()
            const count = new CountArgument()
            const args = [help, count]
            const result = cli.sanitize(args)
            expect(result).toEqual([help])
        })

        it("should remove duplicate arguments, keeping the last occurrence", () => {
            const filter1 = new FilterArgument()
            const filter2 = new FilterArgument()
            const count = new CountArgument()
            const args = [filter1, count, filter2]
            const result = cli.sanitize(args)
            expect(result).toEqual([count, filter2])
        })
    })
})
