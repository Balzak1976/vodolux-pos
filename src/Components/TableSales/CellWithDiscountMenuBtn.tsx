import { Column, Row, Table } from '@tanstack/react-table';
import { roundDecimal } from '../../utils/discount';
import { ProductColumns } from './ColumnDef';
import { DiscountMenuBtn } from './DiscountMenuBtn';

interface CellWithDiscountMenuBtnProps<TData extends ProductColumns> {
  getValue: () => any;
  table: Table<TData>;
  row: Row<TData> & { original: TData };
  column: Column<TData>;
}

export function CellWithDiscountMenuBtn({
  getValue,
  table,
  row,
  column,
}: CellWithDiscountMenuBtnProps<ProductColumns>) {
  const initialDiscountFraction: number = getValue();
  const percentageValue: number = roundDecimal(initialDiscountFraction * 100, 2);
  const qtyValue: number = row.getValue('qty');
  const priceValue: number = row.getValue('price');
  const subTotal: number = qtyValue * priceValue;
  const canDiscount: boolean = row.original.canDiscount;

  const setDiscount = (value: number): void => {
    if (table.options.meta) {
      table.options.meta.updateData(row.index, column.id, value);
    }
  };

  return (
    <DiscountMenuBtn
      onSetDiscount={setDiscount}
      discountFraction={initialDiscountFraction}
      subTotal={subTotal}
      menuWith={100}
    >
      {`${percentageValue}%`}
    </DiscountMenuBtn>
  );
}