import {IconSearch  } from '@tabler/icons-react';
import { Select,rem } from '@mantine/core';
import { useState } from 'react';
import { customers } from '../data/customerData';

export function CustomerSelectionForm() {
  const [data, setData] = useState(customers);

  return (
    <Select
      p='md'
      pb={rem(9)}
      icon={<IconSearch size="1rem" />}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      maxDropdownHeight={400} // add scroll
      data={data}
      placeholder='Розничный покупатель'
      searchable
      creatable
      clearable
      getCreateLabel={(query) => `+ Создать покупателя: ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setData((current) => [...current, item]);
        return item;
      }}
    />
  );
}
