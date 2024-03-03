'use client';

import { AddIcon, AtSignIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Heading,
  List,
  ListItem,
  IconButton,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Flex,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { TxModal } from './SendTransactionModal';
import { useState } from 'react';
import { AddTokenModal } from './AddTokenModal';

export const TokenTab = () => {
  const { isOpen: isTxOpen, onOpen: onTxOpen, onClose: onTxClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();


  return (
    <Box w={'full'} h='33vh'>
      <Flex justifyContent={'space-between'}>
        <Heading mb={3} pl={3}>Account 0</Heading>
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
