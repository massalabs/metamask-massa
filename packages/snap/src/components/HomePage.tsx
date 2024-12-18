import {
  SnapComponent,
  Container,
  Box,
  Heading,
  Card,
  Copyable,
  Button,
  Dropdown,
  Option,
  Text,
  Form,
  Field,
  Input,
} from '@metamask/snaps-sdk/jsx';
import type { NetworkInfos } from '../network';
import { NetworkName } from '@massalabs/massa-web3';

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
  const networkList =
    networkInfo.networkName === NetworkName.Mainnet
      ? [NetworkName.Mainnet, NetworkName.Buildnet]
      : [NetworkName.Buildnet, NetworkName.Mainnet];

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
        <Heading>Send MAS:</Heading>
        <Form name="send-mas-form">
          <Field label="Amount (MAS)">
            <Input name="send-amount" />
          </Field>
          <Field label="Recipient">
            <Input name="send-recipient" />
          </Field>
          <Button type="submit">Send</Button>
        </Form>
        <Heading>Network:</Heading>
        <Card
          title="Current:"
          value={networkInfo.networkName}
          extra={networkInfo.rpcUrl}
        />
        <Text>Select a network:</Text>
        {dropDown}
        <Form name="custom-network-form">
          <Field label="Custom Rpc Url">
            <Input name="custom-rpc" placeholder="http://localhost:33035" />
          </Field>
          <Button type="submit">Submit</Button>
        </Form>
        <Heading>Backup:</Heading>
        <Button name="show-keys-validation">Show key pair</Button>
      </Box>
    </Container>
  );
};
