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

export function getReward(grid, state, defaultReward) {

    const [row, col] = state;
    
    const cellValue = grid[row][col];
   
    if (cellValue === 4) {
        return 3;
    } else if (cellValue === 3) {
        return -3;
    } else if (cellValue === 0 ) {
        return defaultReward;
    } 
    else{
        
        return defaultReward
    }
  
  
}
export function getNextState(state, action) {
  
    const [row, col] = state;
    // console.log(action)
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

export function qLearning(qTable,grid, learningRate, discountFactor, defaultReward) {
    const numStates = grid.length;
    const numActions = 4; // up, down, left, right
    let state = [0, 0];
    let totalReward = 0;
    const rewards = [];
    // Choose an action based on epsilon-greedy strategy
    let action;
    if (Math.random() < 0.2) {
        action = Math.floor(Math.random() * getAvailableActions(grid, state).length);
    } else {
        action = chooseOptimalAction(qTable, state, grid);
    }

    // Execute the action and observe the next state and reward
    const nextState = getNextState(state, action);
    const reward = getReward(grid, nextState, defaultReward);

    if (reward !== undefined) {
        const qValue = qTable[state[0]][state[1]][action];
        const maxQValue = Math.max(...qTable[nextState[0]][nextState[1]]);
        qTable[state[0]][state[1]][action] += learningRate * (reward + discountFactor * maxQValue - qValue);
        totalReward += reward;
    }

    state = nextState;

    if (reward === 1) {
        rewards.push(totalReward);
       
      
        totalReward = 0;
       
    }
    if (reward === -1) {
        totalReward = 0;
    }
    return { qTable, agentStates };
}
