import React, { useState, useRef } from 'react';
import "./matrixControls.css"
// import { FaPlay } from "react-icons/fa";
// import { FaPause } from "react-icons/fa";
import { MdOutlineNotStarted, MdOutlinePauseCircle } from "react-icons/md";
import { BsFillSkipForwardFill } from "react-icons/bs";
import { MdOutlineRestartAlt } from "react-icons/md";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdSkipNext } from "react-icons/md";
function MatrixControls(props) {

    const [animationClass, setAnimationClass] = useState('');
    const [displaySteps, setDisplaySteps] = useState(0);
    const [timeLastClick, setTimelastClick] = useState(0)

    const animationTimeoutRef = useRef(null);
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
        setDisplaySteps(prevDisplayState => { return prevDisplayState + 1000 })
        props.runQlearning(1000)
        const currentTime = new Date()
        clearTimeout(animationTimeoutRef.current);
        clearTimeout(animationTimeoutRef.display);
        setAnimationClass('animation');
        animationTimeoutRef.current = setTimeout(() => {
                setAnimationClass('');
        }, 1000);
        animationTimeoutRef.display = setTimeout(() => {
            setDisplaySteps(0)
        },1500);



       
    };


const handleResetTable = () => {
    props.resetTable()
}

const handleRandomize = () => {
    props.resetTable()
    props.randomizeMatrix()
}



return (
    <div className='matrix-control'>
        <div className="div-control" onClick={handleUpdateIsPlaying}>
            <div  >
                {props.isPlaying ? <MdOutlinePauseCircle size={35} /> : <MdOutlineNotStarted size={35} />}
            </div>
            <div className='text-tip'>
                {props.isPlaying ? "Pausar" : "Iniciar"}
            </div>
        </div>

        <div className="div-control" onClick={handleResetTable} >

            <div className='rotate'>
                <MdOutlineRestartAlt size={35} />
            </div>
            <div className='text-tip'>
                Reset
            </div>

        </div>
        <div className="div-control" onClick={handleRandomize} >

            <div  >
                <GiPerspectiveDiceSixFacesRandom size={35} />
            </div>
            <div className='text-tip'>
                Rand
            </div>

        </div>
        <div className='div-control' style={{ cursor: "pointer" }} onClick={handleRunQlearning}>
            <button  className ="div-control" style={{ border: "solid 1px ", cursor: "pointer", background: "rgba(204, 204, 204, 0.0)", width: "100%", display: "grid", placeItems: "center" }} >
                {/* <BsFillSkipForwardFill size={30}/> */}
                <MdSkipNext size={35} />
            </button>
            <div className='text-tip'>
                Adiantar treinamento
            </div>
          
        </div>
        <div className={`animated-box ${animationClass}`}>
            + {displaySteps} passos
        </div>




        <div>

        </div>

    </div>

);
}

export default MatrixControls;