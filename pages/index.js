import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
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



export default function HomePage() {
  const { t } = useTranslation([NAMESPACE_LANGAGE_COMMON]);

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
          py: {xs:5, md:10}
        }}
      >
        <Container maxWidth={false}>
        <Stack justifyContent={'center'} alignItems={'center'}>
              <div style={{textAlign:'center'}}>
              <Typography fontSize={26} color={'primary.main'} fontWeight={'bold'}>La solution ultime pour une gestion financière sans tracas</Typography>
              <Typography fontSize={24} fontWeight={500}>Pour les familles qui naviguent entre l'Europe et l'Angola</Typography>
              </div>

              <img
              src='/logo.png'
              //width='100px'
              height='150px'
              style={{marginTop:'50px', marginBottom:'50px'}}
              />

<Grid container sx={{textAlign:{xs:'center', md:'justify'}, width:'80%'}}>
              <Typography fontSize={18}>Cette application révolutionnaire offre une comptabilisation simplifiée, permettant un enregistrement aisé des échanges financiers au sein d'une famille, et ce, sans se préoccuper des complications liées à la conversion de devises.</Typography>
              </Grid>

              <Grid
            container
            spacing={3}
            px={2}
            py={5}
            justifyContent={'center'}
          >
            <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                    //key={cryptocurrency.name + index}
                  >
                    <img
            src='/static/images/mockups/android/get_started_page.png'
            width='100%'
            //public/static/images/mockups/android/get_started_page.png
            />
                  </Grid>
                  <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                    //key={cryptocurrency.name + index}
                  >
                    <img
            src='/static/images/mockups/android/get_started_page.png'
            width='100%'
            //public/static/images/mockups/android/get_started_page.png
            />
                  </Grid>
          </Grid>

          <Grid container sx={{textAlign:{xs:'center', md:'justify'}, width:'80%'}}>
              <Typography fontSize={18} pt={2}>Pour une confiance sans faille, DandelApp assure une transparence totale en permettant à tous les membres de la même famille d'accéder à l'historique des transactions. En outre, ne manquez jamais une date de paiement grâce aux notifications et rappels.</Typography>
              <Typography fontSize={18} pt={2}>Le tableau de bord intuitif vous offre un résumé financier clair et compréhensible des flux monétaires familiaux. Et pour couronner le tout, la confidentialité est garantie chez DandelApp : vos données sont cryptées et sécurisées, sans partage avec des tiers.</Typography>
              <Typography fontSize={18} pt={2}>Avec DandelApp, la gestion financière en famille entre l'Europe et l'Angola devient un jeu d'enfant.</Typography>
              </Grid>

              <Grid
            container
            spacing={3}
            px={2}
            py={5}
            justifyContent={'center'}
          >
            <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                    //key={cryptocurrency.name + index}
                  >
                    <img
            src='/static/images/mockups/android/get_started_page.png'
            width='100%'
            //public/static/images/mockups/android/get_started_page.png
            />
                  </Grid>
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