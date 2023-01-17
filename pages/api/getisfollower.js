import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';
import { METHOD_GET } from './constants';

const { TwitterApi } = require('twitter-api-v2');

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: [METHOD_GET],
    })
)

const WINNOBEARZ_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const WINNOBEARZ_API_KEY_SECRET = process.env.NEXT_PUBLIC_API_KEY_SECRET;
const WINNOBEARZ_TWITTER_ID = process.env.NEXT_PUBLIC_TWITTER_USER_ID;

export default async function handler(req, res) {
    await cors(req, res);
    if (req.method === METHOD_GET && req.query.player) {
        const player = JSON.parse(req.query.player);
        //const uid = req.query.uid;
        const userClient = new TwitterApi({
            appKey: WINNOBEARZ_API_KEY,
            appSecret: WINNOBEARZ_API_KEY_SECRET,
            // Following access tokens are not required if you are
            // at part 1 of user-auth process (ask for a request token)
            // or if you want a app-only client (see below)
            accessToken: player.twitter.token,
            accessSecret: player.twitter.secret,
        });
        const v1Client = userClient.v1;
        
        const { relationship } = await v1Client.friendship({ source_id: player.twitter.uid, target_id: WINNOBEARZ_TWITTER_ID });
        let isFollower = relationship.source.following;
        //const limit = v1Client._requestMaker.rateLimits;
        //if (limit['https://api.twitter.com/1.1/friendships/show.json'].remaining > 0)
          //  isFollower = relationship.source.following;

        return res.status(200).json(isFollower);
    }
    return res.status(405).json(`METHOD ${req.method} NOT ALLOWED`);

}