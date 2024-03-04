
import React, { useState, useContext } from 'react';
// import "./graphs.css"
import { ConfigContext } from "../../main/main"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Graphs() {

    const { isPlaying, setIsPlaying, drawData, setDrawData, varConfig, graphInfo } = useContext(ConfigContext);
    const { graphData, stepsGraphData, numberSteps, wins, loses } = graphInfo
    // console.log(graphData,stepsGraphData)
    return (

        <div className='graphs-wrapper' style={{ width: "100%", height: "100%" }}>
            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", placeItems: "center", paddingTop: "3%" }}>
                <div>Passos: {numberSteps}</div>
                <div>vitórias: {wins}</div>
                <div>Derrotas: {loses}</div>
            </div>
            <ResponsiveContainer width="100%" height="45%"  >
                <LineChart
                    data={graphData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Média Q-values" stroke="white" dot={false} />
                </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="45%"   >
                <LineChart
                    data={stepsGraphData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Passos até a vitória" stroke="white" dot={false} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

export default Graphs;
