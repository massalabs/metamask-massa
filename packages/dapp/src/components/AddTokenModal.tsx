import { useAddToken } from '@/hooks/useAddToken';
import { invalidateTokens } from '@/hooks/useTokens';
import { AccountToken } from '@/types/account-token';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useMemo, useRef, useState} from 'react';

export const AddTokenModal = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [addTokenParams, setAccountTokenParams] = useState<string>('');

  const addToken = useAddToken();

  const isFormValid = useMemo(() => {
    if (addTokenParams === '') {
      //TODO: Show error message
      return false;
    }
    return true;
  }, [addTokenParams]);

  return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new token</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Token Address</FormLabel>
              <Input ref={initialRef} placeholder='Token Address' value={addTokenParams} onChange={
                (evt) => {
                  setAccountTokenParams(evt.target.value)
                }
              }/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button disabled={!isFormValid} colorScheme='blue' mr={3} onClick={
              async () => {
                  await addToken({address: addTokenParams});
                  invalidateTokens();
                  onClose()
              }
            }>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
