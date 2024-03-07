'use client';

import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr } from '@chakra-ui/react';
import type { IReadData } from '@massalabs/massa-web3';
import { Args } from '@massalabs/massa-web3';
import { useEffect, useState, useCallback } from 'react';

import { useActiveAccount } from '@/hooks/useActiveAccount';
import { useDeleteToken } from '@/hooks/useDeleteToken';
import { useMassaClient } from '@/hooks/useMassaClient';
import { invalidateTokens } from '@/hooks/useTokens';

export const TokenRow = ({ token }: { token: string }) => {
  const { isLoading: isLoadingAccount, data: account } = useActiveAccount();
  const [balance, setBalance] = useState<number>(0);
  const [tokenName, setTokenName] = useState<string>('');
  const client = useMassaClient();
  const deleteToken = useDeleteToken();

  const setBalanceFromClient = useCallback(async () => {
    if (!client || !account) {
      return;
    }
    const readData = {
      targetAddress: token,
      targetFunction: 'decimals',
      parameter: [],
      maxGas: BigInt(1000000000),
      callerAddress: account.address,
    } as IReadData;

    const dRes = await client.smartContracts().readSmartContract(readData);
    const decimals = new Args(dRes.returnValue).nextU8();

    readData.targetFunction = 'symbol';
    const nRes = await client.smartContracts().readSmartContract(readData);
    setTokenName(new TextDecoder().decode(nRes.returnValue));

    const serAddr = new Args().addString(account.address).serialize();
    readData.parameter = serAddr;
    readData.targetFunction = 'balanceOf';
    const res = await client.smartContracts().readSmartContract(readData);
    const rBalance = new Args(res.returnValue).nextU256();
    const balanceNormalized =
      Number(rBalance / BigInt(10 ** (Number(decimals) - 3))) / 10 ** 3;
    setBalance(balanceNormalized);
  }, [account, client, token]);

  useEffect(() => {
    // eslint-disable-next-line no-void, @typescript-eslint/no-floating-promises
    setBalanceFromClient();
  }, [account, client, setBalanceFromClient]);

  return isLoadingAccount ? (
    <Tr>
      <Td>Loading...</Td>
    </Tr>
  ) : (
    <Tr key={token}>
      <Td>{tokenName}</Td>
      <Td isNumeric>
        {Number(balance)}
        <IconButton
          ml={3}
          aria-label={'delete-token'}
          icon={<DeleteIcon />}
          onClick={() => {
            deleteToken({
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
              accountAddress: account!.address,
              address: token,
            }).then((res) => {
              console.log(res);
            });
            invalidateTokens();
          }}
        />
      </Td>
    </Tr>
  );
};
