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
import Link from 'next/link';



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
              <Typography fontSize={18} pt={2}>{t('page.description', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
            </Grid>
{/****************************/}
            <Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title1', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph1', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title2', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph2', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title3', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph3', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title4', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph4', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title5', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph5', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title6', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph6', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title7', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph7.1', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}} pt={1}>
              <Typography fontSize={18}>{t('page.paragraph7.2', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title8', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph8', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title9', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph9', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title10', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title11', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph11.1', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}} pt={1}>
              <Typography fontSize={18}>{t('page.paragraph11.2', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title12', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph12', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
<Grid container sx={{textAlign:'justify', width:'80%'}} pt={2}>
              <Typography fontSize={18} fontWeight={'bold'}>{t('page.title13', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
              <Grid container sx={{textAlign:'justify', width:'80%'}}>
              <Typography fontSize={18}>{t('page.paragraph13', { ns: NAMESPACE_LANGAGE_TERMS })}</Typography>
              </Grid>
{/****************************/}
              <Grid container sx={{textAlign:'justify', width:'80%'}} pt={5}>
              <Typography fontSize={18}>{t('page.paragraphContact', { ns: NAMESPACE_LANGAGE_TERMS })} <Link href={`mailto:${t('page.mailContact', { ns: NAMESPACE_LANGAGE_TERMS })}?subject=${t('contact')}`}>{t('page.mailContact', { ns: NAMESPACE_LANGAGE_TERMS })}</Link>.</Typography>
              
              </Grid>
{/****************************/}
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