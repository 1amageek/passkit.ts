
export default class Assets {
    
    // 29×29
    icon?: string
    icon2x?: string

    // 160×50
    logo?: string
    logo2x?: string

    // 180×220
    background?: string
    background2x?: string

    // 90×90
    thumbnail?: string
    thumbnail2x?: string

    // 286×15
    footer?: string
    footer2x?: string
 
    // eventTicket: 375×98
    // coupon: 375×144
    // other: 375×123
    strip?: string
    strip2x?: string

    validate() {
        const requireImages = ['logo', 'icon', 'logo2x', 'icon2x']
        for (const key of requireImages) {
            if (!this[key]) {
                throw Error(`Missing image ${key}.png`)
            }
        }
    }
}