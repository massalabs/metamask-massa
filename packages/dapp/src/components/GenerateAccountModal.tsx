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
import { useGenerateNewAccount } from '@/hooks/useGenerateNewAccount';

export const GenerateAccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const generateAccount = useGenerateNewAccount();
  const [accountName, setAccountName] = useState<string>('');
  const isFormValid = useMemo(() => accountName.length !== 0, [accountName]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure you want to generate a new account ?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Account Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Account Name"
              value={accountName}
              onChange={(evt) => {
                setAccountName(evt.target.value);
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!isFormValid}
            colorScheme="blue"
            mr={3}
            onClick={async () => {
              await generateAccount({ name: accountName });
              invalidateAccountList();
              invalidateActiveAccount();
              onClose();
            }}
          >
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
