import {
	Checkbox,
	Flex,
	ScrollArea,
	Table,
	createStyles,
	rem,
} from '@mantine/core';
import { useMemo, useState } from 'react';

import {
	ColumnDef,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	RowData,
} from '@tanstack/react-table';


import { CustomerSelectionForm } from './../CustomerSelectionForm';
import { ColumnVisibilityButton } from './ColumnVisibilityButton';

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

const useStyles = createStyles(theme => ({
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

interface TableSalesProps<TData, TValue> {
	goodData: TData[];
	goodColumns: ColumnDef<TData, TValue>[];
}

export function TableSales<TData, TValue>({
	goodData,
	goodColumns,
}: TableSalesProps<TData, TValue>) {
	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);

	const columns = useMemo(() => goodColumns, []);
	const initialData = useMemo(() => goodData, []);
	const [data, setData] = useState(() => [...initialData]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const table = useReactTable({
		data,
		columns,
		state: { sorting, columnVisibility },
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		// добавляем кастомную ф-ю updateData в table.option.meta
		meta: {
			updateData: (rowIndex, columnId, value) =>
				setData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return { ...old[rowIndex], [columnId]: value };
						}

						return row;
					})
				),
		},
		// debugTable: true,
	});

	return (
		<>
			<Flex
				p='md'
				pb={rem(9)}
				gap='md'
				justify='flex-start'
				align='center'
				direction='row'>
				<ColumnVisibilityButton>
					{table
						.getAllLeafColumns()
						.filter(column => column.getCanHide())
						.map(column => {
							return (
								<Checkbox
									px={'0.75rem'}
									py={'0.625rem'}
									key={column.id}
									checked={column.getIsVisible()}
									onChange={column.getToggleVisibilityHandler()}
									label={column.columnDef.header as string}
								/>
							);
						})}
				</ColumnVisibilityButton>
				<CustomerSelectionForm />
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
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			</ScrollArea.Autosize>
		</>
	);
}
