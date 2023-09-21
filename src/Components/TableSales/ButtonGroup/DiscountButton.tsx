import { useState } from 'react';
import { ActionIcon, Button, Flex, Menu, NumberInput } from '@mantine/core';
import { IconCurrencyRubel, IconPercentage } from '@tabler/icons-react';

interface DiscountButtonProps {
	onSetDiscount: (arg: number) => void;
}

export function DiscountButton({ onSetDiscount }: DiscountButtonProps) {
	const [active, setActive] = useState(true);
	const [value, setValue] = useState<number | ''>(0);

	const Icon = active ? IconCurrencyRubel : IconPercentage;

	return (
		<Menu shadow='md' position='top-end' closeOnItemClick={false}>
			<Menu.Target>
				<Button variant='outline' compact fullWidth>
					Скидка
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Размер скидки</Menu.Label>
				<Flex px={'0.75rem'} py={'0.625rem'} gap='xs'>
					<ActionIcon
						onClick={() => setActive(true)}
						w='50%'
						variant={active ? 'filled' : 'light'}
						color='blue'>
						<IconCurrencyRubel size='1.125rem' />
					</ActionIcon>
					<ActionIcon
						onClick={() => setActive(false)}
						w='50%'
						variant={active ? 'light' : 'filled'}
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
					onBlur={e => onSetDiscount(Number(e.target.value))}
					size='xs'
				/>
			</Menu.Dropdown>
		</Menu>
	);
}
