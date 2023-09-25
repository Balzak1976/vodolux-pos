import { Flex, Text } from '@mantine/core';
import { formatCurrency } from '../../utils/formatCurrency';
import { DiscountButton } from './ButtonGroup/DiscountButton';

interface ReceiptSummaryProps {
	numOfRows: number;
	discount?: number;
  subTotal?: number;
  onSetDiscount: (val: number) => void;
}

export function ReceiptSummary({
	numOfRows,
	discount = 0, // скидка в формате 0.1
  subTotal = 0,
  onSetDiscount,
}: ReceiptSummaryProps) {

/*
const total = subTotal;
let percentDiscount = 0; 
/*

function convertDiscount(value, isPercent) {
  if (isPercent) {
    const originalPrice = 100;
    return value / originalPrice;
  } else {
    const percent = +value;
    return percent / 100;
  }
}

function calculateDiscount(price, discount, isPercent) {
  const finalDiscount = convertDiscount(discount, isPercent);
  return price * (1 - finalDiscount);
}

console.log(calculateDiscount(100, 20, true)); // 20 percent discount
console.log(calculateDiscount(100, 20, false)); // $20 discount 

*/

	const total = subTotal - discount;
	let percentDiscount = subTotal !== 0 ? (discount / subTotal) : 0;
	percentDiscount = Math.round(percentDiscount);

	
	return (
		<Flex p='xs' gap='xs' justify='space-between' align='end' bg='#e7f5ff'>
			<Text color='blue'>
				{'позиций: '}
				<Text span fw='bold'>
					{numOfRows}
				</Text>
			</Text>
			<DiscountButton onSetDiscount={onSetDiscount} percentDiscount={percentDiscount} subTotal={subTotal}>
				{`${formatCurrency(discount)} (${percentDiscount * 100}%)`}
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
