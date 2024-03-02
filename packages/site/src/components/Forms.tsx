import type { ICallData, ITransactionData } from '@massalabs/massa-web3';
import { Args } from '@massalabs/massa-web3';
import type { FC } from 'react';
import { useState } from 'react';
import type { CallSCParameters } from 'src/hooks';

export const SCcallForm: FC<{ onSubmit: (message: ICallData) => void}> = ({onSubmit}) => {
  const [form, setForm] = useState<Omit<CallSCParameters, 'nickname'>>({
    fee: 0n,
    functionName: '',
    at: '',
    args: [],
    coins: '',
    nonPersistentExecution: {
      isNPE: false,
      maxGas: '',
    },
  });

  function handleSubmit(event: any): void {
    event.preventDefault();
    onSubmit(form);
  }

  function getCoins(): string {
    if (form.coins === undefined) {
      return '';
    }
    return form.coins!.toString();
  }

  function setCoins(value: string) {
    if (value !== '') {
        setForm({...form, coins: BigInt(value)});
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Fee"
        value={form.fee.toString()}
        onChange={(event) =>
          setForm({ ...form, fee: BigInt(event.target.value) })
        }
      />
      <input
        type="text"
        placeholder="Coins"
        value={getCoins()}
        onChange={(event) => setCoins(event.target.value)}
      />
      <input
        type="text"
        placeholder="Target Address"
        value={form.at}
        onChange={(event) => setForm({ ...form, at: event.target.value })}
      />
      <input
        type="text"
        placeholder="Function Name"
        value={form.functionName}
        onChange={(event) =>
          setForm({ ...form, functionName: event.target.value })
        }
      />
      <input
        type="text"
        placeholder="Arguments (comma separated)"
        value={form.args.map(toString).join(',')}
        onChange={(event) =>
          setForm({
            ...form,
            args: event.target.value.split(',').map(parseInt),
          })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export const SignMessageForm: FC<{ onSubmit: (message: string) => void}> = ({onSubmit}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Type message to sign...'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit">Sign</button>
    </form>
  );
}

export const TransferForm: FC<{ onSubmit: (data: ITransactionData) => void}> = ({onSubmit}) => {
  const [form, setForm] = useState<ITransactionData>({
    fee: 0n,
    recipientAddress: '',
    amount: 0n,
  });

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Fee'
        value={form.fee.toString()}
        onChange={(event) => setForm({...form, fee: BigInt(event.target.value)})}
      />
      <input
        type="text"
        placeholder='Recipient Address'
        value={form.recipientAddress}
        onChange={(event) => setForm({...form, recipientAddress: event.target.value})}
      />
      <input
        type="text"
        placeholder='Amount'
        value={form.amount.toString()}
        onChange={(event) => setForm({...form, amount: BigInt(event.target.value)})}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
