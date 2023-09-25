import { Table } from '@tanstack/react-table';
import { Text } from '@mantine/core';

interface CellWithDiscountProps<TData> {
	table: Table<TData>;
	getValue: () => any;
}

export function CellWithDiscount<ProductColumns>({
	getValue,
	table,
}: CellWithDiscountProps<ProductColumns>) {
	const value = Math.floor(getValue() * 100);

	return <Text ta='center'>{`${value}%`}</Text>;
}
