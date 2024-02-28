import React, { useState,useContext } from 'react';

import "./drawConfig.css"
import {ConfigContext}  from "../../main/main"
function varConfig() {
    const [selectedOption, setSelectedOption] = useState('option1');
    const  {isPlaying,setIsPlaying,drawData,setDrawData}  = useContext(ConfigContext);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setDrawData(Number(event.target.value))
        
    };


  
    return (
        <div className='container'>
            <div style={{fontSize:"1em"}}>
                Celulas
            </div>
            <div className='radio'>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="0"
                            checked={selectedOption === '0'}
                            onChange={handleOptionChange}
                        />
                        Caminho
                    </label>
                </div>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="2"
                            checked={selectedOption === '2'}
                            onChange={handleOptionChange}
                        />
                        Obstaculo
                    </label>
                </div>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="3"
                            checked={selectedOption === '3'}
                            onChange={handleOptionChange}
                        />
                        Punição
                    </label>
                </div>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="4"
                            checked={selectedOption === '4'}
                            onChange={handleOptionChange}
                        />
                        Recompensa
                    </label>
                </div>


            </div>
            <div>
                
            </div>
        </div>
    );
}

export default varConfig;
