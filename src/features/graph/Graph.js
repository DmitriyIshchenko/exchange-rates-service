import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalAsync, setPeriod } from "./graphSlice";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import "../../styles/Graph.css"

export const formatDate = (date) => {
    return date.toISOString().substring(0, 10);
}
export const getDateAgo = (period) => {
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
        default:
            break;
    }
    return formatDate(date);
}

export default function Graph({ base, target, isMount }) {

    const dispatch = useDispatch();

    const historical = useSelector(state => state.graph.historical);
    const statusHistorical = useSelector(state => state.graph.statusHistorical);
    const period = useSelector(state => state.graph.period);

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
        dispatch(setPeriod(e.target.value));
    }

    const tickFormatter = (tick, period) => {
        const d = new Date(tick);
        switch (period) {
            case "year":
                return d.toLocaleString('en-US', { month: 'short' })
            case "month":
                return d.toLocaleString('en-US', { day: '2-digit' })
            case "week":
                return d.toLocaleString('en-US', { month: 'short', day: '2-digit' })
            default:
                break;
        }
    }
    const getTicks = (period, historical) => {
        if (historical.length > 0) {
            let start = historical[0].date;
            let end = new Date(historical.at(-1).date);
            end.setDate(1);
            end = end.getTime();
            let ticks = [];
            switch (period) {
                case "year":
                    while (end > start) {
                        ticks.push(end);
                        let date = new Date(end);
                        date.setMonth(date.getMonth() - 1);
                        end = date.getTime();
                    }
                    break;
                default:
                    ticks.concat(historical)
                    break;
            }
            return ticks;
        }
    }
    const renderLineChart = (
        <LineChart data={historical} width={1000} height={500} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <Line type="monotone" dataKey="rate" stroke="#4D99E5" strokeWidth={2} dot={false} isAnimationActive={false} />
            <CartesianGrid stroke="#ccc" vertical={false} />
            <XAxis dataKey="date"
                type="number"
                scale="time"
                domain={["auto", "auto"]}
                ticks={getTicks(period, historical)}
                tickFormatter={tick => tickFormatter(tick, period)}
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
                labelFormatter={(date) => new Date(date).toDateString()}
            />
        </LineChart>
    );
    return <div className='graph-container'>
        <div className='period-controls'>
            <label htmlFor="year" className={period === "year" ? "radio-selected" : ""}>Year
                <input type="radio" name="period" id="year" value="year" onChange={handlePeriodChange} checked={period === "year"} />
            </label>
            <label htmlFor="month" className={period === "month" ? "radio-selected" : ""}>Month
                <input type="radio" name="period" id="month" value="month" onChange={handlePeriodChange} checked={period === "month"} />
            </label>
            <label htmlFor="week" className={period === "week" ? "radio-selected" : ""}>Week
                <input type="radio" name="period" id="week" value="week" onChange={handlePeriodChange} checked={period === "week"} />
            </label>
        </div>
        <div className='graph'>
            <ResponsiveContainer >
                {renderLineChart}
            </ResponsiveContainer>
        </div>
    </div>
}
