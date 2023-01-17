import Cors from 'cors';
import initMiddleware from '../../init-middleware';
import { ACTION_UPDATE_PLAYER, ACTION_UPDATE_PLAYER_BY_TWITTER_NAME, ACTION_UPDATE_PLAYER_BY_TWITTER_UID, ACTION_UPDATE_PLAYER_BY_WALLET, METHOD_POST, TEXT_ACTION_DONT_EXIST } from './constants';
import { updatePlayerByTwitterName, updatePlayerByTwitterUid, updatePlayerByWallet } from './functions';

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET and POST
        methods: [METHOD_POST],
    })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res);

    if (req.method === METHOD_POST) {
        if (req.body.action === ACTION_UPDATE_PLAYER_BY_WALLET && req.body.player) {
            const player = req.body.player;
            const edited = updatePlayerByWallet(player);
            return res.status(200).json({ player: player, edited: edited });
        }

        if (req.body.action === ACTION_UPDATE_PLAYER_BY_TWITTER_UID && req.body.player) {
            const player = req.body.player;
            const edited = updatePlayerByTwitterUid(player);
            return res.status(200).json({ player: player, edited: edited });
        }

        if (req.body.action === ACTION_UPDATE_PLAYER_BY_TWITTER_NAME && req.body.player) {
            const player = req.body.player;
            const edited = updatePlayerByTwitterName(player);
            return res.status(200).json({ player: player, edited: edited });
        }
        return res.status(400).json(TEXT_ACTION_DONT_EXIST);
    }
    return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);
}
