import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../contexts/ThemeModeProvider';
import { MoonIcon, SunIcon } from '../icons/IconifiyIcons';


export default function SwitchThemeComponent() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        //width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
       // bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        //p: 3,
      }}
    >
      
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <MoonIcon size={30} color={'var(--primary)'} /> : <SunIcon size={30} color={'var(--primary)'} />}
      </IconButton>
    </Box>
  );
}