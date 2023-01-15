export function capitalizeFirstLetter(word) {
    if (typeof word === 'string') {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }
}

export function capitalizeAllWord(word) {
    if (typeof word === 'string') {
        return (word.toUpperCase());
    }
}

export function roundNumber(number, afterdecimal = 2) {
    if (typeof number === 'number') {
        const multi = Math.pow(10, afterdecimal);
        return (Math.round(number * multi) / multi);
    }
}