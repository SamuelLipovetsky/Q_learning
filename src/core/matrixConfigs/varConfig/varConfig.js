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
    } = varConfigFunctionsAndStates;

    const [formValues, setFormValues] = useState({
        learningRate: learningRateState,
        discountFactor: discountFactorState,
        defaultReward: defaultRewardState,
        positiveReward: positiveDefaultReward,
        negativeReward: negativeDefaultReward,
        epsilon: epsilon
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: Number(e.target.value)
        });
        console.log(formValues)
    };

    const handleSubmit = (e) => {
        // console.log(formValues)
        e.preventDefault();
        setLearningate(Number(formValues.learningRate));
        setDiscountFactor(Number(formValues.discountFactor));
        setDefaultRewardState(Number(formValues.defaultReward));
        setPositiveDefaultReward(Number(formValues.positiveReward));
        setNegativeDefaultReward(Number(formValues.negativeReward));
        setEpsilon(Number(formValues.epsilon));
    };

    return (
        <div style={{width:"100%",height:"100%"}}>
            <form onSubmit={handleSubmit}>
                <label>
                    Taxa de aprendizado 
                    <input name="learningRate" style={{maxWidth:"30%"}} type="number" step={0.1} value={formValues.learningRate} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Fator de disconto
                    <input name="discountFactor" style={{maxWidth:"30%"}} type="number" step={0.05} value={formValues.discountFactor} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Recompensa de vitória 
                    <input name="positiveReward" style={{maxWidth:"30%"}} type="number" step={0.5} value={formValues.positiveReward} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Punição por derrota
                    <input name="negativeReward" style={{maxWidth:"30%"}} type="number" step={0.5} value={formValues.negativeReward} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Punição padrão por passo
                    <input name="defaultReward" style={{maxWidth:"30%"}} type="number" step={0.1} value={formValues.defaultReward} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Taxa de exploração (ε)
                    <input name="epsilon" style={{maxWidth:"30%"}} type="number" step={0.1} value={formValues.epsilon} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default VarConfig;
