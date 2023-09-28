import { Column, Row, RowData, Table } from '@tanstack/react-table';
import { roundDecimal } from '../../utils/discount';
import { DiscountMenuBtn } from './DiscountMenuBtn';

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

interface CellWithDiscountMenuBtnProps<TData> {
	getValue: () => any;
	table: Table<TData>;
	row: Row<TData>;
	column: Column<TData>;
}

export function CellWithDiscountMenuBtn<TData>({
	getValue,
	table,
	row,
	column,
}: CellWithDiscountMenuBtnProps<TData>) {
	const initialDiscountFraction = getValue();
	const percentageValue = roundDecimal(initialDiscountFraction * 100, 2);

	const qtyValue: number = row.getValue('qty');
	const priceValue: number = row.getValue('price');
	const subTotal: number = qtyValue * priceValue;

	const setDiscount = (value: number) => {
		table.options.meta?.updateData(row.index, column.id, value);
	};

	return (
		<DiscountMenuBtn
			onSetDiscount={setDiscount}
			discountFraction={initialDiscountFraction}
			subTotal={subTotal}
			menuWith={100}
		>
			{`${percentageValue}%`}
		</DiscountMenuBtn>
	);
}
