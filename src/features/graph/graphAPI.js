
export function fetchHistorical(startDate,endDate,base,target){
    console.log(arguments)
    return fetch(`https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${target}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        return data;
    })
}