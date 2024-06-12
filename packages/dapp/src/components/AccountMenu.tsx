import { DownloadIcon } from '@chakra-ui/icons';
import {
  Spinner,
  IconButton,
} from '@chakra-ui/react';

import {
  useActiveAccount,
} from '@/hooks/useActiveAccount';
import { useShowCredentials } from '@/hooks/useShowCredentials';

export const AccountMenu = () => {
  const { isLoading: activeAccountLoading } =
    useActiveAccount();
  const showCredentials = useShowCredentials();

  return (
    <>
      {activeAccountLoading ? (
        <Spinner />
      ) : (
        <IconButton onClick={(evt) => {
          evt.preventDefault();
          showCredentials();
        }} icon={<DownloadIcon />} aria-label={''} />
      )}
    </>
  );
};
