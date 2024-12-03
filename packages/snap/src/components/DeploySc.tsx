import { Mas } from '@massalabs/massa-web3';
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
            {Mas.toString(BigInt(coins))} MAS
          </Text>
          <Text>
            <Bold>Max coins: </Bold>
            {maxCoins !== 'none'
              ? `${Mas.toString(BigInt(maxCoins))} MAS`
              : 'none'}
          </Text>
          <Text>
            <Bold>Fee: </Bold>
            {Mas.toString(BigInt(fee))} MAS
          </Text>
          {args.length ? (
            <Text>
              <Bold>Constructor arguments: </Bold>
              {args.toString()}
            </Text>
          ) : null}
        </Section>
      </Box>
    </Container>
  );
};
