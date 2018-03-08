import * as PassKit from '../src/index'
import * as UUID from 'uuid'
import { options } from './config'

PassKit.initialize(options)

describe("Manifest", () => {

    describe("Generate", async () => {

        test("generate", async () => {
            const assets = new PassKit.Assets()
            // assets.background = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/background.png?alt=media&token=b6dd5d3d-263c-42cb-8a3a-75bf9f7c4cdb"
            // assets.background2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/background%402x.png?alt=media&token=481c1846-f45c-4147-927f-99b73cc9eab0"
            assets.icon = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/icon.png?alt=media&token=99cb0d56-a55e-421c-b915-a60289d518d5"
            assets.icon2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/icon%402x.png?alt=media&token=95b40271-e8d5-4aef-bd83-b298b89c6625"
            assets.logo = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/logo.png?alt=media&token=0a165cfc-422d-450a-ad36-20c9f021f4b0"
            assets.logo2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/logo%402x.png?alt=media&token=5b4e6101-9a8b-4dba-b7a8-62d2a00db735"
            // assets.thumbnail = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/thumbnail.png?alt=media&token=f8e97ab2-481f-46ac-b996-c6519098c625"
            // assets.thumbnail2x = "https://firebasestorage.googleapis.com/v0/b/ticket-392a5.appspot.com/o/thumbnail%402x.png?alt=media&token=6a8b323c-24cc-4380-b4c5-d176ea67e28b"

            const pass: PassKit.Pass = {}

            pass.primaryFields = [
                {
                    "key": "event",
                    "label": "イベント",
                    "value": "Passbookテスト"
                }
            ]

            pass.secondaryFields = [
                {
                    "key": "loc",
                    "label": "場所",
                    "value": "東京近辺"
                }
            ]

            pass.backFields = [
                {
                    "key": "message",
                    "label": "メッセージ",
                    "value": "Passbook盛り上げていきましょう！"
                }
            ]

            const barcode: PassKit.Barcode = {
                altText: "ユーザID",
                format: PassKit.BarcodeFormat.QR,
                message: "http://google.com",
                messageEncoding: "iso-8859-1"
            }

            const ticket: PassKit.EventTicket = new PassKit.EventTicket(pass, "Stamp", "desc", UUID.v4())
            ticket.webServiceURL = "https://google.com"
            ticket.barcode = barcode
            ticket.relevantDate = new Date()
            ticket.logoText = "参加チケット"
            ticket.description = "Passbookテスト用のチケットです。"
            ticket.foregroundColor = new PassKit.RGB(16, 16, 16)
            ticket.backgroundColor = new PassKit.RGB(255, 255, 255)
            ticket.authenticationToken = "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdcs"
            try {
                const path = await PassKit.generate(ticket, assets)
                console.log(path)
            } catch (error) {
                console.log(error)
            }
        }, 13000)
    })
})
