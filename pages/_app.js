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
import { getLangageStorage, getScreenModeStorage, updateLangageStorage } from '../lib/storage/UserStorageFunctions';
import ThemeModeProvider from '../context/ThemeProvider';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DashboardLayout } from '../components/dashboard-layout';
import { DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_HOME, PAGE_LINK_MARKET, TAB_NAMEPACES } from '../constants';
import axios from 'axios';
import { useRouter } from 'next/router';
import { cryptocurrencies_ids } from '../__mocks__/cryptocurrencie_ids';
const cryptocurrencies = require("../public/static/assets/cryptocurrencies/completecryptocurrencies.json");

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [screenMode,] = useState(getScreenModeStorage());
  const [langage, setLangage] = useState(getLangageStorage());
  const {t, i18n} = useTranslation([TAB_NAMEPACES]);
  
  //console.log("custooooooooom CUREENCIES", cryptocurrencies)

  const router = useRouter();
  const onChangeLanguage = (language) => {
    console.log("change index LANGAGE NOOOOOW", language)
    setLangage(language);
  };

  useEffect(() => {
    async function init() {
      const url = "/api/cryptocurrency/updatecryptocurrencies";
      const response = await axios.post(url, {
        action: "UPDATE_CRYPTO_CURRENCIES",
      }).then((resp) => {
        return (resp.data);
      }).catch((error) => {
        return (error);
      });
      //console.log("MY RESP", response);
    }
    if (router.isReady) {
      //init();
    }
    //router.push(router.pathname, {}, { locale: langage });

//console.log("CRYPTO_CURRENCIEs", cryptocurrencies);
  }, [router.isReady])

  useEffect(() => {
    //i18n.changeLanguage(langage);
    router.push({
      pathname:router.pathname,
      query: router.query,
    }, {}, {locale:langage});
    /*
    router.push({
      ...router,
      pathname: router.pathname,
      query: {...router.query},
    },
    //...router.asPath,
    //...router,
        { locale: langage }
    );
    */
   /*
    router.push({
      //...router,
      pathname: router.pathname,
      query: {...router.query},
      //locale: {...router.locale},
    },
    
    //{},
    //{},
    //...router.asPath,
    //...router,
      { locale: langage }
    );
    */
/*
      
        */
        //updateLangageStorage(langage)
      console.log("DEFAULT _app", router.locale, "ACTUAL", getLangageStorage());
  }, [langage]);

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
    <ThemeModeProvider screenMode={screenMode}>
      <Head>
        
        <title>{`Dandela | ${t('description_page', { ns: NAMESPACE_LANGAGE_COMMON })}`}</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover' />
        <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_COMMON })} />
{
  /*
  
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MJ6X1M1YRR" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2953886510697247"
          crossOrigin="anonymous" />
  */
}
      </Head>

      <CssBaseline />
      <AuthProvider>
        <AuthConsumer>
          {
            (auth) => auth.isLoading
              ? <Fragment />
:
              <DashboardLayout cryptocurrencies={cryptocurrencies} langage={langage} setLangage={onChangeLanguage}>
                <Component cryptocurrencies_ids={cryptocurrencies_ids} cryptocurrencies={cryptocurrencies} {...pageProps} langage={langage} setLangage={onChangeLanguage} />
              </DashboardLayout>
                
                /*
                                             <Component t={t} cryptocurrencies={cryptocurrencies} {...pageProps} langage={langage} setLangage={onChangeLanguage} />

                <DashboardLayout cryptocurrencies={cryptocurrencies} langage={langage} setLangage={onChangeLanguage}>
                <Component t={t} cryptocurrencies={cryptocurrencies} {...pageProps} langage={langage} setLangage={onChangeLanguage} />
              </DashboardLayout>
                */
              
          }
        </AuthConsumer>
      </AuthProvider>
      <ins className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2953886510697247"
        data-ad-slot="9537139740"></ins>
    </ThemeModeProvider>
  );
};
/*
export async function getServerSideProps({ locale }) {
  return {
    props: {
      //tabPrice: response,
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, [
        LANGAGE_ENGLISH,
        LANGAGE_FRENCH,
        LANGAGE_PORTUGUESE
      ])),
      // Will be passed to the page component as props
    },
  }
}
*/
export default appWithTranslation(App);
