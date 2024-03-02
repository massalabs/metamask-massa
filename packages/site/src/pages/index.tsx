/* eslint-disable @typescript-eslint/naming-convention */
import { Select, ChakraProvider } from '@chakra-ui/react';
import {
  ClientFactory,
  DefaultProviderUrls,
  EOperationStatus,
  EventPoller,
} from '@massalabs/massa-web3';
import type { IEventFilter, ITransactionData } from '@massalabs/massa-web3';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  Card,
  GetPublicKeyButton,
  CallSC,
} from '../components';
import { SignMessageForm, TransferForm } from '../components/Forms';
import { defaultSnapOrigin } from '../config';
import type { CallSCParameters } from '../hooks';
import {
  MetamaskActions,
  MetaMaskContext,
  useAddress,
  useCallSmartContract,
  useShowSecretKey,
  useSignMessage,
  useTransfer,
} from '../hooks';
import {
  connectSnap,
  getActiveAccount,
  getAccountList,
  getSnap,
  isLocalSnap,
  shouldDisplayReconnectButton,
} from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { state, dispatch, provider } = useContext(MetaMaskContext);
  const onSignMessage = useSignMessage(provider!);
  const transfer = useTransfer(provider!);
  const showSecretKey = useShowSecretKey(provider!);
  const callSmartContract = useCallSmartContract(provider!);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;

  const handleDropDownActive = async () => {
    let accounts: { name: string; address: string | null }[] =
      await getAccountList(provider!);
    accounts = accounts.filter(
      (account) =>
        account.address !== null && account.address !== currentAccount?.address,
    );
    if (accounts) {
      setAccountList(accounts);
    }
  };

  const handleConnectClick = async () => {
    try {
      // This function will only be triggerable if a provider is available
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await connectSnap(provider!);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const installedSnap = await getSnap(provider!);

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });

      const res: { name: string; address: string } = await getActiveAccount(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        provider!,
      );
      if (res) {
        setCurrentAccount(res);
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  const handleGetPublicKey = async () => {
    try {
      // This function will only be triggerable if a provider is available
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const res = await getActiveAccount(provider!);
      if (res) {
        console.log('Public key:', res);
      } else {
        dispatch({
          type: MetamaskActions.SetError,
          payload: { message: 'User denied request' },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  return (
      <Container>
        <Heading>

        </Heading>
        <CardContainer>

        </CardContainer>
      </Container>
  );
};

export default Index;
