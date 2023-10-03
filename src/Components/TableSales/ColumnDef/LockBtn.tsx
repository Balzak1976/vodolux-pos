import { ActionIcon } from '@mantine/core';
import { IconLock, IconLockOpen } from '@tabler/icons-react';

interface Props {
	unLock: boolean;
	onClick: () => void;
}

export function LockBtn({ unLock, onClick }: Props) {
	const variant = unLock ? 'length' : 'light';

	return (
		<ActionIcon onClick={onClick} variant={variant} color='blue'>
			{unLock ? <IconLockOpen size='1.125rem' /> : <IconLock size='1.125rem' />}
		</ActionIcon>
	);
}
