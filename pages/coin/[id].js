import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CryptoComponent } from '../../components/dashboard/CryptoComponent';
//import { cryptocurrencies } from '../../__mocks__/cryptocurrencies';
import { DEFAULT_LANGAGE, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, TAB_NAMEPACES } from '../../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomPagetitle } from '../../components/custom/custom-page-title';
import axios from 'axios';
import { currencies } from '../../__mocks__/currencies';
import { useTranslation } from 'next-i18next';
import { getLangageStorage } from '../../lib/storage/UserStorageFunctions';
import { useRouter } from 'next/router';
//import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencie_ids';
import styles from '../../styles/Coin.module.css';

const cryptocurrencies_ids = [
    "bitcoin",
    "ethereum",
     "matic-network",
     "binancecoin",
     "tether",
    "usd-coin",
    "binance-usd",
    "dai",
    "ripple",
    "cardano",
    "dogecoin",
    "solana",
    "polkadot",
    "shiba-inu",
    "avalanche-2",
    "uniswap",
    "tron",
    "wrapped-bitcoin",
    "litecoin",
    "chainlink",
    "ethereum-classic",
    "monero",
    "bitcoin-cash",
    "vechain",
    "stellar",
    "tezos",
    "axie-infinity",
    "decentraland",
    "the-sandbox",
    "apecoin",
    "near",
    "internet-computer",
    "aave",
    "huobi-token",
    "kucoin-shares",
    "ethereum-name-service",
];

export default function CoinPage(props) {
const router = useRouter();
  const { coin, cryptocurrencies, langage} = props;
  const { t, i18n } = useTranslation([NAMESPACE_LANGAGE_COMMON]);

  useEffect(() => {
    
  }, []);

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
          py: 3
        }}
      >
        <CustomPagetitle title={`${router.query ? router.query.id : 'UNKNOW'}`} />
<Grid container justifyContent={'center'}>
    <Grid item>
    {
         coin && <div className={styles.coin__container}>
         <img
             src={coin.image.large}
             alt={coin.name}
             className={styles.coin__image}
         />
         <h1 className={styles.coin__name}>{coin.name}</h1>
         <p className={styles.coin__ticker}>{coin.symbol}</p>
         <p className={styles.coin__current}>
             {coin.market_data.current_price.usd}
         </p>
     </div>
       }
    </Grid>
</Grid>
      </Box>
    </>
  );
}

export async function getStaticPaths() {
    // When this is true (in preview environments) don't
    // prerender any static pages
    // (faster builds, but slower initial page load)  
    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load);
    const paths = [];
    for (let i = 0; i < cryptocurrencies_ids.length; i++) {
        const id = cryptocurrencies_ids[i];
        paths.push({ params: { id: id } });
        paths.push({ params: { id: id}, locale: LANGAGE_ENGLISH });
        paths.push({ params: { id: id}, locale: LANGAGE_FRENCH });
        paths.push({ params: { id: id}, locale: LANGAGE_PORTUGUESE });
        //paths.push({ params: { id: 'post-1' }, locale: DEFAULT_LANGAGE });
    }
    /*
    const paths = cryptocurrencies.map((post) => (
        {params: { id: post.id },})
        )
  */
    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
  }

export async function getStaticProps(context) {
  const {locale, params} = context;
  const { id } = params;
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const data = await res.json();
  return {
    props: {
      coin: data,
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, [
        LANGAGE_ENGLISH,
        LANGAGE_FRENCH,
        LANGAGE_PORTUGUESE
      ])),
      // Will be passed to the page component as props
    },
  }
}