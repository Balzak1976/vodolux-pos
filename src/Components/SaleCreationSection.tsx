import { Flex, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import productData from '../data/productData.json';
import { CustomerSelectionForm } from './CustomerSelectionForm';
import { ProductSelectionSection } from './ProductSelection/ProductSelectionSection';
import { ButtonGroup } from './TableSales/ButtonGroup/ButtonGroup';
import { productColumns, ProductColumns } from './TableSales/ColumnDef';
import { SalesTable } from './TableSales/SalesTable';

export default function SaleCreationSection() {
	const [data, setData] = useState<ProductColumns[]>(productData);
	// console.log(data);
	const [discount, setDiscount] = useState(0);
	// console.log('discount: ', discount);

	const [isHandling, { toggle }] = useDisclosure(false);

	const onSell = () => {
		toggle();
	};
	const resetTableSales = () => {
		setData([]);
	};

	return (
		<SimpleGrid cols={1} spacing={0}>
			<Flex direction='column' justify='space-between'>
				<SalesTable
					productData={data}
					productColumns={productColumns}
					isHandling={isHandling}
					discount={discount}
					onSetDiscount={setDiscount}>
					<CustomerSelectionForm />
				</SalesTable>

				<ButtonGroup
					onResetTableSales={resetTableSales}
					onSell={onSell}
					onSetDiscount={setDiscount}
				/>
			</Flex>
			{/* <ProductSelectionSection /> */}
		</SimpleGrid>
	);
}
