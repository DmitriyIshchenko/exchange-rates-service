import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectExchangeFrom,
    selectExchangeTo,
    setExchangeFrom,
    setExchangeTo,
    fetchTimeAsync,
    fetchSymbolsAsync,
    setBaseAsync
} from "./exchangerSlice"



export function Exchanger() {
    const exchangeFrom = useSelector(selectExchangeFrom);
    const exchangeTo = useSelector(selectExchangeTo);
    const symbols = useSelector((state) => state.exchanger.symbols);
    const statusSymbols = useSelector((state) => state.exchanger.statusSymbols);
    const base = useSelector((state) => state.exchanger.base);
    const dispatch = useDispatch();

    useEffect(() => {
        if (statusSymbols === "idle") dispatch(fetchSymbolsAsync())
    })

    return (
        <div>
            <input />
            <button>Exchange</button>
            <br />
            <select onChange={(e) => dispatch(setBaseAsync(e.target.value))}>
                {Object.keys(symbols).map(item => {
                    const text = `${item} - ${symbols[item]}`
                    return item === base ?
                        <option value={item} selected="selected">{text}</option>
                        : <option value={item}>{text}</option>
                })}
            </select>
            <select>
                {Object.keys(symbols).map(item => <option>{item + " - " + symbols[item]}</option>)}
            </select>
            <br />
            <input
                type="number"
                pattern="[0-9]*"
                value={exchangeFrom}
                onChange={(e) => dispatch(setExchangeFrom(e.target.value))} />
            <input
                type="number"
                pattern="[0-9]*"
                value={exchangeTo}
                onChange={(e) => dispatch(setExchangeTo(e.target.value))} />
        </div>
    )
}
