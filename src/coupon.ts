import * as PassKit from './index'
import Template from './template'

export default class Coupon extends Template {

    constructor(pass: PassKit.Pass, organizationName: string, description: string, serialNumber: string) {
        super(PassKit.Style.coupon, pass, organizationName, description, serialNumber)
    }
}