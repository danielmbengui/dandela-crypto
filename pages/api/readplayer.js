import Cors from 'cors';
import initMiddleware from '../../init-middleware';
import { METHOD_GET} from './constants';
import { ACTION_READ_PLAYER, ACTION_READ_PLAYER_WALLET, ACTION_READ_PLAYER_TWITTER_UID, ACTION_READ_PLAYER_TWITTER_NAME} from './constants';
import { TEXT_ACTION_DONT_EXIST } from './constants';
import { getPlayerByTwitterName, getPlayerByTwitterUid, getPlayerByWallet } from './functions';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET and POST
    methods: [METHOD_GET],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res);

  if (req.method === METHOD_GET && req.query.player) {
    if (req.query.action === ACTION_READ_PLAYER) {
      const player = JSON.parse(req.query.player);
      let playerJson = getPlayerByWallet(player.walletAddress);
      playerJson = !playerJson ? getPlayerByTwitterUid(player.twitter.uid) : playerJson;
      playerJson = !playerJson ? getPlayerByTwitterName(player.twitter.displayName) : playerJson;
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_READ_PLAYER_WALLET) {
      const player = JSON.parse(req.query.player);
      const playerJson = getPlayerByWallet(player.walletAddress);
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_READ_PLAYER_TWITTER_UID) {
      const player = JSON.parse(req.query.player);
      const playerJson = getPlayerByTwitterUid(player.twitter.uid);
      return res.status(200).json(playerJson);
    }

    if (req.query.action === ACTION_READ_PLAYER_TWITTER_NAME) {
        const player = JSON.parse(req.query.player);
        const playerJson = getPlayerByTwitter(player.twitter.displayName);
        return res.status(200).json(playerJson);
      }
    return res.status(400).json(TEXT_ACTION_DONT_EXIST);

  }
  return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);
}
