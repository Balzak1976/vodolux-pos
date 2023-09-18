import { Flex, Text } from '@mantine/core';
import { formatCurrency } from '../../utils/formatCurrency';

interface ReceiptSummaryProps<TData>  {
	data: TData[];
};

export function ReceiptSummary<TData>({ data }: ReceiptSummaryProps<TData>) {
  // console.log('data: ', data);
  // const subTotal = data.map(({total}) =>)

	return (
		<Flex p='xs' gap='xs' justify='space-between' align='end' bg='#e7f5ff'>
      <Text color='blue'>{'позиций: '}<Text span fw='bold'>{data.length}</Text></Text>
      <Text color='blue' fz='md' align='right'>{'скидка: '}
        <Text span fw='bold'>{`${formatCurrency(1200)} (${10}%)`}</Text>
      </Text>
      <Flex direction='column'>
			  <Text color='blue' fz='md' align='right'>{'подитог: '}<Text span fw='bold'>{formatCurrency(1200)}</Text></Text>
			  <Text color='blue' fz='xl' align='right'>{'итог: '}<Text span fw='bold'>{formatCurrency(1200)}</Text></Text>
      </Flex>
		</Flex>
  )
}
