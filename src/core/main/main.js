
import Matrix from '../matrix/Matrix'
import * as utils from "./aux-functions"
import React, { createContext, useContext, useState, useEffect } from 'react';

import './main.css';

import MatrixControls from '../matrixControls/matrixControls';
import TabConfig from '../matrixConfigs/tabConfig/tabConfig';

export const ConfigContext = createContext();

let stepsWin = 0;
function Main() {
  const [matrixData, setMatrixData] = useState(() => {
    // utils.initializeMatrix()
    return [
      [1, 0, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0 , 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 4, 0, 0, 0, 0],
      // [0, 0, 0, 0, 0, 0, 0],
      // [0, 0, 0, 0, 0, 0, 0],
      // [0, 0, 0, 0, 0, 0, 0],
      // [0, 0, 0, 0, 0, 0, 0],
      // [0, 0, 0, 0, 0, 0, 0],
      // [0, 0, 0, 0, 0, 0, 0],
      // [0, 0, 0, 0, 0, 0, 0],
    ]
  }
  );
  const [stepsGraphData, setStepsGraphData] = useState([])
  const [graphData, setGraphData] = useState([{ value: 0 }])
  const [qTable, setqTable] = useState(() => { return utils.initializeQTable(7) })
  const [drawData, setDrawData] = useState(5)

  const [intervalDuration, setIntervalDuration] = useState(1000);
  const [intervalId, setIntervalId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTraining, setIsTraining] = useState(false)
  const [numberSteps, setNumberSteps] = useState(() => { return 0 })
  const [learningRateState, setLearningate] = useState(0.5)
  const [discountFactorState, setDiscountFactor] = useState(0.96)
  const [defaultRewardState, setDefaultRewardState] = useState(-0.1)
  const [positiveDefaultReward, setPositiveDefaultReward] = useState(3)
  const [negativeDefaultReward, setNegativeDefaultReward] = useState(-1)
  const [epsilon, setEpsilon] = useState(0.10)
  const [loses, setLoses] = useState(0)
  const [wins, setWins] = useState(0)
  const colors = ["#333c4e", "white", "#0e0f16", "#a70f16", "#0e5c16"]

  const [agentPosState,setAgentPosState] = useState(()=> {return [0,0]})
  const [actionToTake,setActionToTake] =useState(()=>0)


  const varConfigFunctionsAndStates = {
    learningRateState, setLearningate,
    discountFactorState, setDiscountFactor,
    defaultRewardState, setDefaultRewardState,
    positiveDefaultReward, setPositiveDefaultReward,
    negativeDefaultReward, setNegativeDefaultReward,
    epsilon, setEpsilon

  }
  const graphInfo = {
    graphData, stepsGraphData, numberSteps, wins, loses
  }

  let agentPosition = [0, 0]
  for (let i = 0; i < matrixData.length; i++) {
    for (let j = 0; j < matrixData[i].length; j++) {
      if (matrixData[i][j] === 1) {
        agentPosition = [i, j]
        break
      }
    }
  }



  const qLearningState = (learningRate, discountFactor, defaultReward, isRandom,rand) => {

    // Choose an action based on epsilon-greedy strategy
    for (let i = 0; i < matrixData.length; i++) {
      for (let j = 0; j < matrixData[i].length; j++) {
        if (matrixData[i][j] === 1) {
          agentPosition = [i, j]
          break
        }
      }
    }
    
  
  
    let action;
    let randomIndex;
    let availabeActions;
    if (isRandom) {
      availabeActions = utils.getAvailableActions(matrixData, agentPosition)
      randomIndex = Math.floor(rand * availabeActions.length);
      action = availabeActions[randomIndex]
    } else {
      action = utils.chooseOptimalAction(qTable, agentPosition, matrixData);
    }

    setActionToTake(()=>{return action})
    const nextState = utils.getNextState(agentPosition, action);
    // console.log(nextState,action,"console")
    const reward = utils.getReward(matrixData, nextState, defaultReward, positiveDefaultReward, negativeDefaultReward);

    const [agentRow, agentCol] = agentPosition;
    const qValue = qTable[agentRow][agentCol][action];
    const maxQValue = Math.max(...qTable[nextState[0]][nextState[1]]);
    const newQTable = [...qTable];
    newQTable[agentRow][agentCol][action] += learningRate * (reward + discountFactor * maxQValue - qValue);
    setqTable(newQTable);
    const [nextRow, nextCol] = nextState;

    if (reward == positiveDefaultReward || reward == negativeDefaultReward) {
      const newMatrix = [...matrixData];
      newMatrix[agentRow][agentCol] = 0
      const newQTable = [...qTable];
      if (reward == negativeDefaultReward) {

        setLoses(prevLoses => { return prevLoses + 1 })

        newQTable[nextState[0]][nextState[1]] = [-1, -1, -1, -1]
      }
      if (reward == positiveDefaultReward) {


        let temp = stepsWin
        setStepsGraphData(prevStepsGraphData => {

          return [...prevStepsGraphData, { "Passos até a vitória": temp }];

        });

        stepsWin = 0;

        setWins(prevWins => { return prevWins + 1 })

        newQTable[nextState[0]][nextState[1]] = [+1, +1, +1, +1]
      }
      setqTable(newQTable);
      // updateMatrix(newMatrix)
      setMatrixData(newMatrix)

      agentPosition = [0, 0]

    }
    else {
      
      agentPosition = nextState
      const newMatrix = [...matrixData];
      newMatrix[agentRow][agentCol] = 0
      newMatrix[nextRow][nextCol] = 1
      // updateMatrix(newMatrix)
      setMatrixData(newMatrix)
    }
    const maxValues = qTable.map(subArray =>
      subArray.map(row => Math.max(...row))
    );

    const totalSum = maxValues.reduce((acc, subArray) =>
      acc + subArray.reduce((subAcc, val) => subAcc + val, 0), 0
    );
    const average_max_q = totalSum / (qTable.length * qTable[0].length);
    setGraphData(prevGraphData => {
      const shouldAddValue = Math.random() < 1; // Random check to determine whether to add the value or not

      if (shouldAddValue) {
        return [...prevGraphData, { "Média Q-values": average_max_q }];
      } else {
        return prevGraphData; // Return the previous state without adding the new value
      }
    });
    setNumberSteps(prevSteps => prevSteps + 1);
    stepsWin += 1;



  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
    
        let rand = Math.random()
        let isRandom = rand <epsilon
      
        
      
        qLearningState(learningRateState, discountFactorState, defaultRewardState,isRandom,rand);
        let found = false;
        for (let i = 0; i < matrixData.length; i++) {
          for (let j = 0; j < matrixData[i].length; j++) {
            if (matrixData[i][j] === 1) {
              found=true;
              setAgentPosState([i,j])
              break
            }
          }
        }
        if(found==false){
          setAgentPosState([0,0])
        }
      }, intervalDuration);

      setIntervalId(interval);


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
      let originalPlaying = isPlaying;
      setIsPlaying(false)

      let matrixCopy = [...matrixData]
      let qTableCopy = [...qTable]
      let averageQValues
      let stepsTilWIn
      let winsF
      let losesF
      await new Promise((resolve, reject) => {


        [stepsTilWIn, averageQValues, winsF, losesF] = utils.qLearningFaster(matrixCopy, qTableCopy, epsilon, learningRateState, discountFactorState, defaultRewardState,
          n_times, positiveDefaultReward, negativeDefaultReward)

        setGraphData(prevGraphData => {

          return prevGraphData.concat(averageQValues);


        });

        setStepsGraphData(prevStepsGraphData => {

          return prevStepsGraphData.concat(stepsTilWIn);

        });


        setNumberSteps(prevSteps => prevSteps + n_times);
        setWins(prevWins => prevWins + winsF)
        setLoses(prevLoses => loses + losesF)
        resolve();

      });

      // updateMatrix(matrixCopy)
      setMatrixData(matrixCopy)
      setqTable(qTableCopy)
      setIsPlaying(originalPlaying)
      setIsTraining(false)

    }
  }
  const resetTable = () => {
    setIsPlaying(false)
    setNumberSteps(prevSteps => 0);
    for (let i = 0; i < matrixData.length; i++) {
      for (let j = 0; j < matrixData[i].length; j++) {
        if (matrixData[i][j] === 1) {

          agentPosition = [i, j]
          const newMatrix = [...matrixData];
          newMatrix[agentPosition[0]][agentPosition[1]] = 0
          newMatrix[0][0] = 1
          // updateMatrix(newMatrix)
          setMatrixData(newMatrix)

          break
        }
      }
    }
    agentPosition = [0, 0]
    let newQTable = utils.initializeQTable(7)
    setqTable(newQTable);
    setStepsGraphData([])
    setGraphData([])
    setLoses(0)
    setWins(0)
    setNumberSteps(0)

  }

  const randomizeMatrix = () => {
    let temp = utils.initializeMatrix()
    setMatrixData(temp);
  }

  return (

    <div className="wrapper" style={{ cursor: drawData != 5 ? 'crosshair' : 'default' }}>
    
      <div className="child matrix-div">
        
        <div className='matrix' style={{ border: colors[drawData] + "solid 4px", borderRadius: "2vh" }}>
          <Matrix qTable={qTable} setQTable={setqTable} initialData={matrixData} drawData={drawData} updateMatrix={updateMatrix} agentPosState={agentPosState} actionToTake={actionToTake} isPlaying={isPlaying} />
        </div>
        <div className='matrix-controls'>
          <MatrixControls randomizeMatrix={randomizeMatrix} isPlaying={isPlaying} resetTable={resetTable} runQlearning={runQlearning} updateIsPlaying={updateIsPlaying} ></MatrixControls>
        </div>
      </div>
      <div className="child matrix-div">
        <ConfigContext.Provider value={{ isPlaying, setIsPlaying, drawData, setDrawData, varConfigFunctionsAndStates, graphInfo }}>

          <TabConfig></TabConfig>

        </ConfigContext.Provider>
      </div>
    </div>

  );
}

export default Main;
