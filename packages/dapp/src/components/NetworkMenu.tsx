import { useNetwork } from '@/hooks/useNetwork';
import { useSetNetwork } from '@/hooks/useSetNetwork';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { CHAIN_ID } from '@massalabs/massa-web3';
import { useEffect, useState } from 'react';

const networkList = [
  {id: CHAIN_ID.MainNet, name: 'Mainnet'},
  {id: CHAIN_ID.BuildNet, name: 'Buildnet'},
];

export const NetworkMenu = () => {
  const {data: activeNetwork } = useNetwork();
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);
  const [networkList, setNetworkList] = useState<string[]>([
    'Mainnet',
    'Buildnet',
  ]);
  const setNetwork = useSetNetwork();
  const handleSetNetwork = async (network: string) => {
    let netId;;
    if (network === "Mainnet") {
      netId = CHAIN_ID.MainNet;
    } else  {
      netId = CHAIN_ID.BuildNet;
    }
    const res = await setNetwork({ network: netId.toString() });
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {currentNetwork! ?? networkList[0]}
      </MenuButton>
      <MenuList>
        {networkList.map((network) => (
          <MenuItem key={network} onClick={() => handleSetNetwork(network)}>
            {network}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
