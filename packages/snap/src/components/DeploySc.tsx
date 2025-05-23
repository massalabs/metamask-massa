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

type DeployScProps = {
  fee: string;
  args: number[];
  coins: string;
  maxCoins: string;
};

export const DeploySc: SnapComponent<DeployScProps> = ({
  fee,
  args,
  coins,
  maxCoins,
}) => {
  return (
    <Container>
      <Box>
        <Heading>Deploying Smart contract</Heading>
        <Section>
          <Text>
            <Bold>Coins: </Bold>
            {formatMas(BigInt(coins))} MAS
          </Text>
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
          {args.length ? (
            <Text>
              <Bold>Constructor calldata: </Bold>
              {args.toString()}
            </Text>
          ) : null}
        </Section>
      </Box>
    </Container>
  );
};
