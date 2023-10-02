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
	const { qty, price, discount = 0, canDiscount } = row.original;
	const percentageDiscount: number = roundDecimal(discount * 100, 2);
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
				discountFraction={discount}
				subTotal={subTotal}
				menuWith={100}>
				{`${percentageDiscount}%`}
			</DiscountMenuBtn>
		</Group>
	);
}
