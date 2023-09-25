import {
	Checkbox,
	Flex,
	LoadingOverlay,
	ScrollArea,
	Table,
	createStyles,
	rem,
} from '@mantine/core';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import {
	ColumnDef,
	RowData,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { ColumnVisibilityButton } from './ColumnVisibilityButton';
import { ReceiptSummary } from './ReceiptSummary';

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		discount: number;
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
	productData: TData[];
	productColumns: ColumnDef<TData, TValue>[];
	isHandling: boolean;
	discount: number;
	onSetDiscount: (arg: number) => void;
	children: ReactNode;
}

export function SalesTable<TData, TValue>({
	productData,
	productColumns,
	isHandling,
	discount,
	onSetDiscount,
	children,
}: TableSalesProps<TData, TValue>) {
	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);

	const columns = useMemo(() => productColumns, []);
	const initialData = useMemo(() => productData, []);

	const [data, setData] = useState(() => [...initialData]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	useEffect(() => {
		setData(() => [...productData]);
	}, [productData]);

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
			discount,
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

	const getTotalColumn = (columnId: string): number => {
		return table
			.getRowModel()
			.rows.reduce((total, cellValue) => total + (cellValue.getValue(columnId) as number), 0);
	};

	const sumOfTotals = getTotalColumn('total');
	const numOfRows = table.getRowModel().rows.length;

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
				{children}
			</Flex>
			<ScrollArea
				style={{ flex: '1  60vh' }}
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
				<LoadingOverlay visible={isHandling} overlayBlur={2} />

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
			</ScrollArea>

			<ReceiptSummary
				numOfRows={numOfRows}
				discount={discount}
				subTotal={sumOfTotals}
				onSetDiscount={onSetDiscount}
			/>
		</>
	);
}
