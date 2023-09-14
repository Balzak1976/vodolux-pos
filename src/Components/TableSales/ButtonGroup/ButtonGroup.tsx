import { Button, Flex } from '@mantine/core';
import { PrintReceiptButton } from './PrintReceiptButton';
import { DiscountButton } from './DiscountButton';

interface ButtonGroupProps {
  onResetTableSales: () => void;
}

export function ButtonGroup({ onResetTableSales }: ButtonGroupProps) {
	return (
		<Flex p='md' gap='xs' justify='flex-start' align='center' direction='row'>
      <Button
        onClick={onResetTableSales}
        fullWidth
        variant='filled'>
				Очистить
      </Button>
      <PrintReceiptButton />
      <DiscountButton/>
		</Flex>
	);
}
