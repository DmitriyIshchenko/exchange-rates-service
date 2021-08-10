
export function fetchSymbols(){
    return fetch('https://api.exchangerate.host/symbols')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data.symbols;
    });
}
export function fetchLatestRates(base){
    return fetch(`https://api.exchangerate.host/latest?base=${base}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    }); 
}

export function convert(from,to,amount){
    return fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
    .then((response)=>response.json())
    .then(data=>data);
}