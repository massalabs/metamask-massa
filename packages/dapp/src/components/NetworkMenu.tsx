import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spinner,
} from '@chakra-ui/react';

import { invalidateNetwork, useNetwork } from '@/hooks/useNetwork';
import { invalidateOperations } from '@/hooks/useOperations';
import { useSetNetwork } from '@/hooks/useSetNetwork';
import { invalidateTokens } from '@/hooks/useTokens';
import { CHAIN_ID, NetworkName, PublicApiUrl } from '@massalabs/massa-web3';

const networkList = [
  {
    id: CHAIN_ID.Mainnet,
    name: NetworkName.Mainnet,
    url: PublicApiUrl.Mainnet,
  },
  {
    id: CHAIN_ID.Buildnet,
    name: NetworkName.Buildnet,
    url: PublicApiUrl.Buildnet,
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
