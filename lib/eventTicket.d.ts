import Template from './template';
import Asset from './asset';
import { Pass, BasicInformation } from './index';
export declare class EventTicket extends Template {
    constructor(basic: BasicInformation, asset: Asset, pass: Pass, description: string, serialNumber: string);
}
