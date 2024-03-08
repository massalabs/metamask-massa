import { Flex, Text } from '@chakra-ui/react';

const newLocal = 'center';
export const Footer = () => (
  <>
    <Flex justifyContent={newLocal} w={'full'}>
      <Text>Built by Astrodevs-Labs</Text>
    </Flex>
    <Flex justifyContent={'center'} w={'full'} mb={4}>
      <Text>Powered by Massa</Text>
    </Flex>
  </>
);
