import * as PassKit from './index'
import Template from './template'

export default class BoardingPass extends Template {

    constructor(pass: PassKit.Pass, organizationName: string, description: string, serialNumber: string) {
        super(PassKit.Style.boardingPass, pass, organizationName, description, serialNumber)
    }
}