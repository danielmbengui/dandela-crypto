import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { PATH_PUBLIC_DIR, METHOD_POST, METHOD_GET, PATH_MARKET_DIR, PATH_MARKET_FILE } from "./constants";
//import initMiddleware from '../../lib/init-middleware';
//import { ACTION_UPDATE_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, METHOD_POST, TEXT_ACTION_DONT_EXIST } from './constants';
//import { updatePlayerByTwitterName, updatePlayerByTwitterUid, updatePlayerByWallet } from './functions';
import axios from 'axios';
import { cryptocurrencies } from '../../__mocks__/cryptocurrencies';
import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencie_ids';
import { currencies } from '../../__mocks__/currencies';
import fs from 'fs';

const PATH_CRYPTO_CURRENCIES_DIR = `${PATH_PUBLIC_DIR}/cryptocurrencies`;
const PATH_FILE_CRYPTO_CURRENCIES = `${PATH_CRYPTO_CURRENCIES_DIR}/descriptions.json`;
const PATH_FILE_RESULT = `${PATH_CRYPTO_CURRENCIES_DIR}/all.json`;

function getCryptoCurrenciesFile() {
    if (!fs.existsSync(PATH_PUBLIC_DIR)) {
        fs.mkdirSync(PATH_PUBLIC_DIR, { recursive: true });
    }

    if (!fs.existsSync(PATH_MARKET_FILE)) {
        fs.writeFileSync(PATH_MARKET_FILE, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(PATH_MARKET_FILE));
}

const isInCryptoCurrenciesFile = (crypto_id) => {
    const cryptocurrencies = getCryptoCurrenciesFile();
    for (let i = 0; i < cryptocurrencies.length; i++) {
        const element = cryptocurrencies[i];
        if (element.id === crypto_id) {
            return (true);
        }
    }
    return (false);
}

const updateCryptoCurrenciesFile = (data) => {
    const cryptocurrencies = getCryptoCurrenciesFile();
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (!isInCryptoCurrenciesFile(element.id)) {
            cryptocurrencies.push(element);
        } else {
            cryptocurrencies[i] = element;
        }
    }
    try {
        fs.writeFileSync(PATH_MARKET_FILE, JSON.stringify(cryptocurrencies, null, 2));
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
        //const result = await someAsyncOperation()
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
            /*
            id: 'ethereum-name-service',
    symbol: 'ens',
    name: 'Ethereum Name Service',
    image: 'https://assets.coingecko.com/coins/images/19785/large/acatxTm8_400x400.jpg?1635850140',
    market_cap: 376167557,
    market_cap_rank: 105,
    total_volume: 42495836,
    price_change_percentage_1h_in_currency: 0.03403982029850416,
    price_change_percentage_24h_in_currency: -4.1617849826687054,
    price_change_percentage_7d_in_currency: 4.6193923721380505
            */
            updateCryptoCurrenciesFile(coins);
            return (res.status(200).json({ msg: "POST_DATA", coins: coins }))
        }

    } catch (err) {
        res.status(500).json({ msg: 'failed to load data' })
    }
    //const cryptocurrencies = getCryptoCurrenciesFile();
    //console.log("SUCCESS", _cryptocurrencies);

}
