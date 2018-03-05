import * as Passkit from '../src/index'
import * as UUID from 'uuid'


describe("Manifest", () => {

    // beforeAll(async () => {
    //     const info = new Passkit.BasicInformation("pass.team.stamp.ticket", "88ACA86N96", "Stamp")
    //     const assets = new Passkit.Assets()
    //     let pass: Passkit.Pass = {}
    //     pass.auxiliaryFields = []
    //     pass.headerFields = []
    //     const ticket: Passkit.EventTicket = new Passkit.EventTicket(info, pass, "desc", UUID.v4())
    //     await Passkit.generate(ticket, assets, "nogunoguch1")
    // });

    describe("Generate", async () => {

        test("generate", async () => {


            const barcode: Passkit.Barcode = {
                altText: "USER ID",
                format: Passkit.BarcodeFormat.QR,
                message: "http://google.com",
                messageEncoding: "iso-8859-1"
            }
            let ticket: Passkit.EventTicket = new Passkit.EventTicket(info, pass, "desc", UUID.v4())
            ticket.webServiceURL = "http://google.com"
            ticket.barcode = barcode
            ticket.relevantDate = new Date()
            await Passkit.generate(ticket, assets, "nogunoguch1")
        })
    })
})
