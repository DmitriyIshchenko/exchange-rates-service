require('dotenv').config();

export function fetchSymbols(){
    return fetch(`http://api.exchangeratesapi.io/v1/symbols?access_key=${process.env.REACT_APP_API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data.symbols);
        return data.symbols;
    });
}