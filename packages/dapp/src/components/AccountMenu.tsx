/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AddIcon, ChevronDownIcon, DownloadIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  useDisclosure,
  Spinner,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

import { GenerateAccountModal } from './GenerateAccountModal';
import { ImportAccountModal } from './ImportAccountModal';

import { useAccountList } from '@/hooks/useAccountList';
import {
  useActiveAccount,
  invalidateActiveAccount,
} from '@/hooks/useActiveAccount';
import { invalidateOperations } from '@/hooks/useOperations';
import { useSetActiveAccount } from '@/hooks/useSetActiveAccount';
import { useShowCredentials } from '@/hooks/useShowCredentials';
import { invalidateTokens } from '@/hooks/useTokens';

export const AccountMenu = () => {
  const {
    isOpen: isImportOpen,
    onOpen: onImportOpen,
    onClose: onImportClose,
  } = useDisclosure();
  const {
    isOpen: isGenerateOpen,
    onOpen: onGenerateOpen,
    onClose: onGenerateClose,
  } = useDisclosure();
  const showIconBg = useColorModeValue('gray.100', 'gray.600');

  const { isLoading: accountsListLoading, data: accountsList } =
    useAccountList();
  const { isLoading: activeAccountLoading, data: activeAccount } =
    useActiveAccount();
  const setActiveAccount = useSetActiveAccount();
  const showCredentials = useShowCredentials();

  return (
    <Menu>
      <MenuButton
        as={Button}
        disabled={activeAccountLoading || accountsListLoading}
        rightIcon={<ChevronDownIcon />}
      >
        {activeAccountLoading ? <Spinner /> : activeAccount?.name}
      </MenuButton>
      <MenuList>
        {!accountsListLoading &&
          accountsList?.map((account) => (
            <MenuItem
              key={account!.address}
              onClick={() =>
                setActiveAccount({ address: account!.address })?.then(() => {
                  invalidateActiveAccount();
                  invalidateOperations();
                  invalidateTokens();
                })
              }
            >
              <Flex justify={'space-between'} align={'center'} w={'full'}>
                <Text flexGrow={1}>{account!.name}</Text>
                <Box
                  borderRadius={'lg'}
                  bg={showIconBg}
                  p={2}
                  onClick={(evt) => {
                    evt.preventDefault();
                    showCredentials({ address: account!.address });
                  }}
                >
                  <DownloadIcon />
                </Box>
              </Flex>
            </MenuItem>
          ))}
        <Flex justifyContent={'space-between'} m={4} gap={4}>
          <Button onClick={onImportOpen} leftIcon={<DownloadIcon />}>
            Import Account
          </Button>
          <Button onClick={onGenerateOpen} leftIcon={<AddIcon />}>
            Generate Account
          </Button>
        </Flex>
      </MenuList>
      <ImportAccountModal isOpen={isImportOpen} onClose={onImportClose} />
      <GenerateAccountModal isOpen={isGenerateOpen} onClose={onGenerateClose} />
    </Menu>
  );
};
