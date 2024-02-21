import React from 'react';
import './Matrix.css';
import ArrowDisplay from "./Arrow.js"
class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
      drawnData :props.drawData
    };
  }

  handleClick=(rowIndex,colIndex)=>
  {
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
  
  render() {
  
 
    const rows = this.state.data.map((row, rowIndex) => (
      <div className="collumn" key={rowIndex}>
        {row.map((value, colIndex) => (
          <div
            onClick={()=>this.handleClick(rowIndex,colIndex)}
            className={`cell color-${value}`}
            key={`${rowIndex}-${colIndex}`}
          >
            <ArrowDisplay numbers={this.props.qTable[rowIndex][colIndex]}></ArrowDisplay>
            
          </div>
        ))}
      </div>
    ));

    return <div className="matrix-element">{rows}</div>;
  }
}

export default Matrix;
