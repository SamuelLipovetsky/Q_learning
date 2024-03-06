import React, { useState, useContext } from 'react';

import "./varConfig.css"
import { ConfigContext } from "../../main/main"
function VarConfig() {
   
    const { isPlaying, setIsPlaying, drawData, setDrawData, varConfigFunctionsAndStates , graphInfo } = useContext(ConfigContext);
    const {
        learningRateState, setLearningate,
        discountFactorState, setDiscountFactor,
        defaultRewardState, setDefaultRewardState,
        positiveDefaultReward, setPositiveDefaultReward,
        negativeDefaultReward, setNegativeDefaultReward,
        epsilon, setEpsilon
    } = varConfigFunctionsAndStates 
    // console.log(varConfigFunctionsAndStates )  
    const handleChange = (e) => {
      
      };
    


    return (
        <div style={{width:"100%",height:"100%"}}>
            
            <form >
                <label>
                    Taxa de aprendizado 
                   
                    <input style={{maxWidth:"30%"}} type="number" step={0.1} 
                    value={learningRateState} onChange={(e)=>  setLearningate(e.target.value)} />
                </label>
                <br />

            </form>
            <form >
                <label>
                    Fator de disconto
                 
                    <input style={{maxWidth:"30%"}} type="number" step={0.05} value={discountFactorState} 
                    onChange={(e)=>  setDiscountFactor(e.target.value)} />
                </label>
                <br />

            </form>
            <form >
                <label>
                    Recompensa de vitória 
                   
                    <input style={{maxWidth:"30%"}} type="number" step={0.5} value={positiveDefaultReward} 
                    onChange={(e)=>  setPositiveDefaultReward(e.target.value)} />
                </label>
                <br />

            </form>
            <form >
                <label>
                    Punição por derrota
                   
                    <input style={{maxWidth:"30%"}} type="number" step={0.5} value={negativeDefaultReward} 
                    onChange={(e)=>  setNegativeDefaultReward(e.target.value)} />
                </label>
                <br />

            </form>
            <form >
                <label>
                    Punição padrão por passo
                   
                    <input style={{maxWidth:"30%"}} type="number" step={0.1} value={defaultRewardState} 
                    onChange={(e)=>  setDefaultRewardState(e.target.value)} />
                </label>
                <br />

            </form>

            <form >
                <label>
                    Taxa de exploração (ε)
                   
                    <input style={{maxWidth:"30%"}} type="number" step={0.1} value={epsilon} 
                    onChange={(e)=>  setEpsilon(e.target.value)} />
                </label>
                <br />

            </form>

        </div>
    );
}

export default VarConfig;
