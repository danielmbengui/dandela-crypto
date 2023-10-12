import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { DEFAULT_THEME, GENERAL_FONT_FAMILY, STORAGE_THEME_MODE, THEME_DARK, THEME_LIGHT } from '../_mocks_/_settings_items_';
import { amber, green, grey, deepOrange } from '@mui/material/colors';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });


export default function ThemeModeProvider({ children, themeMode }) {
    const [mode, setMode] = useState(DEFAULT_THEME);

    useEffect(() => {
        setMode(themeMode);
        console.log("Init theme", themeMode)
    }, [themeMode])

    useEffect(() => {
        document.documentElement.setAttribute(STORAGE_THEME_MODE, mode);
        //window.localStorage.setItem(STORAGE_THEME_MODE, mode);
        console.log("Change theme", mode)
    }, [mode])

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    window.localStorage.setItem(STORAGE_THEME_MODE, prevMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
                    return(prevMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
                });
                
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    button: {
                      //fontSize: '1rem',
                      //fontFamily: GENERAL_FONT_FAMILY,
                    },
                    tooltip: {
                        //fontSize: '1rem',
                        fontFamily: GENERAL_FONT_FAMILY,
                      },
                  },
                components: {
                    // Name of the component
                    MuiTypography: {
                        styleOverrides: {
                            // Name of the slot
                            root: {
                              // Some CSS
                              fontFamily: "Roboto",
                              color:'var(--text)',
                            },
                          },
                    },
                    MuiTooltip: {
                        styleOverrides: {
                            // Name of the slot
                            root: {
                              // Some CSS
                              fontFamily: "Coolvetica",
                            },
                          },
                    }
                  },
                palette: {
                    mode,
                    background: {
                        default: 'var(--background)',
                        menu: 'var(--background-menu)',
                        paper: 'var(--background-menu)',
                        card: 'var(--background-menu)',
                        drawer: 'var(--background-menu)',
                    },
                    ...(mode === 'light'
                        ? {
                            // palette values for light mode
                            primary: deepOrange,
                            divider: 'var(--primary)',
                            text: {
                                primary: '#000000',
                                secondary: '#ffffff',
                            },
                        }
                        : {
                            // palette values for dark mode
                            primary: deepOrange,
                            divider: 'var(--primary)',
                            text: {
                                primary: '#fff',
                                secondary: "#000000",
                            },
                        }),
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}