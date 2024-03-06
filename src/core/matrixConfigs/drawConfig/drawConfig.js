import React, { useState, useContext } from 'react';

import "./drawConfig.css"
import { ConfigContext } from "../../main/main"
function DrawRadioButtons() {

    const { isPlaying, setIsPlaying, drawData, setDrawData, stuff } = useContext(ConfigContext);
    const [selected, setSelected] = useState([false, false, false, false])
    const handleOptionChange = (drawData, selectedIndex) => {

        setDrawData(Number(drawData))
        let temp = [false, false, false, false]
        temp[selectedIndex] = true
        setSelected(temp)

    };

    const handleClick = () => {
        setDrawData(5)

    }
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className='container'>
            <div style={{ display:"grid",placeItems:"center",fontSize: "0.9em",width:"90"}}>
                Clique na opção abaixo que deseje , depois, clique sobre o grid
                para alterar a celula clicada. 
            </div>
            <div className='draw-config'>
                <div className={`draw-cell selected-${selected[0]}`}
                    style={{ background: "#333c4e",cursor: hovered ? 'pointer' : 'default' }}
                    onClick={() => handleOptionChange(0, 0)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    Caminho
                </div>
                <div className={`draw-cell selected-${selected[1]}`}
                    style={{ background: "#0e5c16",cursor: hovered ? 'pointer' : 'default' }}
                    onClick={() => handleOptionChange(4, 1)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    Vitória
                </div>
                <div className={`draw-cell selected-${selected[2]}`}
                    style={{ background: "#a70f16",cursor: hovered ? 'pointer' : 'default' }}
                    onClick={() => handleOptionChange(3, 2)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    Derrota
                </div>
                <div className={`draw-cell selected-${selected[3]}`}
                    style={{ background: "black",cursor: hovered ? 'pointer' : 'default' }}
                    onClick={() => handleOptionChange(2, 3)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    Obstáculo
                </div>



            </div>
            <div onClick={() => handleClick()} style={{ border: "solid 1px" }}>
                Clique aqui para parar de alterar as celulas
            </div>
        </div>
    );
}

export default DrawRadioButtons;
