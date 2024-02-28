import React from 'react';
import './Matrix.css';
import ArrowDisplay from "./Arrow.js"
class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      drawnData: props.drawData
    };
  }

  handleClick = (rowIndex, colIndex) => {
    const newMatrix = [...this.props.initialData];

    newMatrix[rowIndex][colIndex] = this.props.drawData // Update the specific number
    this.props.updateMatrix(newMatrix);

  }
  componentDidUpdate(prevProps) {

    if (prevProps.initialData !== this.props.initialData) {
      // If the matrix data has changed, update the state
      this.setState({ data: this.props.initialData });
    }
  }
  isCorner =(rowIndex,colIndex)=>{
    if(colIndex==0 && rowIndex==0){
      return "corner-0"
    }
    if (colIndex==0 && rowIndex==6){
      return "corner-1"
    }
    if(colIndex==6 && rowIndex==0){
      return "corner-2"
    }
    if(colIndex==6 && rowIndex==6){
      return "corner-3"
    }

    

  }
  render() {
    const rows = this.state.data.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((value, colIndex) => (
          <div
            onClick={() => this.handleClick(rowIndex, colIndex)}
            className={`matrix-cell color-${value} ${this.isCorner(rowIndex,colIndex)}`}
            key={`${rowIndex}-${colIndex}`}
          >
            <ArrowDisplay numbers={this.props.qTable[rowIndex][colIndex]}></ArrowDisplay>
          </div>
        ))}
      </div>
    ));

    return <div className="matrix-container">{rows}</div>;
          
            
            
  }
}

export default Matrix;
