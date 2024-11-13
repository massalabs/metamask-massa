import { toMAS } from '@massalabs/massa-web3';
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
            {toMAS(params.coins).toString()} MAS
          </Text>
          <Text>
            <Bold>Fee: </Bold>
            {toMAS(params.fee).toString()} MAS
          </Text>
          <Text>
            <Bold>Arguments: </Bold>
            {params.args.toString()}
          </Text>
        </Section>
      </Box>
    </Container>
  );
};
