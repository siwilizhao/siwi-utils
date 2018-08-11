const Utils = require('../index')
class Test {
    constructor() {
        this.init()
    }
    async init () {
       try {
           let code = await Utils.iddecode('LPK01A0006', 'LPK')
           console.log(code)
       } catch (error) {
           console.log(error)
       }
    }
}

module.exports = new Test()