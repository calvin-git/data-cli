const HelpArgument = require("../../src/args/help")

describe("HelpArgument", () => {
    
    let help

    beforeEach(() => {
        help = new HelpArgument()
    })

    it("should display help", () => {
        const result = help.handle()
        expect(result).toBeDefined()
        expect(result).toEqual(HelpArgument.message)
    })

})
