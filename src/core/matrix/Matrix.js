import React from 'react';
import './Matrix.css';
import ArrowDisplay from "./Arrow.js"
import { initializeQTable } from '../main/aux-functions.js';
import * as utils from "../main/aux-functions"
class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      drawnData: props.drawData,
      fakeMatrix:
        [[5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],]
    };
  }

  handleIn = (row, col) => {
    // console.log("l")
    this.setState(prevState => {
      const temp = [...prevState.fakeMatrix];
      temp[row][col] = this.props.drawData;
      return { fakeMatrix: temp };
    });
  };

  handleOut = (row, col) => {
    this.setState(prevState => {
      // console.log("l")
      const temp = [...prevState.fakeMatrix];
      temp[row][col] = 5;
      return { fakeMatrix: temp };
    });
  };


  handleClick = (rowIndex, colIndex) => {
    const newMatrix = [...this.props.initialData];

    if (this.props.drawData != 5) {
      newMatrix[rowIndex][colIndex] = this.props.drawData // Update the specific number
      // let available = utils.getAvailableActions(this.props.initialData,[rowIndex,colIndex])
      if (this.props.drawData == 2) {

        const newQTable = [...this.props.qTable];
        try {
          newQTable[rowIndex][colIndex - 1] = [0, 0, 0, 0]
        }
        catch {

        }
        try {
          newQTable[rowIndex - 1][colIndex] = [0, 0, 0, 0]
        }
        catch {

        }
        try {
          newQTable[rowIndex][colIndex + 1] = [0, 0, 0, 0]
        }
        catch {

        }
        try {
          newQTable[rowIndex + 1][colIndex] = [0, 0, 0, 0]
        }
        catch {

        }
        this.props.setQTable(newQTable)
      }
      this.props.updateMatrix(newMatrix);
    }
  }
  componentDidUpdate(prevProps) {

    if (prevProps.initialData !== this.props.initialData) {
      // If the matrix data has changed, update the state
      this.setState({ data: this.props.initialData });
    }
  }
  isCorner = (rowIndex, colIndex) => {
    if (colIndex == 0 && rowIndex == 0) {
      // return "corner-0"
      return "0"
    }
    if (colIndex == 0 && rowIndex == 6) {
      // return "corner-1"
      return "0"
    }
    if (colIndex == 6 && rowIndex == 0) {
      // return "corner-2"
      return "0"
    }
    if (colIndex == 6 && rowIndex == 6) {
      // return "corner-3"
      return "0"
    }

  }
  render() {
    const rows = this.state.data.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((value, colIndex) => (
          <div
          style={{ position: "relative" }} 
            onClick={() => this.handleClick(rowIndex, colIndex)}
            onMouseEnter={() => this.handleIn(rowIndex, colIndex)}
            onMouseLeave={() => this.handleOut(rowIndex, colIndex)}
            className={`matrix-cell hovered-${this.state.fakeMatrix[rowIndex][colIndex]} color-${value}  ${this.isCorner(rowIndex, colIndex)}`}
            key={`${rowIndex}-${colIndex}`}
          >
            <span style={{display: colIndex%2==0? "none":"grid"}}class="left-c"></span>
            {/* <span class="right-c"></span> */}
            <span style={{display: colIndex%2==0? "grid":"none"}}class="right-c"></span>
            {/* <span class="left-c"></span> */}
            <ArrowDisplay numbers={this.props.qTable[rowIndex][colIndex]} type={this.props.initialData[rowIndex][colIndex]} ></ArrowDisplay>
          </div>
        ))}
      </div>
    ));

    return <div >
      <div className={`matrix-container border-${this.props.drawData}`}>{rows}</div>
      {/* <span class="top"></span>
      <span class="right"></span>
      <span class="bottom"></span>
      <span class="left"></span> */}
    </div>




  }
}

export default Matrix;
