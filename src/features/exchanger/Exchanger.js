import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSymbolsAsync,
    fetchRatesAsync,
    setBase,
    setTarget
} from "./exchangerSlice"
import Graph from "../graph/Graph"
import { FaExchangeAlt } from "react-icons/fa"

import "../../styles/Exchanger.css"

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
    const handleReverse = () => {
        const tempBase = base;
        const tempTarget = target;
        dispatch(setBase(tempTarget));
        dispatch(setTarget(tempBase));
    }

    const options = Object.values(symbols).map(item => <option value={item.code} key={item.code}>{`${item.code} - ${item.description}`}</option>);

    return (
        <div className='exchanger-container'>

            <div className='convert-sentence'>
                <input
                    className="input-convert"
                    type="text"
                    placeholder='15 usd in rub'
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)} />
                <button className='btn-convert' onClick={handleConvert}>Convert</button>
            </div>
            <div className='exchanger'>
                <div className='from-to-container'>
                    <select className="select-from-to" name="from" id="from" value={base} onChange={(e) => dispatch(setBase(e.target.value))}>
                        {options}
                    </select>
                    <input className="input-from-to" type="text" value={fromAmount} onChange={handleChangeFrom} placeholder='0' />
                </div>
                <button className='btn-reverse' onClick={handleReverse}><FaExchangeAlt /></button>
                <div className='from-to-container'>
                    <select className="select-from-to" name="to" id="to" value={target} onChange={(e) => dispatch(setTarget(e.target.value))}>
                        {options}
                    </select>
                    <input className="input-from-to" type="text" value={toAmount || ""} onChange={handleChangeTo} placeholder='0' />
                </div>
            </div>

            <Graph base={base} target={target} isMount={isMount} />
        </div>
    )
}
