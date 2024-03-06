'use client';

import { useActiveAccount } from '@/hooks/useActiveAccount';
import { invalidateOperations, useOperations } from '@/hooks/useOperations';
import { RepeatIcon, SunIcon, WarningIcon } from '@chakra-ui/icons';
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
  useColorMode,
  useColorModeValue,
  Skeleton,
  IconButton
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { OperationRow } from './OperationRow';
import { useOperationsData } from '@/hooks/useOperationsData';

export const OperationTab = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const {colorMode} = useColorMode();
  const headerBg = useColorModeValue('teal.400', 'teal.600');

  const {isLoading: isLoadingOperations, data: operationsData} = useOperations();
  const {data: operations, reset} = useOperationsData(operationsData?.operations ?? []);

  const getSkeletalOperations = () => {
    const array = Array.from({ length: 7});
    return array.map((_, idx) => (
      <Tr key={idx}>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
      </Tr>
    ));
  }

  const retreiveOperations = useMemo(() => {
    return operations.toReversed().slice(pageIndex * 5, pageIndex * 5 + 5).map((op, i) => (
      <OperationRow key={i} operation={op} />
    ))
  }, [operationsData, pageIndex, operations]);

  return (
    <Flex flexDirection="column" w={'full'} flexGrow={1} gap={3} p={4}>
      <Flex justifyContent={'space-between'} align={'center'}>
        <Heading mb={3} pl={3}>
          Operations
        </Heading>
        <IconButton aria-label="Refresh" icon={<RepeatIcon />} onClick={reset}/>
      </Flex>
      <Divider />
      <Flex flexDirection={"column"} w={"full"} flexGrow={1} align={'center'}>
        <TableContainer flex={1} flexDirection={"column"} w={"full"} flexGrow={1}>
          <Table>
            <Thead bg={headerBg}>
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
            isLoadingOperations || !operationsData || operationsData.operations.length === 0
                ? getSkeletalOperations()
                : retreiveOperations
            }
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Flex justifyContent={'space-between'} mt={3} gap={6} align={'center'} position={'sticky'} bottom={0}>
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
    </Flex>
  );
};
