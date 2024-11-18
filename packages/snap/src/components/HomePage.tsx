import {
  SnapComponent,
  Container,
  Box,
  Heading,
  Card,
  Copyable,
  Footer,
  Button,
} from '@metamask/snaps-sdk/jsx';

type HomePageProps = {
  network: string;
  address: string;
  balance: string;
};

export const HomePage: SnapComponent<HomePageProps> = ({
  network,
  address,
  balance,
}) => {
  return (
    <Container>
      <Box>
        <Heading>Massa Account</Heading>
        <Card title="Address: " value="" />
        <Copyable value={address} />
        <Card title="rpc url:" value={network} />
        <Card title="balance:" value="Mas" extra={balance.toString()} />
      </Box>
      <Footer>
        <Button name="show-keys-validation">Show key pair</Button>
      </Footer>
    </Container>
  );
};
