'use client';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { useMemo } from 'react';

export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = useMemo(() => {
    if (colorMode === 'light') {
      return <MoonIcon />;
    }
    return <SunIcon />;
  }, [colorMode]);

  return <IconButton onClick={toggleColorMode} icon={icon} aria-label={''} />;
};
