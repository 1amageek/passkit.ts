import Template from './template'
import { Pass } from './index'

export default class EventTicket extends Template {

    constructor(pass: Pass, organizationName: string, description: string, serialNumber: string) {
        super(pass, organizationName, description, serialNumber)
        this.eventTicket = pass
    }
}