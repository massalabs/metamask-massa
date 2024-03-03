import { AddIcon, ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, useDisclosure, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { ImportAccountModal } from './ImportAccountModal';
import { GenerateAccountModal } from './GenerateAccountModal';
import { useAccountList } from '@/hooks/useAccountList';
import { useActiveAccount } from '@/hooks/useActiveAccount';
import { useSetActiveAccount } from '@/hooks/useSetActiveAccount';

export const AccountMenu = () => {
  const { isOpen: isImportOpen, onOpen: onImportOpen, onClose: onImportClose} = useDisclosure();
  const { isOpen: isGenerateOpen, onOpen: onGenerateOpen, onClose: onGenerateClose} = useDisclosure();

  const { isLoading: accountsListLoading, data: accountsList } = useAccountList()
  const { isLoading: activeAccountLoading, data: activeAccount } = useActiveAccount();
  const setActiveAccount = useSetActiveAccount();

  return (
    <Menu>
      <MenuButton as={Button} disabled={activeAccountLoading || accountsListLoading} rightIcon={<ChevronDownIcon />}>
        {activeAccountLoading ? <Spinner /> : activeAccount?.name}
      </MenuButton>
      <MenuList>
        {!accountsListLoading && accountsList?.map((account) => (
          <MenuItem
            key={account!.address}
            onClick={() => setActiveAccount({ address: account!.address })}
          >
            {account!.name}
          </MenuItem>
        ))}
        <Flex justifyContent={'space-between'}>
          <Button onClick={onImportOpen} leftIcon={<DownloadIcon/>}>
            Import Account
          </Button>
          <Button onClick={onGenerateOpen} leftIcon={<AddIcon/>}>
            Generate Account
          </Button>
        </Flex>
      </MenuList>
      <ImportAccountModal isOpen={isImportOpen} onClose={onImportClose} />
      <GenerateAccountModal isOpen={isGenerateOpen} onClose={onGenerateClose} />
    </Menu>
  );
};
