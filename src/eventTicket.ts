import * as PassKit from './index'
import Template from './template'

export default class EventTicket extends Template {

	constructor(pass: PassKit.Pass, organizationName: string, description: string, serialNumber: string) {
		super("eventTicket", pass, organizationName, description, serialNumber)
	}
}