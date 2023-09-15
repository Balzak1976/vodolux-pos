import { Flex } from '@mantine/core';
import { DiscountButton } from './DiscountButton';
import { PrintReceiptButton } from './PrintReceiptButton';
import { ReceiptSaveCancelButton } from './ReceiptSaveCancelButton';

interface ButtonGroupProps {
	onResetTableSales: () => void;
}

export function ButtonGroup({ onResetTableSales }: ButtonGroupProps) {
	return (
		<Flex p='md' gap='xs' justify='flex-start' align='center' direction='row'>
			<ReceiptSaveCancelButton onResetTableSales={onResetTableSales}/>
			<PrintReceiptButton />
			<DiscountButton />
		</Flex>
	);
}
