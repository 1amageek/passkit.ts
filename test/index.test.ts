import * as PassKit from '../src/index'
import * as UUID from 'uuid'
import { options } from './config'

PassKit.initialize(options)

describe("Manifest", async () => {

    describe("Passkit", async () => {

        test("StoreCard", async () => {
            const assets = new PassKit.Assets()
            assets.icon = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
            assets.icon2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
            assets.logo = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
            assets.logo2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
            // assets.personalizationLogo = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/personalizationLogo.png?alt=media&token=ea39f213-c0ef-4173-b3b0-0b26ad4418a2"
            // assets.personalizationLogo2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/personalizationLogo%402x.png?alt=media&token=d262355f-c592-47e1-a7e0-36dab7158968"
            const pass: PassKit.Pass = {}
            pass.headerFields = []
            pass.primaryFields = [
                {
                    "key": "event",
                    "label": "イベント",
                    "value": "StoreCard"
                }
            ]

            const barcode: PassKit.Barcode = {
                altText: "ユーザID",
                format: PassKit.BarcodeFormat.QR,
                message: "http://google.com",
                messageEncoding: "iso-8859-1"
            }

            const storeCard: PassKit.StoreCard = new PassKit.StoreCard(pass, "Stamp", "desc", UUID.v4())
            storeCard.webServiceURL = "https://ticket-392a5.firebaseapp.com/_"
            storeCard.barcode = barcode
            storeCard.relevantDate = new Date()
            storeCard.logoText = "参加チケット"
            storeCard.description = "Passbookテスト用のチケットです。"
            storeCard.labelColor = new PassKit.RGB(16, 16, 16)
            storeCard.foregroundColor = new PassKit.RGB(16, 16, 16)
            storeCard.backgroundColor = new PassKit.RGB(255, 255, 255)
            storeCard.authenticationToken = "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdcs"
            // storeCard.nfc =  {
            //     message: "gggggggggggg"
            // }

            // const personalization: PassKit.Personalization = {
            //     requiredPersonalizationFields: [PassKit.PersonalizationField.Name],
            //     description: "ポイントカード"
            // }

            try {
                const path = await PassKit.generate(storeCard, assets)
                expect(path).not.toBeNull()
                console.log(path)
            } catch (error) {
                console.error(error)
            }
        })

        // test("Ticket", async () => {
        //     const assets = new PassKit.Assets()
        //     // assets.background = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/background.png?alt=media&token=b6dd5d3d-263c-42cb-8a3a-75bf9f7c4cdb"
        //     // assets.background2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/background%402x.png?alt=media&token=481c1846-f45c-4147-927f-99b73cc9eab0"
        //     assets.icon = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
        //     assets.icon2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
        //     assets.logo = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
        //     assets.logo2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/version%2F1%2Fevent%2F2i5cO03PDUvsETgLcUSp%2Ficon%2F1526228899555.png?alt=media&token=541804cf-ead3-4889-bc6c-7d39014689a7"
        //     // assets.thumbnail = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/thumbnail.png?alt=media&token=f8e97ab2-481f-46ac-b996-c6519098c625"
        //     // assets.thumbnail2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/thumbnail%402x.png?alt=media&token=6a8b323c-24cc-4380-b4c5-d176ea67e28b"

        //     const pass: PassKit.Pass = {}
        //     pass.headerFields = []
        //     pass.primaryFields = [
        //         {
        //             "key": "event",
        //             "label": "イベント",
        //             "value": "Ticketのテスト"
        //         }
        //     ]

        //     pass.secondaryFields = [
        //         {
        //             "key": "loc",
        //             "label": "場所",
        //             "value": "東京近辺"
        //         }
        //     ]

        //     // pass.backFields = [
        //     //     {
        //     //         "key": "message",
        //     //         "label": "メッセージ",
        //     //         "value": "Passbook盛り上げていきましょう！"
        //     //     }
        //     // ]

        //     const barcode: PassKit.Barcode = {
        //         altText: "ユーザID",
        //         format: PassKit.BarcodeFormat.QR,
        //         message: "http://google.com",
        //         messageEncoding: "iso-8859-1"
        //     }

        //     const ticket: PassKit.EventTicket = new PassKit.EventTicket(pass, "Stamp", "desc", UUID.v4())
        //     ticket.webServiceURL = "https://google.com"
        //     ticket.barcode = barcode
        //     ticket.relevantDate = new Date()
        //     ticket.logoText = "参加チケット"
        //     ticket.description = "Passbookテスト用のチケットです。"
        //     ticket.labelColor = new PassKit.RGB(16, 16, 16)
        //     ticket.foregroundColor = new PassKit.RGB(16, 16, 16)
        //     ticket.backgroundColor = new PassKit.RGB(255, 255, 255)
        //     ticket.authenticationToken = "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdcs"

        //     try {
        //         const path = await PassKit.generate(ticket, assets)
        //         console.log(path)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }, 16000)
    })
})
