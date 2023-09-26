export function getDiscountFraction(
	discountedPrice: number,
	originalPrice: number
): number {
	const fraction = (originalPrice - discountedPrice) / originalPrice;
	return fraction;
}

export function roundDecimal(number: number, decimalPlaces: number = 1): number {
	const factor = Math.pow(10, decimalPlaces);
	return Math.round(number * factor) / factor;
}
