import React, {useEffect} from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { CryptoComponent } from '../components/dashboard/CryptoComponent';
import { cryptocurrencies } from '../__mocks__/cryptocurrencies';
import { HomeListToolbar } from '../components/home/home-list-toolbar';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_HOME } from '../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function HomePage(props) {
  const {langage, setLangage} = props;
  const { t, i18n } = useTranslation(NAMESPACE_LANGAGE_COMMON);
/*
  const onChangeLanguage = (language) => {
    i18n.changeLanguage(language);
};

useEffect(() => {
    onChangeLanguage(langage);
}, [langage]);

*/

  return (
    <>
      <Head>
        <title>
          {t('menuHome')} | Dandela
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3
        }}
      >
        <HomeListToolbar />
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
                    <CryptoComponent cryptocurrency={cryptocurrency} currency={{ name: "usd", symbol: "$" }} />
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

/*
HomePage.getLayout = (page) => {
  return (
    {page}
  );
}
*/

export async function getStaticProps({ locale }) {
  return {
      props: {
          ...(await serverSideTranslations(locale, [
              NAMESPACE_LANGAGE_COMMON,
              //NAMESPACE_LANGAGE_HOME,
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