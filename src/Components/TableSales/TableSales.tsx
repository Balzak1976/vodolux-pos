import goodsData from '../../data/goodsData.json';

import {
	Checkbox,
	Flex,
	ScrollArea,
	Table,
	createStyles,
	rem
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
} from '@tanstack/react-table';
import { SortIcon } from './SortIcon';

import { CustomerSelectionForm } from './../CustomerSelectionForm';
import { GOOD_COLUMNS, TableSalesProps } from './ColumnDef';
import { ColumnVisibilityButton } from './ColumnVisibilityButton';

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

export function TableSales() {
	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);
	const data = useMemo<TableSalesProps[]>(() => goodsData, []);
	const columns = useMemo<ColumnDef<TableSalesProps>[]>(() => GOOD_COLUMNS, []);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

	const table = useReactTable({
		data,
		columns,
		state: { sorting, columnVisibility },
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
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
									label={column.id}
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
						{table.getHeaderGroups().map(headerGroup => {
							// удаляем пустую группу
							return headerGroup.id !== '0' ? (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map(header => (
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
					<tfoot
						className={cx(classes.footer, { [classes.scrolled]: scrolled })}>
						{table.getFooterGroups().map(footerGroup => {
							// удаляем пустую группу
							return footerGroup.id !== '1' ? (
								<tr key={footerGroup.id}>
									{footerGroup.headers.map(header => (
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
