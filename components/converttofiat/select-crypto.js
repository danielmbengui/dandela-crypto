import React, {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

function getStyles(name, selectedCrypto, theme) {
  return {
    fontWeight:
      selectedCrypto.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



export default function SelectCryptoCurrency(props) {
  const {cryptocurrency, onChangeCryptoCurrency, cryptocurrencies, disabled} = props;
  const {t} = useTranslation([NAMESPACE_LANGAGE_CRYPTO_CONVERTER])
  const theme = useTheme();
  const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrency ? cryptocurrency.name : "");

  function getCryptoCurrency(name) {
    let i = 0;
    while (i < cryptocurrencies.length) {
      const cryptocurrency = cryptocurrencies[i];
      console.log("CRYPTO", cryptocurrency);
      if (cryptocurrency.name === name) {
        return (cryptocurrency);
      }
      i++;
    }
    return (null);
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCrypto(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value : "");
    const _cryptocurrency = getCryptoCurrency(event.target.value);
    console.log("RESULT crypto", event.target.value, _cryptocurrency);
    onChangeCryptoCurrency(_cryptocurrency);
  };

  return (
    <div>
      <FormControl sx={{ width: {xs:250, md:300},}} disabled={disabled}>
        <Select
          //multiple
          sx={{height: INPUT_HEIGHT,}}
          displayEmpty
          value={selectedCrypto}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <Stack sx={{height:INPUT_HEIGHT}} alignItems={'center'} justifyContent={'center'}>
                <Typography variant='body2'><em>{`${capitalizeFirstLetter(t('cryptocurrencies'))}`}</em></Typography>
              </Stack>;
            }

            return <Stack sx={{height:INPUT_HEIGHT}} alignItems={'center'} justifyContent={'center'}>
              <Typography variant='body2' sx={{fontWeight:'bold'}}>{selectedCrypto}</Typography>
            </Stack>;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
          <Typography variant='body2'><em>{`${capitalizeFirstLetter(t('cryptocurrencies'))}`}</em></Typography>
          </MenuItem>
          {
            cryptocurrencies.map((cryptocurrency, index) => {
              return(
                <MenuItem
              key={cryptocurrency.name + index}
              value={cryptocurrency.name}
              style={getStyles(cryptocurrency.name, selectedCrypto, theme)}
            >
              <Typography variant='body2' sx={{fontWeight:cryptocurrency.name === selectedCrypto ? 'bold' : ''}}>{cryptocurrency.name}</Typography>
            </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}