
import React, { useState, useEffect } from 'react';

function DrawButton(props) {
    const [isDrawing, setIsDrawing] = useState(false)

    const handleClick = () => {
        setIsDrawing(previsDrawing => { return !previsDrawing })
        props.updateDrawData(props.drawData)
        
    }

    return (
        <button className="drawnButton" onClick={handleClick}>
           celulas de  {props.title}
        </button>
    );
}

export default DrawButton;
