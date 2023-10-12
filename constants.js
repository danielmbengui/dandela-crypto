import { cwd } from 'process';

/* --------------- GENERAL -------------- */
export const WEBSITE_NAME = 'Drill Dev';
export const APP_NAME = 'Drill Dev App';
export const DEFAULT_SCREEN_MODE = 'dark';
export const DEFAULT_LANGAGE = 'fr';
export const WEBSITE_PICTURES_ADDRESS = "https://pictures.dandela.com";
export const GALLERY_MAX_PICTURES_PER_PAGE = 100;
export const ADMIN_GALLERY_MAX_PICTURES_PER_PAGE = 300;

/* --------------- API'S -------------- */
/*                 Pages                */
export const PAGE_LINK_API_PICTURES = "/api/pictures";

/*                Methods               */
export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';

/*                Queries               */
export const QUERY_ACTION_GET_LIST_PICTURES = 'get_list_pictures';
export const QUERY_TYPE = 'type';
export const QUERY_SEARCH = 'search';
export const QUERY_PAGE = 'page';
export const QUERY_PER_PAGE = 'per_page';
/*                 Formats                */
export const EXTENSION_PNG = 'png';
export const EXTENSION_JPG = 'jpg';
export const EXTENSION_WEBP = 'webp';
export const HIGH_RESOLUTION = 'high_resolution';
export const LOW_RESOLUTION = 'low_resolution';

/*                Methods               */
export const TEXT_PUBLIC = `public`;
export const EXT_PNG = `.png`;
export const EXT_JPG = `.jpg`;
export const DIR_MIDJOURNEY_PICTURES = `${cwd()}/public/pictures/images`;
export const DIR_MIDJOURNEY_DATAS = `${cwd()}/public/images/midjourney/datas`;
export const DIR_MIDJOURNEY_DATA_FILE = `${cwd()}/public/images/midjourney/datas/data.json`;
export const DIR_MIDJOURNEY_DRAFTS = `${cwd()}/public/images/midjourney/drafts`;
export const DIR_WEBP = `${cwd()}/public/images/midjourney/webp`;
export const RELATIVE_DIR_MID_JOURNEY = `/images/mid-journey`;


/* --------------- LINKS -------------- */
export const PAGE_LINK_HOME = "/";
export const PAGE_LINK_GALLERY = "/gallery";
export const PAGE_LINK_DOWNLOADS = "/downloads";
export const PAGE_LINK_TUTORIAL = "/tutorial";
export const PAGE_LINK_ABOUT = "/about";
export const PAGE_LINK_CONTACT = "/contact";
export const PAGE_LINK_TUTORIAL_DRILL_DEV = "/tutorial/drilldev";
export const PAGE_LINK_TUTORIAL_MIDJOURNEY = "/tutorial/midjourney";

/*
export const COMPANY_NAME = 'Dandela';
export const DEFAULT_SCREEN_MODE = 'light';
export const DEFAULT_CURRENCY = 'usd';
export const CURRENCY_DOLLARS = 'usd';
export const CURRENCY_EUROS = 'eur';
export const CURRENCY_LIVRE_STERLING = 'gbp';
export const CURRENCY_SWISS_FRANCS = 'chf';
export const NAMESPACE_LANGAGE_COMMON = 'common';
export const NAMESPACE_LANGAGE_CRYPTO_CONVERTER = 'cryptoconverter';
export const NAMESPACE_LANGAGE_PRIVACY_POLICY = 'privacypolicy';

export const TAB_NAMEPACES = [
    NAMESPACE_LANGAGE_COMMON,
    NAMESPACE_LANGAGE_HOME,
    NAMESPACE_LANGAGE_CRYPTO_CONVERTER,
    NAMESPACE_LANGAGE_PRIVACY_POLICY,
    NAMESPACE_LANGAGE_404
];


export const PAGE_LINK_MARKET = "/market";
export const PAGE_LINK_COIN = "/coin";
export const PAGE_LINK_CRYPTO_CONVERTER = "/cryptoconverter";
export const PAGE_LINK_LIST_CRYPTO_CURRENCIES = "/list";
export const PAGE_LINK_PRIVACY_POLICY = "/privacypolicy";
export const PAGE_LINK_404 = "/404";
/*
export const PAGE_LINK_HOME = "/";
export const PAGE_LINK_ERROR_LOGIN = "/app/authentication/errorlogin";
export const PAGE_LINK_ERROR_FIREBASE = "/app/authentication/errorfirebase";
export const PAGE_LINK_PROFILE = "/app/dashboard/profile";
export const PAGE_LINK_SETTINGS = "/app/dashboard/settings";
export const PAGE_LINK_NEW_TRANSFER = "/app/dashboard/transfers/new";
export const PAGE_LINK_INPROGRESS_LIST = "/app/dashboard/transfers/lists/inprogress";
*/

/*
export const NAMESPACE_LANGAGE_COMMON = 'common';
export const NAMESPACE_LANGAGE_PROFILE = 'profile';
export const NAMESPACE_LANGAGE_NEW_TRANSFER = 'transferts/new';
export const NAMESPACE_LANGAGE_INPROGRESS_LIST = 'transferts/inprogress';

export const TEXT_SYMBOL_DOLLARS = '$';
export const TEXT_SYMBOL_EUROS = '€';
export const TEXT_SYMBOL_LIVRE_STERLING = '£';
export const TEXT_SYMBOL_SWISS_FRANCS = 'CHF';
*/

/* --------------- TEXTS -------------- */

/* --------------- STORAGE -------------- */
