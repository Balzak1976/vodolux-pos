import { rem } from '@mantine/core';
import { useEffect, useState  } from 'react';
import { Table, Row, Column, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

interface TableCellProps<TData> {
  getValue: () => any,
  table: Table<TData>,
  row: Row<TData>,
  column: Column<TData>,
} 

export function TableCell<TData>({ getValue, table, row, column }: TableCellProps<TData>) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue)

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={{  width: rem(34) } }
    />
  )
}
