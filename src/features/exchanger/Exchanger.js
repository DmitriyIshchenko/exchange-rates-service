import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectExchangeFrom,
    selectExchangeTo,
    setExchangeFrom,
    setExchangeTo,
    fetchSymbolsAsync,
    setBaseAsync,
    setTarget,
    setInput,
    convertAsync
} from "./exchangerSlice"



export function Exchanger() {
    const exchangeFrom = useSelector(selectExchangeFrom);
    const exchangeTo = useSelector(selectExchangeTo);
    const symbols = useSelector((state) => state.exchanger.symbols);
    const statusSymbols = useSelector((state) => state.exchanger.statusSymbols);
    const statusRates = useSelector((state) => state.exchanger.statusRates);
    const base = useSelector((state) => state.exchanger.base);
    const target = useSelector((state) => state.exchanger.target);
    const input = useSelector((state) => state.exchanger.input);
    const dispatch = useDispatch();
    useEffect(() => {
        if (statusSymbols === "idle") dispatch(fetchSymbolsAsync());
        if (statusRates === "idle") dispatch(setBaseAsync(base));
    })

    function pressEnter(e) {
        if (e.keyCode === 13) dispatch(convertAsync(input))
    }
    return (
        <div>
            <input
                placeholder="15 usd in rub"
                onKeyDown={pressEnter}
                value={input}
                onChange={(e) => dispatch(setInput(e.target.value))} />
            <button onClick={() => dispatch(convertAsync(input))}>Click</button>
            <br />
            <select onChange={(e) => dispatch(setBaseAsync(e.target.value))}>
                {Object.keys(symbols).map(item => {
                    const text = `${item} - ${symbols[item].description}`
                    return item === base ?
                        <option value={item} selected="selected">{text}</option>
                        : <option value={item}>{text}</option>
                })}
            </select>
            <select onChange={(e) => dispatch(setTarget(e.target.value))}>
                {Object.keys(symbols).map(item => {
                    const text = `${item} - ${symbols[item].description}`
                    return item === target ?
                        <option value={item} selected="selected">{text}</option>
                        : <option value={item}>{text}</option>
                })}
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
