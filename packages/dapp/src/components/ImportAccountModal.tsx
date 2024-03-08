'use client';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';

import { invalidateAccountList } from '@/hooks/useAccountList';
import { invalidateActiveAccount } from '@/hooks/useActiveAccount';
import { useImportAccount } from '@/hooks/useImportAccount';

export const ImportAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [publicKey, setPublicKey] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [show, setShow] = useState(false);
  const importAccount = useImportAccount();

  const isFormValid = useMemo(() => {
    if (publicKey === '' || secretKey === '') {
      // TODO: Show error message
      return false;
    }
    return true;
  }, [publicKey, secretKey]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import a new account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Public Key</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Enter Public Key"
              value={publicKey ?? ''}
              onChange={(evt) => {
                setPublicKey(evt.target.value);
              }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Secret Key</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                onChange={(evt) => {
                  setSecretKey(evt.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={!isFormValid}
            onClick={async () => {
              await importAccount({
                publicKey,
                privateKey: secretKey,
              });
              invalidateAccountList();
              invalidateActiveAccount();
              onClose();
            }}
          >
            Import
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
