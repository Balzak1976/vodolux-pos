import { ColumnDef } from '@tanstack/react-table';
import { DiscountCell } from './DiscountCell';
import { CellWithInput } from './CellWithInput';
import { SortButton } from './SortButton';
import { roundDecimal } from '../../utils/discount';

export interface ProductColumns {
	name: string;
	qty: number;
	price: number;
	stocks: number;
	discount?: number;
}

const getTotal = (row: ProductColumns) => {
	let discount = row.discount;

	if (typeof discount === 'number') {
		return row.qty * row.price * (1 - discount);
	}
};

export const productColumns: ColumnDef<ProductColumns>[] = [
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<SortButton column={column}>{'Наименование'}</SortButton>
		),
		enableHiding: false,
	},
	{
		accessorKey: 'qty',
		header: 'Кол-во',
		cell: CellWithInput,
		enableSorting: false,
	},
	{
		accessorKey: 'price',
		header: 'Цена',
		cell: CellWithInput,
		enableSorting: false,
	},
	{
		accessorKey: 'discount',
		header: 'Скидка',
		cell: DiscountCell,
		enableSorting: false,
	},
	{
		id: 'total',
		accessorFn: getTotal,
		header: 'Итог',
		cell: val => roundDecimal(val.getValue() as number),
		enableSorting: false,
	},
	{
		accessorKey: 'stocks',
		header: 'Склад',
		enableSorting: false,
	},
];
