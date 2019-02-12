# passkit.ts

passkit.ts is a library for issuing pass with typescript.

## Installation

```shell
npm add @1amageek/passkit
```

## Usage

```typescript

const options: PassKit.Options = {
    secretURL: "SECRET_URL", // 
    wwdrURL: "WWDR_URL",
    passTypeIdentifier: "pass.**.**.**",
    teamIdentifier: "TEAM_ID",
    password: "PASSWORD",
}

PassKit.initialize(options)

```

```typescript
const assets = new PassKit.Assets()
assets.icon = "URL_icon"
assets.icon2x = "URL_icon2x"
assets.logo = "URL_logo"
assets.logo2x = "URL_logo2x"

const pass: PassKit.Pass = {}
pass.primaryFields = [
    {
        "key": "event",
        "label": "hoge",
        "value": "fuga"
    }
]
pass.secondaryFields = [
    {
        "key": "loc",
        "label": "hoge",
        "value": "fuga"
    }
]

const barcode: PassKit.Barcode = {
    altText: "wow",
    format: PassKit.BarcodeFormat.QR,
    message: "http://google.com",
    messageEncoding: "iso-8859-1"
}

const ticket: PassKit.EventTicket = new PassKit.EventTicket(pass, "Organization", "Description", "UUID_string")
ticket.webServiceURL = "https://google.com"
ticket.barcode = barcode
ticket.relevantDate = new Date()
ticket.logoText = "logo_string"
ticket.foregroundColor = new PassKit.RGB(255, 255, 255)
ticket.backgroundColor = new PassKit.RGB(255, 255, 255)
ticket.authenticationToken = "authenticationToken_string"
try {
    const path = await PassKit.generate(ticket, assets)
    console.log(path)
} catch (error) {
    console.log(error)
}
```


__Donation__

<img src="https://github.com/1amageek/passkit.ts/blob/master/kyash.jpg" width="200">
