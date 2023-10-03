import { Flex, Text } from '@mantine/core';
import { getDiscountFraction, roundDecimal } from '../../utils/discount';
import { formatCurrency } from '../../utils/formatCurrency';
import { DiscountMenuBtn } from './DiscountMenuBtn';

interface Props {
	numOfRows: number;
	subTotal?: number;
	total?: number;
	onSetDiscount: (val: number) => void;
}

export function ReceiptSummary({
	numOfRows,
	subTotal = 0,
	total = 0,
	onSetDiscount,
}: Props) {
	const summaryDiscountFraction = getDiscountFraction(total, subTotal);
	const percentageDiscount = roundDecimal(summaryDiscountFraction * 100, 2);

	return (
		<Flex p='xs' gap='xl' justify='space-between' align='end' bg='#e7f5ff'>
			<Text color='blue' style={{ flex: 1 }}>
				{'позиций: '}
				<Text span fw='bold'>
					{numOfRows}
				</Text>
			</Text>

			<Flex direction='column' align='center'>
				<Text color='blue' fz='md'>
					{'подитог'}
				</Text>
				<Text color='blue' fz='md' fw='bold'>
					{formatCurrency(subTotal)}
				</Text>
			</Flex>
			<Flex direction='column' align='center'>
				<Text color='blue' fz='md'>
					{'скидка'}
				</Text>
				<DiscountMenuBtn
					onSetDiscount={onSetDiscount}
					subTotal={subTotal}
					total={total}>
					{`${formatCurrency(subTotal - total)} (${percentageDiscount}%)`}
				</DiscountMenuBtn>
			</Flex>

			<Flex direction='column' align='center'>
				<Text color='blue' fz='md'>
					{'итог'}
				</Text>
				<Text color='blue' fz='md' fw='bold'>
					{formatCurrency(total)}
				</Text>
			</Flex>
		</Flex>
	);
}
