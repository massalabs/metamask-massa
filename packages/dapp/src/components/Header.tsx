'use client';

import { useContext, useState } from 'react';
import { Flex, Icon, Heading, useBreakpointValue } from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';

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
    <Flex justifyContent={'space-between'} p={5} flexWrap={'wrap'}>
      <Flex
        gap={4}
        align={'center'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Icon as={SunIcon} w={8} h={8} />
        <Heading pb={1}>Massa</Heading>
      </Flex>
      <Flex gap={4} align={'center'}>
        <ConnectMetamaskButton />
        <ThemeSwitch />
        {!ready && <ConnectMetamaskButton />}
        {ready && <AccountMenu />}
        {ready && <NetworkMenu />}
      </Flex>
    </Flex>
  );
};
