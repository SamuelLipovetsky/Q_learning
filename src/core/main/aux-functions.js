export function getAvailableActions(matrix, agentPosition) {
    const actions = [];
    const [row, col] = agentPosition;
    const num_rows = matrix.length;
    const num_cols = matrix[0].length;

    // Check up
    if (row > 0 && matrix[row - 1][col] !== 2) {
        actions.push(0);
    }

    // Check right
    if (col < num_cols - 1 && matrix[row][col + 1] !== 2) {
        actions.push(1);
    }

    // Check down
    if (row < num_rows - 1 && matrix[row + 1][col] !== 2) {
        actions.push(2);
    }

    // Check left
    if (col > 0 && matrix[row][col - 1] !== 2) {
        actions.push(3);
    }

    return actions;
}

export function initializeQTable(gridLen) {
    const grid = [];
    for (let i = 0; i < gridLen; i++) {
        const row = [];
        for (let j = 0; j < gridLen; j++) {
            row.push([0, 0, 0, 0]);
        }
        grid.push(row);
    }
    return grid;
}

export function chooseOptimalAction(qTable, state, grid) {
    const availableActions = getAvailableActions(grid, state);

    const actions = availableActions.map(action => qTable[state[0]][state[1]][action]);

    const maxAction = Math.max(...actions);
    const maxIndices = actions.reduce((acc, val, index) => {
        if (val === maxAction) {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = maxIndices[Math.floor(Math.random() * maxIndices.length)]; // Sele
    return availableActions[randomIndex];
}

export function getReward(grid, state, defaultReward,posRewad,negRewad) {

    const [row, col] = state;

    const cellValue = grid[row][col];

    if (cellValue === 4) {
        return posRewad;
    } else if (cellValue === 3) {
        return negRewad;
    } else if (cellValue === 0) {
        return defaultReward;
    }
    else {

        return defaultReward
    }


}
export function getNextState(state, action) {

    const [row, col] = state;

    if (action === 0) {
        return [row - 1, col];
    } else if (action === 1) {
        return [row, col + 1];
    } else if (action === 2) {
        return [row + 1, col];
    } else if (action === 3) {
        return [row, col - 1];
    }
}

export function qLearningFaster(matrixData, qTable, epsilon, learningRate, discountFactor, defaultReward, iterations,posRewad,negRewad){
    const numStates = matrixData.length;
    const numActions = 4;
    // Choose an action based on epsilon-greedy strategy
    let action;
    let randomIndex;
    let availabeActions;
    let agentPosition = [0, 0]
    let qValues =[]
    let stepsTilWin=[]
    let steps=0
    for (let i = 0; i < iterations; i++) {
        if (Math.random() > epsilon) {
            availabeActions = getAvailableActions(matrixData, agentPosition)
            randomIndex = Math.floor(Math.random() * availabeActions.length);
            action = availabeActions[randomIndex]
        } else {
            action = chooseOptimalAction(qTable, agentPosition, matrixData);
        }

        const nextState = getNextState(agentPosition, action);
        const reward = getReward(matrixData, nextState, defaultReward,posRewad,negRewad);

        const [agentRow, agentCol] = agentPosition;
        const qValue = qTable[agentRow][agentCol][action];
        const maxQValue = Math.max(...qTable[nextState[0]][nextState[1]]);
        qTable[agentRow][agentCol][action] += learningRate * (reward + discountFactor * maxQValue - qValue);
        const [nextRow, nextCol] = nextState;

        if (reward == 3 || reward == -3) {

            if (reward == -3) {
                qTable[nextState[0]][nextState[1]] = [-1, -1, -1, -1]
            }
            if (reward == 3) {
                // stepsTilWin =[...stepsTilWin,steps]
                stepsTilWin=[...stepsTilWin , { "Passos até a vitória": steps}];
                steps=0;
                qTable[nextState[0]][nextState[1]] = [+1, +1, +1, +1]
            }

            if (reward == 1) {

            }
            
            agentPosition = [0, 0]

        }
        else {
            agentPosition = nextState
        }
        const maxValues = qTable.map(subArray =>
            subArray.map(row => Math.max(...row))
        );
        const totalSum = maxValues.reduce((acc, subArray) =>
            acc + subArray.reduce((subAcc, val) => subAcc + val, 0), 0
        );
        const average_max_q = totalSum / (qTable.length * qTable[0].length);
        // setGraphData(prevGraphData => [...prevGraphData, { value: average_max_q }]);

        const shouldAddValue = Math.random() < 0.05; // Random check to determine whether to add the value or not

        if (shouldAddValue) {
            qValues=[...qValues , { "Média Q-values": average_max_q }];
        }
        
        steps+=1;
    }
    // console.log(qValues)
    return [stepsTilWin,qValues]
}