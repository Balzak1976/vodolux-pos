import { useState } from 'react';
import { ActionIcon, Button, Flex, Menu, NumberInput } from '@mantine/core';
import { IconCurrencyRubel, IconPercentage } from '@tabler/icons-react';

export function DiscountButton() {
	const [active, setActive] = useState(true);

	const Icon = active ? IconCurrencyRubel : IconPercentage;

	return (
		<Menu shadow='md' position='top-end' closeOnItemClick={false}>
			<Menu.Target>
				<Button fullWidth>Скидка</Button>
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
					defaultValue={0}
					size='xs'
				/>
			</Menu.Dropdown>
		</Menu>
	);
}
