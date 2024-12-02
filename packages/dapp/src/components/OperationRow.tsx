'use client';

import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { AlertIcon, Link, Td, Tr } from '@chakra-ui/react';
import { rpcTypes } from '@massalabs/massa-web3';
import { useMemo } from 'react';

export const OperationRow = ({
  operation,
}: {
  operation: rpcTypes.OperationInfo;
}) => {
  const getStatusIcon = useMemo(() => {
    if (operation.op_exec_status === true) {
      return <CheckCircleIcon color={'green'} />;
    } else if (operation.op_exec_status === false) {
      return <AlertIcon color={'red'} />;
    }
    return <WarningIcon color={'yellow'} />;
  }, [operation]);

  const getOperationType = useMemo(() => {
    const { op } = operation.operation.content;

    if (!!op.Transaction) {
      return 'Transaction';
    } else if (!!op.CallSC) {
      return 'Smart Contract Call';
    } else if (!!op.ExecutSC) {
      return 'Smart Contract Execution';
    } else if (!!op.RollBuy) {
      return 'Roll Buy';
    } else if (!!op.RollSell) {
      return 'Roll Sell';
    }
    return 'Unknown';
  }, [operation]);

  return (
    <Tr key={operation.id}>
      <Td>{getStatusIcon}</Td>
      <Td>
        <Link href={`https://massexplo.io/tx/${operation.id}`}>
          {`${operation.id.slice(0, 25)}...`}
        </Link>
      </Td>
      <Td>{getOperationType}</Td>
    </Tr>
  );
};
