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
  Flex,
  Button,
  Text,
  Tooltip,
  Spinner,
  useColorMode
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { OperationRow } from './OperationRow';
import { useOperationsData } from '@/hooks/useOperationsData';

export const OperationTab = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const {colorMode} = useColorMode();

  const {isLoading: isLoadingOperations, data: operationsData} = useOperations();
  const operations = useOperationsData(operationsData?.operations ?? []);

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

  const retreiveOperations = useMemo(() => {
    return operations.reverse().slice(pageIndex * 5, pageIndex * 5 + 5).map((op, i) => (
      <OperationRow key={i} operation={op} />
    ))
  }, [operationsData, pageIndex, operations]);

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
              <Th color={colorMode === 'light' ? 'black' : 'white'
              }>Status</Th>
              <Th color={colorMode === 'light' ? 'black' : 'white'
              }>Id</Th>
              <Th color={colorMode === 'light' ? 'black' : 'white'
              }>Type</Th>
            </Tr>
          </Thead>
          <Tbody> {
          isLoadingOperations
              ? getSkeletalOperations()
              : retreiveOperations
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
