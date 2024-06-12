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
  const { isLoading: activeAccountLoading, data: activeAccount } =
    useActiveAccount();
  const showCredentials = useShowCredentials();

  return (
    <>
      {activeAccountLoading ? (
        <Spinner />
      ) : (
        <IconButton onClick={(evt) => {
          evt.preventDefault();
          showCredentials({ address: activeAccount?.address});
        }} icon={<DownloadIcon />} aria-label={''} />
      )}
    </>
  );
};
