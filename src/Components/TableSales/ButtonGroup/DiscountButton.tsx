import { useState, ReactNode, FocusEventHandler } from 'react';
import { ActionIcon, Button, Flex, Menu, NumberInput } from '@mantine/core';
import { IconCurrencyRubel, IconPercentage } from '@tabler/icons-react';

interface DiscountButtonProps {
	onSetDiscount: (arg: number) => void;
	percentDiscount: number;
	subTotal: number;
	children: ReactNode;
}

export function DiscountButton({
	onSetDiscount,
	percentDiscount,
	subTotal,
	children,
}: DiscountButtonProps) {
	const [isCurrencyBtn, setIsCurrencyBtn] = useState(true);
	const [value, setValue] = useState<number | ''>(0);
	console.log('value: ', value);

	const Icon = isCurrencyBtn ? IconCurrencyRubel : IconPercentage;

	const handleClickRubBtn = () => {
		setIsCurrencyBtn(true);
		const discountCurrency = subTotal * percentDiscount;

		setValue(discountCurrency);
	};

	const handleClickPercentageBtn = () => {
		setIsCurrencyBtn(false);
		setValue(percentDiscount);
	};

	const onBlur: FocusEventHandler<HTMLInputElement> = e => {
		let percentDiscount = 0;
		const numericValue = Number(e.target.value);

		if (isCurrencyBtn === false && numericValue !== 0) {
			percentDiscount = numericValue / 100;
		} else if (isCurrencyBtn === true && numericValue !== 0) {
			percentDiscount = numericValue / subTotal;
		}

		onSetDiscount(percentDiscount);
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
						onClick={handleClickRubBtn}
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
					min={0}
					value={value}
					onChange={setValue}
					onBlur={onBlur}
					size='xs'
				/>
			</Menu.Dropdown>
		</Menu>
	);
}
