import { ColumnDef } from '@tanstack/react-table';
import { CellWithDiscountMenuBtn } from './CellWithDiscountMenuBtn';
import { CellWithInput } from './CellWithInput';
import { SortButton } from './SortButton';

export interface ProductColumns {
	name: string;
	qty: number;
	price: number;
	stocks: number;
	discount?: number;
	canMarkup: boolean;
	canDiscount: boolean;
}

const calculateTotal = (row: ProductColumns) => {
	let discount = row.canDiscount ? row.discount : 0;

	if (typeof discount === 'number') {
		return Math.round(row.qty * row.price * (1 - discount));
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
		cell: CellWithDiscountMenuBtn,
		enableSorting: false,
	},
	{
		id: 'total',
		accessorFn: calculateTotal,
		header: 'Итог',
		enableSorting: false,
	},
	{
		accessorKey: 'stocks',
		header: 'Склад',
		enableSorting: false,
	},
];
