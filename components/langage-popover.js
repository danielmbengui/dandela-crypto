import { useState, useEffect, useContext } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover, Typography } from '@mui/material';
import { FR, GB, PT } from "country-flag-icons/react/3x2";
import { useTranslation } from 'next-i18next';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON } from '../constants';
import { useRouter } from 'next/router';
import { updateLangageStorage } from '../lib/storage/UserStorageFunctions';
import { LangageModeProviderContext } from '../context/LangageProvider';
import { getFlag } from '../icons/FlagIcons';

// ----------------------------------------------------------------------
const sizeFlag = 45;
// ----------------------------------------------------------------------

export default function LanguagePopover(props) {
    const { t, i18n } = useTranslation();
    //const {t} = props;
    const { langage, setLangage } = props;
    const [open, setOpen] = useState(null);
    //const router = useRouter();
    const langageMode = useContext(LangageModeProviderContext);

    useEffect(() => {
      i18n.changeLanguage(langage);
      updateLangageStorage(langage);
      //router.push(router.pathname, {}, { locale: langage });
      langageMode.toggleLangageMode(langage);
      console.log("CHANGE LANGAGE" ,langage);
    }, [langage])
    
    

    const LANGS = [
      {
        value: LANGAGE_FRENCH,
        label: t('langFrench'),
        //icon: '/assets/icons/ic_flag_fr.svg',
        content: getFlag(LANGAGE_FRENCH, sizeFlag-5, { title: t('langFrench')}),
        smallFlag: getFlag(LANGAGE_FRENCH, sizeFlag / 1.5, { title: t('langFrench')}),
      },
      {
        value: LANGAGE_PORTUGUESE,
        label: t('langPortuguese'),
        //icon: '/assets/icons/ic_flag_pt.svg',
        content: getFlag(LANGAGE_PORTUGUESE, sizeFlag-5, { title: t('langPortuguese')}),
        smallFlag: getFlag(LANGAGE_PORTUGUESE, sizeFlag / 1.5, { title: t('langPortuguese')}),
      },
      {
        value: LANGAGE_ENGLISH,
        label: t('langEnglish'),
        //icon: '/assets/icons/ic_flag_en.svg',
        content: getFlag(LANGAGE_ENGLISH, sizeFlag-5, { title: t('langEnglish')}),
        smallFlag: getFlag(LANGAGE_ENGLISH, sizeFlag / 1.5, { title: t('langEnglish')}),
      },
    ];
    
    function getLang(value) {
      let i = 0;
      while (i < LANGS.length) {
        if (LANGS[i].value === value) {
          return (LANGS[i]);
        }
        i++;
      }
      return (LANGS[0]);
    }

    const onChangeLanguage = (_language) => {
        setLangage(_language);
        //updateLangageStorage(_language);
        
        handleClose();
        console.log("LANGAE", _language)
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
          //padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.dark, theme.palette.action.focusOpacity),
          }),
        }}
      >
        
        {
          /* <img src={LANGS[0].icon} alt={LANGS[0].label} /> */
          getLang(langage).content
          //LANGS[0].content
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
              color:'white'
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === langage}
            onClick={() => {
              onChangeLanguage(option.value);
            }}
            sx={{
              color:"text.primary",
              backgroundColor: option.value == langage ?'primary.light' : '',
              '&:hover': {
                backgroundColor:'primary.main',
                color: option.value == langage ? 'inherit' : 'text.withPrimaryBack',
              }
            }}
            >
              {/* <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}
              <Stack alignItems="flex-end" direction={'row'} spacing={1} sx={{cursor:'pointer'}}>
              {option.smallFlag} <label style={{cursor:'pointer'}}>{option.label}</label>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}