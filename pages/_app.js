import { Fragment, useState } from 'react';
import "../styles/globals.css";
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { getCurrencyStorage, getLangageStorage, getScreenModeStorage } from '../lib/storage/UserStorageFunctions';
import ThemeModeProvider from '../context/ThemeProvider';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DashboardLayout } from '../components/dashboard-layout';
import { NAMESPACE_LANGAGE_COMMON, TAB_NAMEPACES } from '../constants';
import { cryptocurrencies_ids } from '../__mocks__/cryptocurrencies_ids';
import LangageProvider from '../context/LangageProvider';
import { useRouter } from 'next/router';
import { getCurrencyMock } from '../__mocks__/currencies';
const cryptocurrencies = require("../public/static/assets/cryptocurrencies/completecryptocurrencies.json");

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component = clientSideEmotionCache, pageProps } = props;
  const [screenMode,] = useState(getScreenModeStorage());
  const [langage, setLangage] = useState(getLangageStorage());
  const [currency, setCurrency] = useState(getCurrencyMock(getCurrencyStorage()));
  const {t, i18n} = useTranslation([TAB_NAMEPACES]);
  const router = useRouter();

  const onChangeLanguage = (language) => {
    setLangage(language);
  };

  const onChangeCurrency = (_currency) => {
    setCurrency(_currency);
  };
  
  return (
    <ThemeModeProvider screenMode={screenMode}>
      <Head>
        <title>{`Dandela | ${t('description_page', { ns: NAMESPACE_LANGAGE_COMMON })}`}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover' />
        <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_COMMON })} />
      </Head>

      <CssBaseline />
<LangageProvider langageMode={langage}>
<AuthProvider>
        <AuthConsumer>
          {
            (auth) => auth.isLoading
              ? <Fragment />
:
              <DashboardLayout
              //currency={currency} setCurrency={onChangeCurrency} 
              langage={langage} setLangage={onChangeLanguage}>
                <Component cryptocurrencies_ids={cryptocurrencies_ids} cryptocurrencies={cryptocurrencies} {...pageProps} 
                currency={currency} setCurrency={onChangeCurrency} 
                langage={langage} setLangage={onChangeLanguage} 
                />
              </DashboardLayout>
          }
        </AuthConsumer>
      </AuthProvider>
</LangageProvider>
    </ThemeModeProvider>
  );
};

export default appWithTranslation(App);
