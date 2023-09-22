import { Table } from '@tanstack/react-table';
import { Text } from '@mantine/core';

interface CellWithDiscountProps<TData> {
	table: Table<TData>;
}

export function CellWithDiscount<ProductColumns>({
	table,
}: CellWithDiscountProps<ProductColumns>) {
	let value = null;
	const type = table.options.meta?.discount;

	if (typeof type === 'number') {
		value = Math.floor(type * 100);
	}

	return <Text ta='center'>{`${value}%`}</Text>;
}
