import React, { useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistoricalAsync } from './graphSlice';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export function Graph() {
    const dispatch = useDispatch();
    const base = useSelector((state) => state.exchanger.base);
    const target = useSelector((state) => state.exchanger.target);
    const rates = useSelector((state) => state.graph.historical);
    const status = useSelector((state) => state.graph.statusGraph)
    const from = "2021-03-01";
    const to = "2021-08-09";
    useEffect(() => {
        if (status === "idle") dispatch(fetchHistoricalAsync([from, to, base, target]))
    })

    const dataset = [];
    (function () {
        Object.keys(rates).map(item => dataset.push({ date: item, value: rates[item][target]}))
        console.log(dataset)
    })();
    return (
        <ResponsiveContainer id="chart-container" width="100%" height="100%">
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
                <YAxis dataKey="value" domain={['auto', 'auto']} hide={true} />
                <XAxis dataKey="date" tickCount={12}/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );

}