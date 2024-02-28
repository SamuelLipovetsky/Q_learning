
import Matrix from '../matrix/Matrix'
import * as utils from "./aux-functions"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './main.css';
import MatrixControls from '../matrixControls/matrixControls';
import MatrixConfigs from '../matrixConfigs/mainConfigs/matrixConfigs';
export const ConfigContext = createContext();

function Main() {
  const [matrixData, setMatrixData] = useState(() => {
    return [
      [1, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 3, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 0, 0, 4],
    ]
  });
  const [graphData, setGraphData] = useState([{ value: 0 }])
  const [qTable, setqTable] = useState(() => { return utils.initializeQTable(7) })
  const [drawData, setDrawData] = useState(0)
  const [intervalDuration, setIntervalDuration] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true)
  const [isTraining, setIsTraining] = useState(false)
  const [numberSteps, setNumberSteps] = useState(() => { return 0 })
  const [learningRateState,setLearningate] = useState(0.3)
  const [discountFactorState,setDiscountFactor] = useState(0.9)
  const [defaultReward,setDefaultReward] =useState(3)
  const [negativeDefaultReward,setNegativeDefaultReward] =useState(-3)
  const [alpha,setAlpha] = useState(0.90)


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
    if (Math.random() > alpha) {
      availabeActions = utils.getAvailableActions(matrixData, agentPosition)
      randomIndex = Math.floor(Math.random() * availabeActions.length);
      action = availabeActions[randomIndex]
    } else {
      action = utils.chooseOptimalAction(qTable, agentPosition, matrixData);
    }

    const nextState = utils.getNextState(agentPosition, action);
    const reward = utils.getReward(matrixData, nextState, defaultReward, 3, -1);

    const [agentRow, agentCol] = agentPosition;
    const qValue = qTable[agentRow][agentCol][action];
    const maxQValue = Math.max(...qTable[nextState[0]][nextState[1]]);
    const newQTable = [...qTable];
    newQTable[agentRow][agentCol][action] += learningRate * (reward + discountFactor * maxQValue - qValue);
    setqTable(newQTable);
    const [nextRow, nextCol] = nextState;
    passos += 1;
    if (reward == 3 || reward == -1) {
      const newMatrix = [...matrixData];
      newMatrix[agentRow][agentCol] = 0
      const newQTable = [...qTable];
      if (reward == -1) {
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
    setNumberSteps(prevSteps => prevSteps + 1);
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        qLearningState(0.3, 0.9, -0.06);
      }, intervalDuration);

      setIntervalId(interval);
      // setNumberSteps(numberSteps+1)

      return () => clearInterval(interval);
    }
  }, [isPlaying, intervalDuration]);

  const updateMatrix = (newMatrix) => {
    setMatrixData(newMatrix);
  };
  const updateIsPlaying = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };
  async function runQlearning(n_times) {
    if (!isTraining) {

      setIsTraining(true)
      setIsPlaying(false)
      let matrixCopy = [...matrixData]
      let qTableCopy = [...qTable]
      await new Promise((resolve, reject) => {


        let averageQValues = utils.qLearningFaster(matrixCopy, qTableCopy, 0.8, 0.3, 0.9, -0.06, n_times, 3, -3)
        setNumberSteps(prevSteps => prevSteps + n_times);
        resolve(); 

      });
      updateMatrix(matrixCopy)
      setqTable(qTableCopy)
      setIsPlaying(true)
      setIsTraining(false)

    }
  }
  const resetTable = () => {
    setIsPlaying(false)
    setNumberSteps(prevSteps => 0);
    for (let i = 0; i < matrixData.length; i++) {
      for (let j = 0; j < matrixData[i].length; j++) {
        if (matrixData[i][j] === 1) {
          // return { row: i, column: j };
          agentPosition = [i, j]
          const newMatrix = [...matrixData];
          newMatrix[agentPosition[0]][agentPosition[1]] = 0
          newMatrix[0][0] = 1
          updateMatrix(newMatrix)

          break
        }
      }
    }
    agentPosition = [0, 0]
    let newQTable = utils.initializeQTable(7)
    setqTable(newQTable);

  }
  const handleSliderChange = (event) => {
    setIntervalDuration(parseInt(event.target.value, 10)); // Parse slider value to integer
  };

  return (

    <div className="wrapper">
     
      <div className="child matrix-div">

          <div className='config'>
            <ConfigContext.Provider value={{ isPlaying, setIsPlaying, drawData, setDrawData }}>
              <MatrixConfigs></MatrixConfigs>
            </ConfigContext.Provider>
          </div>
          <div className='matrix'>
            <Matrix qTable={qTable} initialData={matrixData} drawData={drawData} updateMatrix={updateMatrix} />
          </div>
          <div className='filler'> 
          </div>
          <div className='matrix-controls'>
          <MatrixControls isPlaying={isPlaying} resetTable={resetTable} runQlearning={runQlearning} updateIsPlaying={updateIsPlaying} ></MatrixControls>
          </div>
        

          
      </div>

      <div className="child graph ">

        <ResponsiveContainer width="100%">
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
        </ResponsiveContainer>
      </div>
    </div>

  );
}

export default Main;
