import * as Passkit from '../src/index'

const info = new Passkit.BasicInformation("passTypeIdentifier", "teamIdentifier", "organizationName")
const asset = new Passkit.Asset()
let pass: Passkit.Pass = {

}
pass.auxiliaryFields = []
pass.headerFields = []

const ticket = new Passkit.EventTicket(info, asset, pass, "", "")

ticket.toPassJSON()
