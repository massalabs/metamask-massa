import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { useTransfer, TransferParams } from '@/hooks/useTransfer';

export const TxModal = ({isOpen, onClose}: {isOpen: boolean, onClose: (abort: boolean) => void}) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [recipientAddress, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<string>('0');
  const [fee, setFee] = useState<string>('0');
  const transfer = useTransfer();
  const isFormValid = useMemo(() => {
    if (recipientAddress === '' || amount === '' || fee === '') {
      //TODO: Show error message
      return false;
    }
    try {
      BigInt(amount);
      BigInt(fee);
    } catch (e) {
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
            onClose(true)
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make a transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Receiver Address</FormLabel>
              <Input ref={initialRef} placeholder='Receiver Address' value={recipientAddress} onChange={
                (evt) => {
                  setReceiver(evt.target.value)
                }
              }/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Amount in MAS</FormLabel>
              <Input placeholder='Amount in MAS' value={amount} onChange={
                (evt) => {
                  if (evt.target.value === '') {
                    setAmount('0');
                  }
                  else {
                    setAmount(evt.target.value)
                  }
                }
              }/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Fee</FormLabel>
              <Input placeholder='Fee' value={fee} onChange={
                (evt) => {
                  if (evt.target.value === '') {
                    setFee('0');
                  }
                  else {
                    setFee(evt.target.value)
                  }
                }
              }/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} disabled={!isFormValid} onClick={
              () => {
                transfer({recipientAddress, amount, fee});
                onClose(false)
              }
            }>
              Send
            </Button>
            <Button onClick={() => {
                onClose(true)
            }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
