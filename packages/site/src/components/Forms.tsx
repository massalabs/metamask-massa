import { useState, useEffect, FC, FormEventHandler } from 'react';
import { ICallData, ITransactionData } from '@massalabs/massa-web3';

export const SCcallForm: FC<{ onSubmit: (message: ICallData) => void}> = ({onSubmit}) => {
    const [form, setForm] = useState<ICallData>({
        fee: 0n,
        maxGas: 0n,
        targetAddress: '',
        functionName: '',
        parameter: []
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
                placeholder='Fee'
                value={form.fee.toString()}
                onChange={(event) => setForm({...form, fee: BigInt(event.target.value)})}
            />
            <input
                type="text"
                placeholder='Max Gas'
                value={form.maxGas.toString()}
                onChange={(event) => setForm({...form, maxGas: BigInt(event.target.value)})}
            />
            <input
                type="text"
                placeholder='Coins'
                value={getCoins()}
                onChange={(event) => setCoins(event.target.value)}
            />
            <input
                type="text"
                placeholder='Target Address'
                value={form.targetAddress}
                onChange={(event) => setForm({...form, targetAddress: event.target.value})}
            />
            <input
                type="text"
                placeholder='Function Name'
                value={form.functionName}
                onChange={(event) => setForm({...form, functionName: event.target.value})}
            />
            <input
                type="text"
                placeholder='Params'
                value={(form.parameter as number[]).map(toString).join(',')}
                onChange={(event) => setForm({...form, parameter: event.target.value.split(',').map(parseInt)})}
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
