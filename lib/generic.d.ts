import * as PassKit from './index';
import Template from './template';
export default class Generic extends Template {
    constructor(pass: PassKit.Pass, organizationName: string, description: string, serialNumber: string);
}
