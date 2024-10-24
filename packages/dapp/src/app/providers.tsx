// app/providers.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { MetaMaskProvider } from '@/hooks/MetamaskContext';

/**
 *
 * @param options0
 * @param options0.children
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <MetaMaskProvider>{children}</MetaMaskProvider>
    </ChakraProvider>
  );
}
