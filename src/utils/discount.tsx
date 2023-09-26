export function getDiscountFraction(
	discountedPrice: number,
	originalPrice: number,
	round: number
): number {
	const fraction = (originalPrice - discountedPrice) / originalPrice;
	return parseFloat(fraction.toFixed(round));
}
