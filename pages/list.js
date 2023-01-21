import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import { LANGAGE_ENGLISH, LANGAGE_FRENCH, LANGAGE_PORTUGUESE, NAMESPACE_LANGAGE_HOME, TAB_NAMEPACES } from '../constants';
import styles from '../styles/SearchBar.module.css';
import styleCoins from '../styles/Coins.module.css';
import CustomTable from '../components/custom/custom-table';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { cryptocurrencies_ids } from '../__mocks__/cryptocurrencie_ids';

const SearchBar = ({ ...rest }) => {
    return (
        <Grid container className={styles['coin__search']} justifyContent={'center'}>
            <Grid item>
            <input className={styles.coin__input} {...rest} />

{
    /*
     <div className={styles['coin__search']}>
        </div>
    */
}
            </Grid>
        </Grid>
       
    )
}

const CoinList = ({ coinsData }) => {
    return (
        <>
            {coinsData.map(coin => {
                return (
                    <Coins 
                        key={coin.id}
                        name={coin.name}
                        id={coin.id}
                        price={coin.current_price}
                        symbol={coin.symbol}
                        marketcap={coin.market_cap}
                        volume={coin.total_volume}
                        image={coin.image}
                        priceChange={coin.price_change_percentage_24h}
                    />
                )
            })}
        </>
    )
}

const Coins = ({ name, id, price, symbol, marketcap, market_cap_rank, volume, image, priceChange }) => {
    return (
        <div className={styleCoins.coin__container}>
            <div className={styleCoins.coin__row}>
                <div className={styleCoins.coin}>
                    <h1 >{market_cap_rank}</h1>
                    <img src={image} alt={name} className={styleCoins.coin__img} />
                    <h1 className={styleCoins.coin__h1}>{name}</h1>
                    <p className={styleCoins.coin__symbol}>{symbol}</p>
                </div>
                <div className={styleCoins.coin__data}>
                    <p className={styleCoins.coin__price}>${price}</p>
                    <p className={styleCoins.coin__volume}>${volume.toLocaleString}</p>
                    {priceChange < 0 ? (
                        <p className={`${styleCoins['coin__percent']}, ${styleCoins['red']}`}>{priceChange.toFixed(2)}</p>
                    ) : (
                        <p className={`${styleCoins['coin__percent']}, ${styleCoins['green']}`}>{priceChange.toFixed(2)}</p>
                    )}
                    <p className={styleCoins.coin__marketcap}>
                        Mkt Cap: ${marketcap.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function ListPage(props) {
    const {t} = useTranslation([TAB_NAMEPACES]);
    const { coinsData } = props;
    console.log("LOCALE ListPage index", coinsData, );
    const [search, setSearch] = useState('');

    const handleChangeSearch = (e) => {
        e.preventDefdault();
        setSearch(e.target.value.toLowerCase());
    }

    return (
        <div className='layout'>
            <Head>
                <title>
                    {`Dandela | ${t('menuPrices')}`}
                </title>
                <meta name="description" content={t('description_page', { ns: NAMESPACE_LANGAGE_HOME })} />
            </Head>
            <Box
            
            className='coin__app'
                component="main"
                alignItems={'center'}
                sx={{
                    flexGrow: 1,
                    py: 3
                }}
                
            >
                <CustomPagetitle title={`${t('menuPrices')}`} />
                <Container maxWidth={false} sx={{ py: 3 }}>
                    <SearchBar type='text' placeholder='Search' />
                    <CustomTable list={coinsData} />
                    {
                        /*
                        <CoinList coinsData={coinsData} />
                        */
                    }
                </Container>
            </Box>

        </div>
    )
}

export async function getStaticProps({locale}) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptocurrencies_ids.join(',')}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    const response = await axios.get(url);
    const coinsData = await response.data;
    
    //console.log("LOCALE",url, locale,);
    return {
      props: {
        coinsData,
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