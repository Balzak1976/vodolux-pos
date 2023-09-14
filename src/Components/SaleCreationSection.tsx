import { Flex, SimpleGrid } from '@mantine/core';
import { useState } from 'react';
import productData from '../data/productData.json';
import { ProductSelectionSection } from './ProductSelection/ProductSelectionSection';
import { ButtonGroup } from './TableSales/ButtonGroup';
import { productColumns } from './TableSales/ColumnDef';
import { TableSales } from './TableSales/TableSales';

export default function SaleCreationSection() {
	const [data, setData] = useState(productData);
	return (
		<SimpleGrid cols={2} spacing={0}>
			<Flex direction='column' justify='space-between'>
				<TableSales productData={data} productColumns={productColumns} />
				<ButtonGroup />
			</Flex>
			<ProductSelectionSection/>
		</SimpleGrid>
	);
}
