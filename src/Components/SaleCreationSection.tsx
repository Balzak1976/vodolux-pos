import { Flex, SimpleGrid } from '@mantine/core';
import { useState } from 'react';
import productData from '../data/productData.json';
import { ProductSelectionSection } from './ProductSelection/ProductSelectionSection';
import { ButtonGroup } from './TableSales/ButtonGroup/ButtonGroup';
import { productColumns } from './TableSales/ColumnDef';
import { SalesTable } from './TableSales/SalesTable';
import { CustomerSelectionForm } from './CustomerSelectionForm';
import { useDisclosure } from '@mantine/hooks';

export default function SaleCreationSection() {
	const [data, setData] = useState(productData);
	// console.log(data)
	const [isHandling, { toggle }] = useDisclosure(false);

	const onSell = () => {
		toggle();
	};
	const resetTableSales = () => {
		setData([]);
	};

	return (
		<SimpleGrid cols={2} spacing={0}>
			<Flex direction='column' justify='space-between'>
				<SalesTable
					productData={data}
					productColumns={productColumns}
					isHandling={isHandling}>
					<CustomerSelectionForm />
				</SalesTable>
				<ButtonGroup onResetTableSales={resetTableSales} onSell={onSell} />
			</Flex>
			<ProductSelectionSection />
		</SimpleGrid>
	);
}
