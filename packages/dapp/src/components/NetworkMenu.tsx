import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { CHAIN_ID, DefaultProviderUrls } from '@massalabs/massa-web3';

import { invalidateNetwork, useNetwork } from '@/hooks/useNetwork';
import { invalidateOperations } from '@/hooks/useOperations';
import { useSetNetwork } from '@/hooks/useSetNetwork';
import { invalidateTokens } from '@/hooks/useTokens';

const networkList = [
  { id: CHAIN_ID.MainNet, name: 'Mainnet', url: DefaultProviderUrls.MAINNET },
  {
    id: CHAIN_ID.BuildNet,
    name: 'Buildnet',
    url: DefaultProviderUrls.BUILDNET,
  },
];

export const NetworkMenu = () => {
  const { data: activeNetwork } = useNetwork();
  const setNetwork = useSetNetwork();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {activeNetwork?.networkName ?? <Spinner />}
      </MenuButton>
      <MenuList>
        {networkList.map((network) => (
          <MenuItem
            key={network.id}
            onClick={async () => {
              await setNetwork({ network: network.url });
              invalidateNetwork();
              invalidateTokens();
              invalidateOperations();
            }}
          >
            {network.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
