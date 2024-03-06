import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useContext, type FC } from 'react';

import { MetaMaskContext, MetamaskActions } from '@/hooks/MetamaskContext';
import { connectSnap, getSnap } from '@/utils/snap';

export type ConnectMetamaskButtonProps = ButtonProps;

export const ConnectMetamaskButton: FC<ConnectMetamaskButtonProps> = () => {
  const { dispatch, provider } = useContext(MetaMaskContext);
  const handleConnectClick = async () => {
    try {
      // This function will only be triggerable if a provider is available
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await connectSnap(provider);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleConnectClick();
      }}
    >
      Connect Metamask
    </Button>
  );
};
