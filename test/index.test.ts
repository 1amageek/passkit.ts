import * as Passkit from '../src/index'

const info = new Passkit.BasicInformation("passTypeIdentifier", "teamIdentifier", "organizationName")
const assets = new Passkit.Assets()
let pass: Passkit.Pass = {

}
pass.auxiliaryFields = []
pass.headerFields = []

const ticket: Passkit.EventTicket = new Passkit.EventTicket(info, pass, "", "")

Passkit.generate(ticket, assets, "wwwwwwww")
