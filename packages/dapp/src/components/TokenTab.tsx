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
} from '@chakra-ui/react';
import { TxModal } from './SendTransactionModal';
import { useState } from 'react';

export const TokenTab = () => {
  const [txModal, setTxModal] = useState(false);

  const openTransactionModal = () => {
    setTxModal(!txModal);
  }

  return (
    <Box w={'full'} h='33vh'>
      <Flex justifyContent={'space-between'}>
        <Heading mb={3} pl={3}>Account 0</Heading>
        <Button rightIcon={<AtSignIcon />} onClick={openTransactionModal}>
          Send
        </Button>
        <TxModal isOpen={txModal} onClose={() => {
          setTxModal(false)
        }}/>
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
          <Tbody  >
            <Tr>
              <Td>Massa</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>Bearby</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider />
      <Button
        aria-label={'Add Token'}
        leftIcon={<AddIcon color={'green.300'} />}
        bgColor={'gray.350'}
        mt={4}
      >
          Add Token
      </Button>
    </Box>
  );
};
