import { Button, Flex } from '@mantine/core';

export function ButtonGroup() {
	return (
		<Flex p='md' gap='md' justify='flex-start' align='center' direction='row'>
			<Button fullWidth variant='filled'>
				Очистить
			</Button>
		</Flex>
	);
}
