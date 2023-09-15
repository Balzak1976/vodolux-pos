import { Button, Grid } from '@mantine/core';
import { DiscountButton } from './DiscountButton';
import { PrintReceiptButton } from './PrintReceiptButton';
import { ReceiptSaveCancelButton } from './ReceiptSaveCancelButton';

interface ButtonGroupProps {
	onResetTableSales: () => void;
	onSell: () => void;
}

export function ButtonGroup({ onResetTableSales, onSell }: ButtonGroupProps) {
	return (
		<Grid p='xs' gutter='xs'>
			<Grid.Col span={4}>
				<ReceiptSaveCancelButton onResetTableSales={onResetTableSales} />
			</Grid.Col>
			<Grid.Col span={4}>
				<PrintReceiptButton />
			</Grid.Col>
			<Grid.Col span={4}>
				<DiscountButton />
			</Grid.Col>
			<Grid.Col span={12}>
				<Button onClick={onSell} fullWidth>Продать</Button>
			</Grid.Col>
		</Grid>
	);
}
