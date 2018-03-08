import * as PassKit from './index'
import Template from './template'

export default class StoreCard extends Template {

    constructor(pass: PassKit.Pass, organizationName: string, description: string, serialNumber: string) {
        super(PassKit.Style.storeCard, pass, organizationName, description, serialNumber)
    }
}