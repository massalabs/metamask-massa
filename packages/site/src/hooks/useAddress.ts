import type { MetaMaskInpageProvider } from '@metamask/providers';
import { useEffect, useState } from 'react';

import { defaultSnapOrigin } from '../config';

export const useAddress = async (provider: MetaMaskInpageProvider) => {
  const [address, setAddress] = useState<`0x${string}` | null>(null);

  useEffect(() => {
    provider
      .request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: defaultSnapOrigin,
          request: {
            method: 'getAddress',
          },
        },
      })
      .then((result) => setAddress(result as `0x${string}`))
      .catch((error: Error) => console.error('Failed to get address', error));
  }, [provider]);

  return address;
};
