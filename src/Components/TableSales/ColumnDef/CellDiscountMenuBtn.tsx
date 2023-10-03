import { ActionIcon, Button, Flex, Menu, NumberInput } from '@mantine/core';
import { IconCurrencyRubel, IconPercentage } from '@tabler/icons-react';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
	onSetDiscount: (arg: number) => void;
	discountFraction: number;
	subTotal: number;
	menuBtnStyle?: string;
	menuBtnCompact?: boolean;
	menuWith?: string | number;
	children: ReactNode;
}

export function CellDiscountMenuBtn({
	onSetDiscount,
	discountFraction,
	subTotal,
	menuBtnStyle = 'outline',
	menuBtnCompact = true,
	menuWith,
	children,
}: Props) {
	const [isCurrencyBtn, setIsCurrencyBtn] = useState(true);
	const discountAmount = subTotal * discountFraction;
	const initialValue = isCurrencyBtn ? discountAmount : discountFraction * 100;

	const [value, setValue] = useState<number | ''>(0);

	const Icon = isCurrencyBtn ? IconCurrencyRubel : IconPercentage;

	const handleClickCurrencyBtn = () => {
		setIsCurrencyBtn(true);

		setValue(discountAmount);
	};

	const handleClickPercentageBtn = () => {
		setIsCurrencyBtn(false);
		setValue(discountFraction * 100);
	};

	const onChange = (value: number): void => {
		let discountFraction: number;
		if (isCurrencyBtn && value !== 0) {
			discountFraction = value / subTotal;
		} else if (!isCurrencyBtn && value !== 0) {
			discountFraction = value / 100;
		} else {
			discountFraction = 0;
		}
		onSetDiscount(discountFraction);
		setValue(value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [discountFraction, initialValue]);
	return (
		<Menu shadow='md' position='top' closeOnItemClick={false}>
			<Menu.Target>
				<Button variant={menuBtnStyle} compact={menuBtnCompact}>
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
					value={value}
					onChange={onChange}
					size='xs'
					w={menuWith}
					// Maximal possible value
					max={isCurrencyBtn ? subTotal * 0.5 : 50}
					// Minimal possible value
					min={0}
					// Amount of digits after the decimal point
					precision={isCurrencyBtn ? 0 : 2}
					// Number by which value will be incremented/decremented with controls and up/down arrows
					step={isCurrencyBtn ? 1 : 0.01}
					// Initial delay in milliseconds before stepping the value
					stepHoldDelay={500}
					// Delay before stepping the value. Can be a number of milliseconds or a function that receives the current step count and returns the delay in milliseconds.
					stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
				/>
			</Menu.Dropdown>
		</Menu>
	);
}
