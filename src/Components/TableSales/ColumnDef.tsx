import { ColumnDef } from '@tanstack/react-table';
import { SortButton } from './SortButton';
import { TableCell } from './TableCell';

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
		cell: TableCell,
		enableSorting: false
	},
	{
		accessorKey: 'price',
		header: 'Цена',
		cell: TableCell,
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
		cell: TableCell,
		enableSorting: false
	},
	{
		accessorKey: 'stocks',
		header: 'Склад',
		enableSorting: false
	},
];
