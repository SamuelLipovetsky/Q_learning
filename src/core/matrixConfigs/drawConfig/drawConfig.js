import React, { useState,useContext } from 'react';

import "./drawConfig.css"
import {ConfigContext}  from "../../main/main"
function DrawRadioButtons() {
   
    const  {isPlaying,setIsPlaying,drawData,setDrawData,stuff}  = useContext(ConfigContext);
    const handleOptionChange = (event) => {
    
        setDrawData(Number(event.target.value))
        
    };

    const handleClick=()=>{
        setDrawData(5)
     
    }
  
    return (
        <div className='container'>
            <div style={{fontSize:"0.8em"}}>
                Clique na opção abaixo que deseje , depois, clique sobre o grid 
                para alterar a celula clicada. A cor da borda do grid representa as celula
                que serão alteradas quando clicadas.
            </div>
            <div className='radio'>
                <div>
                    <label style={{ cursor: "pointer"}}>
                        <input
                        style={{ cursor: "pointer"}}
                            type="radio"
                            value="0"
                            checked={drawData === 0}
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
                            checked={drawData === 2}
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
                            checked={drawData === 3}
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
                            checked={drawData === 4}
                            onChange={handleOptionChange}
                        />
                        Recompensa
                    </label>
                </div>


            </div>
            <div onClick={()=> handleClick()} style={{border:"solid 1px"}}>
                Clique aqui para parar de alterar as celulas
            </div>
        </div>
    );
}

export default DrawRadioButtons;
