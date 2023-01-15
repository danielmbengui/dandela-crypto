import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, PAGE_LINK_HOME } from '../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import axios from 'axios';
import { currencies } from '../__mocks__/currencies';

export default function HomePage(props) {
  const { tabPrice, langage, setLangage } = props;
  const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_HOME]);

  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLangage(language);
  };

  useEffect(() => {
    onChangeLanguage(langage);
  }, [langage]);

  return (
    <>
      <Head>
        <title>
          {`Dandela | ${t('menuHome')}`}
        </title>
        <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_HOME })} />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <CustomPagetitle title={`${t('menuHome')}`} />
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >

            {
              tabPrice.map((cryptocurrency, index) => {
                return (
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                    key={cryptocurrency.name + index}
                  >
                    <CryptoComponent cryptocurrency={cryptocurrency} currency={{ id:'usd', name: "dollars", symbol: "$" }} />
                  </Grid>
                )
              })
            }
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const tabCryptoCurrencies = [];
  const tabCurrencies = [];
  cryptocurrencies.forEach((cryptocurrency) => {
    tabCryptoCurrencies.push(cryptocurrency.id);
  });
  currencies.forEach((currency) => {
    tabCurrencies.push(currency.id);
  });
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tabCryptoCurrencies.join(",")}&vs_currencies=${tabCurrencies.join(",")}&include_24hr_change=true`;
  const response = await axios.get(url).then((resp) => {
    
    let array = [];
    for (let i in cryptocurrencies) {
      const crypto = cryptocurrencies[i];
      const cryptoData = resp.data[crypto.id];
      cryptoData.id = crypto.id;
      cryptoData.name = crypto.name;
      cryptoData.symbol = crypto.symbol;
      array.push(cryptoData);
    }
    return (array)
  }).catch(() => {
    return ([]);
  });
  //console.log("tab", tabCryptoCurrencies);
  console.log("result", response);

  return {
    props: {
      tabPrice: response,
      ...(await serverSideTranslations(locale, [
        NAMESPACE_LANGAGE_COMMON,
        NAMESPACE_LANGAGE_HOME,
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