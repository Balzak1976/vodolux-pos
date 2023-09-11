import { ColumnDef } from '@tanstack/react-table';
import { formatCurrency } from '../../utils/formatCurrency';
import { TableCell } from './TableCell';

type GoodColumns = {
	name: string;
	qty: number;
	price: number;
	stocks: number;
};

export const goodColumns: ColumnDef<GoodColumns>[] = [
	{
		accessorKey: 'name',
		header: 'Название',
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
		accessorFn: row => formatCurrency(row.qty * row.price),
		header: 'Итог',
		enableSorting: false
	},
	{
		accessorKey: 'stocks',
		header: 'Склад',
		enableSorting: false
	},
];
