import { useAddToken } from '@/hooks/useAddToken';
import { AccountToken } from '@/types/account-token';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useMemo, useRef, useState} from 'react';

export const AddTokenModal = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [addTokenParams, setAccountTokenParams] = useState<AccountToken>({
    name: '',
    address: '',
    decimals: 0
  });

  const addToken = useAddToken();

  const isFormValid = useMemo(() => {
    if (addTokenParams.name === '' || addTokenParams.address === '' || addTokenParams.decimals === 0) {
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
          <FormControl mt={4}>
              <FormLabel>Token Name</FormLabel>
              <Input placeholder='Token Name' value={addTokenParams.name} onChange={
                (evt) => {
                  setAccountTokenParams({ ...addTokenParams, name: evt.target.value })
                }
              }/>
            </FormControl>
            <FormControl>
              <FormLabel>Token Address</FormLabel>
              <Input ref={initialRef} placeholder='Token Address' value={addTokenParams.address} onChange={
                (evt) => {
                  setAccountTokenParams({ ...addTokenParams, address: evt.target.value })
                }
              }/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Token Decimals</FormLabel>
              <Input placeholder='Decimals' value={addTokenParams.decimals} onChange={
                (evt) => {
                  setAccountTokenParams({ ...addTokenParams, decimals: parseInt(evt.target.value) })
                }
              }/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button disabled={!isFormValid} colorScheme='blue' mr={3} onClick={
              () => {
                  addToken(addTokenParams);
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
