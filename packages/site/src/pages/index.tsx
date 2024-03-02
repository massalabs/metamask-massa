/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect } from 'react';
import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
  GetPublicKeyButton,
  CallSC,
} from '../components';
import { defaultSnapOrigin } from '../config';
import { CallSCParameters, MetamaskActions, MetaMaskContext, useCallSmartContract, useShowSecretKey, useSignMessage, useTransfer } from '../hooks';
import {
  connectSnap,
  getAddress,
  getSnap,
  isLocalSnap,
  sendHello,
  shouldDisplayReconnectButton,
} from '../utils';
import { SignMessageForm, TransferForm } from '../components/Forms';
import { Args, CHAIN_ID, ClientFactory, DefaultProviderUrls, EOperationStatus, EventPoller, IEventFilter, ITransactionData, fromMAS } from '@massalabs/massa-web3';

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
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  const handleGetPublicKey = async () => {
    try {
      // This function will only be triggerable if a provider is available
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const res = await getAddress(provider!);
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


useEffect(() => {
  fetch('https://buildnet.massa.net/api/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'get_status',
      params: null,
      id: 0,
    }),
  }).then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}, []);




  return (
    <Container>
      <Heading>
        Welcome to <Span>template-snap</Span>
      </Heading>
      <Subtitle>
        Get started by editing <code>src/index.ts</code>
      </Subtitle>
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!state.installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={handleConnectClick}
                  disabled={!state.installedSnap}
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Get public key',
            description: 'Get public key of wallet',
            button: (
              <GetPublicKeyButton
                onClick={handleGetPublicKey}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Card
          content={{
            title: 'Show private key',
            description: 'Show private key of wallet',
            button: (
              <GetPublicKeyButton
                onClick={showSecretKey}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Card
          content={{
            title: 'Call Smart Contract',
            description: 'Calls a function of a smart contract',
            button: (
              <CallSC
                onClick={() => {
                  callSmartContract({
                    nickname: '',
                    fee: fromMAS('10').toString(),
                    functionName: 'myFunc',
                    at: 'AS12HhpfWCwvDiJ1znBFtCbXKuJA473cvXoCEHsiQeJhxYBv7XbPd',
                    args: [],
                    coins: fromMAS('0').toString(),
                    nonPersistentExecution: {
                      isNPE: false,
                      maxGas: '1000000000',
                    },
                  } as CallSCParameters)
                    .then(async (res) => {
                      const id = (res as unknown as { operationId: string })
                        .operationId;
                      const client = await ClientFactory.createDefaultClient(
                        DefaultProviderUrls.BUILDNET,
                        CHAIN_ID.BuildNet,
                        true,
                      );
                      console.log(`fecthing events for id: ${id}`);
                      await client
                        .smartContracts()
                        .awaitRequiredOperationStatus(
                          id,
                          EOperationStatus.FINAL_SUCCESS,
                        );
                      const events = await EventPoller.getEventsOnce({
                          start: null,
                          end: null,
                          original_operation_id: id,
                          original_caller_address: null,
                          emitter_address: null,
                        } as IEventFilter,
                        client,
                      );
                      console.log('events:');
                      console.log(events);
                    })
                    .catch((error) => console.error(error));
                }}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Card
          content={{
            title: 'Sign message',
            description: 'Show private key of wallet',
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        >
          <SignMessageForm
            onSubmit={async (message) =>
              await onSignMessage({
                data: message,
                chainId: CHAIN_ID.BuildNet,
              })
            }
          />
        </Card>
        <Card
          content={{
            title: 'Transfer',
            description: 'Send funds to another address',
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        >
          <TransferForm onSubmit={(params: ITransactionData) => transfer(params)} />
        </Card>
        <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
