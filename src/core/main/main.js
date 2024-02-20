
import DrawButton from '../controls/drawButton';
import Matrix from '../matrix/Matrix'
import * as utils from "./aux-functions"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
function Main() {
  const [matrixData, setMatrixData] = useState([
    [1, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 4, 0],
  ]);
  const [graphData, setGraphData] = useState([{ name: '', Qvalue: 0 }])
  const [qTable, setqTable] = useState(utils.initializeQTable(7))
  const [drawData, setDrawdata] = useState(0)
  let agentPosition = [0, 0]
  let passos = 0
  const qLearning = (learningRate, discountFactor, defaultReward) => {
    const numStates = matrixData.length;
    const numActions = 4;


    // Choose an action based on epsilon-greedy strategy
    let action;
    let randomIndex;
    let availabeActions;
    if (Math.random() > 0.9) {
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

      updateMatrix(newMatrix)
      if (reward == 1) {
        console.log(passos)
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

    let newGraphData = [...graphData];
    console.log(newGraphData)
    newGraphData.push({ name: "", Qvalue: average_max_q })
    setGraphData(newGraphData)
   
    // console.log(average_max_q); // Output: 8.5 (for the example q_table)
    

  }



  useEffect(() => {
    const interval = setInterval(() => {
      qLearning(0.3, 0.9, -0.06)


    }, 1000 );

    return () => clearInterval(interval);
  }, []);



  const updateMatrix = (newMatrix) => {
    setMatrixData(newMatrix);
  };
  const updateDrawData = (newDrawingType) => {
    setDrawdata(newDrawingType);
  };

  return (
    <div className="">
      <div className="wrapper">
        <div className="child">
          <div><DrawButton updateDrawData={updateDrawData}
            drawData={2} title={"obtaculo"}></DrawButton></div>
          <div><DrawButton updateDrawData={updateDrawData}
            drawData={4} title={"Recompensa"}></DrawButton></div>
          <div><DrawButton updateDrawData={updateDrawData}
            drawData={3} title={"punição"}></DrawButton></div>
        </div>
        <div className="child-matrix">
          <Matrix qTable={qTable} initialData={matrixData} drawData={drawData} updateMatrix={updateMatrix} />
        </div>
        <div className="child">
          

           {graphData.map((i,j)=><div>{i.Qvalue}</div>)}
         
        </div>
      </div>

    </div>
  );
}

export default Main;
