import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NAMESPACE_LANGAGE_404, NAMESPACE_LANGAGE_COMMON, PAGE_LINK_HOME, TAB_LANGAGES, TAB_NAMEPACES } from '../constants';
import { useTranslation } from 'next-i18next';

const NotFoundPage = (props) => {
  const { t } = useTranslation([NAMESPACE_LANGAGE_COMMON]);

  return (
    <>
      <Head>
        <title>
          {`Dandela | ${t('menu404')}`}
        </title>
        <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_404 })} />
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography
              align="center"
              color="textPrimary"
              variant="h1"
            >
              404: {`${t('page_not_there', { ns: NAMESPACE_LANGAGE_404 })}`}
            </Typography>
            <Typography
              align="center"
              color="textPrimary"
              variant="subtitle2"
            >
              {`${t('message_error', { ns: NAMESPACE_LANGAGE_404 })}`}
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <img
                alt="Under development"
                src="/static/images/undraw_page_not_found_su7k.svg"
                style={{
                  marginTop: 50,
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 560
                }}
              />
            </Box>
            <NextLink
              href={PAGE_LINK_HOME}
              passHref
              legacyBehavior
            >
              <Button
                component="a"
                startIcon={(<ArrowBackIcon fontSize="small" />)}
                variant="contained"
                sx={{
                  mt:3,
                  textTransform:'capitalize',
                  ":hover": {
                  backgroundColor:'secondary.main'
              }}}
              >
                {`${t('back_to_dasboard', { ns: NAMESPACE_LANGAGE_404 })}`}
              </Button>
            </NextLink>
          </Box>
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

export default NotFoundPage;
