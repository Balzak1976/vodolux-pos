import { rem } from '@mantine/core';
import { Column, Row, RowData, Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

interface CellWithInputProps<TData> {
	getValue: () => any;
	table: Table<TData>;
	row: Row<TData>;
	column: Column<TData>;
}

export function CellWithInput<TData>({
	getValue,
	table,
	row,
	column,
}: CellWithInputProps<TData>) {
	const initialValue = getValue();
	const [value, setValue] = useState(initialValue);
  
	useEffect(() => {
    setValue(initialValue);
	}, [initialValue]);
  
  const onBlur = () => {
		table.options.meta?.updateData(row.index, column.id, value);
	};

	return (
		<input
			value={value}
			onChange={e => setValue(e.target.value)}
			onBlur={onBlur}
			style={{ width: rem(34) }}
		/>
	);
}
