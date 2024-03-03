import { invalidateNetwork, useNetwork } from '@/hooks/useNetwork';
import { useSetNetwork } from '@/hooks/useSetNetwork';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Button, Spinner } from '@chakra-ui/react';
import { CHAIN_ID } from '@massalabs/massa-web3';
import { useEffect, useMemo, useState } from 'react';

const networkList = [
  {id: CHAIN_ID.MainNet, name: 'Mainnet'},
  {id: CHAIN_ID.BuildNet, name: 'Buildnet'},
];

export const NetworkMenu = () => {
  const {data: activeNetwork } = useNetwork();
  const setNetwork = useSetNetwork();
  const handleSetNetwork = async (network: string) => {
    let netId;;
    if (network === "Mainnet") {
      netId = CHAIN_ID.MainNet;
    } else  {
      netId = CHAIN_ID.BuildNet;
    }
    setNetwork({ network: netId.toString() });
  }
  const activeNetworkDisplay = useMemo(() => {
    if (activeNetwork === undefined) {
      return;
    }
    return networkList.find((network) => network.id === BigInt(activeNetwork.network))?.name;
  }, [activeNetwork]);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {activeNetworkDisplay ?? <Spinner />}
      </MenuButton>
      <MenuList>
        {networkList.map((network) => (
          <MenuItem key={network.id} onClick={async () => {
            await setNetwork({network: network.id.toString()})
            invalidateNetwork();
          }}>
            {network.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
