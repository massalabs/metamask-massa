'use client';

import { useContext, useState } from 'react';
import { Flex, Icon, Heading, useBreakpointValue, Show } from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/next-js';
import { NetworkMenu } from './NetworkMenu';
import { AccountMenu } from './AccountMenu';
import { ThemeSwitch } from './ThemeSwitch';
import { ConnectMetamaskButton } from './ConnectMetamaskButton';
import { isLocalSnap } from '@/utils';
import { defaultSnapOrigin } from '@/config';
import { MetaMaskContext } from '@/hooks/MetamaskContext';

export const Header = () => {
  const { state, provider } = useContext(MetaMaskContext);
  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;
  const ready = isMetaMaskReady && state.installedSnap && provider !== undefined;

  return (
    <>
      <Flex justifyContent={'space-between'} w={"full"} p={5} flexWrap={'wrap'} bg={'grey.100'}>
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
