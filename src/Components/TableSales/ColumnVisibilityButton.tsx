import { ActionIcon, Menu, useMantineTheme } from '@mantine/core';
import {  IconSettings } from '@tabler/icons-react';
import React  from 'react';

interface ColumnVisibilityButtonProps  {
  children:React.ReactNode;
}

export function ColumnVisibilityButton({children}: ColumnVisibilityButtonProps ) {
	const theme = useMantineTheme();
	return (
		<Menu
			transitionProps={{ transition: 'pop-top-right' }}
			position='top-end'
			width={220}
			withinPortal>
			<Menu.Target>
				<ActionIcon color={theme.colors.blue[6]} variant='light' size={30}>
					<IconSettings size='1.1rem' />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				{children}
			</Menu.Dropdown>
		</Menu>
	);
}
