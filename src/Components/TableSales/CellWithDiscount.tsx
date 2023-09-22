import { Table } from '@tanstack/react-table';

interface CellWithDiscountProps<TData> {
	table: Table<TData>;
}

export function CellWithDiscount<ProductColumns>({
	table,
}: CellWithDiscountProps<ProductColumns>) {
	const value = table.options.meta?.discount ?? 0;

	return <div>{value}</div>;
}
