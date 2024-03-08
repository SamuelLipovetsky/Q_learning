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
      prev:[0,0],
      now:[0,0],
      action:0,
      
      
    };
  }

  handleIn = (row, col) => {
    // console.log("l")
    this.setState(prevState => {
      const temp = [...prevState.hoverMatrix];
      temp[row][col] = this.props.drawData;
      return { hoverMatrix: temp };
    });
  };

  handleOut = (row, col) => {
    this.setState(prevState => {
      // console.log("l")
      const temp = [...prevState.hoverMatrix];
      temp[row][col] = 5;
      return { hoverMatrix: temp };
    });
  };

  componentDidUpdate(prevProps){
    // console.log(this.props.actionToTake)
    if(prevProps.agentPosState!== this.props.agentPosState){
      this.setState({prev:prevProps.agentPosState})
      this.setState({now:this.props.agentPosState})
      this.setState({action:this.props.actionToTake})
      console.log(this.state.prev,this.state.action,this.state.now)
  
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
  display =(rowIndex,colIndex) =>{

    
    const [nowRow,nowCol] =this.state.now
    const [prevRow,prevCol] =this.state.prev

    // if(nowRow==0 && nowCol==0){
    //   if(prevRow!=1 || prevCol!=1){
    //     return ""
    //   }
    // }

    if (rowIndex== nowRow && colIndex==nowCol){
      if (!this.props.isPlaying){
        return "stoped"
      }
      if(this.state.action==0){
          return "grow-up"
      }
      if(this.state.action==1){
          return "grow-right"
      }
      if(this.state.action==2){
        return "grow-down"
      }
      if(this.state.action==3){
        return "grow-left"
      }
    }
    if (rowIndex== prevRow && colIndex==prevCol){
      if (!this.props.isPlaying){
        return "stoped-"
      }
      if(this.state.action==0){
        return "shrink-up"
      }
      if(this.state.action==1){
        return "shrink-right"
      }
      if(this.state.action==2){
        return "shrink-down"
      }
      if(this.state.action==3){
        return "shrink-left"
      }
    }
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
            className={`matrix-cell hovered-${this.state.hoverMatrix[rowIndex][colIndex]} color-${value}  ${this.isCorner(rowIndex, colIndex)}`}
            key={`${rowIndex}-${colIndex}`}
          >
            <span class={`${this.display(rowIndex,colIndex)}`}></span> 
            {/* move 0 */}
            {/* <span style={{display: (colIndex==0 && rowIndex==1  ) ? "grid":"none"}}class="shrink-up"></span> */}
            {/* <span style={{display: (colIndex==0 && rowIndex==0  ) ? "grid":"none"}}class="grow-up"></span> */}

            {/* move 1 */}
            {/* <span style={{display: (colIndex==4 && rowIndex==3  ) ? "grid":"none"}}class="shrink-right"></span> */}
            {/* <span style={{display: (colIndex==5 && rowIndex==3  ) ? "grid":"none"}}class="grow-right"></span> */}

            {/* move 2 */}
            {/* <span style={{display: (colIndex==0 && rowIndex==3  ) ? "grid":"none"}}class="shrink-down"></span> */}
            {/* <span style={{display: (colIndex==0 && rowIndex==4  ) ? "grid":"none"}}class="grow-down"></span> */}

            {/* move  */}
            {/* <span style={{display: (colIndex==3 && rowIndex==3  ) ? "grid":"none"}}class="shrink-left"></span> */}
            {/* <span style={{display: (colIndex==2 && rowIndex==3  ) ? "grid":"none"}}class="grow-left"></span> */}
           

           
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
