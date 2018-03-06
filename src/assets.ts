
export default class Assets {
    icon?: string
    icon2x?: string

    logo?: string
    logo2x?: string

    background?: string
    background2x?: string

    thumbnail?: string
    thumbnail2x?: string

    validate() {
        const requireImages = ['logo', 'icon', 'logo2x', 'icon2x']
        for (const key of requireImages) {
            if (!this[key]) {
                throw Error(`Missing image ${key}.png`)
            }
        }
    }
}