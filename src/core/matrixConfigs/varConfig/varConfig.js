import React, { useState, useContext } from 'react';
import "./varConfig.css"
import { ConfigContext } from "../../main/main"

import Slider from '@mui/material/Slider';
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

    const [formValues, setFormValues] = useState({
        learningRate: learningRateState,
        discountFactor: discountFactorState,
        defaultReward: defaultRewardState,
        positiveReward: positiveDefaultReward,
        negativeReward: negativeDefaultReward,
        epsilon: epsilon
    });
    const [messages, setMessages] = useState({

        learningRateMsg: "",
        discountFactorMsg: "",
        defaultRewardMsg: "",
        positiveRewardMsg: "",
        negativeRewardMsg: "",
        epsilonMsg: "",

    })

    const handleSliderChange = (name,newValue) => {
        // setSliderValue(newValue);
        setFormValues({
            ...formValues,
            [name]: Number(newValue)
    });
    };

    const handleChange = (e) => {

        let flag = false;
        
        // if (e.target.name == "discountFactor") {
        //     if (e.target.value > 1 || e.target.value < 0) {
        //         setMessages({ ...messages, ["discountFactorMsg"]: " fator de disconto deve ser entre 0 e 1" })
        //         flag = true;
        //     }
        //     else {
        //         setMessages({ ...messages, ["discountFactorMsg"]: "" })
        //         setFormValues({
        //             ...formValues,
        //             [e.target.name]: 1
        //         });
        //     }
        // }
        // if (e.target.name == "learningRate") {

        //     if (e.target.value > 1 || e.target.value < 0) {
        //         setMessages({ ...messages, ["learningRateMsg"]: "a Taxa de aprendizado deve ser entre 0 e 1" })
        //         flag = true;
        //     }
        //     else {
        //         setMessages({ ...messages, ["learningRateMsg"]: "" })
        //         setFormValues({
        //             ...formValues,
        //             [e.target.name]: 1
        //         });
        //     }
        // }
        // if (e.target.name == "epsilon") {

        //     if (e.target.value > 1 || e.target.value < 0) {
        //         setMessages({ ...messages, ["epsilonMsg"]: "a Taxa de exploração deve ser entre 0 e 1" })
        //         flag = true;
        //     }
        //     else {
        //         setMessages({ ...messages, ["epsilonMsg"]: "" })
        //         setFormValues({
        //             ...formValues,
        //             [e.target.name]: 1
        //         });
        //     }
        // }

       
        setFormValues({
                ...formValues,
                [e.target.name]: Number(e.target.value)
        });
        

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

    const displayMsg =(type)=>{
        if(messages[type]!=""){
            return "block"
        }
        else{
            return "none"
        }
    }
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <form onSubmit={handleSubmit}>
                {/* <label>
                    Taxa de aprendizado
                    <input name="learningRate" style={{ maxWidth: "30%" }} type="number" step={0.1} value={formValues.learningRate} onChange={handleChange} />
                </label> */}
                <br/>
                <br/>
                  <label>
                    Taxa de aprendizado
                    <Slider
                        style={{ maxWidth: "30%" }}
                        value={formValues.learningRate}
                        onChange={(event,value)=>handleSliderChange("learningRate",value)}
                        min={0}
                        max={1}
                        step={0.1}
                        valueLabelDisplay="auto"
                    />
                </label>
                <br />
                <label>
                    Fator de disconto
                    <input name="discountFactor" style={{ maxWidth: "30%" }} type="number" step={0.05} value={formValues.discountFactor} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Recompensa de vitória
                    <input name="positiveReward" style={{ maxWidth: "30%" }} type="number" step={0.5} value={formValues.positiveReward} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Punição por derrota
                    <input name="negativeReward" style={{ maxWidth: "30%" }} type="number" step={0.5} value={formValues.negativeReward} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Punição padrão por passo
                    <input name="defaultReward" style={{ maxWidth: "30%" }} type="number" step={0.1} value={formValues.defaultReward} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Taxa de exploração (ε)
                    <input name="epsilon" style={{ maxWidth: "30%" }} type="number" step={0.1} value={formValues.epsilon} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
                <button type="reset">reset</button>
            </form>
            <div>
                <p>{messages.discountFactorMsg}</p>
                <p>{messages.learningRateMsg}</p>
                <p>{messages.epsilonMsg}</p>
            </div>
        </div>
    );
}

export default VarConfig;
