import { Box, Container, Grid } from '@mui/material';
import axios from 'axios';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { CustomPagetitle } from '../components/custom/custom-page-title';
import { DEFAULT_CURRENCY, NAMESPACE_LANGAGE_COMMON, NAMESPACE_LANGAGE_HOME, TAB_LANGAGES, TAB_NAMEPACES } from '../constants';
import styles from '../styles/SearchBar.module.css';
import CustomTable from '../components/custom/custom-table';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

const SearchBar = ({ ...rest }) => {
    return (
        <Grid container className={styles['coin__search']} justifyContent={'center'}>
            <Grid item>
                <input className={styles.coin__input} {...rest} />
            </Grid>
        </Grid>
    )
}

export default function MarketPage(props) {
    const { t } = useTranslation([NAMESPACE_LANGAGE_COMMON]);
    const { coinsData, langage, currency } = props;
    const [search, setSearch] = useState('');
    const cryptos = require(`../public/static/assets/${currency.id}/market.json`);
    const [coins, setCoins] = useState(cryptos);

    useEffect(() => {
        console.log("AAAAA", coins,)      
        async function init() {
            await axios.get(`${process.env.domain}/api/market`, {
                params:{
                    currency:currency.id
                  },
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            })
            .then((resp) => {
                setCoins(resp.data.coins);
            });
            //console.log("COOOOINS CLIENT SIDE", response, currency)
        }
        if (currency) {
            init();
        }
    }, [currency])

    useEffect(() => {
        if (coinsData.length > 0) {
            setCoins(coinsData);
        }
        console.log("COIIINS DATA", coinsData)
    }, [coinsData])

    //console.log("LLIIIST FRONT", coinsData)
    const filteredCoins = coins.filter((coin) => {
        return (coin.name.toLowerCase().includes(search.toLowerCase()));
    });

    const handleChangeSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    }

    return (
        <div className='layout'>
            <Head>
                <title>
                    {`Dandela | ${t('menuMarket', { ns: NAMESPACE_LANGAGE_COMMON })}`}
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
                <CustomPagetitle title={`${t('menuMarket', { ns: NAMESPACE_LANGAGE_COMMON })}`} />
                <Container maxWidth={false} sx={{ py: 3 }}>
                    <SearchBar type='text' placeholder='Search' onChange={handleChangeSearch} />
                    <CustomTable list={filteredCoins} currency={currency} langage={langage} />
                </Container>
            </Box>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    //const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptocurrencies_ids.join(',')}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    //const response = await axios.get(url);
    //const data = await response.data;

    const response = await axios.get(`${process.env.domain}/api/market=currency=${DEFAULT_CURRENCY}`, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    })
    .then((resp) => {
        return (resp.data.coins)
    }).catch(() => {
        return ([]);
    });


    //console.log("LIIIIIIST", coinsData)
    return {
        props: {
            coinsData: response,
            //tabPrice: response,
            ...(await serverSideTranslations(locale, TAB_NAMEPACES, null, TAB_LANGAGES)),
            // Will be passed to the page component as props
        },
        //revalidate: 10,
    }
}