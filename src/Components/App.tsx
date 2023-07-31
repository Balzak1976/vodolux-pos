import { ColorScheme, ColorSchemeProvider, MantineProvider, Flex, Paper } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NavbarNested } from './NavbarNested/NavbarNested';
import SaleCreationSection from './SaleCreationSection';

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
              <SaleCreationSection/>
            </Flex>
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}
