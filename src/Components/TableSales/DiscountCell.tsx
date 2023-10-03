import { Group } from '@mantine/core';
import { Row, Table } from '@tanstack/react-table';
import { useEffect } from 'react';
import { roundDecimal } from '../../utils/discount';
import { ProductColumns } from './ColumnDef';
import { DiscountMenuBtn } from './DiscountMenuBtn';
import { LockBtn } from './LockBtn';

interface Props<TData extends ProductColumns> {
	table: Table<TData>;
	row: Row<TData> & { original: TData };
}

export function DiscountCell({ table, row }: Props<ProductColumns>) {
	const globalDiscount: number = table.options.meta?.globalDiscount ?? 0;
	const localDiscount: number = row.original.discount ?? 0;
	const percentageDiscount: number = roundDecimal(localDiscount * 100, 2);
	const { qty, price, canDiscount } = row.original;
	const subTotal: number = qty * price;

	const resetLocalDiscount = () => {
		const newCanDiscount = !canDiscount;
		table.options.meta?.updateData(row.index, 'canDiscount', newCanDiscount);
		if (canDiscount) {
			setLocalDiscount(0);
		} else {
			setLocalDiscount(globalDiscount);
		}
	};

	const setLocalDiscount = (value: number): void => {
		table.options.meta?.updateData(row.index, 'discount', value);
	};

	const value = canDiscount ? globalDiscount : 0;

	useEffect(() => {
		table.options.meta?.updateData(row.index, 'discount', value);
	}, [value]);

	return (
		<Group spacing='xs'>
			<LockBtn unLock={canDiscount} onClick={resetLocalDiscount} />
			<DiscountMenuBtn
				onSetDiscount={setLocalDiscount}
				discountFraction={localDiscount}
				subTotal={subTotal}
				menuWith={100}>
				{`${percentageDiscount}%`}
			</DiscountMenuBtn>
		</Group>
	);
}
