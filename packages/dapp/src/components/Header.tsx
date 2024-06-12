'use client';

import { Image } from '@chakra-ui/next-js';
import { Flex, Show } from '@chakra-ui/react';
import { useContext } from 'react';

import { AccountMenu } from './AccountMenu';
import { ConnectMetamaskButton } from './ConnectMetamaskButton';
import { NetworkMenu } from './NetworkMenu';
import { ThemeSwitch } from './ThemeSwitch';

import { defaultSnapOrigin } from '@/config';
import { MetaMaskContext } from '@/hooks/MetamaskContext';
import { isLocalSnap } from '@/utils';

export const Header = () => {
  const { state, provider } = useContext(MetaMaskContext);
  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;
  const ready =
    isMetaMaskReady && state.installedSnap && provider !== undefined;

  return (
    <>
      <Flex
        justifyContent={{ base: 'center', lg: 'space-between' }}
        w={'full'}
        id="header"
        p={5}
        flexWrap={'wrap'}
        bg={'grey.100'}
      >
        <Image src="/MassaLogo.png" alt="Logo" width={200} height={42} />
        <Show above="lg">
          <Flex gap={4} align={'center'} justify="center" flexWrap={'wrap'}>
            <ThemeSwitch />
            {!ready && <ConnectMetamaskButton />}
            {ready && <AccountMenu />}
            {ready && <NetworkMenu />}
          </Flex>
        </Show>
      </Flex>
      <Show below="lg">
        <Flex
          gap={4}
          align={'center'}
          w={'full'}
          px={4}
          justify="space-between"
        >
          <ThemeSwitch />
          {!ready && <ConnectMetamaskButton />}

          {ready && (
            <Flex gap={4}>
              <AccountMenu />
              <NetworkMenu />
            </Flex>
          )}
        </Flex>
      </Show>
    </>
  );
};
