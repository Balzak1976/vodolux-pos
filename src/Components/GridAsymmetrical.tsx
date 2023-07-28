import { Grid, Container } from '@mantine/core';

const child = null;

export function GridAsymmetrical() {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={2}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}