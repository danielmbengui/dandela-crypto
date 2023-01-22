import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import { PATH_PUBLIC_DIR, METHOD_POST, METHOD_GET } from "../constants";
//import initMiddleware from '../../lib/init-middleware';
//import { ACTION_UPDATE_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, METHOD_POST, TEXT_ACTION_DONT_EXIST } from './constants';
//import { updatePlayerByTwitterName, updatePlayerByTwitterUid, updatePlayerByWallet } from './functions';
import axios from 'axios';
import { cryptocurrencies } from '../../../__mocks__/cryptocurrencies';
import { cryptocurrencies_ids } from '../../../__mocks__/cryptocurrencies_ids';
import { currencies } from '../../../__mocks__/currencies';
import fs from 'fs';
import { da } from 'date-fns/locale';

const PATH_CRYPTO_CURRENCIES_DIR = `${PATH_PUBLIC_DIR}/cryptocurrencies`;
const PATH_FILE_CRYPTO_CURRENCIES = `${PATH_CRYPTO_CURRENCIES_DIR}/descriptions.json`;
const PATH_FILE_RESULT = `${PATH_CRYPTO_CURRENCIES_DIR}/all.json`;

function getCryptoCurrenciesFile() {
    if (!fs.existsSync(PATH_CRYPTO_CURRENCIES_DIR)) {
        fs.mkdirSync(PATH_CRYPTO_CURRENCIES_DIR, { recursive: true });
    }

    if (!fs.existsSync(PATH_FILE_CRYPTO_CURRENCIES)) {
        fs.writeFileSync(PATH_FILE_CRYPTO_CURRENCIES, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(PATH_FILE_CRYPTO_CURRENCIES));
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
        }
    }
    try {
        fs.writeFileSync(PATH_FILE_CRYPTO_CURRENCIES, JSON.stringify(cryptocurrencies, null, 2));
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
    var array = [];
    //const cryptocurrencies = getCryptoCurrenciesFile();
    try {
        console.log("API", "access to the API", req.query);
        //if (req.body.action === "UPDATE_CRYPTO_CURRENCIES") {
        var tabCryptoCurrencies = cryptocurrencies_ids;
        const tabCurrencies = [];
        /*
        cryptocurrencies.forEach((cryptocurrency) => {
          //tabCryptoCurrencies.push(cryptocurrency.id);
        });
        
        for (let i = 0; i < cryptocurrencies.length; i++) {
            const element = cryptocurrencies[i];
            tabCryptoCurrencies.push(element.id);
        }
       */
      
        if (req.query.action === 'ok') {
            tabCryptoCurrencies = [];
            console.log("START tabCryptoCurrencies", )
            for (let i = 0; i < cryptocurrencies_ids.length; i++) {
                const id = cryptocurrencies_ids[i];
                if (!isInCryptoCurrenciesFile(id)) {
                    tabCryptoCurrencies.push(id);
                }
            }
            //console.log("FINIH tabCryptoCurrencies", tabCryptoCurrencies.length)
        }
        //console.log("TAB ORGIN", tabCryptoCurrencies)
        /*
        currencies.forEach((currency) => {
          tabCurrencies.push(currency.id);
        });
        */
        //const array = [];
       for (let i = 0; i < tabCryptoCurrencies.length; i++) {
        const id = tabCryptoCurrencies[i];
        //const id = element;
        const url = `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&market_data=false&community_data=false&developer_data=false`;
        //const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tabCryptoCurrencies.join(",")}&vs_currencies=${tabCurrencies.join(",")}&include_24hr_change=true`;
        await axios.get(url).then((resp) => {
            const _crypto = resp.data;
            const crypto = {
                id: _crypto.id,
                name: _crypto.name,
                symbol: _crypto.symbol,
                logo: _crypto.image.thumb,
                logo_small: _crypto.image.small,
                logo_large: _crypto.image.large,
                //description: _crypto.description,
                //links: _crypto.links,
                country_origin:_crypto.country_origin,
                genesis_date:_crypto.genesis_date,
                market_cap_rank:_crypto.market_cap_rank,
                //total_supply: _crypto.total_supply,
                //max_supply: _crypto.max_supply,
            };
            //_cryptocurrencies = crypto;
            //console.log("TAAAAB", _crypto);
            //return res.status(400).json({msg: "Success", cryptocurrencies: []});
            //return (crypto)
            array.push(crypto);
        });
       }
        console.log("LENTH FILE BEFORE", getCryptoCurrenciesFile().length);
        updateCryptoCurrenciesFile(array);
        console.log("LENTH FILE AFTER", getCryptoCurrenciesFile().length);
        console.log("REAL LENGTH", cryptocurrencies_ids.length);

        //console.log("TAAAAAB final", array);
        
    } catch {
        console.log("ERROR", 'merde');
        //return res.status(405).json({ msg: "Error", cryptocurrencies: []});
    } finally {
        return res.status(405).json({ msg: "MESSAGE", realLength:cryptocurrencies.length, fileLength:getCryptoCurrenciesFile().length, length: array.length, cryptocurrencies: array });
    }

    //const cryptocurrencies = getCryptoCurrenciesFile();
    //console.log("SUCCESS", _cryptocurrencies);

}
