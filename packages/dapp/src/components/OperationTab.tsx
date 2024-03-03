'use client';

import { useActiveAccount } from '@/hooks/useActiveAccount';
import { useOperations } from '@/hooks/useOperations';
import { SunIcon, WarningIcon } from '@chakra-ui/icons';
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
  Text,
  Skeleton,
  Link,
  Tooltip,
  Spinner
} from '@chakra-ui/react';
import { useState } from 'react';

export const OperationTab = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  const {isLoading: isLoadingOperations, data: operationsData} = useOperations();

  const getSkeletalOperations = () => {
    const array = Array.from({ length: 5 });
    return array.map((_, idx) => (
      <Tr key={idx}>
        <Td>
          <Spinner />
        </Td>
        <Td>
          <Spinner />
        </Td>
        <Td>
          <Spinner />
        </Td>
      </Tr>
    ));
  }
  const retreiveOperations = () => {
    console.log(operationsData);
    return (operationsData?.operations ?? []).slice(pageIndex * 5, pageIndex * 5 + 5).map((op, i) => (
      <Tr key={i}>
        <Td><WarningIcon/></Td>
        <Td><Tooltip label={op}>{op.slice(0, 25)+'...'}</Tooltip></Td>
        <Td><WarningIcon/></Td>
      </Tr>
    ))
  }

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
          <Tbody> {
          isLoadingOperations
              ? getSkeletalOperations()
              : retreiveOperations()
          }
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
