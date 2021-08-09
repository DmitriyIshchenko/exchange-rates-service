import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectExchangeFrom,
    selectExchangeTo,
    setExchangeFrom,
    setExchangeTo
} from "./exchangerSlice"

export function Exchanger(){
    const exchangeFrom = useSelector(selectExchangeFrom);
    const exchangeTo = useSelector(selectExchangeTo);
    const dispatch = useDispatch();

    return (
        <div>
            <input />
            <button>Exchange</button>
            <br />
            <input type="number" pattern="[0-9]*" value={exchangeFrom} onChange={(e)=>dispatch(setExchangeFrom(e.target.value))}/>
            <input type="number" pattern="[0-9]*" value={exchangeTo} onChange={(e)=>dispatch(setExchangeTo(e.target.value))}/>
        </div>
    )
}
