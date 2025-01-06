import { Mas } from '@massalabs/massa-web3';
import {
  SnapComponent,
  Container,
  Box,
  Heading,
  Text,
  Section,
  Bold,
  Copyable,
} from '@metamask/snaps-sdk/jsx';

type CallScProps = {
  fee: string;
  functionName: string;
  at: string;
  args: number[];
  coins: string;
};

export const CallSc: SnapComponent<CallScProps> = (params: CallScProps) => {
  return (
    <Container>
      <Box>
        <Heading>Do you want to call the following smart contract?</Heading>
        <Section>
          <Text>
            <Bold>Contract: </Bold>
          </Text>
          <Copyable value={params.at} />
        </Section>
        <Section>
          <Text>
            <Bold>Function: </Bold>
            {params.functionName}
          </Text>
          <Text>
            <Bold>Coins: </Bold>
            {Mas.toString(BigInt(params.coins))} MAS
          </Text>
          <Text>
            <Bold>Fee: </Bold>
            {Mas.toString(BigInt(params.fee))} MAS
          </Text>
          {params.args.length ? (
            <Text>
              <Bold>Calldata: </Bold>
              {params.args.toString()}
            </Text>
          ) : null}
        </Section>
      </Box>
    </Container>
  );
};
