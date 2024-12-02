'use client';

import { AddIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Divider,
  Heading,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  useDisclosure,
  Spinner,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { AddTokenModal } from './AddTokenModal';
import { TxModal } from './SendTransactionModal';
import { TokenRow } from './TokenRow';

import { useAccountBalance } from '@/hooks/useAccountBalance';
import { useActiveAccount } from '@/hooks/useActiveAccount';
import { useTokens } from '@/hooks/useTokens';
import { Mas } from '@massalabs/massa-web3';

export type AccountToken = { name: string; address: string; decimals: number };

export const TokenTab = () => {
  const {
    isOpen: isTxOpen,
    onOpen: onTxOpen,
    onClose: onTxClose,
  } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const { isLoading: isLoadingActiveAccount, data: activeAccount } =
    useActiveAccount();
  const { isLoading: isLoadingTokenList, data: tokenList } = useTokens();
  const { isLoading: isLoadingAccountBalance, data: accountBalance } =
    useAccountBalance({
      address: activeAccount?.address,
    });
  const { colorMode } = useColorMode();
  const headerBg = useColorModeValue('teal.400', 'teal.600');
  const sendButtonBg = useColorModeValue('gray.400', 'gray.600');
  const sendButtonBgHover = useColorModeValue('gray.300', 'gray.500');

  const masBalance = useMemo(() => {
    if (isLoadingAccountBalance || !accountBalance) {
      return <Spinner />;
    }
    return Mas.toString(BigInt(accountBalance.finalBalance));
  }, [accountBalance, isLoadingAccountBalance]);

  return (
    <Flex
      flexDirection={'column'}
      w={'full'}
      h={'full'}
      flexGrow={1}
      gap={3}
      p={4}
    >
      <Flex justifyContent={'space-between'} align={'center'}>
        <Heading pl={3}>
          {isLoadingActiveAccount ? <Spinner /> : 'My Account'}
        </Heading>
        <Flex justify={'space-between'} align={'center'} mt={2}>
          <Link
            href={`https://massexplo.io/address/${
              (activeAccount?.address as string) ?? ''
            }`}
          >
            {isLoadingActiveAccount || activeAccount === undefined ? (
              <Skeleton />
            ) : (
              `${activeAccount.address.slice(0, 6) as string}...${
                activeAccount.address.slice(-4) as string
              }`
            )}
          </Link>
          {isLoadingAccountBalance || activeAccount === undefined ? (
            <Skeleton />
          ) : (
            <IconButton
              aria-label={'copy'}
              icon={<CopyIcon />}
              bg={'transparent'}
              onClick={() => {
                activeAccount?.address &&
                  navigator.clipboard.writeText(activeAccount?.address);
              }}
            />
          )}
        </Flex>
      </Flex>
      <Flex justifyContent={'space-between'} align={'center'} my={3}>
        <Button
          onClick={onTxOpen}
          w={'full'}
          bg={sendButtonBg}
          _hover={{ bg: sendButtonBgHover }}
        >
          Send Transaction
        </Button>
        <TxModal isOpen={isTxOpen} onClose={onTxClose} />
      </Flex>
      <Divider />
      <TableContainer
        flex={1}
        flexDirection={'column'}
        flexGrow={1}
        w={'full'}
        scrollBehavior={'smooth'}
        overflowY={'scroll'}
      >
        <Table h={'full'} w={'full'}>
          <Thead bg={headerBg} position={'sticky'} top={0}>
            <Tr>
              <Th color={colorMode === 'light' ? 'black' : 'white'}>Token</Th>
              <Th color={colorMode === 'light' ? 'black' : 'white'} isNumeric>
                Balance
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>MAS</Td>
              <Td isNumeric>{masBalance}</Td>
            </Tr>
            {isLoadingTokenList || !tokenList
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <Tr key={idx}>
                    <Td>
                      <Skeleton />
                    </Td>
                    <Td isNumeric>
                      <Skeleton />
                    </Td>
                  </Tr>
                ))
              : (tokenList?.tokens as string[])?.map((token) => (
                  <TokenRow key={token} token={token} />
                ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Divider />
      <Flex justifyContent={'space-between'} position={'sticky'} bottom={0}>
        <Button
          aria-label={'Add Token'}
          leftIcon={<AddIcon color={'green.300'} />}
          bgColor={'gray.350'}
          mt={4}
          onClick={onAddOpen}
        >
          Add Token
        </Button>
        <AddTokenModal isOpen={isAddOpen} onClose={onAddClose} />
      </Flex>
    </Flex>
  );
};
