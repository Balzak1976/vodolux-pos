import { Flex } from '@mantine/core';
import { CustomerSelectionForm } from './CustomerSelectionForm';
import { TableSales } from './TableSales/TableSales';

export default function SaleCreationSection() {
  return (
    <Flex  direction='column'>
      <CustomerSelectionForm />
      <TableSales />
    </Flex>
  );
}
