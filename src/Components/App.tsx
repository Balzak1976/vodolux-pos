import { ColorScheme, ColorSchemeProvider, MantineProvider, Flex, Paper } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NavbarNested } from './NavbarNested/NavbarNested';
// import { DndTable } from './DndTable';
// import { data } from '../utils/dndTableData';
import { TableScrollArea } from './TableScrollArea/TableScrollArea';
import { data } from '../data/tableScrollArea';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <div className='App'>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }}>
          <Paper>
            <Flex>
              <NavbarNested />
              <TableScrollArea data={data}/>
            </Flex>
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}
