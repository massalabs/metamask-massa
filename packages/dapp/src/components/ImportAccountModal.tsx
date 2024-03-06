'use client';

import { LockIcon, ViewIcon } from '@chakra-ui/icons';
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
  const [showSecret, setShowSecret] = useState(false);
  const importAccount = useImportAccount();

  const isFormValid = useMemo(() => {
    if (publicKey === '' || secretKey === '') {
      // TODO: Show error message
      return false;
    }
    return true;
  }, [publicKey, secretKey]);

  const getSecretType = () => {
    if (showSecret) {
      return 'text';
    }
    return 'password';
  };
  const getSecretTypeIcon = () => {
    if (showSecret) {
      return <ViewIcon />;
    }
    return <LockIcon />;
  };

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
            <Input
              type={getSecretType()}
              placeholder="Enter Secret Key"
              value={secretKey ?? ''}
              onChange={(evt) => {
                setSecretKey(evt.target.value);
              }}
            />
            <Button onClick={() => setShowSecret(!showSecret)}>
              {getSecretTypeIcon()}
            </Button>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={!isFormValid}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
