import { Flex } from '@mantine/core';
import goodsData from '../data/goodsData.json';
import { goodColumns } from './TableSales/ColumnDef';
import { TableSales } from './TableSales/TableSales';

export default function SaleCreationSection() {
  return (
    <Flex  direction='column'>
      <TableSales goodData={goodsData} goodColumns={goodColumns} />
    </Flex>
  );
}
