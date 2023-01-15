import react, { useEffect, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, NAMESPACE_LANGAGE_PRIVACY_POLICY, PAGE_LINK_PRIVACY_POLICY } from '../constants';
import { useTranslation } from 'next-i18next';
import { CustomPagetitle } from '../components/custom/custom-page-title';

const PrivacyPolicyPage = () => {
const {t, i18n} = useTranslation([NAMESPACE_LANGAGE_PRIVACY_POLICY, NAMESPACE_LANGAGE_COMMON]);
const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
};

useEffect(() => {
    onChangeLanguage(langage);
}, [langage]);

    return (
        <>
            <Head>
                <title>
                    {`Dandela | ${t('menuPrivacyPolicy', {ns:NAMESPACE_LANGAGE_COMMON})}`}
                </title>
                <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_PRIVACY_POLICY })} />
            </Head>
            <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <CustomPagetitle title={`${t('menuPrivacyPolicy', {ns:NAMESPACE_LANGAGE_COMMON})}`} />
        <Container maxWidth={false}>
            <Stack spacing={2}>
            <Typography variant='body1'>
                {t('paragraph_1')}
            </Typography>
            <Typography variant='body1'>
                {t('paragraph_2')}
            </Typography>
            <Typography variant='body1'>
                {t('paragraph_3')}
            </Typography>
            <Typography variant='body1'>
                {t('paragraph_4')}
            </Typography>
            </Stack>
          {
            /*

            */
          }
        </Container>
      </Box>
        </>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                NAMESPACE_LANGAGE_COMMON,
                NAMESPACE_LANGAGE_PRIVACY_POLICY,
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

export default PrivacyPolicyPage;
