import { Fragment, useEffect, useState } from 'react';
import "../styles/globals.css";
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { getCurrencyStorage, getLangageStorage, getScreenModeStorage, updateLangageStorage } from '../lib/storage/UserStorageFunctions';
import ThemeModeProvider from '../context/ThemeProvider';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DashboardLayout } from '../components/dashboard-layout';
import { NAMESPACE_LANGAGE_COMMON, TAB_NAMEPACES } from '../constants';
import { cryptocurrencies_ids } from '../__mocks__/cryptocurrencie_ids';
import LangageProvider from '../context/LangageProvider';
import { useRouter } from 'next/router';
const cryptocurrencies = require("../public/static/assets/cryptocurrencies/completecryptocurrencies.json");

//registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component = clientSideEmotionCache, pageProps } = props;
  const [screenMode,] = useState(getScreenModeStorage());
  const [langage, setLangage] = useState(getLangageStorage());
  const [currency, setCurrency] = useState(getCurrencyStorage());
  const {t, i18n} = useTranslation([TAB_NAMEPACES]);
  const router = useRouter();

  const onChangeLanguage = (language) => {
    setLangage(language);
  };

  const onChangeCurrency = (_currency) => {
    setCurrency(_currency);
  };

  useEffect(() => {
    i18n.changeLanguage(langage);
    //updateLangageStorage(langage);
    /*
    router.push(
      {
        pathname:router.pathname,
        query:{...router.query}
      },
      router.asPath,
      {locale:langage}
    )
    */
  }, [])
  
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
  }, []);

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
              <DashboardLayout cryptocurrencies={cryptocurrencies} currency={currency} setCurrency={onChangeCurrency} langage={langage} setLangage={onChangeLanguage}>
                <Component cryptocurrencies_ids={cryptocurrencies_ids} cryptocurrencies={cryptocurrencies} {...pageProps} langage={langage} setLangage={onChangeLanguage} />
              </DashboardLayout>
          }
        </AuthConsumer>
      </AuthProvider>
      <ins className="adsbygoogle"
        style={{ width:'100%', display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2953886510697247"
        data-ad-slot="9537139740"></ins>
</LangageProvider>
    </ThemeModeProvider>
  );
};

export default appWithTranslation(App);
