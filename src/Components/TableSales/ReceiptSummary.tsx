import { Flex, Text } from '@mantine/core';
import { getDiscountFraction, roundDecimal } from '../../utils/discount';
import { formatCurrency } from '../../utils/formatCurrency';
import { GlobalDiscountMenuBtn } from './GlobalDiscountMenuBtn';
import { IGetArrSubTotalAndTotals } from './SalesTable';

interface Props {
	numOfRows: number;
	array: IGetArrSubTotalAndTotals[];
	onSetDiscount: (val: number) => void;
}

export function ReceiptSummary({ numOfRows, array, onSetDiscount }: Props) {
	const subTotal = array.reduce((sum, curr) => sum + curr.subTotal, 0);
	const total = array.reduce((sum, curr) => sum + curr.total, 0);
	const summaryDiscountFraction = getDiscountFraction(total, subTotal);
	// вычисляем общий процент скидки по всему чеку
	const percentageDiscount = roundDecimal(summaryDiscountFraction * 100, 2);
	// вычисляем subTotal и total для остатков товара с разрешенной скидкой
	const filteredSubTotal = array.reduce((sum, curr) => (sum + (curr.canDiscount ? curr.subTotal : 0)), 0);
	const filteredTotal = array.reduce((sum, curr) => (sum + (curr.canDiscount ? curr.total : 0)), 0);
	
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
					subTotal={filteredSubTotal}
					total={filteredTotal}>
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
