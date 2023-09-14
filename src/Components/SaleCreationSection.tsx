import { Flex } from '@mantine/core';
import goodsData from '../data/goodsData.json';
import { goodColumns } from './TableSales/ColumnDef';
import { TableSales } from './TableSales/TableSales';
import { ButtonGroup } from './TableSales/ButtonGroup';

export default function SaleCreationSection() {
  
  return (
    <Flex  direction='column'>
      <TableSales goodData={goodsData} goodColumns={goodColumns} />
      <ButtonGroup></ButtonGroup>
    </Flex>
  );
}
