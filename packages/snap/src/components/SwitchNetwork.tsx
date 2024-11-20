import {
  SnapComponent,
  Container,
  Box,
  Heading,
  Text,
  Bold,
} from '@metamask/snaps-sdk/jsx';
import type { NetworkInfos } from '../network';

type SwitchNetworkProps = NetworkInfos;

export const SwitchNetwork: SnapComponent<SwitchNetworkProps> = ({
  networkName,
  rpcUrl,
}) => {
  return (
    <Container>
      <Box>
        <Heading>Do you want to switch to the following network?</Heading>
        <Text>
          <Bold>Network: </Bold>
          {networkName}
        </Text>
        <Text>
          <Bold>rpc url: </Bold>
          {rpcUrl}
        </Text>
      </Box>
    </Container>
  );
};
