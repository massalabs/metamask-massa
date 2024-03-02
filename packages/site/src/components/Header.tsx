import { Select } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getThemePreference, getSnap } from '../utils';
import { HeaderButtons } from './Buttons';
import { SnapLogo } from './SnapLogo';
import { Toggle } from './Toggle';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border?.default};
`;

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Header = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const theme = useTheme();
  const { state, dispatch, provider } = useContext(MetaMaskContext);
  const [currentAccount, setCurrentAccount] = useState<{
    name: string;
    address: string;
  } | null>({ name: 'Account 0', address: '' });
  const [accountList, setAccountList] = useState<
    { name: string; address: string }[]
  >([
    { name: 'Account 1', address: '' },
    { name: 'Account 2', address: '' },
  ]);

  const [currentNetwork, setCurrentNetwork] = useState<string | null>(
    'Mainnet',
  );
  const [networkList, setNetworkList] = useState<string[]>([
    'Buildnet',
    'Testnet',
  ]);

  const handleConnectClick = async () => {
    try {
      // This function will only be triggerable if a provider is available
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await connectSnap(provider!);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const installedSnap = await getSnap(provider!);

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <SnapLogo color={theme.colors.icon?.default} size={36} />
        <Title>Massa</Title>
      </LogoWrapper>
      <RightContainer>
        <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        />
        <Select>
          {currentAccount !== null ? (
            <option value="0">{currentAccount!.name}</option>
          ) : (
            <option value="0">Select Account</option>
          )}
          {accountList.map((account, index) => (
            <option key={index} value={index}>
              {account.name}
            </option>
          ))}
        </Select>
        <Select>
          {currentNetwork !== null ? (
            <option value="0">{currentNetwork}</option>
          ) : (
            <option value="0">Select Network</option>
          )}
          {networkList.map((network, index) => (
            <option key={index} value={index}>
              {network}
            </option>
          ))}
        </Select>
        <HeaderButtons state={state} onConnectClick={handleConnectClick} />
      </RightContainer>
    </HeaderWrapper>
  );
};
