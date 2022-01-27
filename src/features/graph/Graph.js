import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalAsync } from "./graphSlice";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const formatDate = (date) => {
    return date.toISOString().substring(0, 10);
}
const getDateAgo = (period) => {
    const date = new Date();
    switch (period) {
        case "year":
            date.setFullYear(date.getFullYear() - 1);
            break;
        case "month":
            date.setMonth(date.getMonth() - 1);
            break;
        case "week":
            date.setDate(date.getDate() - 6);
            break;
    }
    return formatDate(date);
}

export default function Graph({ base, target, isMount }) {

    const dispatch = useDispatch();

    const historical = useSelector(state => state.graph.historical);
    const statusHistorical = useSelector(state => state.graph.statusHistorical);

    const [period, setPeriod] = useState("year");

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

    const tickFormatter = (tick) => {
        const d = new Date(tick);
        switch (period) {
            case "year":
                return d.toLocaleString('default', { month: 'short' })
            case "month":
                return d.toLocaleString('default', { day: '2-digit' })
            case "week":
                return d.toLocaleString('default', { month: 'short', day: '2-digit' })
        }
    }
    const renderLineChart = (
        <LineChart data={historical} width={1000} height={500} style={{ background: "white" }}>
            <Line type="monotone" dataKey="rate" stroke="#8884d8" isAnimationActive={false} dot={false} />
            <CartesianGrid stroke="#ccc" vertical={false} />
            <XAxis dataKey="date"
                type="number"
                scale="time"
                domain={["auto", "auto"]}
                tickFormatter={tickFormatter}
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
                labelFormatter={(date) => new Date(date).toDateString()}
            />
        </LineChart>
    );
    return <div className='graph-container'>
        <div className='period-controls'>
            <label htmlFor="year">Year
                <input type="radio" name="period" id="year" value="year" onChange={handlePeriodChange} checked={period === "year"} />
            </label>
            <label htmlFor="month">Month
                <input type="radio" name="period" id="month" value="month" onChange={handlePeriodChange} checked={period === "month"} />
            </label>
            <label htmlFor="week">Week
                <input type="radio" name="period" id="week" value="week" onChange={handlePeriodChange} checked={period === "week"} />
            </label>
        </div>
        {renderLineChart}
    </div>
}
