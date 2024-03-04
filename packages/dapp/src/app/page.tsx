'use client';

import { Box, Center, Container, Divider, Flex, Text, useBreakpointValue, useColorMode } from '@chakra-ui/react';

import { TokenTab } from '@/components/TokenTab';
import { OperationTab } from '@/components/OperationTab';

/**
 *
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function Home() {
  const bValues = useBreakpointValue({ base: {x: '0px', y: '1px'}, md: {x: '1px', y: '0px'} });
  const {colorMode} = useColorMode();

  return (
    <Container
      border={'white'}
      bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={4}
      mt={10}
      maxW="6xl"
size={'lg'}
      borderRadius={'lg'}
      flexWrap={'wrap'}
    >
      <Flex justifyContent={'center'} flexWrap={'wrap'}>
        <Flex
          w={{ base: '100%', md: '50%' }}
          borderRightWidth={bValues?.x}
          borderBottomWidth={bValues?.y}
          borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
          p={4}
        >
          <TokenTab />
        </Flex>
        <Flex
          w={{ base: '100%', md: '50%' }}
          borderLeftWidth={bValues?.x}
          borderTopWidth={bValues?.y}
          borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
          p={4}
        >
          <OperationTab />
        </Flex>
      </Flex>
    </Container>
  );
}
