import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Grid } from '@mui/material';
import { DEFAULT_CURRENCY, LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_CRYPTO_CONVERTER, NAMESPACE_LANGAGE_HOME, TAB_NAMEPACES } from '../../constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomPagetitle } from '../../components/custom/custom-page-title';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styles from '../../styles/Coin.module.css';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencies_ids';
/*
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
*/
export default function CoinPage(props) {
  const router = useRouter();
  const { langage, currency, id, coinData } = props;
  const { t, } = useTranslation([NAMESPACE_LANGAGE_COMMON]);
  function getCrypto(_id) {
    const list = require(`../../public/static/assets/${_id}/coins.json`);
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.id === id)
        return (element);
    }
    return (null);
  }
  const crypto = getCrypto(currency.id);
  const [coin, setCoin] = useState(crypto);

  useEffect(() => {
    console.log("IIIIIID", crypto)
    async function init() {
      await axios.get(`${process.env.domain}/api/coin/${id}?currency=${currency.id}`)
      .then((resp) => {
        setCoin(resp.data.coin);
        //return (resp.data.coin)
      }).catch(() => {
        //return ([]);
      });
      //console.log("COOOOINS CLIENT SIDE", response, currency)
    }
    if (currency) {
      init();
    }
  }, [currency]);

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
          py: 3,
          px: 3
        }}
      >
        <CustomPagetitle title={coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : `UNKNOW`} />
        <BackspaceIcon sx={{ cursor: 'pointer' }} onClick={() => {
          router.back();
        }} />
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
                  {`${currency.symbol} ${coin.market_data.current_price}`}
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
    paths.push({ params: { id: id }, locale: LANGAGE_ENGLISH });
    paths.push({ params: { id: id }, locale: LANGAGE_FRENCH });
    paths.push({ params: { id: id }, locale: LANGAGE_PORTUGUESE });
    //paths.push({ params: { id: 'post-1' }, locale: DEFAULT_LANGAGE });
  }
  /*
  const paths = cryptocurrencies.map((post) => (
      {params: { id: post.id },})
      )
*/
  // { fallback: false } means other routes should 404
  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const { locale, params } = context;
  const { id } = params;

  const coinData = await axios.get(`${process.env.domain}/api/coin/${id}?currency=${DEFAULT_CURRENCY}`)
  .then((resp) => {
    return (resp.data.coin);
  }).catch(() => {
    return ({});
  });
  //const data = res.coin;
  //console.log("MY COOOIN", coinData)

  return {
    props: {
      coinData,
      id,
      ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, [
        LANGAGE_ENGLISH,
        LANGAGE_FRENCH,
        LANGAGE_PORTUGUESE
      ])),
      // Will be passed to the page component as props
    },
  }
}