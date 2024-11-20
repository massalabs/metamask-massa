import { BUILDNET, CHAIN_ID_TO_NETWORK_NAME, LABNET, MAINNET } from '@massalabs/massa-web3';
import {
  SnapComponent,
  Container,
  Box,
  Heading,
  Card,
  Copyable,
  Footer,
  Button,
  Dropdown,
  Option,
  Text,
  Form,
  Field,
  Input,
} from '@metamask/snaps-sdk/jsx';
import { GetNetworkResponse } from 'src/handlers';

type HomePageProps = {
  networkInfo: GetNetworkResponse;
  address: string;
  balance: string;
};

export const HomePage: SnapComponent<HomePageProps> = ({
  networkInfo,
  address,
  balance,
}) => {
  const networkName = CHAIN_ID_TO_NETWORK_NAME[networkInfo.chainId] ?? 'Custom';
  return (
    <Container>
      <Box>
        <Heading>Massa Account:</Heading>
        <Copyable value={address} />
        <Card title="balance:" value="Mas" extra={balance.toString()} />
        <Heading>Network:</Heading>
        <Card title="Current:" value={networkName} extra={networkInfo.network}/>
        <Text>Select a network:</Text>
        <Dropdown name="network-change">
          <Option value={MAINNET}>Mainnet</Option>
          <Option value={BUILDNET}>Buildnet</Option>
          <Option value={LABNET}>Labnet</Option>
        </Dropdown>
        <Form name="custom-network-form">
          <Field label="Custom Rpc Url">
            <Input name="custom-rpc" placeholder="http://localhost:33035" />
          </Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Box>
      <Footer>
        <Button name="show-keys-validation">Show key pair</Button>
      </Footer>
    </Container>
  );
};
