import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { PATH_PUBLIC_DIR, METHOD_POST, METHOD_GET, FILE_NAME_MARKET } from "./constants";
import axios from 'axios';
import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencies_ids';
import fs from 'fs';
import { DEFAULT_CURRENCY } from '../../constants';

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
        var currency = DEFAULT_CURRENCY;
        if (req.query.currency) {
            currency = req.query.currency;
        }
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${cryptocurrencies_ids.join(',')}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
        const response = await axios.get(url, {
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then(async (resp) => {
                return (resp.data);
            }).catch(() => {
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
        updateCryptoCurrenciesFile(coins, currency);
        return (res.status(200).json({ msg: "POST_DATA", coins: coins }))
    } catch (err) {
        return (res.status(500).json({ msg: 'failed to load data', coins: [] }));
    }
}
