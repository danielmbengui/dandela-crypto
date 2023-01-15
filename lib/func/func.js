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