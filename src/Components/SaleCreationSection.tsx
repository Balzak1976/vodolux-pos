import { Flex, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import productData from '../data/productData.json';
import { CustomerSelectionForm } from './CustomerSelectionForm';
import { ProductSelectionSection } from './ProductSelection/ProductSelectionSection';
import { ButtonGroup } from './TableSales/ButtonGroup/ButtonGroup';
import {
	productColumns,
	ProductColumns as TData,
} from './TableSales/ColumnDef';
import { SalesTable } from './TableSales/SalesTable';

const addColumn = (
	productData: TData[],
	column: { [key: string]: number | boolean }
): TData[] =>
	productData.map(
		(originalRow): TData => Object.assign({}, originalRow, column)
	);

export default function SaleCreationSection() {
	const [product, setProduct] = useState<TData[]>(
		addColumn(productData, { discount: 0, canMarkup: true, canDiscount: true })
	);

	const [isHandling, { toggle }] = useDisclosure(false);

	const onSell = () => {
		toggle();
	};
	const resetTableSales = () => {
		setProduct([]);
	};

	return (
		<SimpleGrid cols={1} spacing={0}>
			<Flex direction='column' justify='space-between'>
				<SalesTable
					productData={product}
					productColumns={productColumns}
					isHandling={isHandling}>
					<CustomerSelectionForm />
				</SalesTable>

				<ButtonGroup onResetTableSales={resetTableSales} onSell={onSell} />
			</Flex>
			{/* <ProductSelectionSection /> */}
		</SimpleGrid>
	);
}
