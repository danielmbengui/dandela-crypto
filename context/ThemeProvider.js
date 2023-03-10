import React, { useState, useMemo, createContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DEFAULT_SCREEN_MODE, STORAGE_SCREEN_MODE } from '../constants';
import { palette } from '@mui/system';
import { getScreenModeStorage, updateScreenModeStorage } from '../lib/storage/UserStorageFunctions';

export const ThemeModeProviderContext = createContext({ toggleColorMode: () => { } });

export default function ThemeModeProvider({ children, screenMode }) {
  const [mode, setMode] = useState(screenMode);

  const black = "#000000";
  const white = "#FFFFFF";
  const blueLight = "#378aff";
  const blue = "#094397";
  const blueDark = "#000c25";
  const blueDarkOpacity = "#000c2580";
  const grey = "#727171";
  const greyLight = "#efefef";
  const greyDark = "#1d1d1d";

  useEffect(() => {
    let _screenMode = DEFAULT_SCREEN_MODE;
    if (typeof (Storage) !== "undefined") {
      if (getScreenModeStorage() === null) {
        updateScreenModeStorage(_screenMode);
      }
      _screenMode = getScreenModeStorage();
    }
    setMode(_screenMode);
  }, [screenMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    //window.localStorage.setItem(STORAGE_SCREEN_MODE, mode);
    updateScreenModeStorage(mode);
    console.log('Change SCREEEN MODE theme', mode);
  }, [mode]);

  const themeMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1920
          }
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
            styleOverrides: {
              root: {
                textTransform: 'none'
              },
              sizeSmall: {
                padding: '6px 16px'
              },
              sizeMedium: {
                padding: '8px 20px'
              },
              sizeLarge: {
                padding: '11px 24px'
              },
              textSizeSmall: {
                padding: '7px 12px'
              },
              textSizeMedium: {
                padding: '9px 16px'
              },
              textSizeLarge: {
                padding: '12px 16px'
              },
            }
          },
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true
            }
          },
          MuiCardContent: {
            styleOverrides: {
              root: {
                padding: '32px 24px',
                backgroundColor: mode === 'dark' ? greyDark : '',
                '&:last-child': {
                  paddingBottom: '32px'
                },
              }
            }
          },
          MuiCardHeader: {
            defaultProps: {
              titleTypographyProps: {
                variant: 'h6'
              },
              subheaderTypographyProps: {
                variant: 'body2'
              }
            },
            styleOverrides: {
              root: {
                padding: '32px 24px'
              }
            }
          },
          MuiCssBaseline: {
            styleOverrides: {
              '*': {
                boxSizing: 'border-box',
                margin: 0,
                padding: 0
              },
              html: {
                MozOsxFontSmoothing: 'grayscale',
                WebkitFontSmoothing: 'antialiased',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                width: '100%'
              },
              body: {
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                minHeight: '100%',
                width: '100%',
              },
              '#__next': {
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                height: '100%',
                width: '100%'
              }
            }
          },
          MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                borderColor: '#E6E8F0'
              }
            }
          },
          MuiTableHead: {
            styleOverrides: {
              root: {
                backgroundColor: '#F3F4F6',
                '.MuiTableCell-root': {
                  color: '#374151'
                },
                borderBottom: 'none',
                '& .MuiTableCell-root': {
                  borderBottom: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase'
                },
                '& .MuiTableCell-paddingCheckbox': {
                  paddingTop: 4,
                  paddingBottom: 4
                }
              }
            }
          }
        },
        palette: {
          bluelight: {
            main: blueLight,
            light: blueLight,
            dark: blueLight,
            contrastText: black,
          },
          bluedark: {
            main: blueDark,
            light: blueDark,
            dark: blueDark,
            contrastText: white,
          },
          greydark: {
            main: greyDark,
          },
          grey: {
            main: grey,
          },
          greylight: {
            main: greyLight,
          },
          success: {
            main: '#14B8A6',
            light: '#43C6B7',
            dark: '#0E8074',
            contrastText: '#FFFFFF'
          },
          info: {
            main: '#2196F3',
            light: '#64B6F7',
            dark: '#0B79D0',
            contrastText: '#FFFFFF'
          },
          warning: {
            main: '#FFB020',
            light: '#FFBF4C',
            dark: '#B27B16',
            contrastText: '#FFFFFF'
          },
          error: {
            main: '#D14343',
            light: '#DA6868',
            dark: '#922E2E',
            contrastText: '#FFFFFF'
          },
          mode,
          ...(mode === 'light'
            ? {
              neutral: {
                100: '#F3F4F6',
                200: '#E5E7EB',
                300: '#D1D5DB',
                400: '#9CA3AF',
                500: '#6B7280',
                600: '#4B5563',
                700: '#374151',
                800: '#1F2937',
                900: '#000c25'
              },
              action: {
                active: '#6B7280',
                focus: 'rgba(55, 65, 81, 0.12)',
                hover: 'rgba(55, 65, 81, 0.04)',
                selected: 'rgba(55, 65, 81, 0.08)',
                disabledBackground: 'rgba(55, 65, 81, 0.12)',
                disabled: 'rgba(55, 65, 81, 0.26)'
              },
              background: {
                //default: '#F9FAFC',
                default: white,
                paper: greyLight,
                menu: white,
              },
              divider: '#E6E8F0',
              primary: {
                main: blue,
                light: '#378aff',
                dark: '#3832A0',
                contrastText: '#FFFFFF'
              },
              secondary: {
                main: '#378aff',
                light: '#3FC79A',
                dark: '#0B815A',
                contrastText: '#FFFFFF'
              },
              text: {
                primary: black,
                secondary: white,
                disabled: 'rgba(55, 65, 81, 0.48)'
              }
            }
            : {
              neutral: {
                100: '#F3F4F6',
                200: '#E5E7EB',
                300: '#D1D5DB',
                400: '#9CA3AF',
                500: '#6B7280',
                600: '#4B5563',
                700: '#374151',
                800: '#1F2937',
                900: '#000c25'
              },
              action: {
                active: '#6B7280',
                focus: 'rgba(55, 65, 81, 0.12)',
                hover: 'rgba(55, 65, 81, 0.04)',
                selected: 'rgba(55, 65, 81, 0.08)',
                disabledBackground: 'rgba(55, 65, 81, 0.12)',
                disabled: 'rgba(55, 65, 81, 0.26)'
              },
              background: {
                //default: '#F9FAFC',
                default: black,
                paper: greyDark,
                menu: black,
              },
              divider: '#E6E8F0',
              primary: {
                main: blueLight,
                light: '#000c25',
                dark: '#3832A0',
                contrastText: '#FFFFFF'
              },
              secondary: {
                main: '#000c25',
                light: '#3FC79A',
                dark: '#0B815A',
                contrastText: '#FFFFFF'
              },
              text: {
                primary: white,
                secondary: black,
                disabled: 'rgba(55, 65, 81, 0.48)'
              }
            }

          )
        },
        shape: {
          borderRadius: 8
        },
        shadows: [
          'none',
          '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
          '0px 1px 2px rgba(100, 116, 139, 0.12)',
          '0px 1px 4px rgba(100, 116, 139, 0.12)',
          '0px 1px 5px rgba(100, 116, 139, 0.12)',
          '0px 1px 6px rgba(100, 116, 139, 0.12)',
          '0px 2px 6px rgba(100, 116, 139, 0.12)',
          '0px 3px 6px rgba(100, 116, 139, 0.12)',
          '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
          '0px 5px 12px rgba(100, 116, 139, 0.12)',
          '0px 5px 14px rgba(100, 116, 139, 0.12)',
          '0px 5px 15px rgba(100, 116, 139, 0.12)',
          '0px 6px 15px rgba(100, 116, 139, 0.12)',
          '0px 7px 15px rgba(100, 116, 139, 0.12)',
          '0px 8px 15px rgba(100, 116, 139, 0.12)',
          '0px 9px 15px rgba(100, 116, 139, 0.12)',
          '0px 10px 15px rgba(100, 116, 139, 0.12)',
          '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
          '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
          '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
          '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
          '0px 25px 50px rgba(100, 116, 139, 0.25)',
          '0px 25px 50px rgba(100, 116, 139, 0.25)',
          '0px 25px 50px rgba(100, 116, 139, 0.25)',
          '0px 25px 50px rgba(100, 116, 139, 0.25)'
        ],
        typography: {
          button: {
            fontWeight: 600
          },
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          body1: {
            fontSize: '1.5rem',
            fontWeight: 400,
            lineHeight: 1.5
          },
          body2: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.57
          },
          subtitle1: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 2,
            letterSpacing: '0.5px',
          },
          subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.57
          },
          overline: {
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            lineHeight: 2.5,
            textTransform: 'uppercase'
          },
          caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.66
          },
          h1: {
            fontWeight: 700,
            fontSize: '3rem',
            lineHeight: 1.375
          },
          h2: {
            fontWeight: 700,
            fontSize: '2.75rem',
            lineHeight: 1.375
          },
          h3: {
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.375
          },
          h4: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.375
          },
          h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.375
          },
          h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.375
          }
        }
      }),
    [mode],
  );

  return (
    <ThemeModeProviderContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeProviderContext.Provider>
  );
}