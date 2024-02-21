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
    const handleClick = () => {
        props.updateIsPlaying()

    }


    return (
        <div className='matrix-control'>
            <button onClick={handleClick}>
                play
            </button>
        </div>

    );
}

export default MatrixControls;