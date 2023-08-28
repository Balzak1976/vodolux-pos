import goodsData from '../../data/goodsData.json'

import { useMemo, useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';


const useStyles = createStyles((theme) => ({
	header: {
		position: 'sticky',
		top: 0,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		transition: 'box-shadow 150ms ease',

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `${rem(1)} solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[3]
					: theme.colors.gray[2]
			}`,
		},
	},

	scrolled: {
		boxShadow: theme.shadows.sm,
	},
}));

type TableSalesProps = {
	name: string;
	qty: number;
	price: number;
	total: number;
	stocks: number;
};

const columnHelper = createColumnHelper<TableSalesProps>();

const GOOD_COLUMNS = [
	columnHelper.accessor('name', {
		header: 'Наименование',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('qty', {
		header: 'К-во',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('price', {
		header: 'Цена',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('total', {
		header: 'Сумма',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('stocks', {
		header: 'Остаток',
		cell: (info) => info.getValue(),
	}),
];

export function TableSales() {
	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);
	const data = useMemo<TableSalesProps[]>(() => goodsData, []);
	const columns = useMemo(() => GOOD_COLUMNS, []);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<ScrollArea.Autosize
			mah='70vh'
			onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
			<Table
				miw={700}
				withColumnBorders={true}
				striped={true}
				withBorder={true}>
				<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
					{
						table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{
									headerGroup.headers.map((header) => (
										<th key={header.id}>
											{
												header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
											}
										</th>
									))
								}
							</tr>
						))
					}
				</thead>
				<tbody>
					{
						table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{
									row.getVisibleCells().map((cell) => (
										<td key={cell.id}>
											{
												flexRender(cell.column.columnDef.cell, cell.getContext())
											}
										</td>
									))
								}
							</tr>
						))
					}
				</tbody>
			</Table>
		</ScrollArea.Autosize>
	);
}
