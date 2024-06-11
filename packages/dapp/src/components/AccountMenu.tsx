import { ViewIcon } from '@chakra-ui/icons';
import {
  Flex,
  Spinner,
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

import {
  useActiveAccount,
} from '@/hooks/useActiveAccount';
import { useShowCredentials } from '@/hooks/useShowCredentials';

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
        <Flex justify={'space-between'} align={'center'} w={'full'}>
          <Text>My Account</Text>
          <Box
            borderRadius={'lg'}
            bg={showIconBg}
            p={2}
            onClick={(evt) => {
              evt.preventDefault();
              showCredentials();
            }}
          >
            <ViewIcon />
          </Box>
        </Flex>
      )}
      ;
    </>
  );
};
