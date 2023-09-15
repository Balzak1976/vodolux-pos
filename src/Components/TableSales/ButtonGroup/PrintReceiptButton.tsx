import { Button, Menu } from '@mantine/core';
import {
	IconPrinter,
	IconReceipt
} from '@tabler/icons-react';

export function PrintReceiptButton() {
	return (
		<Menu shadow='md' position='top'>
			<Menu.Target>
				<Button variant='outline' compact fullWidth>Печать</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item icon={<IconPrinter size={14} />}>Товарный чек</Menu.Item>
				<Menu.Item icon={<IconReceipt size={14} />}>Ценник</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
