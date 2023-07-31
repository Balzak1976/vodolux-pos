import { IconSearch } from '@tabler/icons-react';
import { Select, rem, Group, Avatar, Text } from '@mantine/core';
import { useState, forwardRef } from 'react';
import { customers } from '../data/customerData';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image} />

      <div>
        <Text size='sm'>{label}</Text>
        <Text size='xs' opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

export function CustomerSelectionForm() {
  const [data, setData] = useState(customers);

  const createCustomer = (query: string) => {
    const item = {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
      label: query,
      value: query,
      description: 'сантехник',
    };
    setData((current) => [...current, item]);
    return item;
  };

  return (
    <Select
      p='md'
      pb={rem(9)}
      icon={<IconSearch size='1rem' />}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      maxDropdownHeight={400} // add scroll
      data={data}
      placeholder='Розничный покупатель'
      searchable
      creatable
      clearable
      getCreateLabel={(query) => `+ Создать покупателя: ${query}`}
      onCreate={createCustomer}
      itemComponent={SelectItem}
      filter={(value, item) =>
        (item.label ? item.label.toLowerCase().includes(value.toLowerCase().trim()) : false) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
