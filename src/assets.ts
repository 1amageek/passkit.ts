
/// Assets manages images. You can specify the URL and Function for the property. 
/// If you set the URL, the data will be acquired automatically internally.
/// If you specify a Function, make sure to return Promise<Buffer>.
export default class Assets {

	// 29×29
	icon?: string | Function
	icon2x?: string | Function
	icon3x?: string | Function

	// 160×50
	logo?: string | Function
	logo2x?: string | Function
	logo3x?: string | Function

	// 180×220
	background?: string | Function
	background2x?: string | Function
	background3x?: string | Function

	// 90×90
	thumbnail?: string | Function
	thumbnail2x?: string | Function
	thumbnail3x?: string | Function

	// 286×15
	footer?: string | Function
	footer2x?: string | Function
	footer3x?: string | Function

	// eventTicket: 375×98
	// coupon: 375×144
	// other: 375×123
	strip?: string | Function
	strip2x?: string | Function
	strip3x?: string | Function

	// 150×40
	personalizationLogo?: string | Function
	personalizationLogo2x?: string | Function
	personalizationLogo3x?: string | Function

	validate() {
		const requireImages = ['logo', 'icon', 'logo2x', 'icon2x']
		for (const key of requireImages) {
			if (!this[key]) {
				throw Error(`Missing image ${key}.png`)
			}
		}
	}
}