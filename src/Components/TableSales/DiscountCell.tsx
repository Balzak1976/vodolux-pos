import { Text } from '@mantine/core';
import { Table } from '@tanstack/react-table';

interface DiscountCellProps<TData> {
	table: Table<TData>;
	getValue: () => any;
}

export function DiscountCell<ProductColumns>({
	getValue,
	table,
}: DiscountCellProps<ProductColumns>) {
	const value = getValue();
	const percentageValue = parseFloat(value.toFixed(4)) * 100;

	return <Text ta='center'>{`${percentageValue}%`}</Text>;
}
