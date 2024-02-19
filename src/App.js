
import DrawButton from './core/controls/drawButton';
import Matrix from './core/matrix/Matrix'

import React, { useState, useEffect } from 'react';
function App() {
  const [matrixData, setMatrixData] = useState([
    [1, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4],
  ]);
  const [drawData, setDrawdata] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixData(prevMatrixData => {
        // Clone the previous matrix data
        const newMatrixData = prevMatrixData.map(row => [...row]);

        // Find the position of the 1 in the matrix
        let rowIndex = -1;
        let colIndex = -1;
        for (let i = 0; i < newMatrixData.length; i++) {
          for (let j = 0; j < newMatrixData[i].length; j++) {
            if (newMatrixData[i][j] === 1) {
              rowIndex = i;
              colIndex = j;
              break;
            }
          }
          if (rowIndex !== -1) break;
        }

        if (rowIndex !== -1 && colIndex !== -1) {
          // Replace the 1 with 0
          newMatrixData[rowIndex][colIndex] = 0;

          // Generate random direction
          const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
          let randomDirection;
          do {
            randomDirection = directions[Math.floor(Math.random() * directions.length)];
          } while (
            rowIndex + randomDirection[0] < 0 ||
            rowIndex + randomDirection[0] >= newMatrixData.length ||
            colIndex + randomDirection[1] < 0 ||
            colIndex + randomDirection[1] >= newMatrixData[0].length
          );

          // Calculate new position
          const newRow = rowIndex + randomDirection[0];
          const newCol = colIndex + randomDirection[1];

          // Move the 1 to the new position
          newMatrixData[newRow][newCol] = 1;
        }

        return newMatrixData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateMatrix = (newMatrix) => {
    setMatrixData(newMatrix);
  };
  const updateDrawData = (newDrawingType) => {
    setDrawdata(newDrawingType);
  };

  return (
    <div className="App">
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
          <Matrix initialData={matrixData} drawData={drawData} updateMatrix={updateMatrix} />
        </div>
        <div className="child">
          <div></div>
        </div>
      </div>

    </div>
  );
}

export default App;
