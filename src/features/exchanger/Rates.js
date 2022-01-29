import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSymbolsAsync,
    fetchRatesAsync,
    setBase,
} from "./exchangerSlice"
import { fetchHistoricalAsync } from '../graph/graphSlice';
import { formatDate, getDateAgo } from '../graph/Graph';
import { useIsMount } from "./Exchanger"

import "../../styles/Rates.css"


export default function Rates() {

    const dispatch = useDispatch();
    const isMount = useIsMount();

    const base = useSelector(state => state.exchanger.base);
    const target = useSelector(state => state.exchanger.target);
    const symbols = useSelector(state => state.exchanger.symbols);
    const rates = useSelector(state => state.exchanger.rates);
    const statusSymbols = useSelector(state => state.exchanger.statusSymbols);
    const statusRates = useSelector(state => state.exchanger.statusRates);
    const statusHistorical = useSelector(state => state.graph.statusHistorical);
    const period = useSelector(state => state.graph.period);

    useEffect(() => {
        if (isMount) {
            if (statusSymbols === "idle") dispatch(fetchSymbolsAsync());
            if (statusRates === "idle") dispatch(fetchRatesAsync(base));
            if (statusHistorical === "idle") {
                dispatch(fetchHistoricalAsync({ base, target, startDate: getDateAgo(period), endDate: formatDate(new Date()) }))
            };
        } else {
            dispatch(fetchRatesAsync(base));
            dispatch(fetchHistoricalAsync({ base, target, startDate: getDateAgo(period), endDate: formatDate(new Date()) }))
        }
    }, [base])

    const options = Object.values(symbols).map(item => <option key={item.code} value={item.code}>{`${item.code} - ${item.description}`}</option>)
    const ratesList = Object.entries(rates).map(([code, rate]) => <li key={code}>{`1 ${code} = ${rate} ${base}`}</li>);

    return <div className='rates-container'>
        <select className='select-base' name="base" id="base" value={base} onChange={(e) => dispatch(setBase(e.target.value))}>
            {options}
        </select>
        <ul className='rates-list'>
            {ratesList}
        </ul>
    </div>;
}
