
import DrawButton from '../drawButton/drawButton';
import Matrix from '../matrix/Matrix'
import * as utils from "./aux-functions"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './main.css';
import MatrixControls from '../matrixControls/matrixControls';
function Main() {
  const [matrixData, setMatrixData] = useState(() => {
    return [
      [1, 0, 3, 0, 3, 0, 0],
      [0, 3, 0, 3, 0, 3, 0],
      [0, 0, 0, 0, 0, 0, 4],
      [0, 3, 0, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]
  });
  const [graphData, setGraphData] = useState([{ value: 0 }])
  const [qTable, setqTable] = useState(() => { return utils.initializeQTable(7) })
  const [drawData, setDrawdata] = useState(0)
  const [intervalDuration, setIntervalDuration] = useState(50);
  const [intervalId, setIntervalId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTraining, setIsTraining] = useState(false)

  // const [agentPosition,setAgentPosition] =useState([0,0])
  let agentPosition = [0, 0]
  for (let i = 0; i < matrixData.length; i++) {
    for (let j = 0; j < matrixData[i].length; j++) {
      if (matrixData[i][j] === 1) {
        // return { row: i, column: j };
        agentPosition = [i, j]
        break
      }
    }
  }

  let passos = 0
  const qLearningState = (learningRate, discountFactor, defaultReward) => {
    const numStates = matrixData.length;
    const numActions = 4;
    // Choose an action based on epsilon-greedy strategy
    let action;
    let randomIndex;
    let availabeActions;
    if (Math.random() > 0.8) {
      availabeActions = utils.getAvailableActions(matrixData, agentPosition)
      randomIndex = Math.floor(Math.random() * availabeActions.length);
      action = availabeActions[randomIndex]
    } else {
      action = utils.chooseOptimalAction(qTable, agentPosition, matrixData);
    }

    const nextState = utils.getNextState(agentPosition, action);
    const reward = utils.getReward(matrixData, nextState, defaultReward);

    const [agentRow, agentCol] = agentPosition;
    const qValue = qTable[agentRow][agentCol][action];
    const maxQValue = Math.max(...qTable[nextState[0]][nextState[1]]);
    const newQTable = [...qTable];
    newQTable[agentRow][agentCol][action] += learningRate * (reward + discountFactor * maxQValue - qValue);
    setqTable(newQTable);
    const [nextRow, nextCol] = nextState;
    passos += 1;
    if (reward == 3 || reward == -3) {
      const newMatrix = [...matrixData];
      newMatrix[agentRow][agentCol] = 0
      const newQTable = [...qTable];
      if (reward == -3) {
        newQTable[nextState[0]][nextState[1]] = [-1, -1, -1, -1]
      }
      if (reward == 3) {
        newQTable[nextState[0]][nextState[1]] = [+1, +1, +1, +1]
      }
      setqTable(newQTable);
      updateMatrix(newMatrix)
      if (reward == 1) {

      }
      passos = 0
      agentPosition = [0, 0]

    }
    else {
      agentPosition = nextState
      const newMatrix = [...matrixData];
      newMatrix[agentRow][agentCol] = 0
      newMatrix[nextRow][nextCol] = 1
      updateMatrix(newMatrix)
    }
    const maxValues = qTable.map(subArray =>
      subArray.map(row => Math.max(...row))
    );

    const totalSum = maxValues.reduce((acc, subArray) =>
      acc + subArray.reduce((subAcc, val) => subAcc + val, 0), 0
    );
    const average_max_q = totalSum / (qTable.length * qTable[0].length);
    // setGraphData(prevGraphData => [...prevGraphData, { value: average_max_q }]);
    setGraphData(prevGraphData => {
      const shouldAddValue = Math.random() < 0.05; // Random check to determine whether to add the value or not

      if (shouldAddValue) {
        return [...prevGraphData, { "Average Max Qvalues": average_max_q }];
      } else {
        return prevGraphData; // Return the previous state without adding the new value
      }
    });
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        qLearningState(0.3, 0.9, -0.06);
      }, intervalDuration);

      setIntervalId(interval);

      return () => clearInterval(interval);
    }
  }, [isPlaying, intervalDuration]);

  const updateMatrix = (newMatrix) => {
    setMatrixData(newMatrix);
  };
  const updateDrawData = (newDrawingType) => {
    setDrawdata(newDrawingType);
  };
  const updateIsPlaying = () => {

    setIsPlaying(prevIsPlaying => !prevIsPlaying);

  };
  const runQlearning = (n_times) => {
    if (!isTraining) {
      console.log('1')
      setIsTraining(true)
      setIsPlaying(false)
      for (let i = 0; i < n_times; i++) {
        qLearningState(0.3, 0.9, -0.06, 0.9);
      }

      const newMatrix = [...matrixData];
      newMatrix[agentPosition[0]][agentPosition[1]] = 0
      updateMatrix(newMatrix)
      agentPosition = [0, 0]
      setIsPlaying(true)
      setIsTraining(false)
      console.log('2')
    }



  }
  const resetTable = () => {
    setIsPlaying(false)
    agentPosition = [0, 0]
    let newQTable = utils.initializeQTable(7)
    setqTable(newQTable);

  }
  const handleSliderChange = (event) => {
    setIntervalDuration(parseInt(event.target.value, 10)); // Parse slider value to integer
  };

  return (
    <div className="">
      <div className="wrapper">
        <div className="child config">
          <div><DrawButton updateDrawData={updateDrawData}
            drawData={2} title={"obtaculo"}></DrawButton></div>
          <div><DrawButton updateDrawData={updateDrawData}
            drawData={4} title={"Recompensa"}></DrawButton></div>
          <div><DrawButton updateDrawData={updateDrawData}
            drawData={3} title={"punição"}></DrawButton></div>
        </div>
        <div className="child matrix">
          <Matrix qTable={qTable} initialData={matrixData} drawData={drawData} updateMatrix={updateMatrix} />
          <MatrixControls resetTable={resetTable} runQlearning={runQlearning} updateIsPlaying={updateIsPlaying} ></MatrixControls>
        </div>
        <div className="child config ">


          {/* <ResponsiveContainer width="100%">
            <LineChart
              data={graphData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Average Max Qvalues" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </div>
  );
}

export default Main;
