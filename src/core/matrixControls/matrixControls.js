import React, { useState, useEffect } from 'react';
import "./matrixControls.css"

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
    const handleRunQlearning =()=>{
        props.runQlearning(1000)
    }
    const handleResetTable =()=>{
        props.resetTable()
    }

    return (
        <div className='matrix-control'>
            <button onClick={handleUpdateIsPlaying}>
                play
            </button>
            <button onClick={handleRunQlearning}>
                Treinar por mais 1000 passos
            </button>
            <button onClick={handleResetTable}>
                Resetar treinamento
            </button>
        </div>

    );
}

export default MatrixControls;