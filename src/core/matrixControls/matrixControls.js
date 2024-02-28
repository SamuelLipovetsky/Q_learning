import React, { useState, useEffect } from 'react';
import "./matrixControls.css"
// import { FaPlay } from "react-icons/fa";
// import { FaPause } from "react-icons/fa";
import { MdOutlineNotStarted, MdOutlinePauseCircle } from "react-icons/md";
import { MdOutlinePause } from "react-icons/md";
import { MdOutlineRestartAlt } from "react-icons/md";
function MatrixControls(props) {


    let playingStatus
    if (props.isPlaying == true) {
        playingStatus = <div></div>
    }
    else {
        playingStatus = <div></div>
    }
    const handleUpdateIsPlaying = () => {
        props.updateIsPlaying()

    }
    const handleRunQlearning = () => {
        props.runQlearning(1000)
    }
    const handleResetTable = () => {
        props.resetTable()
    }
    const [inputValue, setInputValue] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


    return (
        <div className='matrix-control'>
            <div className="div-control" onClick={handleUpdateIsPlaying}>
                <div tyle={{ width: "100%" }} >
                    {props.isPlaying ? <MdOutlinePauseCircle size={35} /> : <MdOutlineNotStarted size={35} />}
                </div>
                <div className='text-tip'>
                    {props.isPlaying ? "pausar" : "iniciar"}
                </div>
            </div>

            <div className="div-control" onClick={handleResetTable} >

                <div style={{ width: "100%" }} >
                    <MdOutlineRestartAlt size={35} />
                </div>
                <div className='text-tip'>
                    Reset
                </div>

            </div>

            <div className='skip-steps'>
                <button style={{ borderRadius:"5px", width: "100%",minHeight:"50%",cursor: "pointer" ,backgroundColor:"#3e4a5e" }} onClick={handleRunQlearning}>
                    adiantar Treinamento por mais 1000 passos
         
                </button>
            </div>




            <div>

            </div>

        </div>

    );
}

export default MatrixControls;