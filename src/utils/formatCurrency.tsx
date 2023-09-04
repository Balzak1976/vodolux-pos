/**
 * Format the price as a ruble price
 * @param number of price
 * @returns string type of 1 500 R
 */
export function formatCurrency(price: number): string {
	// Format the price as a ruble price
	return new Intl.NumberFormat('ru', {
		style: 'currency',
		currency: 'RUB',
		minimumFractionDigits: 0,
	}).format(price);
}
