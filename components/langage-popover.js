import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import { FR, GB, PT } from "country-flag-icons/react/3x2";
import { useTranslation } from 'next-i18next';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON } from '../constants';
import { useRouter } from 'next/router';
import { updateLangageStorage } from '../lib/storage/UserStorageFunctions';

// ----------------------------------------------------------------------
const sizeFlag = 45;
// ----------------------------------------------------------------------

export default function LanguagePopover(props) {
    const { t, i18n } = useTranslation();
    //const {t} = props;
    const { langage, setLangage } = props;
    const [open, setOpen] = useState(null);
    const router = useRouter();

    useEffect(() => {
      //i18n.changeLanguage(langage);
     // updateLangageStorage(langage);
      //router.push(router.pathname, {}, { locale: langage });
    
    
    
      console.log("CHANGE LANGAGE" ,langage);
    }, [langage])
    
    

    const LANGS = [
      {
        value: LANGAGE_ENGLISH,
        label: t('langEnglish'),
        icon: '/assets/icons/ic_flag_en.svg',
        content: <GB
        title={t('langEnglish')}
        style={{
            cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: sizeFlag - 5,
            height: sizeFlag - 5
        }}
        />,
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
        value: LANGAGE_FRENCH,
        label: t('langFrench'),
        icon: '/assets/icons/ic_flag_fr.svg',
        content: <FR
        title={t('langFrench')}
        style={{
            cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: '50px',
            height: '50px'
        }}
    />,
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
        value: LANGAGE_PORTUGUESE,
        label: t('langPortuguese'),
        icon: '/assets/icons/ic_flag_de.svg',
        content: <PT
        title={t('langPortuguese')}
        style={{
            cursor: 'pointer',
            //border: langage === 'fr' ? '3px solid var(--primary)' : '',
            borderRadius: '50%',
            width: '50px',
            height: '50px'
        }}
    />,
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
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
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
            >
              {/* <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} /> */}
              <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'}>
              <div>{option.smallFlag}</div>
              <div>{option.label}</div>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}