import { Navbar, Group, ScrollArea, createStyles, rem } from '@mantine/core';
import { IconBox, IconBriefcase, IconNews, IconLock } from '@tabler/icons-react';
import { UserButton } from '../UserButton';
import { LinksGroup } from '../NavbarLinksGroup';
import { Logo } from './Logo';
import LightDarkButton from '../LightDarkButton';

const mockData = [
  {
    label: 'Товары',
    icon: IconBox,
    initiallyOpened: false,
    links: [
      { label: 'Продажа', link: '/' },
      { label: 'Продажа (список)', link: '/' },
      { label: 'Закупки', link: '/' },
      { label: 'Списание', link: '/' },
      { label: 'Возвраты покупателя', link: '/' },
      { label: 'Перемещение (приход)', link: '/' },
    ],
  },
  {
    label: 'Финансы',
    icon: IconBriefcase,
    initiallyOpened: false,
    links: [
      { label: 'Приход', link: '/' },
      { label: 'Расход', link: '/' },
      { label: 'Сумма в кассе', link: '/' },
    ],
  },
  {
    label: 'Справочники',
    icon: IconNews,
    initiallyOpened: false,
    links: [
      { label: 'Группы товаров и услуг', link: '/' },
      { label: 'Товары', link: '/' },
      { label: 'Услуги', link: '/' },
      { label: 'Поставщики', link: '/' },
      { label: 'Покупатели', link: '/' },
    ],
  },
  {
    label: 'Security',
    icon: IconLock,
    initiallyOpened: false,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    // textAlign: 'left',
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));

export function NavbarNested() {
  const { classes } = useStyles();
  const links = mockData.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar width={{ sm: 300 }} p='md' className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position='apart'>
          <Logo width={rem(120)} />
          <LightDarkButton />
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
          name='Ann Nullpointer'
          email='anullpointer@yahoo.com'
        />
      </Navbar.Section>
    </Navbar>
  );
}
