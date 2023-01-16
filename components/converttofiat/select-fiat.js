import React, {useState} from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { currencies } from '../../__mocks__/currencies';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_CRYPTO_CONVERTER } from '../../constants';
import { capitalizeFirstLetter } from '../../lib/func/func';
import { Stack, Typography } from '@mui/material';

const INPUT_HEIGHT = 40;
const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: {xs:200, md:250},
    },
  },
};

const names = [
  'Bitcoin',
  'Ethereum',
  'BNB',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, selectedCurrency, theme) {
  return {
    fontWeight:
      selectedCurrency.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getCurrency(name) {
  let i = 0;
  while (i < currencies.length) {
    const currency = currencies[i];
    console.log("CRYPTO", currency);
    if (currency.name === name) {
      return (currency);
    }
    i++;
  }
  return (null);
}

export default function SelectCurrency(props) {
  const {currency, onChangeCurrency, disabled} = props;
  const {t} = useTranslation([NAMESPACE_LANGAGE_CRYPTO_CONVERTER])
  const theme = useTheme();
  const [selectedCurrency, setSelectedCrypto] = useState(currency ? currency.name : "");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCrypto(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value : "");
    const _cryptocurrency = getCurrency(event.target.value);
    console.log("RESULT crypto", event.target.value, _cryptocurrency);
    onChangeCurrency(_cryptocurrency);
  };

  return (
    <div>
      <FormControl sx={{ width: {xs:250, md:300},  }} disabled={disabled}>
        <Select
          //multiple
          sx={{height: INPUT_HEIGHT}}
          displayEmpty
          value={selectedCurrency}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <Stack sx={{height:INPUT_HEIGHT}} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='body2'><em>{`${capitalizeFirstLetter(t('currencies'))}`}</em></Typography>
                </Stack>;
            }

            return <Stack sx={{height:INPUT_HEIGHT}} justifyContent={'center'} alignItems={'center'}>
              <Typography variant='body2' sx={{fontWeight: 'bold'}}>{selectedCurrency}</Typography>
            </Stack>;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
          <Typography variant='body2'><em>{`${capitalizeFirstLetter(t('currencies'))}`}</em></Typography>
          </MenuItem>
          {
            currencies.map((currency, index) => {
              return(
                <MenuItem
              key={currency.name + index}
              value={currency.name}
              style={getStyles(currency.name, selectedCurrency, theme)}
            >
              <Typography variant='body2' sx={{fontWeight:currency.name === selectedCurrency ? 'bold' : ''}}>{currency.name}</Typography>
            </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}