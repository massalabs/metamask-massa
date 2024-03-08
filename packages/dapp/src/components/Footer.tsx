import { Divider, Flex, Text } from '@chakra-ui/react';

export const Footer = () => (
  <>
    <Flex
      justifyContent={'center'}
      w={'full'}
    >
      <Text>Built by Astrodevs-Labs</Text>
    </Flex>
    <Flex
      justifyContent={'center'}
      w={'full'}
      mb={4}
    >
      <Text>Powered by Massa</Text>
    </Flex>
  </>
);
