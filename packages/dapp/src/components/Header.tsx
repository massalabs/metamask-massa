'use client';

// eslint-disable-next-line @typescript-eslint/no-shadow
import { Image } from '@chakra-ui/next-js';
import { Flex } from '@chakra-ui/react';
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
        justifyContent={'space-between'}
        w={'full'}
        p={5}
        flexWrap={'wrap'}
        bg={'grey.100'}
      >
        <Image src="/MassaLogo.png" alt="Logo" width={200} height={42} />
        <Flex gap={4} align={'center'} justify="center" flexWrap={'wrap'}>
          <ThemeSwitch />
          {!ready && <ConnectMetamaskButton />}
          {ready && <AccountMenu />}
          {ready && <NetworkMenu />}
        </Flex>
      </Flex>
    </>
  );
};
