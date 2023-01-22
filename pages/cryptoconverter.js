import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import { Box, Button, Container, Grid, Pagination, Stack, TextField, Typography } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductCard } from '../components/product/product-card';
import SelectCryptoCurrency from '../components/converttofiat/select-crypto';
import SelectFiat from '../components/converttofiat/select-fiat';
import RepeatIcon from '@mui/icons-material/Repeat';
import IconButton from '@mui/material/IconButton';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import { currencies } from '../__mocks__/currencies';
import { CryptoConvertListToolbar } from '../components/cryptoconvert/crypto-converter-toolbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, PAGE_LINK_CRYPTO_CONVERTER, TAB_LANGAGES, TAB_NAMEPACES } from '../constants';
import { useTranslation } from 'next-i18next';
import CustomInput from '../components/custom/custom-input';
import { capitalizeAllWord, capitalizeFirstLetter, roundNumber } from '../lib/func/func';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import { styled, useTheme } from '@mui/material/styles';
import CustomAutoComplete from '../components/custom/custom-autocomplete';


export default function CryptoConverterPage(props){
  const {langage, setLangage, cryptocurrencies} = props;
  const {t} = useTranslation([NAMESPACE_LANGAGE_COMMON]);
  const [amount, setAmount] = useState(1);
  const [cryptocurrency, setCryptoCurrency] = useState(cryptocurrencies ? cryptocurrencies[0] : "");
  const [currency, setCurrency] = useState(currencies ? currencies[0] : "");
  const [result, setResult] = useState(0);
  const [price, setPrice] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [cryptoToFiat, setCryptoToFiat] = useState(true);
  const [directionConvert, setDirectionConvert] = useState({xs:"column", sm: "row"});
const theme = useTheme();

  const onChangeCryptoCurrency = (_cryptocurrency) => {
      setCryptoCurrency(_cryptocurrency);
      //setPrice(cryptoToFiat ? roundNumber(_cryptocurrency[currency.id]) : roundNumber(1 / _cryptocurrency[currency.id], 6));
  }
  const onChangeCurrency = (_currency) => {
    setCurrency(_currency);
    setPrice(cryptoToFiat ? roundNumber(cryptocurrency[_currency.id], 8) : roundNumber(1 / cryptocurrency[_currency.id], 8));
  }
  const onChangeAmount = (event) => {
    const _amount = event.target.value;
    setAmount(_amount);
}

  const onChangeDirectionConvert = () => {
    const newCryptoToFiat = !cryptoToFiat;
    setCryptoToFiat(newCryptoToFiat);
    console.log("ON change convert", newCryptoToFiat, newCryptoToFiat ? cryptocurrency[currency.id] : 0, newCryptoToFiat ? 0 : 1 / cryptocurrency[currency.id])
    setPrice(newCryptoToFiat ? roundNumber(cryptocurrency[currency.id], 8) : roundNumber(1 / cryptocurrency[currency.id], 8));
    const _directionConvertNew = newCryptoToFiat ? {xs:"column", sm: "row"} : {xs:"column-reverse", sm: "row-reverse"};
    setDirectionConvert(_directionConvertNew);
}

  useEffect(() => {
    setPrice(cryptoToFiat ? roundNumber(cryptocurrency[currency.id], 8) : roundNumber(1 / cryptocurrency[currency.id], 8));
  
  }, [result, cryptocurrency]);
  

  return (
    <>
      <Head>
        <title>
          {`Dandela | ${t('menuCryptoConverter')}`}
        </title>
        <meta name="description" content={t('description_page', {ns:NAMESPACE_LANGAGE_CRYPTO_CONVERTER})} />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <CustomPagetitle title={t('menuCryptoConverter', {ns:NAMESPACE_LANGAGE_COMMON})} />
        <Container maxWidth={false} sx={{py:3}}>
          {/* */}
          <Grid container justifyContent={'center'} alignItems={'center'} mb={3}>
            <Grid item xs={12} sm sx={{textAlign: 'center', verticalAlign: 'middle' }}>
              <CustomInput disabled={result>0} label={capitalizeFirstLetter(t('amount'))} value={amount} onChange={onChangeAmount} />
            </Grid>
          </Grid>
          <Grid container direction={directionConvert} justifyContent={'center'} alignItems={'stretch'} spacing={{ xs: 1, sm: 0 }}>
            <Grid item xs={12} sm sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
{
  /*
                      <SelectCryptoCurrency disabled={result>0 || !amount || amount <= 0} cryptocurrency={cryptocurrency} cryptocurrencies={cryptocurrencies} onChangeCryptoCurrency={onChangeCryptoCurrency} />

  */
}
              
              <div style={{display:'flex', justifyContent:'center'}}>
                <CustomAutoComplete 
                t={t}
                disabled={result>0 || !amount || amount <= 0}
                item={cryptocurrency}
                onChange={onChangeCryptoCurrency}
                list={cryptocurrencies} />
                </div>
            </Grid>
            
            <Grid item xs={12} sm={1} sx={{ textAlign: 'center' }}>
              <Grid container sx={{ height: '100%' }} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <IconButton disabled={result>0 || !amount || amount <= 0} color="primary" aria-label="swap" onClick={onChangeDirectionConvert}>
                  <RepeatIcon color={result>0 || !amount || amount <= 0 ? `grey${theme.palette.mode}` : "primary"} sx={{ transform: { xs: 'rotate(90deg)', sm: 'rotate(0deg)' }, transition: 'transform 150ms ease', }} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12} sm sx={{textAlign: 'center' }}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <CustomAutoComplete 
                t={t}
                disabled={result>0 || !amount || amount <= 0}
                item={currency}
                onChange={onChangeCurrency}
                list={currencies} />
                </div>
{
  /*
                <SelectFiat disabled={result>0 || !amount || amount <= 0} currency={currency} onChangeCurrency={onChangeCurrency} />

  */
}
            </Grid>
          </Grid>


          <Grid container justifyContent={'center'} alignItems={'center'} mt={2}>
            <Typography variant='body2' sx={{display: 'inline-flex' }}>
              {cryptocurrency && currency && cryptoToFiat && `1 ${cryptocurrency.symbol.toString().toUpperCase()} (${cryptocurrency.name}) ≃ ${price}${currency.symbol} (${currency.name})`}
              {cryptocurrency && currency && !cryptoToFiat && `1 ${currency.symbol} (${currency.name}) ≃ ${price} ${cryptocurrency.symbol.toString().toUpperCase()} (${cryptocurrency.name}) `}
              </Typography>
          </Grid>
          <Grid container justifyContent={'center'} alignItems={'center'} mt={3}>
            <Button variant='contained' onClick={async (event) => {
              const _result = amount * price;
              setResult(roundNumber(_result, 8));
              event.preventDefault();
              event.target.blur();
              //console.log("OBBBBJECT", event.target)
            }} 
            disabled={result>0 || !amount || amount <= 0}
            sx={{":hover": {
              backgroundColor:'secondary.main'}}}
           >{`${capitalizeAllWord(t('convert'))}`}</Button>
          </Grid>
          <Grid container justifyContent={'center'} alignItems={'center'} mt={3} sx={{display:result ? 'flex' : 'none',}}>
            <Button variant='contained' onClick={() => {
              setResult(0);
            }} sx={{":hover": {
                backgroundColor:'secondary.main'
            }}}>{`${capitalizeAllWord(t('new'))}`}</Button>
          </Grid>
          <Grid container justifyContent={'center'} alignItems={'center'} spacing={1} sx={{py:3, display: result > 0 ? 'inline-flex' : 'none'}}>
            <Grid item>
            <Typography variant='body1'>{`${amount} ${!cryptoToFiat ? currency.symbol : cryptocurrency.symbol}`}</Typography>
            </Grid>
            <Grid item>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>{`≃ ${cryptoToFiat ? roundNumber(result) : roundNumber(result, 6)} ${cryptoToFiat ? currency.symbol : cryptocurrency.symbol}`}</Typography>
            </Grid>
          </Grid>
  
          <Box sx={{ pt: 3, display: 'none' }}>
            <Grid
              container
              spacing={3}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              //display: 'flex',
              display: 'none',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  )
};

export async function getStaticProps({ locale }) {
  return {
      props: {
        //tabPrice: response,
          ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
          // Will be passed to the page component as props
      },
  }
}

//export default CryptoConverterPage;
