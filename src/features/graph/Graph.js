import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalAsync } from "./graphSlice";

const formatDate = (date) => {
    return date.toISOString().substring(0, 10);
}
const getDateAgo = (period) => {
    const date = new Date();
    switch (period) {
        case "year":
            date.setFullYear(date.getFullYear() - 1);
        case "month":
            date.setMonth(date.getMonth() - 1);
        case "week":
            date.setDate(date.getDate() - 7);
            return formatDate(date);
    }
}
export default function Graph({ base, target, isMount }) {

    const dispatch = useDispatch();

    const historical = useSelector(state => state.graph.historical);
    const statusHistorical = useSelector(state => state.graph.statusHistorical);

    const [period, setPeriod] = useState("week");

    useEffect(() => {
        if (isMount) {
            if (statusHistorical === "idle") {
                dispatch(fetchHistoricalAsync({ base, target, startDate: getDateAgo(period), endDate: formatDate(new Date()) }))
            }
        } else {
            dispatch(fetchHistoricalAsync({ base, target, startDate: getDateAgo(period), endDate: formatDate(new Date()) }))
        }
    }, [base, target, period])

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    }

    return <div className='graph'>

        <label htmlFor="year">Year
            <input type="radio" name="period" id="year" value="year" onChange={handlePeriodChange} checked={period === "year"} />
        </label>
        <label htmlFor="month">Month
            <input type="radio" name="period" id="month" value="month" onChange={handlePeriodChange} checked={period === "month"} />
        </label>
        <label htmlFor="week">Week
            <input type="radio" name="period" id="week" value="week" onChange={handlePeriodChange} checked={period === "week"} />
        </label>

        <p>{base}</p>
        <p>{target}</p>
    </div>;
}
