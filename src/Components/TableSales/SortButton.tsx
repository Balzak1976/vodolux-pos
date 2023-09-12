import { Group, Text, UnstyledButton } from '@mantine/core';
import { SortIcon } from './SortIcon';
import { Column } from '@tanstack/react-table';
import { ReactNode } from 'react';

interface SortButtonProps<TData> {
	column: Column<TData>;
	children: ReactNode;
}

export function SortButton<TData>({
	column,
	children,
}: SortButtonProps<TData>) {
	const onSort = () => column.toggleSorting(column.getIsSorted() === 'asc');

	return (
		<UnstyledButton onClick={onSort} style={{ width: '100%' }}>
			<Group position='apart'>
				<Text fw={'bold'} fz='sm'>
					{children}
				</Text>
				<SortIcon
					sortDirection={column.getIsSorted() as string}
					size='0.9rem'
					stroke={1.5}
				/>
			</Group>
		</UnstyledButton>
	);
}
