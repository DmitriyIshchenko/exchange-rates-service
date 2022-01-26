import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSymbolsAsync,
    fetchRatesAsync,
    setBase,
    setTarget
} from "./exchangerSlice"
import { Link } from "react-router-dom"

export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
}

export function Exchanger() {

    const dispatch = useDispatch();
    const isMount = useIsMount();

    const [sentence, setSentence] = useState("");
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");

    const symbols = useSelector(state => state.exchanger.symbols);
    const rates = useSelector(state => state.exchanger.rates);
    const base = useSelector(state => state.exchanger.base);
    const target = useSelector(state => state.exchanger.target);
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

    useEffect(() => {
        setToAmount(Math.trunc(+fromAmount * rates[target] * 1000) / 1000)
    }, [target, rates])

    const handleConvert = () => {
        const data = sentence.split(" "); //15 usd in rub
        let [
            amount,
            from,
            , //in
            to
        ] = data;
        if (amount && from && to) {
            from = from.toUpperCase();
            to = to.toUpperCase();
            if (!isNaN(+amount) && symbols.hasOwnProperty(from) && symbols.hasOwnProperty(to)) {
                dispatch(setBase(from));
                dispatch(setTarget(to));
                setFromAmount(+amount);
            }
        } else return;
    }

    const handleChangeFrom = (e) => {
        setFromAmount(e.target.value);
        setToAmount(Math.trunc(e.target.value * rates[target] * 1000) / 1000)
    }
    const handleChangeTo = (e) => {
        setToAmount(e.target.value);
        setFromAmount(Math.trunc(e.target.value / rates[target] * 1000) / 1000)
    }

    const options = Object.values(symbols).map(item => <option value={item.code} key={item.code}>{`${item.code} - ${item.description}`}</option>);

    return (
        <div id="exchanger-container">
            <Link to="/rates">show all rates</Link>

            <div className='convert-sentence'>
                <input type="text" value={sentence} onChange={(e) => setSentence(e.target.value)} />
                <button onClick={handleConvert}>Convert</button>
            </div>

            <select name="from" id="from" value={base} onChange={(e) => dispatch(setBase(e.target.value))}>
                {options}
            </select>
            <input type="text" value={fromAmount} onChange={handleChangeFrom} />

            <select name="to" id="to" value={target} onChange={(e) => dispatch(setTarget(e.target.value))}>
                {options}
            </select>
            <input type="text" value={toAmount || ""} onChange={handleChangeTo} />

        </div>
    )
}
