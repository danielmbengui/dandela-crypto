import React, { useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, TAB_NAMEPACES } from '../../constants';
import styles from '../../styles/Coin.module.css';
import { cryptocurrencies } from '../../__mocks__/cryptocurrencies';
import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencie_ids';
import axios from 'axios';
import { useRouter } from 'next/router';

const Coin = ({coin, langage}) => {
  const router = useRouter();
  const { id } = router.query;
  //const [coin, setCoin] = useState(null);

  useEffect(() => {
    //router.push(router.pathname, {}, { locale: langage });
    /*
    async function init() {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await res.data;
      setCoin(data);
    }
    init();
    */
  }, [])
  
    return (
        coin && <div className={styles.coin__page} style={{marginTop:'30vh'}}>
        <div className={styles.coin__container}>
            <img
                src={coin.image.large}
                alt={coin.name}
                className={styles.coin__image}
            />
            <h1 className={styles.coin__name}>{coin.name}</h1>
            <p className={styles.coin__ticker}>{coin.symbol}</p>
            <p className={styles.coin__current}>
                {`${coin.market_data.current_price.usd}$`}
            </p>
        </div>
    </div>
    );
};
export default Coin;

export async function getStaticPaths() {
    // Call an external API endpoint to get posts

  
    // Get the paths we want to pre-render based on posts

    
    const paths = cryptocurrencies_ids.map((_id) => ({
      params: { id: _id },
    }))
    
    console.log("PATHS", paths)

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths:paths, fallback: false }
  }

export async function getStaticProps({locale, params}) {
    //const {locale, params} = context;
    //const id = params.id;
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`);
    const data = await res.data;
    //console.log("YAAAAA DATA", params.id)
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