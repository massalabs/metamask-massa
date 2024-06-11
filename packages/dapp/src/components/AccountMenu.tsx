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
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

import {
  useActiveAccount,
  invalidateActiveAccount,
} from '@/hooks/useActiveAccount';
import { invalidateOperations } from '@/hooks/useOperations';
import { useShowCredentials } from '@/hooks/useShowCredentials';
import { invalidateTokens } from '@/hooks/useTokens';

export const AccountMenu = () => {
  const showIconBg = useColorModeValue('gray.100', 'gray.600');

  const { isLoading: activeAccountLoading, data: activeAccount } =
    useActiveAccount();
  const showCredentials = useShowCredentials();

  return (
    <>
      {activeAccountLoading ? (
        <Spinner />
      ) : (
        <Flex>
          <Text flexGrow={1}>My Account</Text>
          <Flex justify={'space-between'} align={'center'} w={'full'}>
            <Box
              borderRadius={'lg'}
              bg={showIconBg}
              p={2}
              onClick={(evt) => {
                evt.preventDefault();
                showCredentials();
              }}
            >
              <DownloadIcon />
            </Box>
          </Flex>
        </Flex>
      )}
      ;
    </>
  );
};
