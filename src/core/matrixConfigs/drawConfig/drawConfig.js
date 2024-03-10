import React, { useState, useContext, useEffect } from 'react';

import "./drawConfig.css"
import { ConfigContext } from "../../main/main"
function DrawButtons() {

    const { isPlaying, setIsPlaying, drawData, setDrawData, stuff } = useContext(ConfigContext);
    const [selected, setSelected] = useState([null, null, null, null])
    
    const handleOptionChange = (drawData, selectedIndex) => {

        setDrawData(Number(drawData))
        let temp = [false, false, false, false]
        temp[selectedIndex] = true
        setSelected(temp)

    };
    useEffect(() => {
        if (drawData == 5) {
            let temp = [null, null, null, null]

            setSelected(temp)
        }

    }, [drawData]);

    const handleClick = () => {
        setDrawData(5)

    }
    const [hovered, setHovered] = useState([false,false,false,false]);

    const handleMouseEnter = (n) => {
        let temp =[false,false,false,false]
        temp[n]=true
        setHovered(temp);
    };

    const handleMouseLeave = () => {
        setHovered([false,false,false,false]);
    };

    return (
        <div className='container'>
            <div style={{ display: "grid", placeItems: "center", fontSize: "1em", width: "90%", margin: "auto",textAlign:"center",paddingTop:"5%" }}>
                Clique na opção abaixo que deseje , depois, clique sobre o grid
                para alterar a celula clicada.
            </div>
            <div className='draw-config'>
                <div className={`selected-${selected[0]} draw-cell`}
                    style={{
                        background: "#333c4e", cursor: 'pointer',
                        position: "relative",
                        borderRight: "4px solid white"
                    }}
                    onClick={() => handleOptionChange(0, 0)}
                    onMouseEnter={()=>handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}>
                    Caminho
                    <span className={`top-${hovered[0]}`}></span>
                    {/* <span class="right"></span> */}
                    <span className={`left-${hovered[0]}`}></span>
                    <span className={`bottom-${hovered[0]}`}></span>
                    

                </div>
                <div className={`selected-${selected[1]} draw-cell`}
                    style={{
                        background: "#0e5c16", cursor: 'pointer',
                        position: "relative",
                        borderRight: "4px solid white"
                    }}
                    onClick={() => handleOptionChange(4, 1)}
                    onMouseEnter={()=>handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}>
                    Vitória
                    <span className={`top-${hovered[1]}`}></span>
                    <span className={`left-${hovered[1]}`}></span>
                    <span className={`bottom-${hovered[1]}`}></span>

                </div>
                <div className={`selected-${selected[2]} draw-cell`}
                    style={{
                        background: "#a70f16", cursor: 'pointer',
                        position: "relative",
                        borderRight: "4px solid white"
                    }}
                    onClick={() => handleOptionChange(3, 2)}
                    onMouseEnter={()=>handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}>
                    Derrota
                    <span className={`top-${hovered[2]}`}></span>
                    {/* <span class="right"></span> */}
                    <span className={`left-${hovered[2]}`}></span>
                    <span className={`bottom-${hovered[2]}`}></span>

                </div>
                <div className={`selected-${selected[3]} draw-cell`}
                    style={{
                        background: "black", cursor: 'pointer',
                        position: "relative",
                        borderRight: "4px solid white"
                    }}
                    onClick={() => handleOptionChange(2, 3)}
                    onMouseEnter={()=>handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}>
                    Obstáculo
                    <span className={`top-${hovered[3]}`}></span>
                    {/* <span class="right"></span> */}
                    <span className={`left-${hovered[3]}`}></span>
                    <span className={`bottom-${hovered[3]}`}></span>

                </div>



            </div>
            <div onClick={() => handleClick()} style={{ display: drawData == 5 ? 'none' : 'grid', cursor: "pointer" }}>

                Clique aqui para parar de alterar as celulas
            </div>
        </div>
    );
}

export default DrawButtons;
