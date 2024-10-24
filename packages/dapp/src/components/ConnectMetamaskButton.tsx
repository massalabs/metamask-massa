import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useContext, type FC } from 'react';

import { MetaMaskContext, MetamaskActions } from '@/hooks/MetamaskContext';
import { connectSnap, getSnap } from '@/utils/snap';

export type ConnectMetamaskButtonProps = ButtonProps;

export const ConnectMetamaskButton: FC<ConnectMetamaskButtonProps> = () => {
  const { dispatch, provider } = useContext(MetaMaskContext);
  const handleConnectClick = async () => {
    if (!provider) {
      dispatch({
        type: MetamaskActions.SetError,
        payload: new Error('No provider available'),
      });
      return;
    }
    try {
      // This function will only be triggerable if a provider is available
      await connectSnap(provider);
      const installedSnap = await getSnap(provider);

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  return (
    <Button
      onClick={() => {
        handleConnectClick();
      }}
    >
      Connect Metamask
    </Button>
  );
};
