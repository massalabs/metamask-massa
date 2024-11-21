import {
  BUILDNET,
  CHAIN_ID_TO_NETWORK_NAME,
  LABNET,
  MAINNET,
} from '@massalabs/massa-web3';
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
import type { NetworkInfos } from '../network';

type HomePageProps = {
  networkInfo: NetworkInfos;
  address: string;
  balance: string;
};

export const HomePage: SnapComponent<HomePageProps> = ({
  networkInfo,
  address,
  balance,
}) => {
  const networkName = CHAIN_ID_TO_NETWORK_NAME[networkInfo.chainId] ?? 'Custom';

  const networkList =
    networkName === MAINNET
      ? [MAINNET, BUILDNET, LABNET]
      : [BUILDNET, MAINNET, LABNET];

  const dropDown = (
    <Dropdown name="network-change">
      {networkList.map((network) => (
        <Option value={network}>{network}</Option>
      ))}
    </Dropdown>
  );

  return (
    <Container>
      <Box>
        <Heading>Massa Account:</Heading>
        <Copyable value={address} />
        <Card title="balance:" value="Mas" extra={balance.toString()} />
        <Heading>Network:</Heading>
        <Card title="Current:" value={networkName} extra={networkInfo.rpcUrl} />
        <Text>Select a network:</Text>
        {dropDown}
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
