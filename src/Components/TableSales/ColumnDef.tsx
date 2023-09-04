import { createColumnHelper } from '@tanstack/react-table';
import { formatCurrency } from '../../utils/formatCurrency';

export type TableSalesProps = {
	name: string;
	qty: number;
	price: number;
	stocks: number;
};

const columnHelper = createColumnHelper<TableSalesProps>();

export const GOOD_COLUMNS = [
	columnHelper.group({
		id: '1',
		footer: props => `Всего позиций: ${props.table.getRowModel().rows.length}`,
		columns: [
			columnHelper.accessor('name', {
				header: 'Наименование',
				enableSorting: true,
				enableHiding: false,
				cell: info => info.getValue(),
			}),
		],
	}),
	columnHelper.group({
		id: '2',
		footer: props => {
			const arrTotal = props.table
				.getRowModel()
				.rows.map(row => row.original.qty * row.original.price);
			// итоговая сумма товаров в рублях
			const totalAmount =
				arrTotal.length !== 0 ? arrTotal.reduce((sum, item) => sum + item) : 0;
			return `Итог: ${formatCurrency(totalAmount)}`;
		},
		columns: [
			columnHelper.accessor('qty', {
				id: 'К-во',
				header: 'К-во',
				enableSorting: false,
				enableHiding: true,
				cell: info => info.getValue(),
			}),
			columnHelper.accessor('price', {
				id: 'Цена',
				header: 'Цена',
				enableSorting: false,
				enableHiding: true,
				cell: info => formatCurrency(info.getValue()),
			}),
			columnHelper.accessor(row => formatCurrency(row.qty * row.price), {
				id: 'Сумма',
				header: 'Сумма',
				enableSorting: false,
				enableHiding: true,
			}),
			columnHelper.accessor('stocks', {
				id: 'Остаток',
				header: 'Остаток',
				enableSorting: false,
				enableHiding: true,
				cell: info => info.getValue(),
			}),
		],
	}),
];
