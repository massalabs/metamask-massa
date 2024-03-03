import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { useState } from 'react';

export const AccountMenu = () => {
  const [currentAccount, setCurrentAccount] = useState<{
    name: string;
    address: string;
  } | null>(null);

  const [accountList, setAccountList] = useState<
    { name: string; address: string }[]
  >([
    { name: 'Account 0', address: '' },
    { name: 'Account 1', address: '' },
    { name: 'Account 2', address: '' },
  ]);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {currentAccount?.name ?? accountList[0].name}
      </MenuButton>
      <MenuList>
        {accountList.map((account) => (
          <MenuItem
            key={account.name}
            onClick={() => setCurrentAccount(account)}
          >
            {account.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
