'use client';

import { useActiveAccount } from "@/hooks/useActiveAccount";
import { useMassaClient } from "@/hooks/useMassaClient";
import { AccountToken } from "@/types/account-token";
import { Td, Tr } from "@chakra-ui/react";
import { Args, IReadData } from "@massalabs/massa-web3";
import { useEffect, useState } from "react";

export const TokenRow = ({ token }: { token: AccountToken }) => {
  const { isLoading: isLoadingAccount, data: account } = useActiveAccount();
  const [balance, setBalance] = useState<number>(3413);
  const client = useMassaClient();

  const setBalanceFromClient = async () => {
    if (!client || !account) {
      return;
    }
    let readData = {
      targetAddress: token.address,
      targetFunction: 'decimals',
      parameter: [],
      maxGas: BigInt(1000000000),
      callerAddress: account!.address,
    } as IReadData;

    const dRes = await client.smartContracts().readSmartContract(readData);
    const decimals = new Args(dRes!.returnValue).nextU8();


    const serAddr = new Args().addString(account!.address).serialize();
    readData.parameter = serAddr;
    readData.targetFunction = 'balanceOf';
    const res = await client.smartContracts().readSmartContract(readData);
    const rBalance = new Args(res!.returnValue).nextU256();
    const balanceNormalized = Number(rBalance / BigInt(10**(Number(decimals) - 3))) / 10**3;
    setBalance(balanceNormalized);
  }

  useEffect( () => {
    setBalanceFromClient();
  }, [account, client]);

  return (
      isLoadingAccount ? <Tr><Td>Loading...</Td></Tr> :
      <Tr key={token.address}>
        <Td>{token.name}</Td>
        <Td isNumeric>{Number(balance)}</Td>
      </Tr>
  );
}

