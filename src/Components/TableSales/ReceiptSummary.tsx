import { Flex, Text } from '@mantine/core';
import { getDiscountFraction, roundDecimal } from '../../utils/discount';
import { formatCurrency } from '../../utils/formatCurrency';
import { DiscountButton } from './ButtonGroup/DiscountButton';

interface ReceiptSummaryProps {
	numOfRows: number;
	discount?: number;
	subTotal?: number;
	total?: number;
	onSetDiscount: (val: number) => void;
}


export function ReceiptSummary({
	numOfRows,
	discount = 0, // скидка в формате 0.1
	subTotal = 0,
	total = 0,
	onSetDiscount,
}: ReceiptSummaryProps) {
	
	let discountFraction = getDiscountFraction(total, subTotal)
	const percentageDiscount = roundDecimal(discountFraction * 100, 2)

	return (
		<Flex p='xs' gap='xs' justify='space-between' align='end' bg='#e7f5ff'>
			<Text color='blue'>
				{'позиций: '}
				<Text span fw='bold'>
					{numOfRows}
				</Text>
			</Text>
			<DiscountButton
				onSetDiscount={onSetDiscount}
				discountFraction={discountFraction}
				subTotal={subTotal}>
				{`${formatCurrency(subTotal - total)} (${percentageDiscount}%)`}
				скидка
			</DiscountButton>

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
