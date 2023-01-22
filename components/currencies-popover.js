import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover, Grid, Typography } from '@mui/material';
import { FR, GB, PT } from "country-flag-icons/react/3x2";
import { useTranslation } from 'next-i18next';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, TEXT_SYMBOL_DOLLARS, TEXT_SYMBOL_EUROS, TEXT_SYMBOL_LIVRE_STERLING } from '../constants';
import { useRouter } from 'next/router';
import { updateCurrencyStorage, updateLangageStorage } from '../lib/storage/UserStorageFunctions';

// ----------------------------------------------------------------------
const sizeFlag = 45;
// ----------------------------------------------------------------------

export default function CurrenciesPopover(props) {
    const { t, i18n } = useTranslation(NAMESPACE_LANGAGE_COMMON);
    //const {t} = props;
    const { langage, setLangage, currency, setCurrency } = props;
    const [open, setOpen] = useState(null);
    //const router = useRouter();

    useEffect(() => {
      //i18n.changeLanguage(langage);
      updateLangageStorage(langage);
      updateCurrencyStorage(currency);
      console.log("CHANGE CURRENCY" ,currency);
    }, [currency])
    
    

    const CURRENCIES = [
      {
        value: 'Dollars',
        label: 'Dollars',
        symbol: TEXT_SYMBOL_DOLLARS,
        content: <Typography sx={{fontWeight:'bold'}}>{TEXT_SYMBOL_DOLLARS}</Typography>,
        //label: t('langEnglish'),
        icon: '/assets/icons/ic_flag_en.svg',
        smallFlag: <GB
        title={t('langEnglish')}
        style={{
            cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: sizeFlag / 1.5,
            height: sizeFlag / 1.5
        }}
        />
      },
      {
        value: 'Euros',
        label: 'Euros',
        symbol: TEXT_SYMBOL_EUROS,
        content: <Typography sx={{fontWeight:'bold'}}>{TEXT_SYMBOL_EUROS}</Typography>,
        //label: t('langFrench'),
        icon: '/assets/icons/ic_flag_fr.svg',
        smallFlag: <FR
        title={t('langFrench')}
        style={{
            cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: sizeFlag / 1.5,
            height: sizeFlag / 1.5
        }}
        />
      },
      {
        value: "Livre Sterling",
        label: "Livre Sterling",
        symbol: TEXT_SYMBOL_LIVRE_STERLING,
        content: <Typography sx={{fontWeight:'bold'}}>{TEXT_SYMBOL_LIVRE_STERLING}</Typography>,
        //label: t('langPortuguese'),
        icon: '/assets/icons/ic_flag_de.svg',
        smallFlag: <PT
        title={t('langPortuguese')}
        style={{
            cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: sizeFlag / 1.5,
            height: sizeFlag / 1.5
        }}
        />
      },
    ];
    
    function getCurrency(value) {
      let i = 0;
      while (i < CURRENCIES.length) {
        if (CURRENCIES[i].value === value) {
          return (CURRENCIES[i]);
        }
        i++;
      }
      return (CURRENCIES[0]);
    }

    const onChangeCurrency = (_currency) => {
        setCurrency(_currency);
        //updateLangageStorage(_language);
        handleClose();
        console.log("CURRENCY", _currency)
    };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        
        {
          /* <img src={CURRENCIES[0].icon} alt={CURRENCIES[0].label} /> */
          getCurrency(currency).content
          //CURRENCIES[0].content
        }
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {CURRENCIES.map((option) => (
            <MenuItem key={option.value} selected={option.value === langage}
            onClick={() => {
              onChangeCurrency(option.value);
            }}
            >
              {/* <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}
              <Grid container spacing={2}>
                <Grid item xs={1} sx={{fontWeight:'bold'}}>
                {option.symbol}
                </Grid>
                <Grid xs item>
                {option.label}
                </Grid>
              </Grid>
              {
                /*
                <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'}>
              <div style={{fontWeight:'bold'}}>{option.symbol}</div>
              <div>{option.label}</div>
              </Stack>
                */
              }
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}