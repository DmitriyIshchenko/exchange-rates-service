import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoricalAsync } from './graphSlice';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const moment = require("moment")

export function Graph() {
    const dispatch = useDispatch();
    const base = useSelector((state) => state.exchanger.base);
    const target = useSelector((state) => state.exchanger.target);
    const rates = useSelector((state) => state.graph.historical);

    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    const [from, setFrom] = useState(moment(yearAgo).format("YYYY-MM-DD"))
    const to = moment(new Date()).format("YYYY-MM-DD");

    useEffect(() => {
        dispatch(fetchHistoricalAsync([from, to, base, target]))
    }, [from, to, base, target])

    const dataset = [];
    (function () {
        Object.keys(rates).map(item => dataset.push({ date: new Date(item).getTime(), rate: rates[item][target] }))
    })();
    
    const getPastDate = (period) => {
        const targetDate = new Date();
        switch (period) {
            case "week":
                targetDate.setDate(targetDate.getDate() - 7);
                break;
            case "month":
                targetDate.setMonth(targetDate.getMonth() - 1);
                break;
            case "year":
                targetDate.setFullYear(targetDate.getFullYear() - 1);
                break;
        }
        return moment(targetDate).format("YYYY-MM-DD");
    }

    const tickFormatter = (tick) => moment(tick).format("DD MMM YY");

    return (
        <div id="graph-container" width="100%" height="100%">
            <button className="period-btn" onClick={() => setFrom(getPastDate("year"))}>Year</button>
            <button className="period-btn" onClick={() => setFrom(getPastDate("month"))}>Month</button>
            <button className="period-btn" onClick={() => setFrom(getPastDate("week"))}>Week</button>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={200}
                    data={dataset}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <YAxis dataKey="rate" domain={['auto', 'auto']} hide={true} />
                    <XAxis
                        dataKey="date"
                        type={"number"}
                        scale={"time"}
                        domain={['auto', 'auto']}
                        tickFormatter={tickFormatter} />
                    <Tooltip
                        cursor={false}
                        labelFormatter={(date) => new Date(date).toDateString()}
                    />
                    <Line type="monotone" dataKey="rate" stroke="#82ca9d" dot={false} strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

}
