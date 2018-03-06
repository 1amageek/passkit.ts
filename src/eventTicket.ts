import Template from './template'
import { Pass, RGB, Beacon, Location, BarcodeFormat, NFC } from './index'

export default class EventTicket extends Template {

    constructor(pass: Pass, organizationName: string, description: string, serialNumber: string) {
        super(pass, organizationName, description, serialNumber)
        this.eventTicket = pass
    }
}