export const currencies = [
    {
        id: "usd",
        symbol: "$",
        name: "Dollars",
    },
    {
        id: "eur",
        symbol: "€",
        name: "Euros",
    },
    {
        id: "chf",
        symbol: "CHF",
        name: "Francs Suisse",
    },
    {
        id: "gbp",
        symbol: "£",
        name: "Livre Sterling",
    },
];

export function getCurrencyMock(currency_id) {
    for (let i = 0; i < currencies.length; i++) {
        const element = currencies[i];
        if (element.id === currency_id) {
            return (element);
        }
    }
    return (null);
}
