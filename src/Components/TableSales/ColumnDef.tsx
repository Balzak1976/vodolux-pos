import { ColumnDef } from '@tanstack/react-table';
import { formatCurrency } from '../../utils/formatCurrency';
import { TableCell } from './TableCell';

export type Columns = {
	name: string;
	qty: number;
	price: number;
	stocks: number;
};

export const goodColumns: ColumnDef<Columns>[] = [
	{
		accessorKey: 'name',
		header: 'Название',
	},
	{
		accessorKey: 'qty',
		header: 'Кол-во',
		cell: TableCell,
	},
	{
		accessorKey: 'price',
		header: 'Цена',
		cell: TableCell,
	},
	{
		accessorFn: row => row.qty * row.price,
		header: 'Итог',
	},
	{
		accessorKey: 'stocks',
		header: 'Склад',
	},
];
