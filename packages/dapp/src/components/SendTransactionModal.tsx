import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { fromMAS } from '@massalabs/massa-web3';
import { useMemo, useRef, useState } from 'react';

import { invalidateOperations } from '@/hooks/useOperations';
import { useTransfer } from '@/hooks/useTransfer';

export const TxModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (abort: boolean) => void;
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [recipientAddress, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [fee, setFee] = useState<string>('0');
  const transfer = useTransfer();

  const isFormValid = useMemo(() => {
    if (recipientAddress === '' || amount === '' || fee === '') {
      // TODO: Show error message
      return false;
    }
    try {
      BigInt(amount);
      BigInt(fee);
    } catch (error) {
      return false;
    }
    return true;
  }, [recipientAddress, amount, fee]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        onClose(true);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make a transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Receiver Address</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Receiver Address"
              value={recipientAddress}
              onChange={(evt) => {
                setReceiver(evt.target.value);
              }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Amount in MAS</FormLabel>
            <Input
              placeholder="Amount in MAS"
              value={amount}
              onChange={(evt) => {
                setAmount(evt.target.value);
              }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Fee</FormLabel>
            <Input
              placeholder="Fee"
              value={fee}
              onChange={(evt) => {
                setFee(evt.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={!isFormValid}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await transfer({
                recipientAddress,
                amount: fromMAS(amount).toString(),
                fee: fromMAS(fee).toString(),
              });
              invalidateOperations();
              onClose(false);
            }}
          >
            Send
          </Button>
          <Button
            onClick={() => {
              onClose(true);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
