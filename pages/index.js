import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import { DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, TAB_NAMEPACES } from '../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import axios from 'axios';
import { currencies } from '../__mocks__/currencies';
import { useTranslation } from 'next-i18next';
import { getLangageStorage } from '../lib/storage/UserStorageFunctions';
import { useRouter } from 'next/router';

export default function HomePage(props) {
  const router = useRouter();
  const { cryptocurrencies} = props;
  const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_COMMON]);

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
              cryptocurrencies.map((cryptocurrency, index) => {
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

export async function getServerSideProps({locale}) {
  //const {locale} = context;
  console.log("LOCALE getServerSideProps index", locale, "DEFAULT", DEFAULT_LANGAGE, "ACTUAL", getLangageStorage());
  console.log("LOCALE",);
  return {
    props: {
      //tabPrice: response,
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, [
        LANGAGE_ENGLISH,
        LANGAGE_FRENCH,
        LANGAGE_PORTUGUESE
      ])),
      // Will be passed to the page component as props
    },
  }
}