
import React, { useState, useContext  } from 'react';
import "./drawButton.css"
import {ConfigContext}  from "../../main/main"
function DrawButton(props) {
    const [isDrawing, setIsDrawing] = useState(false)
    // const  {isPlaying,drawData}  = useContext(ConfigContext);
    const  {isPlaying,setIsPlaying,drawData,setDrawData}  = useContext(ConfigContext);

    const handleClick = () => {
        setIsDrawing(previsDrawing => { return !previsDrawing })
        
        // console.log(isPlaying,setIsPlaying,drawData,setDrawData)
        setDrawData(props.option)
        
    }

    return (
        <button className="drawButton" onClick={handleClick}>
           celulas de  {props.title}
        </button>
    );
}

export default DrawButton;
