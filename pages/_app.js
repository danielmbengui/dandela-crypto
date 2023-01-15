import { Fragment, useEffect, useState } from 'react';
import "../styles/globals.css";
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import Script from 'next/script';
import { getLangageStorage, getScreenModeStorage } from '../lib/storage/UserStorageFunctions';
import ThemeModeProvider from '../context/ThemeProvider';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DashboardLayout } from '../components/dashboard-layout';
import { NAMESPACE_LANGAGE_COMMON } from '../constants';

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [screenMode,] = useState(getScreenModeStorage());
  const [langage, setLangage] = useState(getLangageStorage());
  const {t} = useTranslation([NAMESPACE_LANGAGE_COMMON]);
  const getLayout = Component.getLayout ?? ((page) => page);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // You now have access to `window`
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date());
      gtag('config', 'G-MJ6X1M1YRR');
    }

    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
      <title>{`Dandela | ${t('description_page', {ns:NAMESPACE_LANGAGE_COMMON})}`}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover' />
        <meta name="description" content={t('description_page', {ns:NAMESPACE_LANGAGE_COMMON})} />
      </Head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MJ6X1M1YRR" />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2953886510697247"
        crossOrigin="anonymous" />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeModeProvider screenMode={screenMode}>
          <CssBaseline />
          <AuthProvider>
            <AuthConsumer>
              {
                (auth) => auth.isLoading
                  ? <Fragment />
                  : <DashboardLayout langage={langage} setLangage={setLangage}>
                    <Component {...pageProps} langage={langage} setLangage={setLangage} />
                    </DashboardLayout>
              }
            </AuthConsumer>
          </AuthProvider>
        </ThemeModeProvider>
      </LocalizationProvider>

      <ins className="adsbygoogle"
        style={{display:"block", textAlign:"center"}}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2953886510697247"
        data-ad-slot="9537139740"></ins>
    </CacheProvider>
  );
};

export default appWithTranslation(App);
