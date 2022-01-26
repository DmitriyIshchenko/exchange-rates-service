export function fetchHistorical(data) {
    const { startDate, endDate, base, target } = data;
    return fetch(`https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${target}`)
        .then(response => response.json())
        .then(data => data);
}