import { Button, Menu } from '@mantine/core';
import { IconHistory, IconX } from '@tabler/icons-react';

interface ReceiptSaveCancelProps {
	onResetTableSales: () => void;
}

export function ReceiptSaveCancelButton({
	onResetTableSales,
}: ReceiptSaveCancelProps) {
	return (
		<Menu shadow='md' position='top-start'>
			<Menu.Target>
				<Button variant='outline' compact fullWidth>Отложить/Отменить</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item icon={<IconHistory size={14} />}>Отложить чек</Menu.Item>
				<Menu.Item
					onClick={onResetTableSales}
					color='red'
					icon={<IconX size={14} />}>
					Отменить чек
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
