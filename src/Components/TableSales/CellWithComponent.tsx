import { rem, Text } from '@mantine/core';
import { Column, Row, RowData, Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { DiscountMenuRow } from './DiscountMenuRow';
import { roundDecimal } from '../../utils/discount';

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

interface CellWithComponentProps<TData> {
	getValue: () => any;
	table: Table<TData>;
	row: Row<TData>;
	column: Column<TData>;
}

export function CellWithComponent<TData>({
	getValue,
	table,
	row,
	column,
}: CellWithComponentProps<TData>) {
	const initialDiscountFraction = getValue();
	const percentageValue = roundDecimal(initialDiscountFraction * 100, 2);

	const qtyValue: number = row.getValue('qty');
	const priceValue: number = row.getValue('price');
	const subTotal: number = qtyValue * priceValue;
	console.log('subTotal: ', subTotal);

	const [value, setValue] = useState(initialDiscountFraction);

	useEffect(() => {
		setValue(initialDiscountFraction);
	}, [initialDiscountFraction]);

	const onBlur = () => {
		table.options.meta?.updateData(row.index, column.id, value);
	};

	return (
		<DiscountMenuRow
			onSetDiscount={setValue}
			discountFraction={initialDiscountFraction}
			subTotal={subTotal}
			onBlur={onBlur}>
			{`${percentageValue}%`}
		</DiscountMenuRow>
	);
}
