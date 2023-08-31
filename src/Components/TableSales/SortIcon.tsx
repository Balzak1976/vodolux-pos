import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

interface SortIconProps {
	sortDirection: string;
	size: string;
	stroke: number;
}
export function SortIcon({ sortDirection, ...props }: SortIconProps) {
	if (sortDirection === 'asc') {
		return <IconChevronUp {...props} />;
	} else if (sortDirection === 'desc') {
		return <IconChevronDown {...props} />;
	}
	return null;
}
