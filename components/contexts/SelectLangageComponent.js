import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'next-i18next';
import { InputBase, NativeSelect, Stack, Typography } from '@mui/material';
import { ARRAY_LANGAGES, GENERAL_FONT_FAMILY, _NAMESPACE_LANGAGE_COMMON_ } from '../../_mocks_/_settings_items_';
import { useLangMode } from '../../contexts/LangModeProvider';
import { getFlag } from '../icons/FlagIcons';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: '0px',
    },
    '& .MuiInputBase-input': {
        borderRadius: 15,
        position: 'relative',
        backgroundColor: 'transparent',
        //border: '1px solid var(--primary)',
        fontSize: 14,
        //padding: '5px 26px 5px 12px',
        //py:'5px',
        //px:'5px',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '1px',
        paddingBottom: '1px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 15,
            //borderColor: 'var(--primary)',
            border: '2px solid var(--primary)'
            //boxShadow: '0 0 0 0.2rem var(--primary)',
        },
    },
}));


const styleSelect = {
    ".MuiSelect-icon": {
        color: 'var(--primary)'
    },
    ".MuiSelect-select": {
        //borderColor:'var(--primary)',
        color: 'var(--primary)',
        fontWeight: 'bold',
        fontSize: 14,
        //height: 20,
        background: 'transparent',
        "&:hover, &:focus, &:active": {
            background: 'transparent',
            color: 'var(--primary)',
            border: 'none'
        },
    },
};

const styleMenu = {
    '.MuiList-root': {
        //backgroundColor: 'red', // ou la couleur de fond que vous souhaitez utiliser
        backgroundColor: 'var(--background-menu)', // ou la couleur de fond que vous souhaitez utiliser
    },
    '.MuiMenuItem-root': {
        //backgroundColor:'yellow',
        "&:hover": {
            background: 'var(--orange600)',
            color: 'black',
            border: 'none'
        },

        "&:focus, &:active": {
            background: 'var(--primary)',
            color: 'black',
            border: 'none'
        },
    }
};


export default function DropdownLangageComponent() {
    const { t, i18n } = useTranslation();

    //const [age, setAge] = useState(lang);

    const [lang, setLang] = useLangMode();
    const langs = ARRAY_LANGAGES.map((lang, index) => {
        return(
            {
                value: lang,
                label:t(`langs.${lang}`),
                icon: getFlag(lang)
            }
        )
    })

    const handleChange = (event) => {
        const _lang = event.target.value;
        if (ARRAY_LANGAGES && ARRAY_LANGAGES.includes(_lang)) {
            i18n.changeLanguage(_lang);
            //document.documentElement.setAttribute(STORAGE_LANG_MODE, _lang);
            setLang(_lang);
            //i18n.changeLanguage(_lang);
            //window.localStorage.setItem(STORAGE_LANG_MODE, _lang);
            //alert(`The new langage is: ${_lang}`);
        }
      };

    useEffect(() => {
       // alert(lang)
    }, [lang])

    return (
        <FormControl variant="standard" size='small'>
        <Select
            aria-label='Select langage'
            id="select-langage"
            value={lang}
            autoWidth
            onChange={handleChange}
            input={<BootstrapInput />}
            sx={styleSelect}
            MenuProps={{
                sx: styleMenu,
            }}
            
        >
            {
                ARRAY_LANGAGES && ARRAY_LANGAGES.map((_lang, index) => {
                    return (
                        <MenuItem key={`${_lang}-${index}`} value={_lang}>
                            <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{
                            }}>
                                {
                                    getFlag(_lang)
                                }
                                <Typography sx={{
                                    textTransform:'capitalize',
                                    fontFamily:GENERAL_FONT_FAMILY
                                }}>{t(`langs.${_lang}`, {ns:_NAMESPACE_LANGAGE_COMMON_})}</Typography>
                            </Stack>
                        </MenuItem>
                    )
                })
            }
        </Select>
    </FormControl>
    );
}