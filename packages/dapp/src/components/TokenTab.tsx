'use client';

import { AddIcon, AtSignIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Box,
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
  Text,
  IconButton,
  Link
} from '@chakra-ui/react';
import { TxModal } from './SendTransactionModal';
import { useState } from 'react';
import { AddTokenModal } from './AddTokenModal';
import { useActiveAccount } from '@/hooks/useActiveAccount';
import { useTokens } from '@/hooks/useTokens';
export type AccountToken = { name: string, address: string, decimals: number };

export const TokenTab = () => {
  const { isOpen: isTxOpen, onOpen: onTxOpen, onClose: onTxClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const {isLoading: isLoadingActiveAccount, data: activeAccount} = useActiveAccount();
  const {isLoading: isLoadingTokenList, data: tokenList} = useTokens();

  const getTokenList = () => {
    if (isLoadingTokenList) {
      const array = Array.from({ length: 5 });
      return array.map((_, idx) => (
        <Tr key={idx}>
          <Td>
            <Spinner />
          </Td>
          <Td isNumeric>
            <Spinner />
          </Td>
        </Tr>
      ));
    }
    return (tokenList?.tokens as AccountToken[])?.map((token) => (
      <Tr key={token.address}>
        <Td>{token.name}</Td>
        <Td isNumeric>{token.decimals}</Td>
      </Tr>
    ));
  }

  return (
    <Box w={'full'} h='33vh'>
      <Flex justifyContent={'space-between'} align={'center'}>
        <Heading mb={3} pl={3}>{
          isLoadingActiveAccount ? <Spinner /> : activeAccount?.name
        }</Heading>
        <Flex mt={2} mr={10}>
          <Link mt={2} as='u'>
            {isLoadingActiveAccount ? <Spinner /> : activeAccount?.address.slice(0, 6) + '...' + activeAccount?.address.slice(-4)}
          </Link>
          <IconButton  aria-label={'copy'} icon={<CopyIcon />} bg={'transparent'} onClick={() => {
          activeAccount?.address && navigator.clipboard.writeText(activeAccount?.address);
          }}/>
        </Flex>
        <Button rightIcon={<AtSignIcon />} onClick={onTxOpen}>
          Send
        </Button>
        <TxModal isOpen={isTxOpen} onClose={onTxClose}/>
      </Flex>
      <Divider />
      <TableContainer maxH={'full'} scrollBehavior={'smooth'} overflowY={'scroll'}>
        <Table>
          <Thead bg="teal" position={'sticky'} top={0}>
            <Tr>
              <Th>Token</Th>
              <Th isNumeric>Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getTokenList()}
          </Tbody>
        </Table>
      </TableContainer>
      <Divider />
      <Flex justifyContent={'space-between'}>
        <Button
          aria-label={'Add Token'}
          leftIcon={<AddIcon color={'green.300'} />}
          bgColor={'gray.350'}
          mt={4}
          onClick={onAddOpen}
        >
            Add Token
        </Button>
        <AddTokenModal isOpen={isAddOpen} onClose={onAddClose}/>
      </Flex>
    </Box>
  );
};
