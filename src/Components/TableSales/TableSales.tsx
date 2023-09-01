import goodsData from '../../data/goodsData.json';

import {
	ScrollArea,
	Table,
	createStyles,
	rem,
	Flex,
	Button,
} from '@mantine/core';
import { useMemo, useState } from 'react';

import {
	ColumnDef,
	SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { SortIcon } from './SortIcon';
import { CustomerSelectionForm } from './../CustomerSelectionForm';

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
	footer: {
		position: 'sticky',
		bottom: 0,
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
	stocks: number;
};

const columnHelper = createColumnHelper<TableSalesProps>();

const GOOD_COLUMNS = [
	columnHelper.group({
		id: '1',
		footer: (props) =>
			`Всего позиций: ${props.table.getRowModel().rows.length}`,

		columns: [
			columnHelper.accessor('name', {
				header: 'Наименование',
				enableSorting: true,
				cell: (info) => info.getValue(),
			}),
		],
	}),
	columnHelper.group({
		id: '2',
		footer: (props) => {
			const arrTotal = props.table
				.getRowModel()
				.rows.map((row) => row.original.qty * row.original.price);
			// итоговая сумма товаров в рублях
			const totalAmount = arrTotal
				? arrTotal.reduce((sum, item) => sum + item)
				: null;
			return `Итог: ${totalAmount} руб.`;
		},
		columns: [
			columnHelper.accessor('qty', {
				header: 'К-во',
				enableSorting: false,
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor('price', {
				header: 'Цена',
				enableSorting: false,
				cell: (info) => info.getValue(),
			}),
			columnHelper.accessor((row) => row.qty * row.price, {
				header: 'Сумма',
				enableSorting: false,
			}),
			columnHelper.accessor('stocks', {
				header: 'Остаток',
				enableSorting: false,
				cell: (info) => info.getValue(),
			}),
		],
	}),
];

export function TableSales() {
	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);
	const data = useMemo<TableSalesProps[]>(() => goodsData, []);
	const columns = useMemo<ColumnDef<TableSalesProps>[]>(() => GOOD_COLUMNS, []);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: { sorting: sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// debugTable: true,
	});

	return (
		<>
			<Flex
				p='md'
				pb={rem(9)}
				gap='md'
				justify='flex-start'
				align='flex-start'
				direction='row'>
				<CustomerSelectionForm />
				<Button>Button 1</Button>
			</Flex>
			<ScrollArea.Autosize
				mah='80vh'
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
				<Table
					miw={700}
					withColumnBorders={true}
					striped={true}
					withBorder={true}>
					<thead
						className={cx(classes.header, { [classes.scrolled]: scrolled })}>
						{table.getHeaderGroups().map((headerGroup) => {
							// удаляем пустую группу
							return headerGroup.id !== '0' ? (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : (
												<div
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
													}}
													{...{
														className: header.column.getCanSort()
															? 'cursor-pointer select-none'
															: '',
														onClick: header.column.getToggleSortingHandler(),
													}}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													<SortIcon
														sortDirection={
															header.column.getIsSorted() as string
														}
														size='0.9rem'
														stroke={1.5}
													/>
												</div>
											)}
										</th>
									))}
								</tr>
							) : null;
						})}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
					<tfoot
						className={cx(classes.footer, { [classes.scrolled]: scrolled })}>
						{table.getFooterGroups().map((footerGroup) => {
							// удаляем пустую группу
							return footerGroup.id !== '1' ? (
								<tr key={footerGroup.id}>
									{footerGroup.headers.map((header) => (
										<th key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.footer,
														header.getContext()
												  )}
										</th>
									))}
								</tr>
							) : null;
						})}
					</tfoot>
				</Table>
			</ScrollArea.Autosize>
		</>
	);
}
