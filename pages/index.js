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
              <Typography fontSize={26} color={'primary.main'} fontWeight={'bold'}>{t('page.description1', { ns: NAMESPACE_LANGAGE_HOME })}</Typography>
              <Typography fontSize={24} fontWeight={500}>{t('page.description2', { ns: NAMESPACE_LANGAGE_HOME })}</Typography>
              </div>

              <img
              src='/logo.png'
              //width='100px'
              height='150px'
              style={{marginTop:'50px', marginBottom:'50px'}}
              />

<Grid container sx={{textAlign:{xs:'center', md:'justify'}, width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph1', { ns: NAMESPACE_LANGAGE_HOME })}</Typography>
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
              <Typography fontSize={18} pt={2}>{t('page.paragraph2', { ns: NAMESPACE_LANGAGE_HOME })}</Typography>
              <Typography fontSize={18} pt={2}>{t('page.paragraph3', { ns: NAMESPACE_LANGAGE_HOME })}</Typography>
              <Typography fontSize={18} pt={2}>{t('page.paragraph4', { ns: NAMESPACE_LANGAGE_HOME })}</Typography>
              <Typography fontSize={18} pt={2}>{t('page.paragraph5', { ns: NAMESPACE_LANGAGE_HOME })}</Typography>
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