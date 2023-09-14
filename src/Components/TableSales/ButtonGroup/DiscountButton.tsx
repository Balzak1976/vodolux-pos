import { Button, Menu, NumberInput, ActionIcon } from '@mantine/core';
import { IconTags, IconWallet, IconDiscount } from '@tabler/icons-react';

export function DiscountButton() {
	return (
		<Menu shadow='md' position='top-start'>
			<Menu.Target>
				<Button fullWidth>Скидка</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item icon={<IconDiscount size={14} />}>
					<Button.Group>
						<ActionIcon>
							<IconWallet size='1.125rem' />
						</ActionIcon>
						<ActionIcon>
							<IconDiscount size='1.125rem' />
						</ActionIcon>
					</Button.Group>
				</Menu.Item>
				<Menu.Item icon={<IconTags size={14} />}>
					<NumberInput />
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
