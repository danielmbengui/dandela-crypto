import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware';
import { PATH_PUBLIC_DIR, PATH_CRYPTO_CURRENCIES_DIR, PATH_FILE_CRYPTO_CURRENCIES, METHOD_POST, METHOD_GET } from "../constants";
//import initMiddleware from '../../lib/init-middleware';
//import { ACTION_UPDATE_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, METHOD_POST, TEXT_ACTION_DONT_EXIST } from './constants';
//import { updatePlayerByTwitterName, updatePlayerByTwitterUid, updatePlayerByWallet } from './functions';
import axios from 'axios';
import { cryptocurrencies } from '../../../__mocks__/cryptocurrencies';
import { currencies } from '../../../__mocks__/currencies';
import fs from 'fs';

function getCryptoCurrenciesFile() {
  if (!fs.existsSync(PATH_CRYPTO_CURRENCIES_DIR)) {
    fs.mkdirSync(PATH_CRYPTO_CURRENCIES_DIR, { recursive: true });
    fs.writeFileSync(PATH_FILE_CRYPTO_CURRENCIES, JSON.stringify([], null, 2));
  }
  return JSON.parse(fs.readFileSync(PATH_FILE_CRYPTO_CURRENCIES));
}

export const updateCryptoCurrenciesFile = (data) => {
  if (!fs.existsSync(PATH_CRYPTO_CURRENCIES_DIR)) {
    fs.mkdirSync(PATH_CRYPTO_CURRENCIES_DIR, { recursive: true });
  }
  try {
    fs.writeFileSync(PATH_FILE_CRYPTO_CURRENCIES, JSON.stringify(data, null, 2));
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
    console.log("API", "access to the API", req.body);
    if (req.body.action === "UPDATE_CRYPTO_CURRENCIES") {
      const tabCryptoCurrencies = [];
    const tabCurrencies = [];
    cryptocurrencies.forEach((cryptocurrency) => {
      tabCryptoCurrencies.push(cryptocurrency.id);
    });
    currencies.forEach((currency) => {
      tabCurrencies.push(currency.id);
    });
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tabCryptoCurrencies.join(",")}&vs_currencies=${tabCurrencies.join(",")}&include_24hr_change=true`;
    await axios.get(url).then((resp) => {

      let array = [];
      for (let i in cryptocurrencies) {
        const crypto = cryptocurrencies[i];
        const cryptoData = resp.data[crypto.id];
        cryptoData.id = crypto.id;
        cryptoData.name = crypto.name;
        cryptoData.symbol = crypto.symbol;
        cryptoData.logo = crypto.logo;
        array.push(cryptoData);
      }
      updateCryptoCurrenciesFile(array);
          console.log("SUCCESS", array);

      return res.status(400).json({msg: "Success", cryptocurrencies: array});
      //return (array)
    });
    }else{
      return res.status(405).json({ msg: "Error", cryptocurrencies: []});
    }
    //console.log("tab", tabCryptoCurrencies);
    //console.log("result", response);
  } catch {
    console.log("ERROR", 'merde');
    return res.status(405).json({ msg: "Error", cryptocurrencies: []});
  }
  
}
