import React, { useContext, useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Switch } from "@mui/material";
import { updateScreenModeStorage } from '../lib/storage/UserStorageFunctions';
import { ThemeModeProviderContext } from '../context/ThemeProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_COMMON } from '../constants';

const CustomSwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    'var(--text-secondary)',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: "var(--primary-opacity)"
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: "var(--primary)",
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: "var(--primary-opacity)",
        borderRadius: 20 / 2,
    },
}));

export default function MaterialUISwitch() {
    const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_COMMON]);
    const theme = useTheme();
    const themeMode = useContext(ThemeModeProviderContext);
    const [checked, setChecked] = useState(theme.palette.mode === 'dark' ? true : false);

    useEffect(() => {
        setChecked(theme.palette.mode === 'dark' ? true : false);
    }, [themeMode, theme.palette.mode])

    const onChangeMode = (event) => {
        themeMode.toggleColorMode();
        setChecked(event.target.checked ? true : false);
        updateScreenModeStorage(event.target.checked ? 'dark' : 'light');
    }
    return (
        <FormControlLabel
        control={ <CustomSwitch inputProps={{ 'aria-label': theme.palette.mode === 'light' ? `${t('lightMode')}` : `${t('darkMode')}` }} checked={checked} onChange={onChangeMode} />}
      />
    )
}
