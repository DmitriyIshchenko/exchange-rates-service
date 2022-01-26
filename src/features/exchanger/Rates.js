import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSymbolsAsync,
    fetchRatesAsync,
    setBase,
} from "./exchangerSlice"
import { useIsMount } from "./Exchanger"
import { Link } from 'react-router-dom';


export default function Rates() {

    const dispatch = useDispatch();
    const isMount = useIsMount();

    const base = useSelector(state => state.exchanger.base);
    const symbols = useSelector(state => state.exchanger.symbols);
    const rates = useSelector(state => state.exchanger.rates);
    const statusSymbols = useSelector(state => state.exchanger.statusSymbols);
    const statusRates = useSelector(state => state.exchanger.statusRates);
    useEffect(() => {
        if (isMount) {
            if (statusSymbols === "idle") dispatch(fetchSymbolsAsync());
            if (statusRates === "idle") dispatch(fetchRatesAsync(base));
        } else {
            dispatch(fetchRatesAsync(base));
        }
    }, [base])

    const options = Object.values(symbols).map(item => <option key={item.code} value={item.code}>{`${item.code} - ${item.description}`}</option>)
    const ratesList = Object.entries(rates).map(([code, rate]) => <li key={code}>{`1 ${code} = ${rate} ${base}`}</li>)

    return <div>
        <Link to="/">back to exchanger</Link>
        <select name="base" id="base" value={base} onChange={(e) => dispatch(setBase(e.target.value))}>
            {options}
        </select>
        <ul>
            {ratesList}
        </ul>
    </div>;
}
