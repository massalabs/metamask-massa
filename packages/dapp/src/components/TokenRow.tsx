'use client';

import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr } from '@chakra-ui/react';
import type { IReadData } from '@massalabs/massa-web3';
import { Args } from '@massalabs/massa-web3';
import { useEffect, useState } from 'react';

import { useActiveAccount } from '@/hooks/useActiveAccount';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useDeleteToken } from '@/hooks/useDeleteToken';
import { useMassaClient } from '@/hooks/useMassaClient';
import { invalidateTokens } from '@/hooks/useTokens';
import { AccountToken } from '@/types/account-token';

export const TokenRow = ({ token }: { token: string }) => {
  const { isLoading: isLoadingAccount, data: account } = useActiveAccount();
  const [balance, setBalance] = useState<number>(0);
  const [tokenName, setTokenName] = useState<string>('');
  const client = useMassaClient();
  const deleteToken = useDeleteToken();

  const setBalanceFromClient = async () => {
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

    console.log(token);
    const dRes = await client.smartContracts().readSmartContract(readData);
    const decimals = new Args(dRes.returnValue).nextU8();

    readData.targetFunction = 'symbol';
    console.log(readData);
    const nRes = await client.smartContracts().readSmartContract(readData);
    console.log(nRes.returnValue);
    const name = new TextDecoder().decode(nRes.returnValue);
    console.log(name);
    setTokenName(name);

    const serAddr = new Args().addString(account.address).serialize();
    readData.parameter = serAddr;
    readData.targetFunction = 'balanceOf';
    const res = await client.smartContracts().readSmartContract(readData);
    const rBalance = new Args(res.returnValue).nextU256();
    const balanceNormalized =
      Number(rBalance / BigInt(10 ** (Number(decimals) - 3))) / 10 ** 3;
    setBalance(balanceNormalized);
  };

  useEffect(() => {
    setBalanceFromClient();
  }, [account, client]);

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
              accountAddress: account.address,
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
