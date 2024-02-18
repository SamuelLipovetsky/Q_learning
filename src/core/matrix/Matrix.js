import React from 'react';
import './Matrix.css';

class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.initialData,
    };
  }

  componentDidUpdate(prevProps) {
   
    if (prevProps.initialData !== this.props.initialData) {
      // If the matrix data has changed, update the state
      this.setState({ data: this.props.initialData });
    }
  }

  render() {
  
    console.log(this.state.data)
    const rows = this.state.data.map((row, rowIndex) => (
      <div className="" key={rowIndex}>
        {row.map((value, colIndex) => (
          <div
            className={`cell color-${value}`}
            key={`${rowIndex}-${colIndex}`}
          ></div>
        ))}
      </div>
    ));

    return <div className="matrix">{rows}</div>;
  }
}

export default Matrix;
