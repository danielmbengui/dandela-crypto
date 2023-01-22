import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import { PATH_PUBLIC_DIR, METHOD_POST, METHOD_GET, PATH_MARKET_DIR, FILE_NAME_MARKET, PATH_COINS_FILE, FILE_NAME_COINS } from "../constants";
//import initMiddleware from '../../lib/init-middleware';
//import { ACTION_UPDATE_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, METHOD_POST, TEXT_ACTION_DONT_EXIST } from './constants';
//import { updatePlayerByTwitterName, updatePlayerByTwitterUid, updatePlayerByWallet } from './functions';
import axios from 'axios';
//import { cryptocurrencies } from '../../__mocks__/cryptocurrencies';
//import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencie_ids';
//import { currencies } from '../../__mocks__/currencies';
import fs from 'fs';
import { DEFAULT_CURRENCY } from '../../../constants';

//const PATH_FILE_CRYPTO_CURRENCIES = `${PATH_CRYPTO_CURRENCIES_DIR}/descriptions.json`;
//const PATH_FILE_RESULT = `${PATH_CRYPTO_CURRENCIES_DIR}/all.json`;

function getCryptoCurrenciesFile(currency) {
  const myPath = `${PATH_PUBLIC_DIR}/${currency}`;
  const myFile = `${myPath}/${FILE_NAME_COINS}`;
  if (!fs.existsSync(myPath)) {
    fs.mkdirSync(myPath, { recursive: true });
  }

  if (!fs.existsSync(myFile)) {
    fs.writeFileSync(myFile, JSON.stringify([], null, 2));
  }
  return JSON.parse(fs.readFileSync(myFile));
}

function getCryptoCurrency(id, currency) {
  const cryptocurrencies = getCryptoCurrenciesFile(currency);
  if (isInCryptoCurrenciesFile(id, currency)) {
    for (let i = 0; i < cryptocurrencies.length; i++) {
      const element = cryptocurrencies[i];
      if (element.id === id) {
        return (element);
      }
    }
  }

  return (null);
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

const indexCryptoCurrency = (crypto_id, currency) => {
  if (isInCryptoCurrenciesFile(crypto_id, currency)) {
    const cryptocurrencies = getCryptoCurrenciesFile(currency);
    for (let i = 0; i < cryptocurrencies.length; i++) {
      const element = cryptocurrencies[i];
      if (element.id === crypto_id) {
        return (i);
      }
    }
  }
  return (-1);
}



const updateCryptoCurrency = (data, currency) => {
  const myPath = `${PATH_PUBLIC_DIR}/${currency}`;
  const myFile = `${myPath}/${FILE_NAME_COINS}`;
  const cryptocurrencies = getCryptoCurrenciesFile(currency);
  const index = indexCryptoCurrency(data.id, currency);
  if (index >= 0) {
    cryptocurrencies[index] = data;
  } else {
    cryptocurrencies.push(data);
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
  const { id } = req.query
  //res.end(`Post: ${id}`)


  try {
    //const result = await someAsyncOperation()
    /*
    if (req.method === METHOD_GET) {
      
      
    } else {
        res.status(500).json({ msg: 'failed to load data', coins: [] })
    }
*/
    //console.log("START API", "ok")
    var currency = DEFAULT_CURRENCY;
    if (req.body.currency) {
      currency = req.body.currency;
    }
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const response = await axios.get(url, {
      headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"*",
      }
    }).then((resp) => {
      //console.log("DAAATA", resp.data)
      return (resp.data);
    }).catch(() => {
      //console.log("ERRRROR", err)
      return (getCryptoCurrency(id, currency));
    });
    //console.log("DAAATA", response)
    const myCoin = {
      id: response ? response.id : id,
      name: response ? response.name : '',
      symbol: response ? response.symbol : '',
      image: {
        large: response ? response.image.large : ''
      },
      market_data: {
        current_price: response ? response.market_data.current_price[currency] : 0,
      }
    }
    //console.log("GEEEEET COIN", coin)
    updateCryptoCurrency(myCoin, currency);
    res.status(200).json({ msg: 'OK', coin: myCoin })

    //console.log("MY COOOIN", myCoin)
  } catch (err) {
    res.status(500).json({ msg: 'failed to load data', coin: null })
  }
  //console.log("SUCCESS", _cryptocurrencies);

}
