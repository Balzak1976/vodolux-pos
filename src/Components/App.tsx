import { ColorScheme, ColorSchemeProvider, MantineProvider, Flex } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NavbarNested } from './NavbarNested/NavbarNested';

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
          <Flex>
            <NavbarNested />
          </Flex>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}
