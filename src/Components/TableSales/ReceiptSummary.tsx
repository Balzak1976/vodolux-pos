import { Flex, Text } from '@mantine/core';
import { getDiscountFraction, roundDecimal } from '../../utils/discount';
import { formatCurrency } from '../../utils/formatCurrency';
import { GlobalDiscountMenuBtn } from './GlobalDiscountMenuBtn';

interface Props {
	numOfRows: number;
	subTotal?: number;
	total?: number;
	arr: { subtotal: number; total: number }[];
	onSetDiscount: (val: number) => void;
}

export function ReceiptSummary({
	numOfRows,
	arr,
	onSetDiscount,
}: Props) {
	const subTotal = arr.reduce((sum, cur) => sum + cur.subtotal, 0);
	const total = arr.reduce((sum, cur) => sum + cur.total, 0);
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
				<GlobalDiscountMenuBtn
					onSetDiscount={onSetDiscount}
					arr={arr}
				>
					{`${formatCurrency(subTotal - total)} (${percentageDiscount}%)`}
				</GlobalDiscountMenuBtn>
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
