import Template from './template'
import { RGB, Beacon, Location, BarcodeFormat, NFC, BasicInformation } from './index'

export class EventTicket extends Template {

    constructor(
        basic: BasicInformation, 
        description: string, 
        serialNumber: string,
        
    ) {
        super(basic, description, serialNumber)
    }
}