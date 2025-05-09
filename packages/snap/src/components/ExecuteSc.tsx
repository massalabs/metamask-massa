import { formatMas } from '@massalabs/massa-web3';
import {
  SnapComponent,
  Container,
  Box,
  Heading,
  Text,
  Section,
  Bold,
} from '@metamask/snaps-sdk/jsx';

type ExecuteScProps = {
  fee: string;
  maxCoins: string;
};

export const ExecuteSc: SnapComponent<ExecuteScProps> = ({ fee, maxCoins }) => {
  return (
    <Container>
      <Box>
        <Heading>Execute Smart contract Bytecode</Heading>
        <Section>
          <Text>
            <Bold>Max spendable coins: </Bold>
            {maxCoins !== 'none'
              ? `${formatMas(BigInt(maxCoins))} MAS`
              : 'none'}
          </Text>
          <Text>
            <Bold>Fee: </Bold>
            {formatMas(BigInt(fee))} MAS
          </Text>
        </Section>
      </Box>
    </Container>
  );
};
