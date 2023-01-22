import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import { PATH_PUBLIC_DIR, METHOD_POST, METHOD_GET, PATH_MARKET_DIR, PATH_MARKET_FILE, PATH_COINS_FILE } from "../constants";
//import initMiddleware from '../../lib/init-middleware';
//import { ACTION_UPDATE_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, METHOD_POST, TEXT_ACTION_DONT_EXIST } from './constants';
//import { updatePlayerByTwitterName, updatePlayerByTwitterUid, updatePlayerByWallet } from './functions';
import axios from 'axios';
//import { cryptocurrencies } from '../../__mocks__/cryptocurrencies';
//import { cryptocurrencies_ids } from '../../__mocks__/cryptocurrencie_ids';
//import { currencies } from '../../__mocks__/currencies';
import fs from 'fs';

const PATH_CRYPTO_CURRENCIES_DIR = `${PATH_PUBLIC_DIR}/cryptocurrencies`;
//const PATH_FILE_CRYPTO_CURRENCIES = `${PATH_CRYPTO_CURRENCIES_DIR}/descriptions.json`;
//const PATH_FILE_RESULT = `${PATH_CRYPTO_CURRENCIES_DIR}/all.json`;

function getCryptoCurrenciesFile() {
  if (!fs.existsSync(PATH_PUBLIC_DIR)) {
    fs.mkdirSync(PATH_PUBLIC_DIR, { recursive: true });
  }

  if (!fs.existsSync(PATH_COINS_FILE)) {
    fs.writeFileSync(PATH_COINS_FILE, JSON.stringify([], null, 2));
  }
  return JSON.parse(fs.readFileSync(PATH_COINS_FILE));
}

function getCryptoCurrency(id) {
  const cryptocurrencies = getCryptoCurrenciesFile();
  if (isInCryptoCurrenciesFile(id)) {
    for (let i = 0; i < cryptocurrencies.length; i++) {
      const element = cryptocurrencies[i];
      if (element.id === id) {
        return (element);
      }
    }
  }

  return (null);
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

const indexCryptoCurrency = (crypto_id) => {
  if (isInCryptoCurrenciesFile(crypto_id)) {
    const cryptocurrencies = getCryptoCurrenciesFile();
    for (let i = 0; i < cryptocurrencies.length; i++) {
      const element = cryptocurrencies[i];
      if (element.id === crypto_id) {
        return (i);
      }
    }
  }
  return (-1);
}



const updateCryptoCurrency = (data) => {
  const cryptocurrencies = getCryptoCurrenciesFile();
  const index = indexCryptoCurrency(data.id);
  if (index >= 0) {
    cryptocurrencies[index] = data;
  } else {
    cryptocurrencies.push(data);
  }

  try {
    fs.writeFileSync(PATH_COINS_FILE, JSON.stringify(cryptocurrencies, null, 2));
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
    const coin = getCryptoCurrency(id);

    if (coin) {
      res.status(200).json({ msg: 'OK', id: id, coin: coin });
    } else {
      console.log("GEEEEET COIN", coin)
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((resp) => {
        //console.log("DAAATA", resp.data)
        return (resp.data);
      }).catch(() => {
        //console.log("ERRRROR", err)
        return ({});
      });
      //console.log("DAAATA", response)
      const data = response;


      const myCoin = {
        id: data ? data.id : '',
        name: data ? data.name : '',
        image: {
          large: data ? data.image.large : ''
        },
        market_data: {
          current_price: {
            usd: data ? data.market_data.current_price.usd : 0
          }
        }
      }
      updateCryptoCurrency(myCoin);
      res.status(200).json({ msg: 'OK', id: id, coin: myCoin })
    }

    //console.log("MY COOOIN", myCoin)
  } catch (err) {
    res.status(500).json({ msg: 'failed to load data', coins: [] })
  }
  //const cryptocurrencies = getCryptoCurrenciesFile();
  //console.log("SUCCESS", _cryptocurrencies);

}
