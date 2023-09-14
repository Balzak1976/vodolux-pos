import { Button, Flex } from '@mantine/core';

interface ButtonGroupProps {
  onResetTableSales: () => void;
}

export function ButtonGroup({ onResetTableSales }: ButtonGroupProps) {
	return (
		<Flex p='md' gap='md' justify='flex-start' align='center' direction='row'>
      <Button
        onClick={onResetTableSales}
        fullWidth
        variant='filled'>
				Очистить
			</Button>
		</Flex>
	);
}
