import { ActionIcon, Button, Flex, Menu, NumberInput } from '@mantine/core';
import { IconCurrencyRubel, IconPercentage } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

interface DiscountButtonProps {
	onSetDiscount: (arg: number) => void;
	discountFraction: number;
	subTotal: number;
	children: ReactNode;
}

export function DiscountButton({
	onSetDiscount,
	discountFraction,
	subTotal,
	children,
}: DiscountButtonProps) {
	const [isCurrencyBtn, setIsCurrencyBtn] = useState(true);
	const [value, setValue] = useState<number | ''>(0);

	const Icon = isCurrencyBtn ? IconCurrencyRubel : IconPercentage;

	const handleClickCurrencyBtn = () => {
		setIsCurrencyBtn(true);
		const discountAmount = subTotal * discountFraction;

		setValue(discountAmount);
	};

	const handleClickPercentageBtn = () => {
		setIsCurrencyBtn(false);
		setValue(discountFraction * 100);
	};

	const onChange = (value: number): void => {
		let percentDiscount: number;
		if (isCurrencyBtn && value !== 0) {
			percentDiscount = value / subTotal;
		} else if (!isCurrencyBtn && value !== 0) {
			percentDiscount = value / 100;
		} else {
			percentDiscount = 0;
		}
		onSetDiscount(percentDiscount);
		setValue(value);
	};

	return (
		<Menu shadow='md' position='top' closeOnItemClick={false}>
			<Menu.Target>
				<Button variant='outline' compact>
					{children}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Размер скидки</Menu.Label>
				<Flex px={'0.75rem'} py={'0.625rem'} gap='xs'>
					<ActionIcon
						onClick={handleClickCurrencyBtn}
						w='50%'
						variant={isCurrencyBtn ? 'filled' : 'light'}
						color='blue'>
						<IconCurrencyRubel size='1.125rem' />
					</ActionIcon>
					<ActionIcon
						onClick={handleClickPercentageBtn}
						w='50%'
						variant={isCurrencyBtn ? 'light' : 'filled'}
						color='blue'>
						<IconPercentage size='1.125rem' />
					</ActionIcon>
				</Flex>

				<NumberInput
					px={'0.75rem'}
					py={'0.625rem'}
					icon={<Icon color='blue' size={14} />}
					// Minimal possible value
					min={0}
					// Amount of digits after the decimal point
					precision={isCurrencyBtn ? 0 : 0}
					// Number by which value will be incremented/decremented with controls and up/down arrows
					step={isCurrencyBtn ? 1 : 1}
					value={value}
					onChange={onChange}
					size='xs'
				/>
			</Menu.Dropdown>
		</Menu>
	);
}
