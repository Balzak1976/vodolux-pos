import React, { useState } from 'react';
import { Flex, SimpleGrid } from '@mantine/core';
import goodData from '../data/goodsData.json';
import { goodColumns } from './TableSales/ColumnDef';
import { TableSales } from './TableSales/TableSales';
import { ButtonGroup } from './TableSales/ButtonGroup';
import { ProductSelectionSection } from './ProductSelection/ProductSelectionSection';

export default function SaleCreationSection() {
	const [data, setData] = useState(goodData);
	return (
		<SimpleGrid cols={2} spacing={0}>
			<Flex direction='column' justify='space-between'>
				<TableSales goodData={data} goodColumns={goodColumns} />
				<ButtonGroup />
			</Flex>
			<ProductSelectionSection/>
		</SimpleGrid>
	);
}
