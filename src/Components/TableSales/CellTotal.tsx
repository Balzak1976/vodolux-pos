import { Table, Row } from '@tanstack/react-table';
import { Text } from '@mantine/core';

interface CellTotalProps<TData> {
	table: Table<TData>;
	row: Row<TData>;
}

export function CellTotal<ProductColumns>({
	table,
	row,
}: CellTotalProps<ProductColumns>) {
	let value = 0;
	const discount = table.options.meta?.discount;

	if (typeof discount === 'number') {
	}

	return <Text ta='center'>{value}</Text>;
}
