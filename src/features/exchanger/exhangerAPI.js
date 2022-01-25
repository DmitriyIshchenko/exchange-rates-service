
export function fetchSymbols() {
    return fetch('https://api.exchangerate.host/symbols')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data.symbols;
        });
}
export function fetchLatestRates(base) {
    return fetch(`https://api.exchangerate.host/latest?base=${base}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
}