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
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, PAGE_LINK_CRYPTO_CONVERTER } from '../constants';
import { useTranslation } from 'next-i18next';
import CustomInput from '../components/custom/custom-input';
import { capitalizeAllWord, capitalizeFirstLetter } from '../lib/func/func';
import { CustomPagetitle } from '../components/custom/custom-page-title';

const CryptoConverterPage = (props) => {
  const {langage, setLangage} = props;
  const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_COMMON]);
  const [amount, setAmount] = useState(1);
  const [cryptocurrency, setCryptoCurrency] = useState(cryptocurrencies ? cryptocurrencies[0] : "");
  const [currency, setCurrency] = useState(currencies ? currencies[0] : "");
  const [result, setResult] = useState(0);
  const [price, setPrice] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const [cryptoToFiat, setCryptoToFiat] = useState(true);
  const [directionConvert, setDirectionConvert] = useState({xs:"column", sm: "row"});

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
};

useEffect(() => {
    onChangeLanguage(langage);
}, [langage]);

  const onChangeCryptoCurrency = (_crypto) => {
      setCryptoCurrency(_crypto);
  }
  const onChangeCurrency = (_currency) => {
    setCurrency(_currency);
}
  const onChangeAmount = (event) => {
    const _amount = event.target.value;
    setAmount(_amount);
}

  const onChangeDirectionConvert = () => {
    //const newResult = !cryptoToFiat;
    setCryptoToFiat(!cryptoToFiat);
    const _directionConvertNew = cryptoToFiat ? {xs:"column-reverse", sm: "row-reverse"} : {xs:"column", sm: "row"};
    setDirectionConvert(_directionConvertNew);
}

  useEffect(() => {
    async function init() {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrency.id}&vs_currencies=${currency.id}&include_24hr_change=true`;
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        "Access-Control-Allow-Origin": "*",
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then((resp) => {
        //console.log("BITCOIN price usd", resp.json());
        return (resp.json())
      });
      //console.log("BITCOIN price usd", response);
      setPrice(response[cryptocurrency.id][currency.id]);
      const _result = cryptoToFiat ? amount * price : amount / price;
    setResult(_result);
      //setChangePercent(response[cryptocurrency.id][`${currency.name}_24h_change`]);
      //usd_24h_change
    }
    
    init();
  }, [result]);

  return (
    <>
      <Head>
        <title>
          {`Dandela | ${t('menuCryptoConverter', {ns:NAMESPACE_LANGAGE_COMMON})}`}
        </title>
        <meta name="description" content={t('description_page', {ns:NAMESPACE_LANGAGE_CRYPTO_CONVERTER})} />
        <link rel="canonical" href={`${PAGE_LINK_CRYPTO_CONVERTER}`} />
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
              <CustomInput label={capitalizeFirstLetter(t('amount'))} value={amount} onChange={onChangeAmount} />
            </Grid>
          </Grid>
          <Grid container direction={directionConvert} justifyContent={'center'} alignItems={'stretch'} spacing={{ xs: 1, sm: 0 }}>
            <Grid item xs={12} sm sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <SelectCryptoCurrency cryptocurrency={cryptocurrency} onChangeCryptoCurrency={onChangeCryptoCurrency} />
            </Grid>
            <Grid item xs={12} sm={1} sx={{ textAlign: 'center' }}>
              <Grid container sx={{ height: '100%' }} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <IconButton color="primary" aria-label="swap" onClick={onChangeDirectionConvert}>
                  <RepeatIcon color="primary" sx={{ transform: { xs: 'rotate(90deg)', sm: 'rotate(0deg)' }, transition: 'transform 150ms ease', }} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12} sm sx={{textAlign: 'center' }}>
              <SelectFiat currency={currency} onChangeCurrency={onChangeCurrency} />
            </Grid>
          </Grid>


          <Grid container justifyContent={'center'} alignItems={'center'} mt={2}>
            <Typography sx={{ fontWeight: 'bold' }}>
              {cryptocurrency && currency && `1 ${cryptocurrency.name} (${cryptocurrency.symbol.toString().toUpperCase()}) ≃ ${price} ${currency.symbol}`}
              </Typography>
          </Grid>
          <Grid container justifyContent={'center'} alignItems={'center'} mt={3}>
            <Button variant='contained' onClick={() => {
              const _result = cryptoToFiat ? amount * price : amount / price;
              setResult(_result);
            }} sx={{":hover": {
                backgroundColor:'secondary.main'
            }}}>{`${capitalizeAllWord(t('convert'))}`}</Button>
          </Grid>
          <Grid container justifyContent={'center'} alignItems={'center'} mt={3} sx={{display: result > 0 ? 'flex' : 'none'}}>
            <Typography variant='h1' sx={{ fontWeight: 'bold' }}>{result} {currency.symbol}</Typography>
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
          ...(await serverSideTranslations(locale, [
              NAMESPACE_LANGAGE_COMMON,
              NAMESPACE_LANGAGE_CRYPTO_CONVERTER,
              //'footer',
          ], null, [
            LANGAGE_ENGLISH,
              LANGAGE_FRENCH,  
              LANGAGE_PORTUGUESE
          ])),
          // Will be passed to the page component as props
      },
  }
}

export default CryptoConverterPage;
