import { Flex } from '@mantine/core';
import { CustomerSelectionForm } from './CustomerSelectionForm';
import { TableScrollArea } from './TableScrollArea/TableScrollArea';
import { data } from '../data/tableScrollArea';

export default function SaleCreationSection() {
  return (
    <Flex  direction='column'>
      <CustomerSelectionForm />
      <TableScrollArea data={data} />
    </Flex>
  );
}
