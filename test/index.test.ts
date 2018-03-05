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
            const info = new Passkit.BasicInformation("pass.team.stamp.ticket", "88ACA86N96", "Stamp")
            const assets = new Passkit.Assets()
            // assets.background = "/Users/1amageek/Desktop/passkit.ts/resource/background.png"
            // assets.background2x = "/Users/1amageek/Desktop/passkit.ts/resource/background@2x.png"
            assets.icon = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/icon.png?alt=media&token=99cb0d56-a55e-421c-b915-a60289d518d5"
            assets.icon2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/icon%402x.png?alt=media&token=95b40271-e8d5-4aef-bd83-b298b89c6625"

            assets.logo = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/logo.png?alt=media&token=0a165cfc-422d-450a-ad36-20c9f021f4b0"
            assets.logo2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/logo%402x.png?alt=media&token=5b4e6101-9a8b-4dba-b7a8-62d2a00db735"

            const pass: Passkit.Pass = {}
            pass.headerFields = []

            const barcode: Passkit.Barcode = {
                altText: "USER ID",
                format: Passkit.BarcodeFormat.QR,
                message: "http://google.com",
                messageEncoding: "iso-8859-1"
            }
            const ticket: Passkit.EventTicket = new Passkit.EventTicket(info, pass, "desc", UUID.v4())
            ticket.webServiceURL = "http://google.com"
            ticket.barcode = barcode
            ticket.relevantDate = new Date()
            await Passkit.generate(ticket, assets, "nogunoguch1")
        })
    })
})
