import Template from './template'
import { Pass, RGB, Beacon, Location, BarcodeFormat, NFC, BasicInformation } from './index'

export default class EventTicket extends Template {

    constructor(basic: BasicInformation, pass: Pass, description: string, serialNumber: string) {
        super(basic, pass, description, serialNumber)
        this.eventTicket = pass
    }
}