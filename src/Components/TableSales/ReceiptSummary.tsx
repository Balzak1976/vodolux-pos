import { Flex, Text } from '@mantine/core';
import { getDiscountFraction, roundDecimal } from '../../utils/discount';
import { formatCurrency } from '../../utils/formatCurrency';
import { DiscountMenuBtn } from './DiscountMenuBtn';

interface ReceiptSummaryProps {
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
}: ReceiptSummaryProps) {
	let summaryDiscountFraction = getDiscountFraction(total, subTotal);
	const percentageDiscount = roundDecimal(summaryDiscountFraction * 100, 2);

	return (
		<Flex p='xs' gap='xs' justify='space-between' align='end' bg='#e7f5ff'>
			<Text color='blue'>
				{'позиций: '}
				<Text span fw='bold'>
					{numOfRows}
				</Text>
			</Text>
			<DiscountMenuBtn
				onSetDiscount={onSetDiscount}
				discountFraction={summaryDiscountFraction}
				subTotal={subTotal}>
				{`${formatCurrency(subTotal - total)} (${percentageDiscount}%)`}
			</DiscountMenuBtn>

			<Flex direction='column'>
				<Text color='blue' fz='md' align='right'>
					{'подитог: '}
					<Text span fw='bold'>
						{formatCurrency(subTotal)}
					</Text>
				</Text>
				<Text color='blue' fz='xl' align='right'>
					{'итог: '}
					<Text span fw='bold'>
						{formatCurrency(total)}
					</Text>
				</Text>
			</Flex>
		</Flex>
	);
}
