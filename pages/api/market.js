import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { PATH_PUBLIC_DIR, METHOD_POST, METHOD_GET, PATH_MARKET_DIR, FILE_NAME_MARKET } from "./constants";
//import initMiddleware from '../../lib/init-middleware';
//import { ACTION_UPDATE_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, METHOD_POST, TEXT_ACTION_DONT_EXIST } from './constants';
//import { updatePlayerByTwitterName, updatePlayerByTwitterUid, updatePlayerByWallet } from './functions';
import axios from 'axios';
import { cryptocurrencies } from '../../__mocks__/cryptocurrencies';
import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencies_ids';
import { currencies } from '../../__mocks__/currencies';
import fs from 'fs';
import { DEFAULT_CURRENCY } from '../../constants';
import { getLangageStorage, getScreenModeStorage } from '../../lib/storage/UserStorageFunctions';
import { currencies_ids } from '../../__mocks__/currencies_ids';

const PATH_CRYPTO_CURRENCIES_DIR = `${PATH_PUBLIC_DIR}/cryptocurrencies`;
const PATH_FILE_CRYPTO_CURRENCIES = `${PATH_CRYPTO_CURRENCIES_DIR}/descriptions.json`;
const PATH_FILE_RESULT = `${PATH_CRYPTO_CURRENCIES_DIR}/all.json`;

function getCryptoCurrenciesFile(currency) {
    const myPath = `${PATH_PUBLIC_DIR}/${currency}`;
    const myFile = `${myPath}/${FILE_NAME_MARKET}`;
    if (!fs.existsSync(myPath)) {
        fs.mkdirSync(myPath, { recursive: true });
    }

    if (!fs.existsSync(myFile)) {
        fs.writeFileSync(myFile, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(myFile));
}

const isInCryptoCurrenciesFile = (crypto_id, currency) => {
    const cryptocurrencies = getCryptoCurrenciesFile(currency);
    for (let i = 0; i < cryptocurrencies.length; i++) {
        const element = cryptocurrencies[i];
        if (element.id === crypto_id) {
            return (true);
        }
    }
    return (false);
}

const updateCryptoCurrenciesFile = (data, currency) => {
    const cryptocurrencies = getCryptoCurrenciesFile(currency);
    const myPath = `${PATH_PUBLIC_DIR}/${currency}`;
    const myFile = `${myPath}/${FILE_NAME_MARKET}`;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (!isInCryptoCurrenciesFile(element.id, currency)) {
            cryptocurrencies.push(element);
        } else {
            cryptocurrencies[i] = element;
        }
    }
    try {
        fs.writeFileSync(myFile, JSON.stringify(cryptocurrencies, null, 2));
    } catch {
        return (false);
    }
    return (true);
}

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and POST
        methods: [METHOD_POST, METHOD_GET],
    })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    try {
        //const result = await someAsyncOperation();
        var currency = DEFAULT_CURRENCY;
        if (req.body.currency) {
            currency = req.body.currency; 
        }
        console.log("CCCCURRENY REQ", currency, getScreenModeStorage());
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${cryptocurrencies_ids.join(',')}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
        const response = await axios.get(url).then((resp) => {
            //console.log("DAAATA", resp.data)
            return (resp.data);
        }).catch(() => {
            //console.log("ERRRROR", err)
            return (getCryptoCurrenciesFile(currency));
        });
        const coins = [];
        for (let i = 0; i < response.length; i++) {
            const element = response[i];
            coins.push({
                id: element.id,
                symbol: element.symbol,
                name: element.name,
                image: element.image,
                current_price: element.current_price,
                market_cap: element.market_cap,
                market_cap_rank: element.market_cap_rank,
                total_volume: element.total_volume,
                price_change_percentage_24h: element.price_change_percentage_24h,
                price_change_percentage_1h_in_currency: element.price_change_percentage_1h_in_currency,
                //price_change_percentage_24h_in_currency: element.price_change_percentage_24h_in_currency,
                price_change_percentage_7d_in_currency: element.price_change_percentage_7d_in_currency
            })
        }
        const url1 = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptocurrencies_ids.join(",")}&vs_currencies=${currencies_ids.join(",")}&include_24hr_change=true`;
        const response1 = await axios.get(url1).then((resp) => {
            console.log("DAAATA", resp.data)
            return (resp.data);
        })
        updateCryptoCurrenciesFile(coins, currency);
        return (res.status(200).json({ msg: "POST_DATA", coins: coins }))
/*
        if (req.method === METHOD_GET) {
            if (req.query.action === 'get_file') {
                const cryptocurrencies = getCryptoCurrenciesFile();
                return (res.status(200).json({ msg: "GET_FILE", coins: cryptocurrencies }))
            }
        } else if (req.method === METHOD_POST) {
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptocurrencies_ids.join(',')}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
            const response = await axios.get(url);
            const data = await response.data;
            const coins = [];
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                coins.push({
                    id: element.id,
                    symbol: element.symbol,
                    name: element.name,
                    image: element.image,
                    current_price: element.current_price,
                    market_cap: element.market_cap,
                    market_cap_rank: element.market_cap_rank,
                    total_volume: element.total_volume,
                    price_change_percentage_24h: element.price_change_percentage_24h,
                    price_change_percentage_1h_in_currency: element.price_change_percentage_1h_in_currency,
                    //price_change_percentage_24h_in_currency: element.price_change_percentage_24h_in_currency,
                    price_change_percentage_7d_in_currency: element.price_change_percentage_7d_in_currency
                })
            }
            updateCryptoCurrenciesFile(coins);
            return (res.status(200).json({ msg: "POST_DATA", coins: coins }))
        } else {
            res.status(500).json({ msg: 'failed to load data', coins: [] })
        }
*/
    } catch (err) {
        res.status(500).json({ msg: 'failed to load data', coins: [] })
    }
    //const cryptocurrencies = getCryptoCurrenciesFile();
    //console.log("SUCCESS", _cryptocurrencies);

}
