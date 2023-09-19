import { Flex, Text } from '@mantine/core';
import { formatCurrency } from '../../utils/formatCurrency';

interface ReceiptSummaryProps  {
  numOfRows: number;
  discount?: number;
  subTotal?: number;
};

export function ReceiptSummary({ numOfRows , discount = 0, subTotal = 0}: ReceiptSummaryProps) {

  const total = subTotal - discount;
  let percentDiscount = subTotal !== 0 ? discount / subTotal * 100 : 0;
  percentDiscount = Math.round(percentDiscount);

	return (
		<Flex p='xs' gap='xs' justify='space-between' align='end' bg='#e7f5ff'>
      <Text color='blue'>{'позиций: '}<Text span fw='bold'>{numOfRows}</Text></Text>
      <Text color='blue' fz='md' align='right'>{'скидка: '}
        <Text span fw='bold'>{`${formatCurrency(discount)} (${percentDiscount}%)`}</Text>
      </Text>
      <Flex direction='column'>
			  <Text color='blue' fz='md' align='right'>{'подитог: '}<Text span fw='bold'>{formatCurrency(subTotal)}</Text></Text>
			  <Text color='blue' fz='xl' align='right'>{'итог: '}<Text span fw='bold'>{formatCurrency(total)}</Text></Text>
      </Flex>
		</Flex>
  )
}
