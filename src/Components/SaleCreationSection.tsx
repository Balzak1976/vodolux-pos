import { Flex, SimpleGrid } from '@mantine/core';
import { useState } from 'react';
import productData from '../data/productData.json';
import { ProductSelectionSection } from './ProductSelection/ProductSelectionSection';
import { ButtonGroup } from './TableSales/ButtonGroup/ButtonGroup';
import { productColumns } from './TableSales/ColumnDef';
import { SalesTable } from './TableSales/SalesTable';
import { CustomerSelectionForm } from './CustomerSelectionForm';

export default function SaleCreationSection() {
	const [data, setData] = useState(productData);
	// console.log(data)

	const resetTableSales = () => {
		setData([]);
	};

	return (
		<SimpleGrid cols={2} spacing={0}>
			<Flex direction='column' justify='space-between'>
				<SalesTable productData={data} productColumns={productColumns}>
					<CustomerSelectionForm />
				</SalesTable>
				<ButtonGroup onResetTableSales={resetTableSales} />
			</Flex>
			<ProductSelectionSection />
		</SimpleGrid>
	);
}
