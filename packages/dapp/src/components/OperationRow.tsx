'use client';

import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { AlertIcon, Link, Td, Tooltip, Tr } from '@chakra-ui/react';
import type { IOperationData, ITransactionOpType } from '@massalabs/massa-web3';
import type {
  ICallSmartContractOpType,
  IExecSmartContractOpType,
  IRollBuyOpType,
  IRollSellOpType,
} from '@massalabs/massa-web3/dist/esm/interfaces/OperationTypes';
import { useMemo } from 'react';

export const OperationRow = ({ operation }: { operation: IOperationData }) => {
  const getStatusIcon = useMemo(() => {
    if (operation.op_exec_status === true) {
      return <CheckCircleIcon color={'green'} />;
    } else if (operation.op_exec_status === false) {
      return <AlertIcon color={'red'} />;
    }
    return <WarningIcon color={'yellow'} />;
  }, [operation]);

  const getOperationType = useMemo(() => {
    if (
      (operation.operation.content.op as ITransactionOpType).Transaction !==
      undefined
    ) {
      return 'Transaction';
    } else if (
      (operation.operation.content.op as ICallSmartContractOpType).CallSC !==
      undefined
    ) {
      return 'Smart Contract Call';
    } else if (
      (operation.operation.content.op as IExecSmartContractOpType).ExecuteSC !==
      undefined
    ) {
      return 'Smart Contract Execution';
    } else if (
      (operation.operation.content.op as IRollBuyOpType).RollBuy !== undefined
    ) {
      return 'Roll Buy';
    } else if (
      (operation.operation.content.op as IRollSellOpType).RollSell !== undefined
    ) {
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
