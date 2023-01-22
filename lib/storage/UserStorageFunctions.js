import { DEFAULT_LANGAGE, DEFAULT_SCREEN_MODE, STORAGE_CURRENCY, STORAGE_LANGAGE, STORAGE_SCREEN_MODE } from "../../constants";

export function getScreenModeStorage() {
    if (typeof (Storage) !== "undefined") {
        if (window.localStorage.getItem(STORAGE_SCREEN_MODE)) {
            return(window.localStorage.getItem(STORAGE_SCREEN_MODE));
        }
    }
    return (DEFAULT_SCREEN_MODE);
}

export function updateScreenModeStorage(_screenMode) {
    if (typeof (Storage) !== "undefined") {
        window.localStorage.setItem(STORAGE_SCREEN_MODE, _screenMode);
    }
}

export function getLangageStorage() {
    if (typeof (Storage) !== "undefined") {
        if (window.localStorage.getItem(STORAGE_LANGAGE)) {
            return(window.localStorage.getItem(STORAGE_LANGAGE));
        }
    }
    return (DEFAULT_LANGAGE);
}

export function updateLangageStorage(_langage) {
    if (typeof (Storage) !== "undefined") {
        window.localStorage.setItem(STORAGE_LANGAGE, _langage);
    }
}

export function getCurrencyStorage() {
    if (typeof (Storage) !== "undefined") {
        if (window.localStorage.getItem(STORAGE_CURRENCY)) {
            return(window.localStorage.getItem(STORAGE_CURRENCY));
        }
    }
    return (DEFAULT_LANGAGE);
}

export function updateCurrencyStorage(_currency) {
    if (typeof (Storage) !== "undefined") {
        window.localStorage.setItem(STORAGE_CURRENCY, _currency);
    }
}

