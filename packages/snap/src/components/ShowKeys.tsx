import {
  SnapComponent,
  Container,
  Box,
  Heading,
  Copyable,
  Text,
} from '@metamask/snaps-sdk/jsx';

type CredentialsProps = {
  address: string;
  publicKey: string;
  secretKey: string;
};

export const ShowKeys: SnapComponent<CredentialsProps> = ({
  address,
  publicKey,
  secretKey,
}) => {
  return (
    <Container>
      <Box>
        <Heading>Account Credentials</Heading>
        <Text>Address:</Text>
        <Copyable value={address} />
        <Text>Public Key:</Text>
        <Copyable value={publicKey} />
        <Text>Secret Key: </Text>
        <Copyable value={secretKey} sensitive />
      </Box>
    </Container>
  );
};
