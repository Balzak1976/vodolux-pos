import { ColumnDef } from '@tanstack/react-table';
import { CellWithInput } from './CellWithInput';
import { SortButton } from './SortButton';

export type ProductColumns = {
	name: string;
	qty: number;
	price: number;
	stocks: number;
	discount?: number;
};

export const productColumns: ColumnDef<ProductColumns>[] = [
	{
		accessorKey: 'name',
		header: ({column}) => <SortButton column={column}>{'Наименование'}</SortButton>,
		enableHiding: false
	},
	{
		accessorKey: 'qty',
		header: 'Кол-во',
		cell: CellWithInput,
		enableSorting: false
	},
	{
		accessorKey: 'price',
		header: 'Цена',
		cell: CellWithInput,
		enableSorting: false
	},
	{
		id: 'total',
		accessorFn: row => row.qty * row.price,
		header: 'Итог',
		enableSorting: false
	},
	{
		accessorKey: 'discount',
		header: 'Скидка',
		cell: val => val.getValue(),
		enableSorting: false
	},
	{
		accessorKey: 'stocks',
		header: 'Склад',
		enableSorting: false
	},
];
