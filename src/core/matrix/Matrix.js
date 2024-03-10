import React from 'react';
import './Matrix.css';
import ArrowDisplay from "./Arrow.js"
import { initializeQTable } from '../main/aux-functions.js';
import * as utils from "../main/aux-functions"
class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      drawnData: props.drawData,
      hoverMatrix:
        [[5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5],],
      prev: [0, 0],
      now: [0, 0],
      action: 0,
      flip:false,


    };
  }

  handleIn = (row, col) => {
  
    this.setState(prevState => {
      const temp = [...prevState.hoverMatrix];
      temp[row][col] = this.props.drawData;
      return { hoverMatrix: temp };
    });
  };

  handleOut = (row, col) => {
    this.setState(prevState => {
   
      const temp = [...prevState.hoverMatrix];
      temp[row][col] = 5;
      return { hoverMatrix: temp };
    });
  };

  componentDidUpdate(prevProps) {

    if (prevProps.agentPosState !== this.props.agentPosState) {
      this.setState({ prev: prevProps.agentPosState })
      this.setState({ now: this.props.agentPosState })
      this.setState({ action: this.props.actionToTake })
   

    }
  }

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


  displayAnimation = (rowIndex, colIndex) => {


    const [nowRow, nowCol] = this.state.now
    const [prevRow, prevCol] = this.state.prev


    if (rowIndex == nowRow && colIndex == nowCol) {
      if (!this.props.isPlaying) {
        return "stoped"
      }
      if (this.state.action == 0) {
        return "grow-up"
      }
      if (this.state.action == 1) {
        return "grow-right"
      }
      if (this.state.action == 2) {
        return "grow-down"
      }
      if (this.state.action == 3) {
        return "grow-left"
      }
    }
    if (rowIndex == prevRow && colIndex == prevCol) {
      if (!this.props.isPlaying) {
        return "stoped-"
      }
      if (this.state.action == 0) {
        return "shrink-up"
      }
      if (this.state.action == 1) {
        return "shrink-right"
      }
      if (this.state.action == 2) {
        return "shrink-down"
      }
      if (this.state.action == 3) {
        return "shrink-left"
      }
    }
  }
  displayLoss = (rowIndex, colIndex) => {

    if(rowIndex==0 && colIndex==0){
      return "hid"
    }
    
    if (rowIndex == this.props.winPos[0] && colIndex == this.props.winPos[1]) {
  
          return "win-animation"
        
    }
   
 
    return "hid"
  
  }
  displayWin = (rowIndex, colIndex) => {

    if(rowIndex==0 && colIndex==0){
      return "hid"
    }
    
    if (rowIndex == this.props.lossPos[0] && colIndex == this.props.lossPos[1]) {
      return "loss-animation"
  }
 
    return "hid"
  
  }

  render() {
    const rows = this.props.initialData.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((value, colIndex) => (
          <div
            style={{ position: "relative" }}
            onClick={() => this.handleClick(rowIndex, colIndex)}
            onMouseEnter={() => this.handleIn(rowIndex, colIndex)}
            onMouseLeave={() => this.handleOut(rowIndex, colIndex)}
            className={`matrix-cell hovered-${this.state.hoverMatrix[rowIndex][colIndex]} color-${value}  `}
            key={`${rowIndex}-${colIndex}`}
          >
            <span className={`${this.displayAnimation(rowIndex, colIndex)}`}></span>

            <span className={`${this.displayWin(rowIndex, colIndex)}`}>Derrota</span>
            <span className={`${this.displayLoss(rowIndex, colIndex)}`}>vitória</span>

            <ArrowDisplay numbers={this.props.qTable[rowIndex][colIndex]} type={this.props.initialData[rowIndex][colIndex]} ></ArrowDisplay>
          </div>
        ))}
      </div>
    ));

    return <div >
      <div className={`matrix-container border-${this.props.drawData}`}>{rows}</div>

    </div>




  }
}

export default Matrix;
