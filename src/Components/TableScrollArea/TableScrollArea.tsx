import './TableScrollArea.css';

import { useState } from 'react';
import { createStyles, Table, ScrollArea, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { name: string; qty: number; price: number; total: number; stocks: number }[];
}

export function TableScrollArea({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td className='centered-text'>{row.qty}</td>
      <td className='centered-text'>{row.price}</td>
      <td className='centered-text'>{row.total}</td>
      <td className='centered-text'>{row.stocks}</td>
    </tr>
  ));

  return (
    <ScrollArea.Autosize mah='70vh' onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700} withColumnBorders={true} striped={true} withBorder={true}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Наименование</th>
            <th>К-во</th>
            <th>Цена</th>
            <th>Сумма</th>
            <th>Остаток</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea.Autosize>
  );
}
