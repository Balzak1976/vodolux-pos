import { Group } from '@mantine/core';
import { Column, Row, Table } from '@tanstack/react-table';
import { roundDecimal } from '../../utils/discount';
import { ProductColumns } from './ColumnDef';
import { DiscountMenuBtn } from './DiscountMenuBtn';
import { LockBtn } from './LockBtn';

interface Props<TData extends ProductColumns> {
	getValue: () => any;
	table: Table<TData>;
	row: Row<TData> & { original: TData };
	column: Column<TData>;
}

export function CellWithDiscountMenuBtn({
	getValue,
	table,
	row,
	column,
}: Props<ProductColumns>) {
	const initialDiscountFraction: number = getValue();
	const percentageDiscount: number = roundDecimal(initialDiscountFraction * 100, 2);
	const { qty, price, canDiscount } = row.original;
	const subTotal: number = qty * price;

	const resetDiscount = () => {
		const newCanDiscount = !canDiscount;
		table.options.meta?.updateData(row.index, 'canDiscount', newCanDiscount);
		if (canDiscount) {
			setDiscount(0);
		}
	};

	const setDiscount = (value: number): void => {
		if (table.options.meta) {
			table.options.meta.updateData(row.index, column.id, value);
		}
	};

	return (
		<Group spacing='xs'>
			<LockBtn unLock={canDiscount} onClick={resetDiscount} />
			<DiscountMenuBtn
				onSetDiscount={setDiscount}
				discountFraction={initialDiscountFraction}
				subTotal={subTotal}
				menuWith={100}>
				{`${percentageDiscount}%`}
			</DiscountMenuBtn>
		</Group>
	);
}
