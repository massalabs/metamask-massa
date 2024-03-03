import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { useState } from 'react';

export const NetworkMenu = () => {
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);
  const [networkList, setNetworkList] = useState<string[]>([
    'Mainnet',
    'Buildnet',
    'Testnet',
  ]);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {currentNetwork! ?? networkList[0]}
      </MenuButton>
      <MenuList>
        {networkList.map((network) => (
          <MenuItem key={network} onClick={() => setCurrentNetwork(network)}>
            {network}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
