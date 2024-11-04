'use client';

import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr } from '@chakra-ui/react';
import { Args, bytesToStr, bytesToU256 } from '@massalabs/massa-web3';
import { useEffect, useState, useCallback } from 'react';

import { useActiveAccount } from '@/hooks/useActiveAccount';
import { useDeleteToken } from '@/hooks/useDeleteToken';
import { useMassaClient } from '@/hooks/useMassaClient';
import { invalidateTokens } from '@/hooks/useTokens';
import { ReadSCParameters, useReadSC } from '@/hooks/useReadSc';

export const TokenRow = ({ token }: { token: string }) => {
  const { isLoading: isLoadingAccount, data: account } = useActiveAccount();
  const readSC = useReadSC();
  const [balance, setBalance] = useState<number>(0);
  const [tokenName, setTokenName] = useState<string>('');
  const client = useMassaClient();
  const deleteToken = useDeleteToken();

  const setBalanceFromClient = useCallback(async () => {
    if (!client || !account) {
      return;
    }
    const readData: ReadSCParameters = {
      at: token,
      functionName: 'decimals',
      args: [],
    };

    let res = await readSC(readData);
    if (!res) {
      console.warn(`No response from readSC ${readData.functionName}`);
      return;
    }
    const decimals = new Args(res.data).nextU8();

    readData.functionName = 'symbol';
    res = await readSC(readData);
    if (!res) {
      console.warn(`No response from readSC ${readData.functionName}`);
      return;
    }
    const symbol = bytesToStr(Uint8Array.from(res.data!));
    setTokenName(symbol);

    const serAddr = new Args().addString(account.address).serialize();
    readData.args = serAddr;
    readData.functionName = 'balanceOf';
    res = await readSC(readData);
    if (!res) {
      console.warn(`No response from readSC ${readData.functionName}`);
      return;
    }
    const rBalance = bytesToU256(Uint8Array.from(res.data!));
    const balanceNormalized =
      Number(rBalance / BigInt(10 ** (Number(decimals) - 3))) / 10 ** 3;

    setBalance(balanceNormalized);
  }, [account, client, token, readSC]);

  useEffect(() => {
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
              address: token,
            }).then(() => {
              invalidateTokens();
            });
          }}
        />
      </Td>
    </Tr>
  );
};
