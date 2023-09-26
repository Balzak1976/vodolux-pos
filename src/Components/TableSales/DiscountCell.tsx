import { Text } from '@mantine/core';
import { Table } from '@tanstack/react-table';
import { roundDecimal } from '../../utils/discount';

interface DiscountCellProps<TData> {
	table: Table<TData>;
	getValue: () => any;
}

export function DiscountCell<ProductColumns>({
	getValue,
	table,
}: DiscountCellProps<ProductColumns>) {
	const value = getValue() * 100;
	const percentageValue = roundDecimal(value, 2);

	return <Text ta='center'>{`${percentageValue}%`}</Text>;
}
