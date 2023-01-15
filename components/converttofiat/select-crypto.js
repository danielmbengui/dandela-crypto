import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { cryptocurrencies } from '../../__mocks__/cryptocurrencies';
import { useTranslation } from 'next-i18next';
import { NAMESPACE_LANGAGE_CRYPTO_CONVERTER } from '../../constants';
import { capitalizeFirstLetter } from '../../lib/func/func';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

export default function SelectCryptoCurrency(props) {
  const {cryptocurrency, onChangeCryptoCurrency} = props;
  const {t} = useTranslation([NAMESPACE_LANGAGE_CRYPTO_CONVERTER])
  const theme = useTheme();
  const [selectedCrypto, setSelectedCrypto] = React.useState(cryptocurrency ? cryptocurrency.name : "");

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
      <FormControl sx={{ width: {xs:250, md:300},  }}>
        <Select
          //multiple
          displayEmpty
          value={selectedCrypto}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{`${capitalizeFirstLetter(t('cryptocurrencies'))}`}</em>;
            }

            return selectedCrypto;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{`${capitalizeFirstLetter(t('cryptocurrencies'))}`}</em>
          </MenuItem>
          {
            cryptocurrencies.map((cryptocurrency, index) => {
              return(
                <MenuItem
              key={cryptocurrency.name + index}
              value={cryptocurrency.name}
              style={getStyles(cryptocurrency.name, selectedCrypto, theme)}
            >
              {cryptocurrency.name}
            </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}