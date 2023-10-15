import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import { DEFAULT_CURRENCY, DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, NAMESPACE_LANGAGE_PRIVACY_POLICY, NAMESPACE_LANGAGE_TERMS, TAB_LANGAGES, TAB_NAMEPACES } from '../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import axios from 'axios';
import { currencies } from '../__mocks__/currencies';
import { useTranslation } from 'next-i18next';
import { getLangageStorage } from '../lib/storage/UserStorageFunctions';
import { useRouter } from 'next/router';



export default function Privacy() {
  const { t } = useTranslation([NAMESPACE_LANGAGE_COMMON]);

  return (
    <>
      <Head>
        <title>
          {`Dandela | ${t('menuPrivacyPolicy')}`}
        </title>
        <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_PRIVACY_POLICY })} />
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5
        }}
      >
        <Container maxWidth={false}>
        <Stack justifyContent={'center'} alignItems={'center'}>
              <img
              src='/logo.png'
              //width='100px'
              height='150px'
              style={{marginTop:'20px', marginBottom:'50px'}}
              />

<Grid container sx={{textAlign:'center', width:'80%'}}>
              <Typography sx={{textAlign:'center', margin:'0 auto'}} fontWeight={'bold'} fontSize={28}>{t('description_page', { ns: NAMESPACE_LANGAGE_PRIVACY_POLICY })}</Typography>
              </Grid>


          <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18} pt={2}>Chez Dandela, nous respectons votre vie privée et nous nous engageons à protéger vos informations personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et partageons vos informations lorsque vous utilisez l'application DandelApp. En utilisant l'application, vous acceptez les pratiques décrites dans cette politique de confidentialité.</Typography>
            </Grid>

              <Grid container sx={{textAlign:'justify', width:'80%'}} pt={4}>
              <Typography fontSize={18} fontWeight={'bold'}>1. Collecte d'Informations</Typography>
              <Typography fontSize={18}>Lors de votre inscription et de l'utilisation de l'application, nous pouvons collecter des informations telles que votre nom, votre adresse e-mail, votre emplacement géographique et d'autres informations nécessaires à la gestion de votre compte.</Typography>
              </Grid>


            </Stack>
          
        </Container>
      </Box>
    </>
  );
}

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
    },
  }
}