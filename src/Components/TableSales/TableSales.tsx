import goodsData from '../../data/goodsData.json';

import {
	ActionIcon,
	Checkbox,
	Flex,
	Menu,
	ScrollArea,
	Table,
	createStyles,
	rem,
} from '@mantine/core';
import { useMemo, useState } from 'react';

import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { SortIcon } from './SortIcon';

import { IconSettings } from '@tabler/icons-react';
import { CustomerSelectionForm } from './../CustomerSelectionForm';
import { GOOD_COLUMNS, TableSalesProps } from './ColumnDef';

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
				align='center'
				direction='row'>
				<CustomerSelectionForm />

				<Menu
					transitionProps={{ transition: 'pop-top-right' }}
					position='top-end'
					width={220}
					withinPortal>
					<Menu.Target>
						<ActionIcon color='blue' variant='light' size={30}>
							<IconSettings size='1.1rem' />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						{table.getAllLeafColumns().filter((column) => column.getCanHide()).map((column) => {
								return (
									<Checkbox
										p={rem(1)}
										key={column.id}
										checked={column.getIsVisible()}
										onChange={column.getToggleVisibilityHandler()}
										label={column.id}
									/>
								);
							})}
					</Menu.Dropdown>
				</Menu>
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
