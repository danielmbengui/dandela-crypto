import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import { DEFAULT_CURRENCY, DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, NAMESPACE_LANGAGE_TERMS, TAB_LANGAGES, TAB_NAMEPACES } from '../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import axios from 'axios';
import { currencies } from '../__mocks__/currencies';
import { useTranslation } from 'next-i18next';
import { getLangageStorage } from '../lib/storage/UserStorageFunctions';
import { useRouter } from 'next/router';



export default function Terms() {
  const { t } = useTranslation([NAMESPACE_LANGAGE_COMMON]);

  return (
    <>
      <Head>
        <title>
          {`Dandela | ${t('menuUseTerms')}`}
        </title>
        <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_TERMS })} />
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
              <Typography sx={{textAlign:'center', margin:'0 auto'}} fontWeight={'bold'} fontSize={28}>{t('description_page', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>


          <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18} pt={2}>En utilisant l'application DandelApp, vous acceptez les conditions suivantes :</Typography>
            </Grid>

              <Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>1. Inscription et Profil</Typography>
              <Typography fontSize={18}>Lors de votre inscription, vous devez fournir des informations exactes, complètes et à vous êtes responsable de la confidentialité de vos informations de connexion.</Typography>
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