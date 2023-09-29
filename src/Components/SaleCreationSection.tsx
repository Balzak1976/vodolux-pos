import { Flex, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
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
		addColumn(productData, { discount: 0, canMarkup: true,
    canDiscount: true })
	);
	const [discount, setDiscount] = useState(0);
	const [isHandling, { toggle }] = useDisclosure(false);

	const onSell = () => {
		toggle();
	};
	const resetTableSales = () => {
		setProduct([]);
	};

	useEffect(() => {
		setProduct(data => addColumn(data, { discount }));
	}, [discount]);

	return (
		<SimpleGrid cols={1} spacing={0}>
			<Flex direction='column' justify='space-between'>
				<SalesTable
					productData={product}
					productColumns={productColumns}
					isHandling={isHandling}
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
