import { Flex, Text } from '@mantine/core';
import { formatCurrency } from '../../utils/formatCurrency';

export function ReceiptSummary() {
	return (
		<Flex p='xs' gap='xs' justify='space-between' bg='#e7f5ff'>
			<Text color='blue'>{'позиций: '}<Text span fw='bold'>{24}</Text></Text>
			<Text color='blue' fz='xl'>{'Подитог: '}<Text span fw='bold'>{formatCurrency(1200)}</Text></Text>
		</Flex>
	);
}
