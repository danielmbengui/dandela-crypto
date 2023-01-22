import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import { DEFAULT_CURRENCY, DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, TAB_LANGAGES, TAB_NAMEPACES } from '../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import axios from 'axios';
import { currencies } from '../__mocks__/currencies';
import { useTranslation } from 'next-i18next';
import { getLangageStorage } from '../lib/storage/UserStorageFunctions';
import { useRouter } from 'next/router';

export default function HomePage(props) {
  const router = useRouter();
  const { cryptocurrencies, currency, coinsData} = props;
  const { t } = useTranslation([NAMESPACE_LANGAGE_COMMON]);
  const [coins, setCoins] = useState(coinsData);

    useEffect(() => {
        async function init() {
            await axios.get(`${process.env.domain}/api/market`, {
                currency:currency.id,
            }, {
              headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*",
              }
            }).then(async (resp) => {
                setCoins(await resp.data.coins);
            });
            //console.log("COOOOINS CLIENT SIDE", response, currency)
        }
        if (currency) {
            init();
        }
    }, [currency])

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
              coins.map((cryptocurrency, index) => {
                return (
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                    key={cryptocurrency.name + index}
                  >
                    <CryptoComponent cryptocurrency={cryptocurrency} currency={currency} />
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

export async function getStaticProps({locale}) {
  const response = await axios.get(`${process.env.domain}/api/market`, {
    currency:DEFAULT_CURRENCY
}, {
  headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
  }
}).then(async (resp) => {
    return (await resp.data.coins)
}).catch(() => {
    return ([]);
});
  return {
    props: {
      coinsData:response,
      //tabPrice: response,
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
      // Will be passed to the page component as props
    },
  }
}