import React, { useState, useContext, useRef, useEffect } from 'react';
import "./varConfig.css"
import { ConfigContext } from "../../main/main"
import Slider from '@mui/material/Slider';
import Checkmark from './checkmark';
import { FaWineGlassEmpty } from 'react-icons/fa6';

function VarConfig() {
    const { isPlaying, setIsPlaying, drawData, setDrawData, varConfigFunctionsAndStates, graphInfo } = useContext(ConfigContext);
    const {
        learningRateState, setLearningate,
        discountFactorState, setDiscountFactor,
        defaultRewardState, setDefaultRewardState,
        positiveDefaultReward, setPositiveDefaultReward,
        negativeDefaultReward, setNegativeDefaultReward,
        epsilon, setEpsilon
    } = varConfigFunctionsAndStates;

    const animationTimeout = useRef(null);
    const [changedRecently,setChangedRecently] = useState(false)
   
    const handleSliderChange = (name, newValue) => {

        if (name == "learningRate") {
            setLearningate(Number(newValue));
        }
        if (name == "epsilon") {
            setEpsilon(Number(newValue))
          
        }
        if (name == "discountFactor") {
            setDiscountFactor(Number(newValue))
         
        }
        clearTimeout(animationTimeout.current);
        clearTimeout(animationTimeout.display);
        animationTimeout.current = setTimeout(() => {
                setChangedRecently(true)
        }, 500);
        animationTimeout.current = setTimeout(() => {
                setChangedRecently(false)
        }, 2000);

    };

    const handleChange = (e) => {

        if (e.target.name == "defaultReward") {
            if(Number(e.target.value)==negativeDefaultReward
            || Number(e.target.value)== positiveDefaultReward
          
            )
            {
                setDefaultRewardState(Number(e.target.value)+0.001);
            }
            else{
                setDefaultRewardState(Number(e.target.value));
            }
            
        }
        if (e.target.name == "negativeReward") {
            if(Number(e.target.value)== positiveDefaultReward
            || Number(e.target.value) ==defaultRewardState  
            )
            {
                setNegativeDefaultReward(Number(e.target.value)+0.001)
            }
            else{
                setNegativeDefaultReward(Number(e.target.value))
            }
           
           
        }
        if (e.target.name == "positiveReward") {
            if(Number(e.target.value)==negativeDefaultReward
            || Number(e.target.value) ==defaultRewardState  
            )
            {
                setPositiveDefaultReward(Number(e.target.value)+0.0001)
            }
            else{
                setPositiveDefaultReward(Number(e.target.value))
            }
            
        }
        clearTimeout(animationTimeout.current);
        clearTimeout(animationTimeout.display);
        animationTimeout.current = setTimeout(() => {
                setChangedRecently(true)
        }, 500);
        animationTimeout.current = setTimeout(() => {
                setChangedRecently(false)
        }, 2000);



    };

    return (
        <div className="container-d">
            <div style={{width:"100%",minHeight:"2em"}}>
                <Checkmark prop={changedRecently} ></Checkmark>
            </div>
            <form className='form'>
                <div className="label-div">

                    <label className='label-var'>
                        <div className='label-tip'>
                            <div>
                                Recompensa por vitória
                            </div>
                            <div>
                                
                            </div>

                        </div>
                        <div style={{ paddingLeft: "5%", paddingTop: "1%" }}>
                            <input className='input-d' name="positiveReward" style={{ width: "80%" }}
                                type="number" step={0.5} value={positiveDefaultReward} onChange={handleChange} />

                        </div>

                    </label>

                </div>
                <div className="label-div">
                    <label className='label-var'>
                        <div className='label-tip'>
                            <div>
                                Punição por derrota
                            </div>
                            <div>
                                
                            </div>

                        </div>
                        <div style={{ paddingLeft: "5%", paddingTop: "1%" }}>
                            <input className='input-d' name="negativeReward" style={{ width: "80%" }}
                                type="number" step={0.5} value={negativeDefaultReward} onChange={handleChange} />

                        </div>

                    </label>

                </div>
                <div className="label-div">
                    <label className='label-var'>
                        <div className='label-tip'>
                            <div>
                                Punição por passo
                            </div>
                            <div>
                                
                            </div>

                        </div>
                        <div style={{ paddingLeft: "5%", paddingTop: "1%" }}>
                            <input className='input-d' name="defaultReward" style={{ width: "80%" }}
                                type="number" step={0.1} value={defaultRewardState} onChange={handleChange} />

                        </div>

                    </label>


                </div>
                <div className="label-div">
                    <label className="label-var">
                        <div className="label-tip">
                            <div>
                                Taxa de exploração  ε={epsilon.toFixed(2)}
                            </div>
                            <div>
                                
                            </div>

                        </div>
                        <div style={{ width: "80%", paddingLeft: "5%" }}>
                            <Slider

                                value={epsilon}
                                onChange={(event, value) => handleSliderChange("epsilon", value)}
                                min={0}
                                max={1}
                                step={0.01}

                            />

                        </div>

                    </label>
                </div>
                <div className="label-div">
                    <label className='label-var'>
                        <div className="label-tip">
                            <div>
                                Taxa de aprendizado α={learningRateState.toFixed(2)}
                            </div>
                            <div>
                                
                            </div>

                        </div>

                        <div style={{ width: "80%", paddingLeft: "5%" }}>
                            <Slider

                                value={learningRateState}
                                onChange={(event, value) => handleSliderChange("learningRate", value)}
                                min={0}
                                max={1}
                                step={0.01}

                            />

                        </div>

                    </label>
                </div>
                <div className="label-div">
                    <label className="label-var">
                        <div className="label-tip">
                            <div>
                                Fator de disconto   γ={discountFactorState.toFixed(2)}
                            </div>
                            <div>
                              
                            </div>

                        </div>
                        <div style={{ width: "80%", paddingLeft: "5%" }}>
                            <Slider

                                value={discountFactorState}
                                onChange={(event, value) => handleSliderChange("discountFactor", value)}
                                min={0}
                                max={1}
                                step={0.01}

                            />

                        </div>


                    </label>
                </div>



            </form>
            <div>
                {/* <p>{messages.discountFactorMsg}</p> */}
                {/* <p>{messages.learningRateMsg}</p> */}
                {/* <p>{messages.epsilonMsg}</p> */}
            </div>
        </div>

    );
}

export default VarConfig;
