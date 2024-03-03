'use client';

import { SunIcon } from '@chakra-ui/icons';
import {
  Divider,
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useCounter,
  Flex,
  Button,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const OperationTab = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  const [operations, setOperations] = useState([
    { status: 'Pending', id: 'OP1234', type: 'Transfer' },
    { status: 'Pending', id: 'OP5678', type: 'Contract Call' },
    { status: 'Success', id: 'OP91011', type: 'Transfer' },
    { status: 'Success', id: 'OP121314', type: 'Contract Call' },
    { status: 'Pending', id: 'OP151617', type: 'Transfer' },
    { status: 'Pending', id: 'OP181920', type: 'Contract Call' },
    { status: 'Success', id: 'OP212223', type: 'Transfer' },
    { status: 'Success', id: 'OP242526', type: 'Contract Call' },
    { status: 'Pending', id: 'OP272829', type: 'Transfer' },
    { status: 'Pending', id: 'OP303132', type: 'Contract Call' },
    { status: 'Pending', id: 'OP1234', type: 'Transfer' },
    { status: 'Pending', id: 'OP5678', type: 'Contract Call' },
    { status: 'Success', id: 'OP91011', type: 'Transfer' },
    { status: 'Success', id: 'OP121314', type: 'Contract Call' },
    { status: 'Pending', id: 'OP151617', type: 'Transfer' },
    { status: 'Pending', id: 'OP181920', type: 'Contract Call' },
    { status: 'Success', id: 'OP212223', type: 'Transfer' },
    { status: 'Success', id: 'OP242526', type: 'Contract Call' },
    { status: 'Pending', id: 'OP272829', type: 'Transfer' },
    { status: 'Pending', id: 'OP303132', type: 'Contract Call' },
  ])

  useEffect(() => {
    setMaxPages(Math.ceil(operations.length / 5) - 1)
  }, [operations])

  return (
    <Box w={'full'}>
      <Heading mb={3} pl={3}>
        Operations
      </Heading>
      <Divider />
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead bg="teal">
            <Tr>
              <Th>Status</Th>
              <Th>Id</Th>
              <Th>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {operations.slice(pageIndex * 5, pageIndex * 5 + 5).map((op, i) => (
              <Tr key={i}>
                <Td>{op.status}</Td>
                <Td>{op.id}</Td>
                <Td>{op.type}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent={'space-between'} mt={3} gap={6} align={'center'}>
          <Button onClick={() => {
            if (pageIndex > 0)
              setPageIndex(pageIndex - 1)
          }}>Prev</Button>
          <Text >{pageIndex + 1}</Text>
          <Button onClick={() => {
            if (pageIndex < maxPages)
              setPageIndex(pageIndex + 1)
          }}>Next</Button>
      </Flex>
    </Box>
  );
};
