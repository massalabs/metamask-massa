'use client';

import { useActiveAccount } from '@/hooks/useActiveAccount';
import { Args } from '@massalabs/massa-web3';
import { useEffect } from 'react';

const Test = () => {
  const { data: account } = useActiveAccount();

  useEffect(() => {
    const ser = new Args().addString('My Message').serialize();
    console.log('My Message serialized', ser);
  }, [account]);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Test;
