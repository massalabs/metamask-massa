import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

export const TxModal = ({isOpen, onClose}: {isOpen: boolean, onClose: (rcv: string, amount: string) => void}) => {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          onClose('', '')
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Receiver Address</FormLabel>
              <Input ref={initialRef} placeholder='Receiver Address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount in MAS</FormLabel>
              <Input placeholder='Amount in MAS' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Send
            </Button>
            <Button onClick={
              () => {
                onClose('', '')
              }
            }>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}
