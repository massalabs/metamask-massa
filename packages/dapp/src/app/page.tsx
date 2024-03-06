'use client';

import {
  Divider,
  Flex,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';

import { OperationTab } from '@/components/OperationTab';
import { TokenTab } from '@/components/TokenTab';

/**
 *
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export default function Home() {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir={'column'}
      align={'center'}
      flexGrow={1}
      justify={'center'}
      w={{ base: '100%', lg: '60%' }}
      borderRadius={'lg'}
      bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={4}
      gap={4}
      mx={3}
      my={10}
      h={'full'}
    >
      <TokenTab />
      <Divider
        orientation={'horizontal'}
        borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
      />
      <OperationTab />
    </Flex>
  );
}
