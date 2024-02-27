import React, { useState, useEffect } from 'react';
import "./matrixControls.css"
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
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


    return (
        <div className='matrix-control'>
            <div  className="div-control" onClick={handleUpdateIsPlaying}>
                <div>
                {props.isPlaying ? <FaPause size={30}></FaPause> : <FaPlay size={30} />}
                </div>
                <div>
                    {props.isPlaying?<p>pausar</p>:<p>iniciar</p>}
                </div>
                
            </div>
            <div>
                <button style={{ width: "100%" }} onClick={handleRunQlearning}>
                    Treinar por mais 1000 passos
                </button>
            </div>
            <div className="div-control" onClick={handleResetTable} >
                <div style={{ width: "100%" }} >
                    <MdOutlineRestartAlt size={30} />
                </div>
                <div>
                    Resetar 
                </div>
            </div>
            <div>

            </div>

        </div>

    );
}

export default MatrixControls;