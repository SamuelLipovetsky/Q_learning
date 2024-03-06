
import React, { useState, useContext,useEffect } from 'react';
// import "./graphs.css"
import { ConfigContext } from "../../main/main"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Graphs() {

    const limitDataPoints = (data, limit) => {
        if (data.length <= limit) {
          return data; // Return original data if it's already within the limit
        } else {
          // Sample the data to get a subset with the desired number of points
          const step = Math.floor(data.length / limit);
          return data.filter((_, index) => index % step === 0);
        }
      };
    const { isPlaying, setIsPlaying, drawData, setDrawData, varConfig, graphInfo } = useContext(ConfigContext);

    const { graphData, stepsGraphData, numberSteps, wins, loses } = graphInfo
    
    const [limitedGraphData,setLimitedGraphData]= useState([])
    const [limitedStepGraphData,setLimitedStepGraphData] =useState([])
    useEffect(() => {
        
        let Lgd = limitDataPoints(graphData,100)
        let Lsgd = limitDataPoints(stepsGraphData,100)
        setLimitedGraphData(Lgd)
        setLimitedStepGraphData(Lsgd)

      }, [graphData,stepsGraphData]);

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
                    data={limitedGraphData}
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
                    data={limitedStepGraphData}
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
